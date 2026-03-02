# Implementation Roadmap - Area Riservata Corso

Roadmap completa per implementare l'area riservata studenti con sistema di pagamento e newsletter.

---

## 📋 Overview Progetto

### Obiettivo

Aggiungere al sito statico esistente un'**area riservata** per studenti con:

- ✅ Autenticazione
- ✅ Pagamento abbonamento mensile (Stripe)
- ✅ Lista lezioni con video e contenuto
- ✅ Tracking progresso (lezioni completate)
- ✅ Newsletter (Kit/ConvertKit)

### Vincoli

- **Frontend esistente** resta invariato (HTML statico)
- **Hosting** preferibilmente su GitHub o simile (Vercel)
- **Design system** esistente riutilizzato nell'area riservata

---

## 🛠 Stack Tecnologico

| Componente | Tecnologia | Perché |
|-----------|------------|---------|
| **Frontend Landing** | HTML/CSS statico | Già esistente, ottimizzato |
| **Frontend Area Riservata** | Next.js 14 (App Router) | SSR, API routes, ottimo con Supabase |
| **Backend/Database** | Supabase | Auth + DB + Storage in un servizio |
| **Pagamenti** | Stripe | Standard per SaaS, ottima DX |
| **Newsletter** | Kit (ConvertKit) | API semplice, ottimo per creator |
| **Hosting** | Vercel | Made for Next.js, free tier generoso |

---

## 🗂 Struttura Repository (Mono-repo)

```
/website
├── /public               ← Landing page statica (spostata qui)
│   ├── index.html
│   ├── /components
│   ├── /styles
│   └── /reference
├── /app                  ← Next.js App Router (area riservata)
│   ├── /api
│   │   ├── /create-checkout-session
│   │   ├── /newsletter
│   │   └── /webhooks
│   ├── /dashboard
│   │   ├── /lessons
│   │   ├── /subscription
│   │   └── /settings
│   ├── /login
│   ├── /pricing
│   ├── /welcome
│   └── layout.tsx
├── /lib                  ← Utilities condivise
│   ├── supabase.ts
│   ├── stripe.ts
│   └── kit.ts
├── /components           ← React components
├── /hooks                ← Custom hooks (useProgress, etc.)
├── /docs                 ← Documentazione
├── .env.local            ← Environment variables (git-ignored)
├── .env.example          ← Template env vars
├── next.config.js
└── package.json
```

---

## 📅 Timeline Implementazione

**Sprint 1:** Setup infrastruttura + integrazione landing  
**Sprint 2:** Autenticazione + pagamenti Stripe  
**Sprint 3:** Area riservata + lezioni  
**Sprint 4:** Progresso + newsletter + polish

---

## 🚀 Fasi Implementative

### **FASE 1: Setup Infrastruttura Base**

---

#### **Step 1.1: Setup Supabase**

**Sotto-step:**

1. Creo account Supabase (o uso esistente) → https://supabase.com
2. Creo nuovo progetto "mucca-corso"
3. Annoto le credenziali dal dashboard:
   - `SUPABASE_URL` (Project Settings → API)
   - `SUPABASE_ANON_KEY` (Project Settings → API)
   - `SUPABASE_SERVICE_ROLE_KEY` (per operazioni admin)
4. Configuro autenticazione:
   - Authentication → Providers → Email (abilitato)
   - Disabilito "Enable email confirmations" (per semplicità iniziale)
   - Disabilito "Enable public sign-ups" (solo admin crea utenti)
5. Configuro email templates (opzionale, personalizzare dopo)

**Output:** Progetto Supabase pronto, credenziali annotate

---

#### **Step 1.2: Progettazione Database**

**Sotto-step:**

1. Creo schema database tramite SQL Editor Supabase:

```sql
-- Tabella Lezioni
CREATE TABLE lessons (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  video_url text, -- URL video (YouTube, Vimeo, o Supabase Storage)
  content text, -- Contenuto markdown/HTML
  order_index integer NOT NULL, -- Ordine visualizzazione
  duration_minutes integer, -- Durata in minuti
  is_published boolean DEFAULT false,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Tabella Progresso Utente
CREATE TABLE user_progress (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamp,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Tabella Abbonamenti
CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  stripe_customer_id text NOT NULL,
  stripe_subscription_id text,
  status text NOT NULL, -- active, trialing, past_due, canceled, unpaid
  current_period_start timestamp,
  current_period_end timestamp,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Index per performance
CREATE INDEX idx_lessons_order ON lessons(order_index);
CREATE INDEX idx_lessons_published ON lessons(is_published);
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_user_progress_lesson ON user_progress(lesson_id);
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);
```

2. Configuro Row Level Security (RLS):

```sql
-- Abilita RLS
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy Lessons: tutti gli utenti autenticati possono leggere lezioni pubblicate
CREATE POLICY "Authenticated users can read published lessons"
  ON lessons FOR SELECT
  USING (auth.role() = 'authenticated' AND is_published = true);

-- Policy User Progress: utenti possono leggere/scrivere solo il proprio progresso
CREATE POLICY "Users can read own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy Subscriptions: utenti possono leggere solo il proprio abbonamento
CREATE POLICY "Users can read own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);
```

3. Creo funzione per calcolare progresso:

```sql
CREATE OR REPLACE FUNCTION get_user_progress_stats(p_user_id uuid)
RETURNS TABLE(total_lessons integer, completed_lessons integer, percentage numeric) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(l.id)::integer as total_lessons,
    COUNT(CASE WHEN up.completed THEN 1 END)::integer as completed_lessons,
    ROUND(
      (COUNT(CASE WHEN up.completed THEN 1 END)::numeric / 
       NULLIF(COUNT(l.id), 0) * 100), 
      1
    ) as percentage
  FROM lessons l
  LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = p_user_id
  WHERE l.is_published = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

4. Seed database con lezioni di esempio:

```sql
INSERT INTO lessons (title, slug, description, video_url, content, order_index, is_published) VALUES
  ('Introduzione al Corso', 'introduzione', 'Benvenuto nel corso di UX/UI Design', 'https://youtube.com/watch?v=example1', '# Benvenuto\n\nIn questa lezione...', 1, true),
  ('Principi di Design', 'principi-design', 'I fondamenti del design', 'https://youtube.com/watch?v=example2', '# Principi\n\nIl design si basa su...', 2, true),
  ('User Research', 'user-research', 'Come fare ricerca utente', 'https://youtube.com/watch?v=example3', '# Research\n\nLa ricerca è...', 3, true);
```

**Output:** Database strutturato, RLS configurato, dati di esempio inseriti

---

#### **Step 1.3: Setup Next.js nel progetto esistente**

**Sotto-step:**

1. Inizializzo npm (se non presente):
```bash
cd /Users/luca/Sync/_BREVE/mucca/website
npm init -y
```

2. Installo Next.js e dipendenze:
```bash
npm install next@latest react@latest react-dom@latest
npm install --save-dev typescript @types/node @types/react @types/react-dom
```

3. Creo struttura cartelle:
```bash
mkdir -p app/api app/dashboard app/login
mkdir -p lib components hooks
mkdir -p public
```

4. Sposto landing page in `/public` (mantiene accessibilità diretta):
```bash
# Nota: questo preserva la landing statica
mv index.html public/
mv components public/
mv styles public/
mv reference public/
mv Scorekard public/
# designsystem.html resta in root per reference
```

5. Creo `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Permette di servire file HTML statici da /public
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/index.html',
      },
      {
        source: '/designsystem',
        destination: '/designsystem.html',
      },
    ];
  },
  // Ottimizzazioni
  images: {
    domains: ['youtube.com', 'vimeo.com'], // Aggiungi domini per immagini esterne
  },
};

module.exports = nextConfig;
```

6. Creo `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

7. Aggiorno `package.json` con scripts:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

8. Creo `.gitignore`:
```
# Next.js
.next/
out/

# Node
node_modules/

# Env
.env
.env.local
.env.production.local
.env.development.local

# Misc
.DS_Store
*.log
```

9. Creo `.env.example` (template):
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID=

# Kit (ConvertKit)
KIT_API_KEY=
KIT_FORM_ID=
KIT_TAG_STUDENT_ID=

# App
NEXT_PUBLIC_URL=http://localhost:3000
```

10. Creo file `.env.local` (copiare da .env.example e compilare)

11. Creo layout root `/app/layout.tsx`:
```tsx
import type { Metadata } from 'next';
import '../public/styles/variables.css';
import '../public/styles/base.css';
import '../public/styles/typography.css';

export const metadata: Metadata = {
  title: 'Mucca Design - Corso UX/UI',
  description: 'Corso completo di UX/UI Design',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
```

12. Testo setup locale:
```bash
npm run dev
```
Verifico che http://localhost:3000 mostri la landing page statica

**Output:** Next.js installato e funzionante, landing page accessibile

---

#### **Step 1.4: Setup Stripe**

**Sotto-step:**

1. Creo account Stripe (o uso esistente) → https://stripe.com
2. Modalità test attiva (toggle in alto a destra dashboard)
3. Creo prodotto:
   - Products → Create product
   - Name: "Corso UX/UI Design Mensile"
   - Pricing model: Recurring
   - Price: €49 (o altro importo)
   - Billing period: Monthly
   - Salvo e annoto `price_id` (es. `price_1ABC...`)
4. Configuro webhook (dopo deploy, per ora annoto):
   - Developers → Webhooks → Add endpoint
   - Endpoint URL: `https://tuodominio.com/api/webhooks/stripe` (configurare dopo deploy)
   - Eventi da ascoltare:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
5. Annoto credenziali (Developers → API keys):
   - `STRIPE_PUBLISHABLE_KEY` (inizia con `pk_test_`)
   - `STRIPE_SECRET_KEY` (inizia con `sk_test_`)
6. Installo Stripe CLI per testing locale:
```bash
# macOS
brew install stripe/stripe-cli/stripe
stripe login
```
7. Configuro webhook locale per sviluppo:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# Annoto STRIPE_WEBHOOK_SECRET generato
```

**Output:** Stripe configurato, prodotto creato, credenziali annotate

---

#### **Step 1.5: Setup Kit (ConvertKit)**

**Sotto-step:**

1. Creo account Kit → https://convertkit.com
2. Creo form per newsletter generica:
   - Grow → Landing Pages & Forms → New Form
   - Template semplice
   - Annoto Form ID dall'URL (es. `1234567`)
3. Creo tag per segmentazione:
   - Subscribers → Tags → Create Tag
   - Nome: "Studente Attivo"
   - Annoto Tag ID (visibile nell'URL o via API)
4. Creo sequenza email benvenuto studenti:
   - Automate → Sequences → New Sequence
   - Email 1: Benvenuto, come iniziare
   - Email 2: (giorno +2) Primi passi
   - Email 3: (giorno +7) Check-in progresso
5. Creo broadcast template per newsletter settimanale
6. Annoto API Key:
   - Settings → Advanced → API Secret
   - Copia `API Secret Key`
7. (Opzionale) Creo form embed personalizzato per landing

**Output:** Kit configurato, form creato, tag e sequenze pronte, API key annotata

---

### **FASE 2: Integrazione Landing Page Statica**

#### **Step 2.1: Verifica Routing**

**Sotto-step:**

1. Verifico che `http://localhost:3000/` mostri landing statica
2. Verifico che tutti i link interni funzionino:
   - `/designsystem.html`
   - `/components/*/demo.html`
   - `/reference/*.html`
3. Sistemo eventuali path relativi rotti (es. CSS, immagini)
4. Testo Rough Notation e script JavaScript funzionano
5. Verifico responsive su mobile

**Output:** Landing page completamente funzionante in Next.js

---

#### **Step 2.2: Aggiunta Link "Accedi"**

**Sotto-step:**

1. Aggiungo link/bottone "Accedi" su landing page:
```html
<!-- In public/index.html, ad esempio nell'header -->
<a href="/login" class="link">Accedi all'area riservata</a>
<!-- O bottone più prominente -->
<a href="/pricing" class="button">Iscriviti Ora</a>
```

2. Stilizzo usando design system esistente

**Output:** Navigazione tra landing e area riservata funzionante

---

### **FASE 3: Autenticazione**

#### **Step 3.1: Setup Supabase Client**

**Sotto-step:**

1. Installo Supabase client:
```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

2. Creo `/lib/supabase.ts` (client-side):
```typescript
import { createBrowserClient } from '@supabase/ssr';

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
```

3. Creo `/lib/supabase-server.ts` (server-side):
```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createClient = () => {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
};
```

**Output:** Client Supabase configurati per client e server

---

#### **Step 3.2: Pagina Login**

**Sotto-step:**

1. Creo `/app/login/page.tsx`:
```tsx
'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import '../../public/components/input/input.css';
import '../../public/components/button/button.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Credenziali non valide');
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '80px auto', 
      padding: '0 20px' 
    }}>
      <h1 className="title" style={{ marginBottom: 'var(--spacing-xxl)' }}>
        Accedi
      </h1>
      
      <form onSubmit={handleLogin} style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 'var(--spacing-l)' 
      }}>
        <div>
          <label className="label" style={{ 
            display: 'block', 
            marginBottom: 'var(--spacing-s)' 
          }}>
            Email
          </label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="label" style={{ 
            display: 'block', 
            marginBottom: 'var(--spacing-s)' 
          }}>
            Password
          </label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {error && (
          <p className="text text--sm" style={{ color: 'var(--grey-600)' }}>
            {error}
          </p>
        )}

        <button 
          type="submit" 
          className="button"
          disabled={loading}
        >
          {loading ? 'Accesso in corso...' : 'Accedi'}
        </button>
      </form>
    </div>
  );
}
```

2. Testo login con credenziali di test (create manualmente in Supabase)

**Output:** Pagina login funzionante

---

#### **Step 3.3: Middleware Protezione Route**

**Sotto-step:**

1. Creo `/middleware.ts`:
```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Proteggi dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect a dashboard se già loggato
  if (request.nextUrl.pathname === '/login' && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
```

**Output:** Route protette, redirect automatici

---

#### **Step 3.4: Integrazione Stripe Checkout**

**Sotto-step:**

1. Installo Stripe SDK:
```bash
npm install stripe @stripe/stripe-js
```

2. Creo `/lib/stripe.ts`:
```typescript
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});
```

3. Creo pagina pricing `/app/pricing/page.tsx`:
```tsx
'use client';

import { useState } from 'react';

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
      });
      
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Errore checkout:', error);
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '80px auto', padding: '0 20px' }}>
      <h1 className="title" style={{ marginBottom: 'var(--spacing-xxl)' }}>
        Iscriviti al Corso
      </h1>
      
      <div style={{
        backgroundColor: 'var(--grey-100)',
        padding: 'var(--spacing-xxl)',
        marginBottom: 'var(--spacing-l)',
      }}>
        <h2 className="title title--md">Abbonamento Mensile</h2>
        <p className="text" style={{ margin: 'var(--spacing-l) 0' }}>
          Accesso completo a tutte le lezioni del corso
        </p>
        <p className="title" style={{ fontSize: '48px', marginBottom: 'var(--spacing-l)' }}>
          €49<span className="text">/mese</span>
        </p>
        <ul className="text" style={{ 
          listStyle: 'disc', 
          paddingLeft: 'var(--spacing-xl)',
          marginBottom: 'var(--spacing-xl)',
        }}>
          <li>Video lezioni HD</li>
          <li>Contenuti scritti approfonditi</li>
          <li>Esercizi pratici</li>
          <li>Supporto via Discord</li>
          <li>Certificato di completamento</li>
        </ul>
        <button 
          onClick={handleCheckout} 
          className="button"
          disabled={loading}
          style={{ width: '100%' }}
        >
          {loading ? 'Caricamento...' : 'Iscriviti Ora'}
        </button>
      </div>
      
      <p className="text text--sm" style={{ color: 'var(--grey-600)', textAlign: 'center' }}>
        Puoi cancellare in qualsiasi momento. Nessun impegno a lungo termine.
      </p>
    </div>
  );
}
```

4. Creo API route `/app/api/create-checkout-session/route.ts`:
```typescript
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_URL}/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Errore creazione sessione:', error);
    return NextResponse.json(
      { error: 'Errore creazione sessione checkout' },
      { status: 500 }
    );
  }
}
```

5. Creo pagina welcome `/app/welcome/page.tsx`:
```tsx
export default function WelcomePage() {
  return (
    <div style={{ maxWidth: '600px', margin: '80px auto', padding: '0 20px', textAlign: 'center' }}>
      <h1 className="title" style={{ marginBottom: 'var(--spacing-xxl)' }}>
        🎉 Benvenuto!
      </h1>
      <p className="text" style={{ marginBottom: 'var(--spacing-l)' }}>
        Il tuo pagamento è stato completato con successo.
      </p>
      <p className="text" style={{ marginBottom: 'var(--spacing-xxl)' }}>
        Riceverai a breve un'email con le istruzioni per accedere al corso.
      </p>
      <a href="/login" className="button">
        Accedi al Corso
      </a>
    </div>
  );
}
```

**Output:** Flow checkout Stripe completo

---

#### **Step 3.5: Webhook Stripe → Supabase**

**Sotto-step:**

1. Creo `/app/api/webhooks/stripe/route.ts`:
```typescript
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

// Client Supabase con service role (permessi admin)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  console.log('✅ Webhook ricevuto:', event.type);

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      
      default:
        console.log(`Evento non gestito: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Errore processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const email = session.customer_email;
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string;

  if (!email) {
    console.error('Email mancante nella sessione');
    return;
  }

  // Crea utente in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    email_confirm: true,
  });

  if (authError) {
    console.error('Errore creazione utente:', authError);
    return;
  }

  const userId = authData.user.id;

  // Recupera dettagli subscription da Stripe
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // Crea record subscription in Supabase
  const { error: subError } = await supabase.from('subscriptions').insert({
    user_id: userId,
    stripe_customer_id: customerId,
    stripe_subscription_id: subscriptionId,
    status: subscription.status,
    current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
  });

  if (subError) {
    console.error('Errore creazione subscription:', subError);
    return;
  }

  // Invia email reset password
  const { error: resetError } = await supabase.auth.admin.generateLink({
    type: 'recovery',
    email,
  });

  if (resetError) {
    console.error('Errore invio email:', resetError);
  }

  // TODO: Iscrivere a Kit newsletter con tag "Studente"
  
  console.log(`✅ Utente creato: ${email}`);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
    })
    .eq('stripe_subscription_id', subscription.id);

  if (error) {
    console.error('Errore update subscription:', error);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const { error } = await supabase
    .from('subscriptions')
    .update({ status: 'canceled' })
    .eq('stripe_subscription_id', subscription.id);

  if (error) {
    console.error('Errore cancellazione subscription:', error);
  }
}
```

2. Testo webhook in locale:
```bash
# In un terminale
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# In altro terminale, simula evento
stripe trigger checkout.session.completed
```

3. Verifico creazione utente in Supabase dashboard

**Output:** Webhook Stripe → Supabase funzionante

---

#### **Step 3.6: Gestione Stato Abbonamento**

**Sotto-step:**

1. Aggiorno middleware per controllare subscription:
```typescript
// In /middleware.ts, dopo check user
if (user && request.nextUrl.pathname.startsWith('/dashboard')) {
  // Controlla subscription attiva
  const supabase = createServerClient(...);
  
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('status, current_period_end')
    .eq('user_id', user.id)
    .single();

  if (!subscription || subscription.status !== 'active') {
    return NextResponse.redirect(new URL('/subscription-expired', request.url));
  }
}
```

2. Creo pagina `/app/subscription-expired/page.tsx`:
```tsx
export default function SubscriptionExpiredPage() {
  return (
    <div style={{ maxWidth: '600px', margin: '80px auto', padding: '0 20px', textAlign: 'center' }}>
      <h1 className="title" style={{ marginBottom: 'var(--spacing-l)' }}>
        Abbonamento Scaduto
      </h1>
      <p className="text" style={{ marginBottom: 'var(--spacing-xxl)' }}>
        Il tuo abbonamento non è più attivo. Riattivalo per continuare ad accedere al corso.
      </p>
      <a href="/pricing" className="button">
        Riattiva Abbonamento
      </a>
    </div>
  );
}
```

3. Creo pagina gestione subscription `/app/dashboard/subscription/page.tsx`:
```tsx
// Implementazione completa gestione abbonamento con Stripe Customer Portal
```

**Output:** Controllo subscription attiva su ogni accesso

---

### **FASE 4: Area Riservata - Dashboard**

#### **Step 4.1: Layout Dashboard**

**Sotto-step:**

1. Creo `/app/dashboard/layout.tsx`:
```tsx
import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div>
      <header style={{
        backgroundColor: 'var(--grey-100)',
        padding: 'var(--spacing-l)',
        borderBottom: '1px solid var(--grey-300)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h1 className="title title--sm">Corso UX/UI Design</h1>
          <nav style={{ display: 'flex', gap: 'var(--spacing-l)' }}>
            <a href="/dashboard" className="link">Dashboard</a>
            <a href="/dashboard/lessons" className="link">Lezioni</a>
            <a href="/dashboard/subscription" className="link">Abbonamento</a>
            <form action="/api/auth/signout" method="post">
              <button className="link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Esci
              </button>
            </form>
          </nav>
        </div>
      </header>
      
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'var(--spacing-xxl)',
      }}>
        {children}
      </main>
    </div>
  );
}
```

2. Creo API route logout `/app/api/auth/signout/route.ts`:
```typescript
import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function POST() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_URL!));
}
```

**Output:** Layout dashboard con navigazione

---

#### **Step 4.2: Homepage Dashboard**

**Sotto-step:**

1. Creo `/app/dashboard/page.tsx`:
```tsx
import { createClient } from '@/lib/supabase-server';

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch progresso
  const { data: stats } = await supabase
    .rpc('get_user_progress_stats', { p_user_id: user!.id })
    .single();

  const { total_lessons, completed_lessons, percentage } = stats || {
    total_lessons: 0,
    completed_lessons: 0,
    percentage: 0,
  };

  return (
    <div>
      <h1 className="title" style={{ marginBottom: 'var(--spacing-xxl)' }}>
        Benvenuto, {user!.email}
      </h1>

      <div style={{
        backgroundColor: 'var(--grey-100)',
        padding: 'var(--spacing-xxl)',
        marginBottom: 'var(--spacing-xxxl)',
      }}>
        <h2 className="title title--md" style={{ marginBottom: 'var(--spacing-l)' }}>
          Il Tuo Progresso
        </h2>
        
        <p className="text" style={{ marginBottom: 'var(--spacing-m)' }}>
          {completed_lessons} di {total_lessons} lezioni completate
        </p>

        {/* Progress bar */}
        <div style={{
          width: '100%',
          height: '24px',
          backgroundColor: 'var(--grey-300)',
          borderRadius: '4px',
          overflow: 'hidden',
          marginBottom: 'var(--spacing-m)',
        }}>
          <div style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: 'var(--blue-900)',
            transition: 'width 0.3s ease',
          }} />
        </div>

        <p className="text text--sm" style={{ color: 'var(--grey-600)' }}>
          {percentage}% completato
        </p>
      </div>

      <a href="/dashboard/lessons" className="button">
        Continua a Imparare
      </a>
    </div>
  );
}
```

**Output:** Dashboard con overview progresso

---

#### **Step 4.3: Lista Lezioni**

**Sotto-step:**

1. Creo `/app/dashboard/lessons/page.tsx`:
```tsx
import { createClient } from '@/lib/supabase-server';
import Link from 'next/link';

export default async function LessonsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch lezioni con progresso
  const { data: lessons } = await supabase
    .from('lessons')
    .select(`
      *,
      user_progress!left(completed)
    `)
    .eq('is_published', true)
    .eq('user_progress.user_id', user!.id)
    .order('order_index');

  return (
    <div>
      <h1 className="title" style={{ marginBottom: 'var(--spacing-xxl)' }}>
        Tutte le Lezioni
      </h1>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-l)',
      }}>
        {lessons?.map((lesson: any) => {
          const isCompleted = lesson.user_progress?.[0]?.completed || false;

          return (
            <Link
              key={lesson.id}
              href={`/dashboard/lessons/${lesson.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-l)',
                padding: 'var(--spacing-l)',
                backgroundColor: 'var(--grey-100)',
                border: '1px solid var(--grey-300)',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              {/* Checkbox visuale */}
              <div style={{
                width: '24px',
                height: '24px',
                border: '2px solid var(--grey-500)',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                backgroundColor: isCompleted ? 'var(--blue-900)' : 'transparent',
              }}>
                {isCompleted && (
                  <span style={{ color: 'white', fontSize: '16px' }}>✓</span>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <h3 className="title title--sm">{lesson.title}</h3>
                {lesson.description && (
                  <p className="text text--sm" style={{ 
                    color: 'var(--grey-600)', 
                    marginTop: 'var(--spacing-xs)' 
                  }}>
                    {lesson.description}
                  </p>
                )}
              </div>

              {lesson.duration_minutes && (
                <span className="text text--sm" style={{ color: 'var(--grey-600)' }}>
                  {lesson.duration_minutes} min
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
```

**Output:** Lista lezioni con stato completamento

---

### **FASE 5: Pagina Lezione**

#### **Step 5.1: Layout Lezione Singola**

**Sotto-step:**

1. Creo `/app/dashboard/lessons/[slug]/page.tsx`:
```tsx
import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import LessonContent from './LessonContent';

export default async function LessonPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch lezione
  const { data: lesson } = await supabase
    .from('lessons')
    .select(`
      *,
      user_progress!left(completed, completed_at)
    `)
    .eq('slug', params.slug)
    .eq('is_published', true)
    .eq('user_progress.user_id', user!.id)
    .single();

  if (!lesson) {
    notFound();
  }

  const isCompleted = lesson.user_progress?.[0]?.completed || false;

  return (
    <div>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: 'var(--spacing-l)' }}>
        <a href="/dashboard/lessons" className="link">← Tutte le lezioni</a>
      </nav>

      <h1 className="title" style={{ marginBottom: 'var(--spacing-xxl)' }}>
        {lesson.title}
      </h1>

      {/* Video */}
      {lesson.video_url && (
        <div style={{
          position: 'relative',
          paddingBottom: '56.25%', // 16:9 aspect ratio
          marginBottom: 'var(--spacing-xxl)',
          backgroundColor: 'var(--grey-900)',
        }}>
          <iframe
            src={lesson.video_url}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Contenuto testuale */}
      {lesson.content && (
        <div 
          className="text"
          style={{ marginBottom: 'var(--spacing-xxl)' }}
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />
      )}

      {/* Checkbox completamento */}
      <LessonContent lessonId={lesson.id} initialCompleted={isCompleted} />
    </div>
  );
}
```

2. Creo componente client `/app/dashboard/lessons/[slug]/LessonContent.tsx`:
```tsx
'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import '../../../../../public/components/checkbox/checkbox.css';

export default function LessonContent({ 
  lessonId, 
  initialCompleted 
}: { 
  lessonId: string; 
  initialCompleted: boolean;
}) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleToggleComplete = async () => {
    setLoading(true);
    const newCompleted = !completed;

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return;

    // Upsert progress
    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        lesson_id: lessonId,
        completed: newCompleted,
        completed_at: newCompleted ? new Date().toISOString() : null,
      }, {
        onConflict: 'user_id,lesson_id'
      });

    if (!error) {
      setCompleted(newCompleted);
    }

    setLoading(false);
  };

  return (
    <div style={{
      padding: 'var(--spacing-l)',
      backgroundColor: 'var(--grey-100)',
      border: '1px solid var(--grey-300)',
    }}>
      <label style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-m)',
        cursor: 'pointer',
      }}>
        <input
          type="checkbox"
          className="checkbox"
          checked={completed}
          onChange={handleToggleComplete}
          disabled={loading}
        />
        <span className="text">
          {completed ? 'Lezione completata ✓' : 'Marca come completata'}
        </span>
      </label>
    </div>
  );
}
```

**Output:** Pagina lezione con video, contenuto e checkbox

---

### **FASE 6: Componenti Condivisi**

#### **Step 6.1: Import CSS Globali**

**Sotto-step:**

1. Verifico import in `/app/layout.tsx`:
```tsx
import '../public/styles/variables.css';
import '../public/styles/base.css';
import '../public/styles/typography.css';
```

2. Import componenti specifici nelle pagine che li usano:
```tsx
import '../../public/components/button/button.css';
import '../../public/components/input/input.css';
import '../../public/components/checkbox/checkbox.css';
```

**Output:** Stili design system disponibili in tutta l'app

---

### **FASE 7: Contatore Progresso Globale**

#### **Step 7.1: Hook Custom useProgress**

**Sotto-step:**

1. Creo `/hooks/useProgress.ts`:
```typescript
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

interface ProgressStats {
  total: number;
  completed: number;
  percentage: number;
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressStats>({
    total: 0,
    completed: 0,
    percentage: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const { data, error } = await supabase
        .rpc('get_user_progress_stats', { p_user_id: user.id })
        .single();

      if (!error && data) {
        setProgress({
          total: data.total_lessons,
          completed: data.completed_lessons,
          percentage: data.percentage,
        });
      }

      setLoading(false);
    };

    fetchProgress();
  }, []);

  return { progress, loading };
}
```

**Output:** Hook riutilizzabile per progresso

---

### **FASE 8: Deploy e Configurazione Vercel**

#### **Step 8.1: Preparazione Deploy**

**Sotto-step:**

1. Verifico `.gitignore` completo
2. Commit tutto su GitHub:
```bash
git add .
git commit -m "Setup Next.js + Supabase + Stripe + Kit"
git push origin main
```

3. Testo build locale:
```bash
npm run build
npm run start
```

4. Risolvo eventuali errori TypeScript o build

**Output:** Progetto pronto per deploy

---

#### **Step 8.2: Configurazione Vercel**

**Sotto-step:**

1. Vado su https://vercel.com/signup
2. "Add New Project"
3. "Import Git Repository" → Seleziono repo GitHub
4. Configurazione:
   - Framework Preset: Next.js (auto-detect)
   - Root Directory: ./
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)
5. Environment Variables → Aggiungo tutte le variabili da `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET` (configurare dopo)
   - `STRIPE_PRICE_ID`
   - `KIT_API_KEY`
   - `KIT_FORM_ID`
   - `KIT_TAG_STUDENT_ID`
   - `NEXT_PUBLIC_URL` (es. `https://tuosito.vercel.app`)
6. Click "Deploy"
7. Attendo deploy (3-5 minuti)

**Output:** Sito live su Vercel

---

#### **Step 8.3: Configurazione Webhook Stripe Produzione**

**Sotto-step:**

1. Vado su Stripe Dashboard → Developers → Webhooks
2. "Add endpoint"
3. Endpoint URL: `https://tuosito.vercel.app/api/webhooks/stripe`
4. Eventi da ascoltare:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copio "Signing secret" generato
6. Aggiungo su Vercel:
   - Settings → Environment Variables
   - `STRIPE_WEBHOOK_SECRET` = [signing secret]
7. Redeploy per applicare variabile

**Output:** Webhook produzione configurato

---

#### **Step 8.4: Testing Produzione**

**Sotto-step:**

1. Testo landing page: `https://tuosito.vercel.app/`
2. Testo flow completo:
   - Click "Iscriviti"
   - Completo checkout Stripe (modalità test)
   - Verifico creazione utente in Supabase
   - Ricevo email
   - Login funziona
   - Dashboard carica
   - Lezioni visibili
   - Checkbox completamento funziona
3. Testo su mobile (Chrome DevTools)
4. Testo su browser diversi (Safari, Firefox)

**Output:** Piattaforma live e funzionante

---

### **FASE 9: Amministrazione**

#### **Step 9.1: Script Invito Studenti**

**Sotto-step:**

1. Creo `/scripts/invite-student.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';
import * as readline from 'readline';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Email studente: ', async (email) => {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    email_confirm: true,
  });

  if (error) {
    console.error('❌ Errore:', error.message);
  } else {
    console.log('✅ Studente creato:', data.user.email);
    
    // Invia email reset password
    await supabase.auth.admin.generateLink({
      type: 'recovery',
      email,
    });
    
    console.log('📧 Email invio inviata');
  }

  rl.close();
  process.exit(0);
});
```

2. Aggiungo script in `package.json`:
```json
{
  "scripts": {
    "invite": "tsx scripts/invite-student.ts"
  }
}
```

3. Installo tsx:
```bash
npm install --save-dev tsx
```

4. Uso:
```bash
npm run invite
# Inserisco email studente
```

**Output:** Script per invitare studenti manualmente

---

#### **Step 9.2: Script Gestione Lezioni**

**Sotto-step:**

1. Creo `/scripts/add-lesson.ts`:
```typescript
// Script interattivo per aggiungere lezioni
```

2. Per ora gestisco lezioni direttamente da Supabase Dashboard:
   - Table Editor → lessons → Insert row

**Output:** Sistema base gestione contenuti

---

### **FASE 10: Polish e Ottimizzazioni**

#### **Step 10.1: UX Improvements**

**Sotto-step:**

1. Aggiungo loading states:
   - Spinner durante fetch
   - Skeleton screens
2. Aggiungo error boundaries
3. Aggiungo toast notifications per feedback:
```bash
npm install react-hot-toast
```
4. Implemento navigazione keyboard tra lezioni (frecce ←/→)
5. Aggiungo breadcrumb in pagina lezione
6. Miglioro responsive mobile

**Output:** UX più polished

---

#### **Step 10.2: Performance**

**Sotto-step:**

1. Lazy loading video (carica solo quando visibile)
2. Prefetch lezioni adiacenti
3. Ottimizzazione immagini con `next/image`
4. Cache queries Supabase con React Query:
```bash
npm install @tanstack/react-query
```

**Output:** Performance ottimizzate

---

#### **Step 10.3: SEO e Meta Tags**

**Sotto-step:**

1. Aggiungo metadata dinamici nelle pagine:
```tsx
export const metadata = {
  title: 'Dashboard - Corso UX/UI',
  description: '...',
};
```

2. Aggiungo Open Graph tags per condivisioni social

**Output:** SEO migliorato

---

### **FASE 11: Integrazione Newsletter Kit**

#### **Step 11.1: Form Newsletter Landing**

**Sotto-step:**

1. Aggiungo form su landing page statica (`/public/index.html`):

**Opzione A - Form embed Kit (più semplice):**
```html
<!-- Prima del </body> -->
<script async data-uid="TUO_UID" src="https://kit.convertkit.com/TUO_UID/index.js"></script>

<!-- Dove vuoi il form -->
<div data-formkit-id="TUO_FORM_ID"></div>
```

**Opzione B - Form custom:**
```html
<section class="section">
  <h2 class="section__title title">Resta aggiornato</h2>
  <p class="text">Ricevi tips settimanali su UX/UI Design</p>
  
  <form id="newsletter-form" style="display: flex; gap: var(--spacing-m); margin-top: var(--spacing-l);">
    <input 
      type="email" 
      name="email" 
      placeholder="La tua email"
      class="input"
      style="flex: 1;"
      required
    />
    <button type="submit" class="button">Iscriviti</button>
  </form>
  
  <p id="newsletter-message" class="text text--sm" style="margin-top: var(--spacing-m); display: none;"></p>
</section>

<script>
  document.getElementById('newsletter-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const message = document.getElementById('newsletter-message');
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        message.textContent = '✅ Iscrizione completata!';
        message.style.color = 'var(--blue-900)';
        e.target.reset();
      } else {
        message.textContent = '❌ Errore. Riprova.';
        message.style.color = 'var(--grey-600)';
      }
    } catch (error) {
      message.textContent = '❌ Errore connessione.';
      message.style.color = 'var(--grey-600)';
    }
    
    message.style.display = 'block';
  });
</script>
```

2. Se uso Opzione B, creo API route `/app/api/newsletter/subscribe/route.ts`:
```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email } = await request.json();

  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${process.env.KIT_FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: process.env.KIT_API_KEY,
          email,
        }),
      }
    );

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Subscription failed' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
```

**Output:** Newsletter form su landing page

---

#### **Step 11.2: Auto-iscrizione Studenti a Kit**

**Sotto-step:**

1. Aggiorno webhook Stripe in `/app/api/webhooks/stripe/route.ts`:
```typescript
// Nella funzione handleCheckoutCompleted, dopo creazione utente:

async function subscribeToKit(email: string) {
  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/tags/${process.env.KIT_TAG_STUDENT_ID}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: process.env.KIT_API_KEY!,
          email,
        }),
      }
    );

    if (response.ok) {
      console.log(`✅ ${email} iscritto a Kit con tag Studente`);
    }
  } catch (error) {
    console.error('Errore iscrizione Kit:', error);
  }
}

// Chiamare dopo creazione utente:
await subscribeToKit(email);
```

2. In Kit, creo automation:
   - Trigger: Tag "Studente Attivo" aggiunto
   - Action: Aggiungi a sequenza "Benvenuto Studenti"

**Output:** Studenti paganti automaticamente in newsletter

---

#### **Step 11.3: Preferenze Newsletter in Dashboard**

**Sotto-step:**

1. Creo `/app/dashboard/settings/page.tsx`:
```tsx
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';

export default function SettingsPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setEmail(user.email!);
    }
    loadUser();
  }, []);

  const handleUnsubscribe = async () => {
    const response = await fetch('/api/newsletter/unsubscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      setSubscribed(false);
      alert('Disiscritto dalla newsletter');
    }
  };

  return (
    <div>
      <h1 className="title" style={{ marginBottom: 'var(--spacing-xxl)' }}>
        Impostazioni
      </h1>

      <div style={{
        backgroundColor: 'var(--grey-100)',
        padding: 'var(--spacing-l)',
        marginBottom: 'var(--spacing-l)',
      }}>
        <h2 className="title title--sm" style={{ marginBottom: 'var(--spacing-m)' }}>
          Newsletter
        </h2>
        
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-m)' }}>
          <input type="checkbox" checked={subscribed} onChange={() => {}} />
          <span className="text">Ricevi newsletter settimanale</span>
        </label>

        {subscribed && (
          <button 
            onClick={handleUnsubscribe} 
            className="link" 
            style={{ marginTop: 'var(--spacing-m)' }}
          >
            Disiscriviti
          </button>
        )}
      </div>
    </div>
  );
}
```

2. Creo API route `/app/api/newsletter/unsubscribe/route.ts`:
```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email } = await request.json();

  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/unsubscribe`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: process.env.KIT_API_KEY,
          email,
        }),
      }
    );

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Unsubscribe failed' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
```

**Output:** Gestione preferenze newsletter in dashboard

---

## 📊 Schema Database Completo

```sql
-- Vedi Step 1.2 per schema completo
-- Tabelle: lessons, user_progress, subscriptions
-- Funzioni: get_user_progress_stats
-- RLS policies configurate
```

---

## 🔐 Environment Variables Completo

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx...
STRIPE_SECRET_KEY=sk_test_xxx...
STRIPE_WEBHOOK_SECRET=whsec_xxx...
STRIPE_PRICE_ID=price_xxx...

# Kit (ConvertKit)
KIT_API_KEY=xxx...
KIT_FORM_ID=1234567
KIT_TAG_STUDENT_ID=2345678

# App
NEXT_PUBLIC_URL=https://tuosito.vercel.app
```

---

## 💰 Costi Stimati (50 Studenti)

| Servizio | Costo |
|----------|-------|
| **Vercel** | €0 (free tier) |
| **Supabase** | €0 (free tier) |
| **Stripe** | ~€34/mese (commissioni 1.4% + €0.25) |
| **Kit** | €0 (sotto 1,000 subscriber) |
| **Totale** | ~€34/mese |

---

## 🔒 Considerazioni Sicurezza

1. **Environment Variables**: Mai committare `.env.local`
2. **Supabase RLS**: Configurato per proteggere dati utenti
3. **Stripe Webhook**: Signature verification obbligatoria
4. **Auth Middleware**: Verifica utente + subscription attiva
5. **API Routes**: Validazione input server-side

---

## 🎯 Flow Utente Completo

```
1. Visitatore landing page
   ↓
2. [Opzionale] Iscrive a newsletter
   ↓
3. Click "Iscriviti €49/mese"
   ↓
4. Stripe Checkout (pagamento)
   ↓
5. Webhook → Crea account Supabase + iscrizione Kit
   ↓
6. Email: "Imposta password"
   ↓
7. Login → Dashboard
   ↓
8. Visualizza lezioni
   ↓
9. Completa lezioni
   ↓
10. Progresso trackato
```

---

## ✅ Checklist Pre-Launch

- [ ] Database schema completo in Supabase
- [ ] RLS policies testate
- [ ] Stripe prodotto e prezzo configurati
- [ ] Webhook Stripe testato in produzione
- [ ] Kit form e tag configurati
- [ ] Build Next.js senza errori
- [ ] Deploy Vercel completato
- [ ] Environment variables produzione configurate
- [ ] Testing completo flow checkout
- [ ] Testing lezioni + progresso
- [ ] Testing mobile responsive
- [ ] Dominio custom configurato (opzionale)
- [ ] Analytics/monitoring configurato (opzionale)

---

## 📚 Risorse Utili

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Kit API Docs](https://developers.convertkit.com/)
- [Vercel Docs](https://vercel.com/docs)

---

## 🆘 Troubleshooting Comuni

### Webhook Stripe non funziona
- Verificare signature secret corretta
- Controllare logs Stripe Dashboard
- Testare con Stripe CLI locale

### RLS blocca query
- Verificare policy con `USING` clause corretta
- Testare con service_role_key per debug
- Controllare che `auth.uid()` sia popolato

### Build Next.js fallisce
- Verificare tutte le env vars in Vercel
- Controllare errori TypeScript
- Verificare import paths corretti

---

**Documento creato:** 17 Dicembre 2025  
**Versione:** 1.0  
**Prossimo aggiornamento:** Dopo implementazione effettiva


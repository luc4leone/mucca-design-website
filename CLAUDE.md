# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandi

```bash
npm run dev        # avvia dev server su http://localhost:3000
npm run build      # build produzione
npm run lint       # linting
```

## Architettura

Mono-repo con due parti distinte:

- **Landing page statica** — `public/` — HTML/CSS puro, design system proprietario, servita via rewrite Next.js
- **Area riservata** — `app/` — Next.js App Router, TypeScript, Supabase, Stripe

La landing è accessibile su `/` grazie al rewrite in `next.config.js`. Le pagine statiche sono `public/index.html`, `public/pages/chi-sono.html`, `public/pages/privacy.html`.

## Design system

Variabili CSS in `public/styles/variables.css`. Componenti in `public/components/{nome}/` (CSS + JS opzionale).

## Regole CSS — sempre rispettare

**No CSS inline.** Non usare mai attributi `style=""` nell'HTML.

**Usa sempre i token CSS.**
```css
/* ✅ */
gap: var(--spacing-l);
font-size: var(--font-size-base);

/* ❌ */
gap: 16px;
font-size: 18px;
```

**Layout con flexbox e grid, spaziatura con `gap`.**
```css
/* ✅ */
.container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);
}

/* ❌ — non usare margin per spaziare elementi fratelli */
.child { margin-top: var(--spacing-l); }
```

**Eccezione:** heading e paragrafi mantengono `margin-bottom` semantico.

**I componenti non hanno margin esterni.** Il margin va sul container padre tramite `gap`.

**Non cambiare `display` di componenti base.** Usa un wrapper se serve.

**`align-items: baseline`** per allineare testo + testo/badge; **`align-items: center`** per icona + testo.

## Stack area riservata

| Componente | Tecnologia |
|---|---|
| Frontend area riservata | Next.js App Router + TypeScript |
| Auth + DB | Supabase |
| Pagamenti | Stripe |
| Email notifiche | Resend (`RESEND_API_KEY`) |
| Hosting | Vercel |

Variabili d'ambiente necessarie: vedi `.env.example`.

Schema DB: `docs/supabase-messages-migration.sql` e `supabase-schema.sql`.

-- =============================================================================
-- Schema Database - Mucca Corso
-- =============================================================================
-- Questo file contiene lo schema completo del database Supabase
-- Da eseguire nel SQL Editor di Supabase Dashboard

-- =============================================================================
-- Tabella: lessons (Lezioni del corso)
-- =============================================================================

CREATE TABLE lessons (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  video_url text, -- URL video (YouTube, Vimeo, o Supabase Storage)
  content text, -- Contenuto markdown/HTML della lezione
  order_index integer NOT NULL, -- Ordine di visualizzazione
  duration_minutes integer, -- Durata stimata in minuti
  is_published boolean DEFAULT false,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- =============================================================================
-- Tabella: user_progress (Progresso utente per lezione)
-- =============================================================================

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

-- =============================================================================
-- Tabella: subscriptions (Abbonamenti Stripe)
-- =============================================================================

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

-- =============================================================================
-- Indici per performance
-- =============================================================================

CREATE INDEX idx_lessons_order ON lessons(order_index);
CREATE INDEX idx_lessons_published ON lessons(is_published);
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_user_progress_lesson ON user_progress(lesson_id);
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);

-- =============================================================================
-- Row Level Security (RLS) - Protezione dati
-- =============================================================================

-- Abilita RLS su tutte le tabelle
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

-- =============================================================================
-- Funzione: Calcolo progresso utente
-- =============================================================================

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

-- =============================================================================
-- Seed Data: Lezioni di esempio
-- =============================================================================

INSERT INTO lessons (title, slug, description, video_url, content, order_index, is_published, duration_minutes) VALUES
  (
    'Introduzione al Corso',
    'introduzione',
    'Benvenuto nel corso di UX/UI Design. In questa lezione introduttiva scoprirai cosa imparerai e come è strutturato il corso.',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    '<h2>Benvenuto!</h2>
    <p class="text">In questa lezione introduttiva ti do il benvenuto e ti spiego come funziona il corso.</p>
    <h3>Cosa imparerai</h3>
    <ul class="text">
      <li>I principi fondamentali del design</li>
      <li>Come condurre ricerca utente</li>
      <li>Creare prototipi efficaci</li>
      <li>Testare le tue soluzioni</li>
    </ul>',
    1,
    true,
    15
  ),
  (
    'Principi di Design',
    'principi-design',
    'I fondamenti del design: contrasto, gerarchia, allineamento, ripetizione e prossimità.',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    '<h2>I 5 Principi Fondamentali</h2>
    <p class="text">Il design efficace si basa su questi principi universali.</p>
    <h3>1. Contrasto</h3>
    <p class="text">Il contrasto crea differenziazione e gerarchia visiva.</p>
    <h3>2. Gerarchia</h3>
    <p class="text">Guida l''occhio attraverso l''informazione in ordine di importanza.</p>',
    2,
    true,
    25
  ),
  (
    'User Research',
    'user-research',
    'Come fare ricerca utente efficace: interviste, questionari, test di usabilità.',
    'https://www.youtube.com/embed/dQw4w9WgXcQ',
    '<h2>La Ricerca è Fondamentale</h2>
    <p class="text">Non puoi progettare senza capire i tuoi utenti.</p>
    <h3>Metodi di ricerca</h3>
    <ul class="text">
      <li><strong>Interviste qualitative</strong>: approfondite, 1-on-1</li>
      <li><strong>Questionari</strong>: raccolta dati quantitativi</li>
      <li><strong>Test di usabilità</strong>: osserva gli utenti usare il prodotto</li>
    </ul>',
    3,
    true,
    30
  );

-- =============================================================================
-- Fine Schema
-- =============================================================================

-- Per verificare che tutto sia stato creato correttamente:
-- SELECT * FROM lessons ORDER BY order_index;


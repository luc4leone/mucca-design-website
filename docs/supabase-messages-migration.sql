-- Tabella messaggi dal widget "lascia un messaggio"
-- Da eseguire in: Supabase Dashboard → SQL Editor

CREATE TABLE messages (
  id         uuid                     PRIMARY KEY DEFAULT uuid_generate_v4(),
  email      text                     NOT NULL,
  body       text                     NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- RLS abilitato; solo il service role (API route) può leggere/scrivere
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

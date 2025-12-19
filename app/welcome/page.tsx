'use client';

import '../../public/components/button/button.css';

import { createClient } from '@supabase/supabase-js';
import { useMemo, useState } from 'react';

export default function WelcomePage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = useMemo(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      return null;
    }

    return createClient(supabaseUrl, supabaseAnonKey);
  }, [supabaseUrl, supabaseAnonKey]);

  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function sendMagicLink() {
    if (!supabase) {
      setStatus('Configurazione mancante: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
      return;
    }

    const trimmed = email.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!emailOk) {
      setStatus('Inserisci una email valida (la stessa usata nel checkout Stripe).');
      return;
    }

    setBusy(true);
    setSent(false);
    setStatus('Sto inviando il magic link...');

    try {
      const ensureRes = await fetch('/api/auth/ensure-user', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      const ensureJson = (await ensureRes.json()) as { ok: boolean; error?: string };
      if (!ensureRes.ok || !ensureJson.ok) {
        setStatus(`Errore: ${ensureJson.error ?? 'Impossibile creare/verificare utente'}`);
        return;
      }

      const redirectTo = process.env.NEXT_PUBLIC_URL
        ? `${process.env.NEXT_PUBLIC_URL}/auth/callback`
        : undefined;

      const { error } = await supabase.auth.signInWithOtp({
        email: trimmed,
        options: {
          emailRedirectTo: redirectTo,
        },
      });

      if (error) {
        setStatus(`Email non inviata: ${error.message}. Riprova e controlla anche lo spam.`);
        return;
      }

      setSent(true);
      setStatus('Mail inviata. Apri la mail e clicca sul link per accedere al corso. Controlla anche lo spam.');
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Email non inviata: ${message}. Riprova e controlla anche lo spam.`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '80px auto',
        padding: '0 20px',
        textAlign: 'center',
      }}
    >
      <div className="title" style={{ marginBottom: 'var(--spacing-xxl)' }}>
        Benvenuto!
      </div>

      <div className="text" style={{ marginBottom: 'var(--spacing-l)' }}>
        Il tuo pagamento è stato completato con successo.
      </div>

      <div className="text" style={{ marginBottom: 'var(--spacing-l)' }}>
        Inserisci l'email usata nel checkout e riceverai un magic link per accedere al corso.
      </div>

      <div style={{ textAlign: 'left', marginBottom: 'var(--spacing-l)' }}>
        <label className="text">
          Email
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSent(false);
            }}
            type="email"
            style={{ width: '100%', padding: '10px', marginTop: '6px' }}
            placeholder="tuo@email.com"
          />
        </label>
      </div>

      <button className="button" type="button" onClick={sendMagicLink} disabled={busy || sent}>
        Accedi con Magic Link
      </button>

      {status ? (
        <div className="text" style={{ marginTop: 'var(--spacing-xxl)' }}>
          {status}
        </div>
      ) : null}
    </div>
  );
}

'use client';

import '../../public/components/button/button.css';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useMemo, useState } from 'react';

export default function LoginPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = useMemo(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      return null;
    }

    return createClient(supabaseUrl, supabaseAnonKey);
  }, [supabaseUrl, supabaseAnonKey]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) return;

    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    if (!hash) return;

    const hashParams = new URLSearchParams(hash.replace(/^#/, ''));
    const access_token = hashParams.get('access_token');
    const refresh_token = hashParams.get('refresh_token');

    if (access_token && refresh_token) {
      (async () => {
        setBusy(true);
        setStatus('Sto completando l’accesso...');
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (error) {
          setStatus(`Errore sessione: ${error.message}`);
        } else {
          setStatus('Accesso completato. Se è il tuo primo accesso, imposta una password qui sotto.');
        }
        setBusy(false);
      })();
    }
  }, [supabase]);

  async function signInWithPassword() {
    if (!supabase) {
      setStatus('Supabase non inizializzato (controlla le env NEXT_PUBLIC_SUPABASE_...).');
      return;
    }
    if (!email || !password) {
      setStatus('Inserisci email e password.');
      return;
    }

    setBusy(true);
    setStatus('Sto effettuando il login...');

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setStatus(`Errore login: ${error.message}`);
      } else {
        setStatus('Login effettuato.');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Errore login: ${message}`);
    } finally {
      setBusy(false);
    }
  }

  async function sendMagicLink() {
    if (!supabase) {
      setStatus('Supabase non inizializzato (controlla le env NEXT_PUBLIC_SUPABASE_...).');
      return;
    }
    if (!email) {
      setStatus('Inserisci la tua email.');
      return;
    }

    setBusy(true);
    setStatus('Sto inviando il magic link...');

    try {
      const redirectTo = process.env.NEXT_PUBLIC_URL ? `${process.env.NEXT_PUBLIC_URL}/login` : undefined;
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
        },
      });

      if (error) {
        setStatus(`Errore magic link: ${error.message}`);
      } else {
        setStatus('Ti ho inviato un link via email per accedere.');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Errore magic link: ${message}`);
    } finally {
      setBusy(false);
    }
  }

  async function setPasswordFromInvite() {
    if (!supabase) {
      setStatus('Supabase non inizializzato (controlla le env NEXT_PUBLIC_SUPABASE_...).');
      return;
    }
    if (!newPassword) {
      setStatus('Inserisci una nuova password.');
      return;
    }

    setBusy(true);
    setStatus('Sto impostando la password...');

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        setStatus('Prima devi aprire il link ricevuto via email (invito) oppure fare login.');
        return;
      }

      const { error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) {
        setStatus(`Errore impostazione password: ${error.message}`);
      } else {
        setStatus('Password impostata. Ora puoi usare email+password per accedere.');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Errore impostazione password: ${message}`);
    } finally {
      setBusy(false);
    }
  }

  if (!supabaseUrl || !supabaseAnonKey) {
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
          Login
        </div>
        <div className="text">
          Mancano le env `NEXT_PUBLIC_SUPABASE_URL` o `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
        </div>
      </div>
    );
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
        Login
      </div>

      <div style={{ display: 'grid', gap: '12px', textAlign: 'left', marginBottom: 'var(--spacing-l)' }}>
        <label className="text">
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            style={{ width: '100%', padding: '10px', marginTop: '6px' }}
            placeholder="tuo@email.com"
          />
        </label>

        <label className="text">
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            style={{ width: '100%', padding: '10px', marginTop: '6px' }}
            placeholder="••••••••"
          />
        </label>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          className="button"
          type="button"
          onClick={signInWithPassword}
          disabled={busy}
        >
          Accedi
        </button>
        <button className="button" type="button" onClick={sendMagicLink} disabled={busy}>
          Invia Magic Link
        </button>
      </div>

      <div className="text" style={{ marginTop: 'var(--spacing-xxl)', marginBottom: 'var(--spacing-l)' }}>
        Primo accesso da invito? Imposta una password.
      </div>

      <div style={{ display: 'grid', gap: '12px', textAlign: 'left' }}>
        <label className="text">
          Nuova password
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            style={{ width: '100%', padding: '10px', marginTop: '6px' }}
            placeholder="Scegli una password"
          />
        </label>
      </div>

      <div style={{ marginTop: '12px' }}>
        <button
          className="button"
          type="button"
          onClick={setPasswordFromInvite}
          disabled={busy}
        >
          Imposta Password
        </button>
      </div>

      {status ? (
        <div className="text" style={{ marginTop: 'var(--spacing-xxl)' }}>
          {status}
        </div>
      ) : null}
    </div>
  );
}

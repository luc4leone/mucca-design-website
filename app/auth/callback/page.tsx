'use client';

import '../../../public/components/button/button.css';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useMemo, useState } from 'react';

export default function AuthCallbackPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = useMemo(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      return null;
    }

    return createClient(supabaseUrl, supabaseAnonKey);
  }, [supabaseUrl, supabaseAnonKey]);

  const [status, setStatus] = useState<string>('Sto completando l’accesso...');

  useEffect(() => {
    if (!supabase) {
      setStatus('Configurazione mancante: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
      return;
    }

    (async () => {
      try {
        const qs = typeof window !== 'undefined' ? window.location.search : '';
        const params = new URLSearchParams(qs);
        const code = params.get('code');

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            setStatus(`Errore accesso: ${error.message}`);
            return;
          }

          window.location.replace('/dashboard');
          return;
        }

        const hash = typeof window !== 'undefined' ? window.location.hash : '';
        const hashParams = new URLSearchParams(hash.replace(/^#/, ''));
        const access_token = hashParams.get('access_token');
        const refresh_token = hashParams.get('refresh_token');

        if (access_token && refresh_token) {
          const { error } = await supabase.auth.setSession({ access_token, refresh_token });
          if (error) {
            setStatus(`Errore accesso: ${error.message}`);
            return;
          }

          window.location.replace('/dashboard');
          return;
        }

        const { data } = await supabase.auth.getSession();
        if (data.session) {
          window.location.replace('/dashboard');
          return;
        }

        setStatus('Link non valido o scaduto. Riprova ad inviare il magic link.');
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setStatus(`Errore accesso: ${message}`);
      }
    })();
  }, [supabase]);

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '80px auto',
        padding: '0 20px',
        textAlign: 'center',
      }}
    >
      <div className="title" style={{ marginBottom: 'var(--spacing-2xl)' }}>
        Accesso
      </div>

      <div className="text" style={{ marginBottom: 'var(--spacing-2xl)' }}>
        {status}
      </div>

      <a href="/welcome" className="button">
        Torna a Welcome
      </a>
    </div>
  );
}

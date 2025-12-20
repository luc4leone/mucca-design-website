'use client';

import '../../public/components/button/button.css';

import { createClient } from '@supabase/supabase-js';
import { ReactNode, useEffect, useMemo, useState } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = useMemo(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      return null;
    }

    return createClient(supabaseUrl, supabaseAnonKey);
  }, [supabaseUrl, supabaseAnonKey]);

  const [status, setStatus] = useState<string>('Caricamento...');
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [authedEmail, setAuthedEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setStatus('Configurazione mancante: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
      return;
    }

    (async () => {
      const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
      const allowedStatuses = new Set(['active', 'trialing']);

      setReady(false);
      setStatus('Verifica accesso...');

      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        setStatus(`Errore sessione: ${sessionError.message}`);
        return;
      }

      if (!sessionData.session) {
        window.location.href = '/welcome';
        return;
      }

      setAuthedEmail(sessionData.session.user.email ?? null);
      const userId = sessionData.session.user.id;

      setStatus('Verifica abbonamento...');
      let subscriptionStatus: string | null = null;

      for (let attempt = 0; attempt < 5; attempt += 1) {
        const { data: subscription, error: subscriptionError } = await supabase
          .from('subscriptions')
          .select('status')
          .eq('user_id', userId)
          .maybeSingle();

        if (subscriptionError) {
          setStatus(`Errore abbonamento: ${subscriptionError.message}`);
          return;
        }

        subscriptionStatus = subscription?.status ?? null;
        if (subscriptionStatus && allowedStatuses.has(subscriptionStatus)) {
          setReady(true);
          setStatus('');
          return;
        }

        if (attempt < 4) {
          await sleep(1000);
        }
      }

      window.location.href = '/subscription-expired';
    })();
  }, [supabase]);

  async function logout() {
    if (!supabase) return;
    setBusy(true);
    try {
      await supabase.auth.signOut();
      window.location.href = '/welcome';
    } finally {
      setBusy(false);
    }
  }

  if (!ready) {
    return (
      <div
        style={{
          maxWidth: '800px',
          margin: '80px auto',
          padding: '0 20px',
          textAlign: 'center',
        }}
      >
        <div className="title" style={{ marginBottom: 'var(--spacing-xxl)' }}>
          Dashboard
        </div>
        <div className="text">{status}</div>
      </div>
    );
  }

  return (
    <div>
      <header
        style={{
          backgroundColor: 'var(--grey-100)',
          padding: 'var(--spacing-l)',
          borderBottom: '1px solid var(--grey-300)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <div className="title title--sm">Corso UX/UI Design</div>

          <nav style={{ display: 'flex', gap: 'var(--spacing-l)', alignItems: 'center', flexWrap: 'wrap' }}>
            <a className="text" href="/dashboard" style={{ textDecoration: 'underline' }}>
              Home
            </a>
            <a className="text" href="/dashboard/subscription" style={{ textDecoration: 'underline' }}>
              Abbonamento
            </a>
            <button className="button" type="button" onClick={logout} disabled={busy}>
              Logout
            </button>
          </nav>
        </div>
        {authedEmail ? (
          <div
            className="text"
            style={{
              maxWidth: '1200px',
              margin: '8px auto 0',
              padding: '0',
              opacity: 0.8,
            }}
          >
            {authedEmail}
          </div>
        ) : null}
      </header>

      <main
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'var(--spacing-xxl)',
        }}
      >
        {children}
      </main>
    </div>
  );
}

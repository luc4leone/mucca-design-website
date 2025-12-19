'use client';

import '../../public/components/button/button.css';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useMemo, useState } from 'react';

type Lesson = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  order_index: number;
};

export default function DashboardPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = useMemo(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      return null;
    }

    return createClient(supabaseUrl, supabaseAnonKey);
  }, [supabaseUrl, supabaseAnonKey]);

  const [status, setStatus] = useState<string>('Caricamento...');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [authedEmail, setAuthedEmail] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setStatus('Configurazione mancante: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
      return;
    }

    (async () => {
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
      const { data: subscription, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('status')
        .eq('user_id', userId)
        .maybeSingle();

      if (subscriptionError) {
        setStatus(`Errore abbonamento: ${subscriptionError.message}`);
        return;
      }

      if (!subscription || subscription.status !== 'active') {
        window.location.href = '/subscription-expired';
        return;
      }

      setStatus('Carico le lezioni...');
      const { data: lessonsData, error: lessonsError } = await supabase
        .from('lessons')
        .select('id,title,slug,description,order_index')
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (lessonsError) {
        setStatus(`Errore lezioni: ${lessonsError.message}`);
        return;
      }

      setLessons((lessonsData as Lesson[]) ?? []);
      setStatus('');
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

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '80px auto',
        padding: '0 20px',
      }}
    >
      <div className="title" style={{ marginBottom: 'var(--spacing-xxl)' }}>
        Dashboard
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: 'var(--spacing-l)' }}>
        <div className="text">{authedEmail ? `Loggato come: ${authedEmail}` : ''}</div>
        <button className="button" type="button" onClick={logout} disabled={busy}>
          Logout
        </button>
      </div>

      {status ? <div className="text" style={{ marginBottom: 'var(--spacing-l)' }}>{status}</div> : null}

      {lessons.length ? (
        <div style={{ display: 'grid', gap: '12px' }}>
          {lessons.map((l) => (
            <div
              key={l.id}
              style={{
                border: '1px solid var(--grey-300)',
                padding: '16px',
              }}
            >
              <div className="text" style={{ fontWeight: 700, marginBottom: '6px' }}>
                {l.order_index}. {l.title}
              </div>
              {l.description ? <div className="text">{l.description}</div> : null}
            </div>
          ))}
        </div>
      ) : null}

      {!status && lessons.length === 0 ? (
        <div className="text">Nessuna lezione disponibile.</div>
      ) : null}

      <div style={{ marginTop: 'var(--spacing-xxl)' }}>
        <a className="button" href="/pricing">
          Gestisci Abbonamento
        </a>
      </div>
    </div>
  );
}

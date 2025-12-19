'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useMemo, useState } from 'react';

type ProgressStats = {
  total_lessons: number;
  completed_lessons: number;
  percentage: number;
};

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
  const [progress, setProgress] = useState<ProgressStats | null>(null);
  const [progressError, setProgressError] = useState<string | null>(null);

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

      setProgressError(null);
      const { data: stats, error: statsError } = await supabase
        .rpc('get_user_progress_stats', { p_user_id: userId })
        .single();

      if (statsError) {
        setProgress(null);
        setProgressError(statsError.message);
      } else {
        const anyStats = stats as unknown as ProgressStats;
        setProgress({
          total_lessons: anyStats.total_lessons ?? 0,
          completed_lessons: anyStats.completed_lessons ?? 0,
          percentage: Number(anyStats.percentage ?? 0),
        });
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

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 20px',
      }}
    >
      {authedEmail ? (
        <div className="text" style={{ marginBottom: 'var(--spacing-l)' }}>
          Benvenuto, {authedEmail}
        </div>
      ) : null}

      <div
        style={{
          backgroundColor: 'var(--grey-100)',
          padding: 'var(--spacing-xxl)',
          marginBottom: 'var(--spacing-xxl)',
          border: '1px solid var(--grey-300)',
        }}
      >
        <div className="title title--md" style={{ marginBottom: 'var(--spacing-l)' }}>
          Il tuo progresso
        </div>

        {progress ? (
          <>
            <div className="text" style={{ marginBottom: 'var(--spacing-m)' }}>
              {progress.completed_lessons} di {progress.total_lessons} lezioni completate
            </div>

            <div
              style={{
                width: '100%',
                height: '24px',
                border: '1px solid var(--grey-300)',
                backgroundColor: 'var(--white)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${Math.max(0, Math.min(100, progress.percentage))}%`,
                  height: '100%',
                  backgroundColor: 'var(--black)',
                }}
              />
            </div>

            <div className="text" style={{ marginTop: 'var(--spacing-m)', opacity: 0.8 }}>
              {Math.max(0, Math.min(100, progress.percentage))}%
            </div>
          </>
        ) : (
          <div className="text" style={{ opacity: 0.8 }}>
            {progressError ? `Impossibile caricare il progresso: ${progressError}` : 'Caricamento progresso...'}
          </div>
        )}
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

    </div>
  );
}

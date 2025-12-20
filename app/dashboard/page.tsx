'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useMemo, useState } from 'react';

import { useProgress } from '../../hooks/useProgress';

type Lesson = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  order_index: number;
};

type UserProgressRow = {
  lesson_id: string;
  completed: boolean;
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
  const { progress, progressError, loadProgress } = useProgress();
  const [completionByLessonId, setCompletionByLessonId] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!supabase) {
      setStatus('Configurazione mancante: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
      return;
    }

    const supabaseClient = supabase;

    let cancelled = false;
    let channel: ReturnType<typeof supabaseClient.channel> | null = null;

    async function loadCompletion(userId: string, lessonIds: string[]) {
      if (!lessonIds.length) {
        setCompletionByLessonId({});
        return;
      }

      const { data, error } = await supabaseClient
        .from('user_progress')
        .select('lesson_id,completed')
        .eq('user_id', userId)
        .in('lesson_id', lessonIds);

      if (cancelled) return;

      if (error) {
        return;
      }

      const map: Record<string, boolean> = {};
      ((data as UserProgressRow[]) ?? []).forEach((row) => {
        if (row.completed) {
          map[row.lesson_id] = true;
        }
      });

      setCompletionByLessonId(map);
    }

    (async () => {
      setStatus('Verifica accesso...');

      const { data: sessionData, error: sessionError } = await supabaseClient.auth.getSession();
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

      await loadProgress(supabaseClient, userId);

      setStatus('Carico le lezioni...');
      const { data: lessonsData, error: lessonsError } = await supabaseClient
        .from('lessons')
        .select('id,title,slug,description,order_index')
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (lessonsError) {
        setStatus(`Errore lezioni: ${lessonsError.message}`);
        return;
      }

      setLessons((lessonsData as Lesson[]) ?? []);
      const ids = ((lessonsData as Lesson[]) ?? []).map((l) => l.id);
      await loadCompletion(userId, ids);
      setStatus('');

      channel = supabaseClient
        .channel('user_progress_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'user_progress',
            filter: `user_id=eq.${userId}`,
          },
          async () => {
            await loadProgress(supabaseClient, userId);
            await loadCompletion(userId, ids);
          }
        )
        .subscribe();
    })();

    return () => {
      cancelled = true;
      if (channel) {
        supabaseClient.removeChannel(channel);
      }
    };
  }, [supabase]);

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 20px',
      }}
    >
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
            <a
              key={l.id}
              href={`/dashboard/lessons/${l.slug}`}
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  border: '1px solid var(--grey-300)',
                  padding: '16px',
                }}
              >
                <div className="text" style={{ opacity: 0.8, marginBottom: '6px' }}>
                  {completionByLessonId[l.id] ? 'Completata' : 'Da fare'}
                </div>
                <div className="text" style={{ fontWeight: 700, marginBottom: '6px', textDecoration: 'underline' }}>
                  {l.order_index}. {l.title}
                </div>
                {l.description ? <div className="text">{l.description}</div> : null}
              </div>
            </a>
          ))}
        </div>
      ) : null}

      {!status && lessons.length === 0 ? (
        <div className="text">Nessuna lezione disponibile.</div>
      ) : null}

    </div>
  );
}

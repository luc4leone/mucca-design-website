'use client';

import '../../../../public/components/link/link.css';

import { getSupabaseBrowserClient } from '../../../../lib/supabase-browser';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type Lesson = {
  id: string;
  title: string;
  slug: string;
  public_id: string;
  description: string | null;
  content: string | null;
  video_url: string | null;
  order_index: number;
  module_id: string;
  lesson_index: number;
};

type ProgressRow = {
  completed: boolean;
  completed_at: string | null;
};

export default function DashboardLessonDetailPage() {
  const routeParams = useParams();
  const slugParam = routeParams?.slug;
  const rawSlug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  const lessonKey = useMemo(() => {
    if (!rawSlug) return rawSlug;
    if (typeof rawSlug !== 'string') return rawSlug;
    try {
      return decodeURIComponent(rawSlug);
    } catch {
      return rawSlug;
    }
  }, [rawSlug]);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = useMemo(() => {
    return getSupabaseBrowserClient(supabaseUrl, supabaseAnonKey);
  }, [supabaseUrl, supabaseAnonKey]);

  const [status, setStatus] = useState<string>('Caricamento...');
  const [busy, setBusy] = useState(false);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [progress, setProgress] = useState<ProgressRow | null>(null);
  const [prevSlug, setPrevSlug] = useState<string | null>(null);
  const [nextSlug, setNextSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!lessonKey) {
      setStatus('Caricamento...');
      return;
    }

    if (!supabase) {
      setStatus('Configurazione mancante: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
      return;
    }

    (async () => {
      setStatus('Carico la lezione...');

      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        setStatus(`Errore sessione: ${sessionError.message}`);
        return;
      }

      if (!sessionData.session) {
        window.location.href = '/welcome';
        return;
      }

      const currentUserId = sessionData.session.user.id;
      setUserId(currentUserId);

      const { data: lessonData, error: lessonError } = await supabase
        .from('lessons')
        .select('id,title,slug,public_id,description,content,video_url,order_index,module_id,lesson_index')
        .or(`public_id.eq.${lessonKey},slug.eq.${lessonKey}`)
        .eq('is_published', true)
        .maybeSingle();

      if (lessonError) {
        setStatus(`Errore lezione: ${lessonError.message}`);
        return;
      }

      if (!lessonData) {
        setStatus('Lezione non trovata.');
        return;
      }

      setLesson(lessonData as Lesson);
      const currentPublicId = (lessonData as any)?.public_id as string | undefined;

      const { data: navLessons, error: navError } = await supabase
        .from('lessons')
        .select('public_id,order_index,lesson_index,module:modules(order_index)')
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (!navError) {
        const rawList = (navLessons as Array<any>) ?? [];
        const list = rawList
          .map((l) => ({
            public_id: l.public_id as string,
            order_index: l.order_index as number,
            lesson_index: l.lesson_index as number | null,
            module_order_index: (l.module?.order_index as number | null) ?? null,
          }))
          .sort((a, b) => {
            if (a.module_order_index != null && b.module_order_index != null) {
              if (a.module_order_index !== b.module_order_index) {
                return a.module_order_index - b.module_order_index;
              }

              if (a.lesson_index != null && b.lesson_index != null) {
                return a.lesson_index - b.lesson_index;
              }
            }

            return a.order_index - b.order_index;
          });

        const idx = currentPublicId ? list.findIndex((l) => l.public_id === currentPublicId) : -1;

        setPrevSlug(idx > 0 ? list[idx - 1]?.public_id ?? null : null);
        setNextSlug(idx >= 0 && idx < list.length - 1 ? list[idx + 1]?.public_id ?? null : null);
      }

      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('completed,completed_at')
        .eq('user_id', currentUserId)
        .eq('lesson_id', (lessonData as any).id)
        .maybeSingle();

      if (progressError) {
        setStatus(`Errore progresso: ${progressError.message}`);
        return;
      }

      setProgress((progressData as ProgressRow) ?? null);
      setStatus('');
    })();
  }, [supabase, lessonKey]);

  async function markCompleted() {
    if (!supabase || !lesson || !userId) return;

    setBusy(true);
    try {
      const now = new Date().toISOString();
      const { error } = await supabase
        .from('user_progress')
        .upsert(
          {
            user_id: userId,
            lesson_id: lesson.id,
            completed: true,
            completed_at: now,
          },
          { onConflict: 'user_id,lesson_id' }
        );

      if (error) {
        setStatus(`Errore salvataggio: ${error.message}`);
        return;
      }

      setProgress({ completed: true, completed_at: now });
      setStatus('Completata!');
    } finally {
      setBusy(false);
    }
  }

  const completed = Boolean(progress?.completed);

  const miniNav = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        marginBottom: 'var(--spacing-l)',
      }}
    >
      {prevSlug ? (
        <Link className="link" href={`/dashboard/lessons/${encodeURIComponent(prevSlug)}`}>
          ← Lezione precedente
        </Link>
      ) : (
        <span className="link" style={{ opacity: 0.4, cursor: 'not-allowed' }}>
          ← Lezione precedente
        </span>
      )}

      <Link className="link" href="/dashboard">
        Tutte le lezioni
      </Link>

      {nextSlug ? (
        <Link className="link" href={`/dashboard/lessons/${encodeURIComponent(nextSlug)}`}>
          Lezione successiva →
        </Link>
      ) : (
        <span className="link" style={{ opacity: 0.4, cursor: 'not-allowed' }}>
          Lezione successiva →
        </span>
      )}
    </div>
  );

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
      {miniNav}

      {status ? <div className="text" style={{ marginBottom: 'var(--spacing-l)' }}>{status}</div> : null}

      {lesson ? (
        <>
          <div className="title" style={{ marginBottom: 'var(--spacing-m)' }}>
            {lesson.order_index}. {lesson.title}
          </div>

          {lesson.description ? (
            <div className="text" style={{ marginBottom: 'var(--spacing-l)', opacity: 0.8 }}>
              {lesson.description}
            </div>
          ) : null}

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginBottom: 'var(--spacing-2xl)' }}>
            {!completed ? (
              <button className="button" type="button" onClick={markCompleted} disabled={busy}>
                Segna come completata
              </button>
            ) : null}
            {progress?.completed_at ? (
              <div className="text" style={{ opacity: 0.8 }}>
                Completata il {new Date(progress.completed_at).toLocaleString()}
              </div>
            ) : null}
          </div>

          {lesson.video_url ? (
            <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
              <iframe
                src={lesson.video_url}
                title={lesson.title}
                style={{ width: '100%', aspectRatio: '16 / 9', border: '1px solid var(--grey-300)' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : null}

          {lesson.content ? (
            <div
              style={{
                border: '1px solid var(--grey-300)',
                backgroundColor: 'var(--white)',
                padding: 'var(--spacing-2xl)',
              }}
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          ) : (
            <div className="text">Contenuto non disponibile.</div>
          )}

          <div style={{ marginTop: 'var(--spacing-2xl)' }}>{miniNav}</div>
        </>
      ) : null}
    </div>
  );
}

'use client';

import '../../../../public/components/link/link.css';

import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type Lesson = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  video_url: string | null;
  order_index: number;
};

type ProgressRow = {
  completed: boolean;
  completed_at: string | null;
};

export default function DashboardLessonDetailPage() {
  const routeParams = useParams();
  const slugParam = routeParams?.slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = useMemo(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      return null;
    }

    return createClient(supabaseUrl, supabaseAnonKey);
  }, [supabaseUrl, supabaseAnonKey]);

  const [status, setStatus] = useState<string>('Caricamento...');
  const [busy, setBusy] = useState(false);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [progress, setProgress] = useState<ProgressRow | null>(null);
  const [prevSlug, setPrevSlug] = useState<string | null>(null);
  const [nextSlug, setNextSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
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
        .select('id,title,slug,description,content,video_url,order_index')
        .eq('slug', slug)
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

      const { data: navLessons, error: navError } = await supabase
        .from('lessons')
        .select('slug,order_index')
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (!navError) {
        const list = (navLessons as Array<{ slug: string; order_index: number }>) ?? [];
        const idx = list.findIndex((l) => l.slug === slug);

        setPrevSlug(idx > 0 ? list[idx - 1]?.slug ?? null : null);
        setNextSlug(idx >= 0 && idx < list.length - 1 ? list[idx + 1]?.slug ?? null : null);
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
  }, [supabase, slug]);

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
        <Link className="link" href={`/dashboard/lessons/${prevSlug}`}>
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
        <Link className="link" href={`/dashboard/lessons/${nextSlug}`}>
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

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginBottom: 'var(--spacing-xxl)' }}>
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
            <div style={{ marginBottom: 'var(--spacing-xxl)' }}>
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
                padding: 'var(--spacing-xxl)',
              }}
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          ) : (
            <div className="text">Contenuto non disponibile.</div>
          )}

          <div style={{ marginTop: 'var(--spacing-xxl)' }}>{miniNav}</div>
        </>
      ) : null}
    </div>
  );
}

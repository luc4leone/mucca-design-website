'use client';

import './lesson-content.css';

import { getSupabaseBrowserClient } from '../../../../lib/supabase-browser';
import Link from 'next/link';
import { use, useEffect, useMemo, useState } from 'react';
import { marked } from 'marked';

type LessonDetail = {
  id: string;
  title: string;
  slug: string;
  public_id: string;
  description: string | null;
  lesson_type?: 'esercizio' | 'intermezzo' | 'milestone' | null;
  skills?: string | null;
  video_url?: string | null;
  content?: string | null;
};

type LessonNavItem = {
  id: string;
  title: string;
  public_id: string;
  module_id: string;
  lesson_index: number;
  order_index: number;
};

export default function DashboardLessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slugParam = resolvedParams?.slug ?? '';

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = useMemo(() => {
    return getSupabaseBrowserClient(supabaseUrl, supabaseAnonKey);
  }, [supabaseUrl, supabaseAnonKey]);

  const [status, setStatus] = useState<string>('Caricamento lezione...');
  const [lesson, setLesson] = useState<LessonDetail | null>(null);
  const [allLessons, setAllLessons] = useState<LessonNavItem[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionBusy, setCompletionBusy] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setStatus('Configurazione mancante: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
      return;
    }

    let cancelled = false;

    (async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        if (!cancelled) setStatus(`Errore sessione: ${sessionError.message}`);
        return;
      }

      if (!sessionData.session) {
        window.location.href = '/welcome';
        return;
      }

      const accessToken = sessionData.session.access_token;
      const userId = sessionData.session.user.id;
      if (!accessToken) {
        if (!cancelled) setStatus('Sessione non valida: manca access_token');
        return;
      }

      const slugOrPublicId = decodeURIComponent(slugParam || '').trim();
      if (!slugOrPublicId) {
        if (!cancelled) setStatus('Lezione non valida.');
        return;
      }

      const byPublicId = await fetch(`/api/dashboard/lessons?public_id=${encodeURIComponent(slugOrPublicId)}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      let res = byPublicId;
      if (byPublicId.status === 404) {
        res = await fetch(`/api/dashboard/lessons?slug=${encodeURIComponent(slugOrPublicId)}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }

      const json = await res.json().catch(() => null);

      if (!res.ok || !json?.ok || !json?.lesson) {
        const message = typeof json?.error === 'string' ? json.error : 'Lezione non trovata';
        if (!cancelled) setStatus(`Errore: ${message}`);
        return;
      }

      const lessonData = json.lesson as LessonDetail;

      const listRes = await fetch('/api/dashboard/lessons', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const listJson = await listRes.json().catch(() => null);
      const lessonsList = listRes.ok && listJson?.ok ? ((listJson.lessons as LessonNavItem[]) ?? []) : [];

      const { data: progressData } = await supabase
        .from('user_progress')
        .select('completed')
        .eq('user_id', userId)
        .eq('lesson_id', lessonData.id)
        .maybeSingle();

      if (!cancelled) {
        setLesson(lessonData);
        setAllLessons(lessonsList);
        setIsCompleted(Boolean(progressData?.completed));
        setStatus('');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [supabase, slugParam]);

  const parsedSkills = lesson?.skills ? (marked.parse(lesson.skills) as string) : '';
  const parsedContent = lesson?.content ? (marked.parse(lesson.content) as string) : '';

  const orderedLessons = useMemo(() => {
    return allLessons.slice().sort((a, b) => {
      if (a.order_index !== b.order_index) return a.order_index - b.order_index;
      return a.lesson_index - b.lesson_index;
    });
  }, [allLessons]);

  const currentLessonIndex = useMemo(() => {
    if (!lesson) return -1;
    return orderedLessons.findIndex((l) => l.id === lesson.id);
  }, [orderedLessons, lesson]);

  const prevLesson = currentLessonIndex > 0 ? orderedLessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex >= 0 && currentLessonIndex < orderedLessons.length - 1
      ? orderedLessons[currentLessonIndex + 1]
      : null;

  async function toggleCompletion() {
    if (!supabase || !lesson) return;

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData.session?.user?.id) {
      setStatus('Sessione non valida. Ricarica la pagina.');
      return;
    }

    setCompletionBusy(true);
    const nextCompleted = !isCompleted;

    const { error } = await supabase.from('user_progress').upsert(
      {
        user_id: sessionData.session.user.id,
        lesson_id: lesson.id,
        completed: nextCompleted,
        completed_at: nextCompleted ? new Date().toISOString() : null,
      },
      {
        onConflict: 'user_id,lesson_id',
      },
    );

    if (error) {
      setStatus(`Errore: ${error.message}`);
      setCompletionBusy(false);
      return;
    }

    setIsCompleted(nextCompleted);
    setCompletionBusy(false);
  }

  const navBlock = (
    <div
      style={{
        border: '1px solid var(--grey-300)',
        backgroundColor: 'var(--grey-100)',
        padding: '12px',
        marginBottom: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '12px',
        flexWrap: 'wrap',
      }}
    >
      <div className="text">
        {prevLesson ? (
          <Link href={`/dashboard/lessons/${encodeURIComponent(prevLesson.public_id)}`} className="link">
            ← {prevLesson.title}
          </Link>
        ) : (
          <span style={{ opacity: 0.6 }}>← Nessuna lezione precedente</span>
        )}
      </div>
      <div className="text" style={{ textAlign: 'right' }}>
        {nextLesson ? (
          <Link href={`/dashboard/lessons/${encodeURIComponent(nextLesson.public_id)}`} className="link">
            {nextLesson.title} →
          </Link>
        ) : (
          <span style={{ opacity: 0.6 }}>Nessuna lezione successiva →</span>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
      <nav style={{ marginBottom: '16px' }}>
        <Link href="/dashboard" className="link">
          ← Torna alla dashboard
        </Link>
      </nav>

      {status ? <div className="text">{status}</div> : null}

      {lesson ? (
        <article>
          {navBlock}

          <h1 className="title" style={{ marginBottom: '8px' }}>
            {lesson.title}
          </h1>

          <div className="text" style={{ opacity: 0.8, marginBottom: '16px' }}>
            {lesson.lesson_type ?? 'esercizio'}
          </div>

          {lesson.description ? (
            <p className="text" style={{ marginBottom: '16px' }}>
              {lesson.description}
            </p>
          ) : null}

          {parsedSkills ? (
            <section style={{ marginBottom: '16px' }}>
              <h2 className="title title--sm" style={{ marginBottom: '8px' }}>
                Skills
              </h2>
              <div className="text lesson-markdown" dangerouslySetInnerHTML={{ __html: parsedSkills }} />
            </section>
          ) : null}

          {lesson.video_url ? (
            <div
              style={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%',
                marginBottom: '16px',
                border: '1px solid var(--grey-300)',
              }}
            >
              <iframe
                src={lesson.video_url}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </div>
          ) : null}

          {parsedContent ? <div className="lesson-markdown" dangerouslySetInnerHTML={{ __html: parsedContent }} /> : null}

          <div
            style={{
              border: '1px solid var(--grey-300)',
              backgroundColor: 'var(--grey-100)',
              padding: '12px',
              marginTop: '16px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <div className="text">{isCompleted ? 'Lezione completata ✓' : 'Segna questa lezione come completata'}</div>
            <button
              type="button"
              className="button"
              onClick={() => {
                void toggleCompletion();
              }}
              disabled={completionBusy}
              aria-busy={completionBusy}
            >
              {completionBusy ? 'Salvo...' : isCompleted ? 'Segna come non completata' : 'Completa lezione'}
            </button>
          </div>

          {navBlock}
        </article>
      ) : null}
    </div>
  );
}

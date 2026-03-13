'use client';

import './lesson-content.css';

import { getSupabaseBrowserClient } from '../../../../lib/supabase-browser';
import Link from 'next/link';
import { use, useEffect, useMemo, useState } from 'react';

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

function parseTimeToSeconds(input: string) {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (/^\d+$/.test(trimmed)) return Number(trimmed);

  let total = 0;
  const matchAll = trimmed.matchAll(/(\d+)(h|m|s)/gi);
  let matched = false;
  for (const m of matchAll) {
    matched = true;
    const value = Number(m[1]);
    const unit = String(m[2]).toLowerCase();
    if (!Number.isFinite(value)) continue;
    if (unit === 'h') total += value * 3600;
    if (unit === 'm') total += value * 60;
    if (unit === 's') total += value;
  }

  return matched ? total : null;
}

function getEmbeddableVideoUrl(input: string | null | undefined) {
  const raw = typeof input === 'string' ? input.trim() : '';
  if (!raw) return null;

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;

  const host = url.hostname.replace(/^www\./i, '').toLowerCase();
  const isYouTube = host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtu.be' || host === 'youtube-nocookie.com';
  if (!isYouTube) return raw;

  const startParam = url.searchParams.get('start') || url.searchParams.get('t') || '';
  const startSeconds = startParam ? parseTimeToSeconds(startParam) : null;

  const list = url.searchParams.get('list')?.trim() ?? '';
  let videoId = '';

  if (host === 'youtu.be') {
    videoId = url.pathname.split('/').filter(Boolean)[0] ?? '';
  } else if (url.pathname === '/watch') {
    videoId = url.searchParams.get('v')?.trim() ?? '';
  } else if (url.pathname.startsWith('/shorts/')) {
    videoId = url.pathname.split('/').filter(Boolean)[1] ?? '';
  } else if (url.pathname.startsWith('/live/')) {
    videoId = url.pathname.split('/').filter(Boolean)[1] ?? '';
  } else if (url.pathname.startsWith('/embed/')) {
    videoId = url.pathname.split('/').filter(Boolean)[1] ?? '';
  }

  if (!videoId && list && (url.pathname === '/playlist' || url.pathname === '/watch')) {
    const embed = new URL('https://www.youtube-nocookie.com/embed/videoseries');
    embed.searchParams.set('list', list);
    if (typeof startSeconds === 'number' && startSeconds > 0) embed.searchParams.set('start', String(startSeconds));
    return embed.toString();
  }

  if (!videoId) return null;

  const embed = new URL(`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`);
  if (list) embed.searchParams.set('list', list);
  if (typeof startSeconds === 'number' && startSeconds > 0) embed.searchParams.set('start', String(startSeconds));
  return embed.toString();
}

export default function DashboardLessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slugParam = resolvedParams?.slug ?? '';

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = useMemo(() => {
    return getSupabaseBrowserClient(supabaseUrl, supabaseAnonKey);
  }, [supabaseUrl, supabaseAnonKey]);

  const [status, setStatus] = useState<string>('');
  const [lesson, setLesson] = useState<LessonDetail | null>(null);
  const [allLessons, setAllLessons] = useState<LessonNavItem[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionBusy, setCompletionBusy] = useState(false);
  const [skillsHtml, setSkillsHtml] = useState('');
  const [contentHtml, setContentHtml] = useState('');

  useEffect(() => {
    if (!supabase) {
      setStatus('Configurazione mancante: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
      return;
    }

    let cancelled = false;

    const slugOrPublicId = decodeURIComponent(slugParam || '').trim();
    const lessonCacheKey = slugOrPublicId ? `mucca_lesson_cache:${slugOrPublicId}` : '';

    let hasFreshCache = false;
    if (lessonCacheKey) {
      try {
        const cachedRaw = sessionStorage.getItem(lessonCacheKey);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw) as {
            storedAtMs?: number;
            lesson?: LessonDetail;
            completed?: boolean;
          };
          const storedAtMs = typeof cached?.storedAtMs === 'number' ? cached.storedAtMs : 0;
          const isFresh = storedAtMs > 0 && Date.now() - storedAtMs < 10 * 60 * 1000;
          if (isFresh && cached.lesson) {
            hasFreshCache = true;
            setStatus('');
            setLesson(cached.lesson);
            setIsCompleted(Boolean(cached.completed));

            void (async () => {
              try {
                const { marked } = await import('marked');
                if (cancelled) return;
                const nextSkills = cached.lesson?.skills ? (marked.parse(cached.lesson.skills) as string) : '';
                const nextContent = cached.lesson?.content ? (marked.parse(cached.lesson.content) as string) : '';
                if (!cancelled) {
                  setSkillsHtml(nextSkills);
                  setContentHtml(nextContent);
                }
              } catch {
                if (!cancelled) {
                  setSkillsHtml('');
                  setContentHtml('');
                }
              }
            })();
          }
        }
      } catch {
        // ignore
      }
    }

    setStatus('');
    if (!hasFreshCache) {
      setLesson(null);
      setSkillsHtml('');
      setContentHtml('');
    }

    (async () => {
      let accessToken = '';
      try {
        const cachedToken = sessionStorage.getItem('mucca_access_token') ?? '';
        const cachedExp = Number(sessionStorage.getItem('mucca_access_token_exp') ?? 0);
        const nowSec = Math.floor(Date.now() / 1000);
        if (cachedToken && Number.isFinite(cachedExp) && cachedExp > nowSec + 15) {
          accessToken = cachedToken;
        }
      } catch {
        // ignore
      }

      if (!accessToken) {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          if (!cancelled) setStatus(`Errore sessione: ${sessionError.message}`);
          return;
        }

        if (!sessionData.session) {
          window.location.href = '/welcome';
          return;
        }

        accessToken = sessionData.session.access_token;
        if (!accessToken) {
          if (!cancelled) setStatus('Sessione non valida: manca access_token');
          return;
        }

        try {
          const exp = typeof (sessionData.session as any)?.expires_at === 'number' ? (sessionData.session as any).expires_at : 0;
          sessionStorage.setItem('mucca_access_token', accessToken);
          if (exp) sessionStorage.setItem('mucca_access_token_exp', String(exp));
        } catch {
          // ignore
        }
      }

      if (!slugOrPublicId) {
        if (!cancelled) setStatus('Lezione non valida.');
        return;
      }

      const lessonRes = await fetch(`/api/dashboard/lessons?q=${encodeURIComponent(slugOrPublicId)}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const lessonJson = await lessonRes.json().catch(() => null);

      if (!lessonRes.ok || !lessonJson?.ok || !lessonJson?.lesson) {
        const message = typeof lessonJson?.error === 'string' ? lessonJson.error : 'Lezione non trovata';
        if (!cancelled) setStatus(`Errore: ${message}`);
        return;
      }

      const lessonData = lessonJson.lesson as LessonDetail;
      const completed = Boolean(lessonJson.completed);

      if (!cancelled) {
        setLesson(lessonData);
        setIsCompleted(completed);
        setStatus('');
      }

      try {
        sessionStorage.setItem(
          lessonCacheKey,
          JSON.stringify({ storedAtMs: Date.now(), lesson: lessonData, completed }),
        );
      } catch {
        // ignore
      }

      void (async () => {
        try {
          const { marked } = await import('marked');
          if (cancelled) return;
          const nextSkills = lessonData.skills ? (marked.parse(lessonData.skills) as string) : '';
          const nextContent = lessonData.content ? (marked.parse(lessonData.content) as string) : '';
          if (!cancelled) {
            setSkillsHtml(nextSkills);
            setContentHtml(nextContent);
          }
        } catch {
          if (!cancelled) {
            setSkillsHtml('');
            setContentHtml('');
          }
        }
      })();

      void (async () => {
        const listRes = await fetch('/api/dashboard/lessons?summary=0', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const listJson = await listRes.json().catch(() => null);
        const lessonsList = listRes.ok && listJson?.ok ? ((listJson.lessons as LessonNavItem[]) ?? []) : [];
        if (!cancelled) {
          setAllLessons(lessonsList);
        }
      })();
    })();

    return () => {
      cancelled = true;
    };
  }, [supabase, slugParam]);

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

  const videoSrc = useMemo(() => {
    return getEmbeddableVideoUrl(lesson?.video_url ?? null);
  }, [lesson?.video_url]);

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

          {skillsHtml ? (
            <section style={{ marginBottom: '16px' }}>
              <h2 className="title title--sm" style={{ marginBottom: '8px' }}>
                Skills
              </h2>
              <div className="text lesson-markdown" dangerouslySetInnerHTML={{ __html: skillsHtml }} />
            </section>
          ) : null}

          {lesson.video_url && !videoSrc ? (
            <div className="text" style={{ marginBottom: '16px' }}>
              <a className="link" href={lesson.video_url} target="_blank" rel="noreferrer">
                Apri video
              </a>
            </div>
          ) : null}

          {videoSrc ? (
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
                src={videoSrc}
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

          {contentHtml ? <div className="lesson-markdown" dangerouslySetInnerHTML={{ __html: contentHtml }} /> : null}

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

'use client';

import { getSupabaseBrowserClient } from '../../lib/supabase-browser';
import { marked } from 'marked';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

type ModuleRow = {
  id: string;
  title: string;
  order_index: number;
  access_level: 'free' | 'paid';
};

type ModuleMilestoneRow = {
  module_id: string;
  title: string;
  description: string | null;
};

type ModuleMilestoneProgressRow = {
  module_id: string;
  status: 'not_submitted' | 'submitted' | 'passed' | 'failed';
};

type Lesson = {
  id: string;
  title: string;
  public_id: string;
  description: string | null;
  skills?: string | null;
  lesson_type?: 'esercizio' | 'intermezzo' | 'milestone' | null;
  module_id: string;
  lesson_index: number;
  order_index: number;
};

type UserProgressRow = {
  lesson_id: string;
  completed: boolean;
};

type LessonMeta = {
  id: string;
  title: string;
  public_id: string;
  description: string | null;
  skills?: string | null;
  lesson_type?: 'esercizio' | 'intermezzo' | 'milestone' | null;
  module_id: string;
  lesson_index: number;
  order_index: number;
};

type LessonsSummary = {
  total_lessons: number;
  total_modules: number;
};

export default function DashboardPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = useMemo(() => {
    return getSupabaseBrowserClient(supabaseUrl, supabaseAnonKey);
  }, [supabaseUrl, supabaseAnonKey]);

  const [status, setStatus] = useState<string>('Caricamento...');
  const [modules, setModules] = useState<ModuleRow[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lessonsSummary, setLessonsSummary] = useState<LessonsSummary | null>(null);
  const [selectedModuleId, setSelectedModuleId] = useState<string>('');
  const [authedEmail, setAuthedEmail] = useState<string | null>(null);
  const [completionByLessonId, setCompletionByLessonId] = useState<Record<string, boolean>>({});
  const [accessByModuleId, setAccessByModuleId] = useState<Record<string, boolean>>({});
  const accessByModuleIdRef = useRef<Record<string, boolean>>({});
  const [milestoneByModuleId, setMilestoneByModuleId] = useState<Record<string, ModuleMilestoneRow>>({});
  const [milestoneProgressByModuleId, setMilestoneProgressByModuleId] = useState<Record<string, ModuleMilestoneProgressRow>>({});

  function formatMilestoneStatus(statusValue: ModuleMilestoneProgressRow['status']) {
    if (statusValue === 'passed') return 'superata';
    if (statusValue === 'submitted') return 'in revisione';
    if (statusValue === 'failed') return 'non superata';
    return 'non inviata';
  }

  useEffect(() => {
    if (!supabase) {
      setStatus('Configurazione mancante: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
      return;
    }

    const supabaseClient = supabase;

    let cancelled = false;
    let channel: ReturnType<typeof supabaseClient.channel> | null = null;

    async function loadCompletion(userId: string) {
      const { data, error } = await supabaseClient
        .from('user_progress')
        .select('lesson_id,completed')
        .eq('user_id', userId)
        .eq('completed', true);

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

    async function loadLessonsMeta(accessToken: string) {
      const res = await fetch('/api/dashboard/lessons', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        const message = typeof json?.error === 'string' ? json.error : 'Impossibile caricare le lezioni.';
        throw new Error(message);
      }

      return {
        lessons: ((json.lessons as LessonMeta[]) ?? []) as LessonMeta[],
        summary: (json.summary as LessonsSummary | undefined) ?? null,
      };
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

      const accessToken = sessionData.session.access_token;
      if (!accessToken) {
        setStatus('Sessione non valida: manca access_token');
        return;
      }

      setStatus('Carico i moduli...');
      const [{ data: modulesData, error: modulesError }, { data: milestonesData, error: milestonesError }, { data: milestoneProgressData, error: milestoneProgressError }] =
        await Promise.all([
          supabaseClient
            .from('modules')
            .select('id,title,order_index,access_level')
            .eq('is_published', true)
            .order('order_index', { ascending: true }),
          supabaseClient.from('module_milestones').select('module_id,title,description'),
          supabaseClient.from('module_milestone_progress').select('module_id,status'),
        ]);

      if (modulesError) {
        setStatus(`Errore moduli: ${modulesError.message}`);
        return;
      }

      if (milestonesError) {
        setStatus(`Errore milestone: ${milestonesError.message}`);
        return;
      }

      if (milestoneProgressError) {
        setStatus(`Errore progresso milestone: ${milestoneProgressError.message}`);
        return;
      }

      const moduleList = (modulesData as ModuleRow[]) ?? [];
      setModules(moduleList);

      const milestoneMap: Record<string, ModuleMilestoneRow> = {};
      ((milestonesData as ModuleMilestoneRow[]) ?? []).forEach((m) => {
        milestoneMap[m.module_id] = m;
      });
      setMilestoneByModuleId(milestoneMap);

      const milestoneProgressMap: Record<string, ModuleMilestoneProgressRow> = {};
      ((milestoneProgressData as ModuleMilestoneProgressRow[]) ?? []).forEach((row) => {
        milestoneProgressMap[row.module_id] = row;
      });
      setMilestoneProgressByModuleId(milestoneProgressMap);

      const accessPairs = await Promise.all(
        moduleList.map(async (m) => {
          const { data, error } = await supabaseClient.rpc('can_access_module', {
            p_module_id: m.id,
          });

          if (error) {
            return [m.id, false] as const;
          }

          return [m.id, Boolean(data)] as const;
        }),
      );

      const accessMap: Record<string, boolean> = {};
      accessPairs.forEach(([id, canAccess]) => {
        accessMap[id] = canAccess;
      });
      setAccessByModuleId(accessMap);
      accessByModuleIdRef.current = accessMap;

      setStatus('Carico le lezioni...');
      let lessonsMeta: LessonMeta[] = [];
      try {
        const res = await loadLessonsMeta(accessToken);
        lessonsMeta = res.lessons;
        setLessonsSummary(res.summary);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setStatus(`Errore lezioni: ${message}`);
        return;
      }

      const missingLessonType = lessonsMeta.some((l) => !l.lesson_type);
      if (missingLessonType) {
        const lessonIds = lessonsMeta.map((l) => l.id).filter(Boolean);
        if (lessonIds.length) {
          const { data: lessonTypesData, error: lessonTypesError } = await supabaseClient
            .from('lessons')
            .select('id,lesson_type')
            .in('id', lessonIds);

          if (!lessonTypesError) {
            const lessonTypeById: Record<string, Lesson['lesson_type']> = {};
            ((lessonTypesData as Array<{ id: string; lesson_type: Lesson['lesson_type'] }> | null) ?? []).forEach(
              (row) => {
                lessonTypeById[row.id] = row.lesson_type ?? null;
              },
            );

            lessonsMeta = lessonsMeta.map((lesson) => ({
              ...lesson,
              lesson_type: lesson.lesson_type ?? lessonTypeById[lesson.id] ?? null,
            }));
          }
        }
      }

      setLessons((lessonsMeta as Lesson[]) ?? []);
      await loadCompletion(userId);
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
            await loadCompletion(userId);
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

  const lessonsByModuleId = useMemo(() => {
    const map: Record<string, Lesson[]> = {};
    lessons.forEach((l) => {
      if (!map[l.module_id]) {
        map[l.module_id] = [];
      }
      map[l.module_id].push(l);
    });

    Object.keys(map).forEach((moduleId) => {
      map[moduleId] = map[moduleId].slice().sort((a, b) => {
        if (a.lesson_index !== b.lesson_index) {
          return a.lesson_index - b.lesson_index;
        }
        return a.order_index - b.order_index;
      });
    });

    return map;
  }, [lessons]);

  const selectedModuleIndex = useMemo(() => {
    return modules.findIndex((m) => m.id === selectedModuleId);
  }, [modules, selectedModuleId]);

  const selectedModule = useMemo(() => {
    return modules.find((m) => m.id === selectedModuleId) ?? null;
  }, [modules, selectedModuleId]);

  useEffect(() => {
    if (selectedModuleId) return;
    if (!modules.length) return;
    setSelectedModuleId(modules[0]?.id ?? '');
  }, [modules, selectedModuleId]);

  const progressStats = useMemo(() => {
    const totalModules = lessonsSummary?.total_modules ?? modules.length;
    const unlockedModules = modules.filter((m) => Boolean(accessByModuleId[m.id]));
    const unlockedModulesCount = unlockedModules.length;

    const publishedLessonIds = lessons.map((l) => l.id);
    const totalLessons = lessonsSummary?.total_lessons ?? publishedLessonIds.length;
    const completedLessons = publishedLessonIds.reduce((acc, id) => acc + (completionByLessonId[id] ? 1 : 0), 0);

    const unlockedLessons = lessons.filter((l) => Boolean(accessByModuleId[l.module_id]));
    const completedUnlockedLessons = unlockedLessons.reduce((acc, l) => acc + (completionByLessonId[l.id] ? 1 : 0), 0);
    const totalUnlockedLessons = unlockedLessons.length;

    const completedUnlockedModules = unlockedModules.reduce((acc, m) => {
      const moduleLessons = lessonsByModuleId[m.id] ?? [];
      if (!moduleLessons.length) return acc;
      const allDone = moduleLessons.every((l) => Boolean(completionByLessonId[l.id]));
      return acc + (allDone ? 1 : 0);
    }, 0);

    const percentage = totalLessons ? (completedLessons / totalLessons) * 100 : 0;

    return {
      totalModules,
      unlockedModulesCount,
      completedUnlockedModules,
      totalUnlockedLessons,
      completedUnlockedLessons,
      totalLessons,
      completedLessons,
      percentage,
    };
  }, [modules, lessons, lessonsSummary, accessByModuleId, completionByLessonId, lessonsByModuleId]);

  const progressPercentage = Number.isFinite(progressStats.percentage)
    ? Math.max(0, Math.min(100, progressStats.percentage))
    : 0;
  const progressLabelPercentage = Math.round(progressPercentage);

  function renderLessonSkills(rawSkills: string | null | undefined) {
    if (!rawSkills?.trim()) return null;

    const html = marked.parse(rawSkills);

    return (
      <div
        className="text lesson-skills-markdown"
        style={{ opacity: 0.8, marginTop: '6px' }}
        dangerouslySetInnerHTML={{ __html: html as string }}
      />
    );
  }

  return (
    <div
      style={{
        maxWidth: '1080px',
        margin: '0 auto',
        padding: '0 20px',
      }}
    >
      <style jsx global>{`
        .lesson-skills-markdown ul,
        .lesson-skills-markdown ol {
          margin-top: 0;
        }

        .lesson-skills-markdown h4 {
          margin-bottom: 0;
        }

        .dashboard-lesson-card {
          transition: background-color 120ms ease;
        }

        .dashboard-lesson-card:hover {
          background-color: var(--grey-200) !important;
        }

        .dashboard-module-card {
          transition: background-color 120ms ease;
        }

        .dashboard-module-card:hover {
          background-color: var(--grey-200) !important;
        }

      `}</style>

      {status ? <div className="text" style={{ marginBottom: 'var(--spacing-l)' }}>{status}</div> : null}

      {modules.length ? (
        <div
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'start',
          }}
        >
          <div style={{ flex: 1, display: 'grid', gap: '12px', alignContent: 'start' }}>
            <div style={{ minHeight: '56px', paddingTop: '16px' }}>
              <details>
                <summary className="link" style={{ cursor: 'pointer' }}>
                Vuoi accedere a tutti i moduli?
                </summary>

                <p
                  className="text"
                  style={{
                    margin: '8px 0 0',
                    maxWidth: '42ch',
                    fontSize: 'var(--font-size-sm)',
                    lineHeight: 'var(--line-height-normal)',
                  }}
                >
                  Per accedere ai moduli successivi al primo devi{' '}
                  <Link
                    href="/pricing"
                    className="link"
                    style={{
                      fontFamily: 'var(--font-family-serif)',
                      fontSize: 'var(--font-size-sm)',
                    }}
                  >
                    sottoscrivere un abbonamento mensile
                  </Link>
                  .
                </p>
              </details>
            </div>

            <div
              style={{
                border: '1px solid var(--grey-300)',
                padding: '16px',
              }}
            >
              <div className="title title--md" style={{ marginBottom: '12px' }}>
                Moduli
              </div>

              <div style={{ display: 'grid', gap: '10px' }}>
                {modules.map((m) => {
                  const active = m.id === selectedModuleId;
                  const canAccess = Boolean(accessByModuleId[m.id]);
                  const moduleLessons = lessonsByModuleId[m.id] ?? [];
                  const isCompleted =
                    moduleLessons.length > 0 && moduleLessons.every((l) => Boolean(completionByLessonId[l.id]));
                  const backgroundColor = !canAccess ? 'var(--white)' : isCompleted ? '#dcfce7' : 'var(--white)';

                  return (
                    <button
                      key={m.id}
                      className="dashboard-module-card"
                      type="button"
                      onClick={() => setSelectedModuleId(m.id)}
                      style={{
                        border: active ? '4px solid var(--grey-900)' : '1px solid var(--grey-300)',
                        backgroundColor,
                        padding: '12px',
                        textAlign: 'left',
                        cursor: 'pointer',
                      }}
                    >
                      <div
                        className="text"
                        style={{
                          opacity: 0.8,
                          marginBottom: '6px',
                          fontSize: 'var(--font-size-sm)',
                          display: 'flex',
                          gap: '8px',
                          flexWrap: 'wrap',
                        }}
                      >
                        {canAccess ? (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              padding: '2px 10px',
                              borderRadius: '999px',
                              border: '1px solid var(--grey-500)',
                              backgroundColor: 'transparent',
                              color: 'var(--grey-900)',
                              fontFamily:
                                'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                              fontSize: '14px',
                              lineHeight: 1.2,
                            }}
                          >
                            sbloccato
                          </span>
                        ) : (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              padding: '2px 10px',
                              borderRadius: '999px',
                              border: '1px solid #ef4444',
                              backgroundColor: '#fee2e2',
                              color: '#991b1b',
                              fontFamily:
                                'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                              fontSize: '14px',
                              lineHeight: 1.2,
                            }}
                          >
                            bloccato
                          </span>
                        )}

                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '2px 10px',
                            borderRadius: '999px',
                            border: '1px solid var(--grey-500)',
                            backgroundColor: 'var(--grey-200)',
                            color: 'var(--grey-900)',
                            fontFamily:
                              'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                            fontSize: '14px',
                            lineHeight: 1.2,
                          }}
                        >
                          {moduleLessons.length} lezioni
                        </span>
                      </div>

                      <div className="link" style={{ color: 'inherit' }}>
                        {m.title}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ flex: 2, display: 'grid', gap: '12px', alignContent: 'start' }}>
            <div
              style={{
                minHeight: '56px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                justifySelf: 'start',
                width: '100%',
              }}
            >
              <div className="text" style={{ marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-sm)' }}>
                Lezioni: {progressStats.completedLessons} di {progressStats.totalLessons} completate ~{progressLabelPercentage}%
              </div>
              <div
                style={{
                  width: '100%',
                  height: '8px',
                  border: '1px solid var(--grey-300)',
                  backgroundColor: 'var(--grey-100, #f3f4f6)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${progressPercentage}%`,
                    height: '100%',
                    backgroundColor: 'var(--grey-900)',
                  }}
                />
              </div>
            </div>

            <div
              style={{
                border: '1px solid var(--grey-300)',
                padding: '16px',
              }}
            >
            {selectedModule ? (
            (() => {
              const m = selectedModule;
              const canAccess = Boolean(accessByModuleId[m.id]);
              const moduleLessons = lessonsByModuleId[m.id] ?? [];
              const milestone = milestoneByModuleId[m.id];
              const milestoneProgress = milestoneProgressByModuleId[m.id];
              const prevModule = selectedModuleIndex > 0 ? modules[selectedModuleIndex - 1] : null;
              const prevMilestone = prevModule ? milestoneByModuleId[prevModule.id] : null;
              const prevMilestoneProgress = prevModule ? milestoneProgressByModuleId[prevModule.id] : null;
              const prevPassed = prevMilestoneProgress?.status === 'passed';

              return (
                <div>
                  <div className="title title--md" style={{ marginBottom: '6px' }}>
                    {m.title}
                  </div>

                  {milestone ? (
                    <div style={{ marginBottom: '12px' }}>
                      <div className="text" style={{ opacity: 0.8 }}>
                        milestone: {milestone.title}
                        {milestoneProgress ? ` · ${formatMilestoneStatus(milestoneProgress.status)}` : ''}
                      </div>
                      {milestone.description ? <div className="text">{milestone.description}</div> : null}
                    </div>
                  ) : null}

                  {!canAccess ? (
                    <div className="text">
                      {m.access_level === 'paid' ? <div>Bloccato: serve un abbonamento attivo.</div> : null}

                      <div style={{ opacity: 0.8, marginTop: m.access_level === 'paid' ? '6px' : undefined }}>
                        Le lezioni sono visibili, ma disabilitate finché il modulo è bloccato.
                      </div>

                      {prevModule && !prevPassed ? (
                        <>
                          <div style={{ marginTop: m.access_level === 'paid' ? '6px' : undefined }}>
                            Bloccato: serve la milestone del modulo precedente.
                          </div>
                          {prevMilestone ? (
                            <div style={{ opacity: 0.8, marginTop: '6px' }}>
                              {prevModule.title} · milestone: {prevMilestone.title}
                              {prevMilestoneProgress ? ` · ${formatMilestoneStatus(prevMilestoneProgress.status)}` : ' · non inviata'}
                            </div>
                          ) : (
                            <div style={{ opacity: 0.8, marginTop: '6px' }}>{prevModule.title}</div>
                          )}
                        </>
                      ) : null}

                      {m.access_level !== 'paid' && !prevModule ? 'Bloccato.' : null}

                      {moduleLessons.length ? (
                        <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
                          {moduleLessons.map((l) => (
                            <div
                              key={l.id}
                              style={{
                                border: '1px solid var(--grey-300)',
                                padding: '12px',
                                opacity: 0.5,
                                cursor: 'not-allowed',
                              }}
                              aria-disabled={true}
                            >
                              <div className="text" style={{ opacity: 0.8, marginBottom: '6px' }}>
                                Bloccata
                              </div>
                              <div className="link link--large" style={{ marginBottom: '6px' }}>
                                {l.title}
                              </div>
                              {l.description ? <div className="text">{l.description}</div> : null}
                              {renderLessonSkills(l.skills)}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text" style={{ marginTop: '12px' }}>
                          Nessuna lezione disponibile.
                        </div>
                      )}
                    </div>
                  ) : moduleLessons.length ? (
                    <div style={{ display: 'grid', gap: '10px' }}>
                      {moduleLessons.map((l) => (
                        <Link
                          key={l.id}
                          href={`/dashboard/lessons/${encodeURIComponent(l.public_id)}`}
                          style={{
                            color: 'inherit',
                            textDecoration: 'none',
                          }}
                        >
                          <div
                            className="dashboard-lesson-card"
                            style={{
                              border: '1px solid var(--grey-300)',
                              backgroundColor: 'var(--white)',
                              padding: '12px',
                            }}
                          >
                            <div style={{ marginBottom: '6px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                              {completionByLessonId[l.id] ? (
                                <span
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    padding: '2px 10px',
                                    borderRadius: '999px',
                                    border: '1px solid #4ade80',
                                    backgroundColor: '#dcfce7',
                                    color: 'var(--green-700)',
                                    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                                    fontSize: '14px',
                                    lineHeight: 1.2,
                                  }}
                                >
                                  completata
                                </span>
                              ) : (
                                <span
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    padding: '2px 10px',
                                    borderRadius: '999px',
                                    border: '1px solid var(--grey-500)',
                                    backgroundColor: 'transparent',
                                    color: 'var(--grey-900)',
                                    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                                    fontSize: '14px',
                                    lineHeight: 1.2,
                                  }}
                                >
                                  da completare
                                </span>
                              )}

                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  padding: '2px 10px',
                                  borderRadius: '999px',
                                  border: '1px solid var(--grey-500)',
                                  backgroundColor: 'var(--grey-300)',
                                  color: 'var(--grey-900)',
                                  fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                                  fontSize: '14px',
                                  lineHeight: 1.2,
                                }}
                              >
                                {l.lesson_type ?? 'esercizio'}
                              </span>
                            </div>
                            <div className="link link--large" style={{ marginBottom: '6px' }}>
                              {l.title}
                            </div>
                            {l.description ? <div className="text">{l.description}</div> : null}
                            {renderLessonSkills(l.skills)}
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text">Nessuna lezione disponibile.</div>
                  )}
                </div>
              );
            })()
            ) : (
              <div className="text">Seleziona un modulo.</div>
            )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text">Nessun modulo.</div>
      )}
    </div>
  );
}

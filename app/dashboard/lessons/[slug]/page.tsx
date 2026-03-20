"use client";

import "./lesson-content.css";
import styles from "./page.module.css";

import { getSupabaseBrowserClient } from "../../../../lib/supabase-browser";
import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";

type LessonDetail = {
  id: string;
  title: string;
  slug: string;
  public_id: string;
  module_id: string;
  description: string | null;
  lesson_type?: "esercizio" | "intermezzo" | "milestone" | null;
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
    if (unit === "h") total += value * 3600;
    if (unit === "m") total += value * 60;
    if (unit === "s") total += value;
  }

  return matched ? total : null;
}

function getEmbeddableVideoUrl(input: string | null | undefined) {
  const raw = typeof input === "string" ? input.trim() : "";
  if (!raw) return null;

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") return null;

  const host = url.hostname.replace(/^www\./i, "").toLowerCase();
  const isYouTube =
    host === "youtube.com" ||
    host === "m.youtube.com" ||
    host === "youtu.be" ||
    host === "youtube-nocookie.com";
  if (!isYouTube) return raw;

  const startParam =
    url.searchParams.get("start") || url.searchParams.get("t") || "";
  const startSeconds = startParam ? parseTimeToSeconds(startParam) : null;

  const list = url.searchParams.get("list")?.trim() ?? "";
  let videoId = "";

  if (host === "youtu.be") {
    videoId = url.pathname.split("/").filter(Boolean)[0] ?? "";
  } else if (url.pathname === "/watch") {
    videoId = url.searchParams.get("v")?.trim() ?? "";
  } else if (url.pathname.startsWith("/shorts/")) {
    videoId = url.pathname.split("/").filter(Boolean)[1] ?? "";
  } else if (url.pathname.startsWith("/live/")) {
    videoId = url.pathname.split("/").filter(Boolean)[1] ?? "";
  } else if (url.pathname.startsWith("/embed/")) {
    videoId = url.pathname.split("/").filter(Boolean)[1] ?? "";
  }

  if (
    !videoId &&
    list &&
    (url.pathname === "/playlist" || url.pathname === "/watch")
  ) {
    const embed = new URL("https://www.youtube-nocookie.com/embed/videoseries");
    embed.searchParams.set("list", list);
    if (typeof startSeconds === "number" && startSeconds > 0)
      embed.searchParams.set("start", String(startSeconds));
    return embed.toString();
  }

  if (!videoId) return null;

  const embed = new URL(
    `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`,
  );
  if (list) embed.searchParams.set("list", list);
  if (typeof startSeconds === "number" && startSeconds > 0)
    embed.searchParams.set("start", String(startSeconds));
  return embed.toString();
}

export default function DashboardLessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slugParam = resolvedParams?.slug ?? "";

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = useMemo(() => {
    return getSupabaseBrowserClient(supabaseUrl, supabaseAnonKey);
  }, [supabaseUrl, supabaseAnonKey]);

  const [status, setStatus] = useState<string>("");
  const [lesson, setLesson] = useState<LessonDetail | null>(null);
  const [allLessons, setAllLessons] = useState<LessonNavItem[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionBusy, setCompletionBusy] = useState(false);
  const [skillsHtml, setSkillsHtml] = useState("");
  const [contentHtml, setContentHtml] = useState("");

  useEffect(() => {
    if (!supabase) {
      setStatus(
        "Configurazione mancante: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY",
      );
      return;
    }

    let cancelled = false;

    const slugOrPublicId = decodeURIComponent(slugParam || "").trim();
    const lessonCacheKey = slugOrPublicId
      ? `mucca_lesson_cache:${slugOrPublicId}`
      : "";

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
          const storedAtMs =
            typeof cached?.storedAtMs === "number" ? cached.storedAtMs : 0;
          const isFresh =
            storedAtMs > 0 && Date.now() - storedAtMs < 10 * 60 * 1000;
          if (isFresh && cached.lesson) {
            hasFreshCache = true;
            setStatus("");
            setLesson(cached.lesson);
            setIsCompleted(Boolean(cached.completed));

            void (async () => {
              try {
                const { marked } = await import("marked");
                if (cancelled) return;
                const nextSkills = cached.lesson?.skills
                  ? (marked.parse(cached.lesson.skills) as string)
                  : "";
                const nextContent = cached.lesson?.content
                  ? (marked.parse(cached.lesson.content) as string)
                  : "";
                if (!cancelled) {
                  setSkillsHtml(nextSkills);
                  setContentHtml(nextContent);
                }
              } catch {
                if (!cancelled) {
                  setSkillsHtml("");
                  setContentHtml("");
                }
              }
            })();
          }
        }
      } catch {
        // ignore
      }
    }

    setStatus("");
    if (!hasFreshCache) {
      setLesson(null);
      setSkillsHtml("");
      setContentHtml("");
    }

    (async () => {
      let accessToken = "";
      try {
        const cachedToken = sessionStorage.getItem("mucca_access_token") ?? "";
        const cachedExp = Number(
          sessionStorage.getItem("mucca_access_token_exp") ?? 0,
        );
        const nowSec = Math.floor(Date.now() / 1000);
        if (
          cachedToken &&
          Number.isFinite(cachedExp) &&
          cachedExp > nowSec + 15
        ) {
          accessToken = cachedToken;
        }
      } catch {
        // ignore
      }

      if (!accessToken) {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();
        if (sessionError) {
          if (!cancelled) setStatus(`Errore sessione: ${sessionError.message}`);
          return;
        }

        if (!sessionData.session) {
          window.location.href = "/welcome";
          return;
        }

        accessToken = sessionData.session.access_token;
        if (!accessToken) {
          if (!cancelled) setStatus("Sessione non valida: manca access_token");
          return;
        }

        try {
          const exp =
            typeof (sessionData.session as any)?.expires_at === "number"
              ? (sessionData.session as any).expires_at
              : 0;
          sessionStorage.setItem("mucca_access_token", accessToken);
          if (exp)
            sessionStorage.setItem("mucca_access_token_exp", String(exp));
        } catch {
          // ignore
        }
      }

      if (!slugOrPublicId) {
        if (!cancelled) setStatus("Lezione non valida.");
        return;
      }

      const lessonRes = await fetch(
        `/api/dashboard/lessons?q=${encodeURIComponent(slugOrPublicId)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const lessonJson = await lessonRes.json().catch(() => null);

      if (!lessonRes.ok || !lessonJson?.ok || !lessonJson?.lesson) {
        const message =
          typeof lessonJson?.error === "string"
            ? lessonJson.error
            : "Lezione non trovata";
        if (!cancelled) setStatus(`Errore: ${message}`);
        return;
      }

      const lessonData = lessonJson.lesson as LessonDetail;
      const completed = Boolean(lessonJson.completed);

      if (!cancelled) {
        setLesson(lessonData);
        setIsCompleted(completed);
        setStatus("");
      }

      try {
        sessionStorage.setItem(
          lessonCacheKey,
          JSON.stringify({
            storedAtMs: Date.now(),
            lesson: lessonData,
            completed,
          }),
        );
      } catch {
        // ignore
      }

      void (async () => {
        try {
          const { marked } = await import("marked");
          if (cancelled) return;
          const nextSkills = lessonData.skills
            ? (marked.parse(lessonData.skills) as string)
            : "";
          const nextContent = lessonData.content
            ? (marked.parse(lessonData.content) as string)
            : "";
          if (!cancelled) {
            setSkillsHtml(nextSkills);
            setContentHtml(nextContent);
          }
        } catch {
          if (!cancelled) {
            setSkillsHtml("");
            setContentHtml("");
          }
        }
      })();

      void (async () => {
        const listRes = await fetch("/api/dashboard/lessons?summary=0", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const listJson = await listRes.json().catch(() => null);
        const lessonsList =
          listRes.ok && listJson?.ok
            ? ((listJson.lessons as LessonNavItem[]) ?? [])
            : [];
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

  const orderedLessonsInModule = useMemo(() => {
    if (!lesson?.module_id) return orderedLessons;
    return orderedLessons.filter((l) => l.module_id === lesson.module_id);
  }, [orderedLessons, lesson?.module_id]);

  const currentLessonIndex = useMemo(() => {
    if (!lesson) return -1;
    return orderedLessonsInModule.findIndex((l) => l.id === lesson.id);
  }, [orderedLessonsInModule, lesson]);

  const prevLesson =
    currentLessonIndex > 0
      ? orderedLessonsInModule[currentLessonIndex - 1]
      : null;
  const nextLesson =
    currentLessonIndex >= 0 &&
    currentLessonIndex < orderedLessonsInModule.length - 1
      ? orderedLessonsInModule[currentLessonIndex + 1]
      : null;

  const videoSrc = useMemo(() => {
    return getEmbeddableVideoUrl(lesson?.video_url ?? null);
  }, [lesson?.video_url]);

  async function toggleCompletion() {
    if (!supabase || !lesson) return;

    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();
    if (sessionError || !sessionData.session?.user?.id) {
      setStatus("Sessione non valida. Ricarica la pagina.");
      return;
    }

    setCompletionBusy(true);
    const nextCompleted = !isCompleted;

    const { error } = await supabase.from("user_progress").upsert(
      {
        user_id: sessionData.session.user.id,
        lesson_id: lesson.id,
        completed: nextCompleted,
        completed_at: nextCompleted ? new Date().toISOString() : null,
      },
      {
        onConflict: "user_id,lesson_id",
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

  const topNavBlock = (
    <div
      className={styles.lessonPage__nav + " " + styles["lessonPage__nav--top"]}
      data-ui="lessonPage.nav.top"
    >
      <div
        className={styles.lessonPage__navCol + " text"}
        data-ui="lessonPage.nav.prev"
      >
        {prevLesson ? (
          <Link
            href={`/dashboard/lessons/${encodeURIComponent(prevLesson.public_id)}`}
            className="link"
            data-ui="lessonPage.nav.prev.link"
          >
            ← precedente
          </Link>
        ) : (
          <a
            href="#"
            aria-disabled="true"
            tabIndex={-1}
            className={"link " + styles["lessonPage__navLink--disabled"]}
            data-ui="lessonPage.nav.prev.disabled"
          >
            ← Nessuna lezione precedente
          </a>
        )}
      </div>
      <div
        className={
          styles.lessonPage__navCol +
          " " +
          styles["lessonPage__navCol--center"] +
          " text"
        }
        data-ui="lessonPage.nav.all"
      >
        <Link
          href="/dashboard"
          className="link"
          data-ui="lessonPage.nav.all.link"
        >
          Tutte le lezioni
        </Link>
      </div>
      <div
        className={
          styles.lessonPage__navCol +
          " " +
          styles["lessonPage__navCol--right"] +
          " text"
        }
        data-ui="lessonPage.nav.next"
      >
        {nextLesson ? (
          <Link
            href={`/dashboard/lessons/${encodeURIComponent(nextLesson.public_id)}`}
            className="link"
            data-ui="lessonPage.nav.next.link"
          >
            successiva →
          </Link>
        ) : (
          <span style={{ opacity: 0.6 }} data-ui="lessonPage.nav.next.disabled">
            Nessuna lezione successiva →
          </span>
        )}
      </div>
    </div>
  );

  const bottomNavBlock = (
    <div
      className={
        styles.lessonPage__nav + " " + styles["lessonPage__nav--bottom"]
      }
      data-ui="lessonPage.nav.bottom"
    >
      <div
        className={styles.lessonPage__navCol + " text"}
        data-ui="lessonPage.nav.prev"
      >
        {prevLesson ? (
          <Link
            href={`/dashboard/lessons/${encodeURIComponent(prevLesson.public_id)}`}
            className="link"
            data-ui="lessonPage.nav.prev.link"
          >
            ← precedente
          </Link>
        ) : (
          <a
            href="#"
            aria-disabled="true"
            tabIndex={-1}
            className={"link " + styles["lessonPage__navLink--disabled"]}
            data-ui="lessonPage.nav.prev.disabled"
          >
            ← Nessuna lezione precedente
          </a>
        )}
      </div>
      <div
        className={
          styles.lessonPage__navCol +
          " " +
          styles["lessonPage__navCol--center"] +
          " text"
        }
        data-ui="lessonPage.nav.all"
      >
        <Link
          href="/dashboard"
          className="link"
          data-ui="lessonPage.nav.all.link"
        >
          Tutte le lezioni
        </Link>
      </div>
      <div
        className={
          styles.lessonPage__navCol +
          " " +
          styles["lessonPage__navCol--right"] +
          " text"
        }
        data-ui="lessonPage.nav.next"
      >
        {nextLesson ? (
          <Link
            href={`/dashboard/lessons/${encodeURIComponent(nextLesson.public_id)}`}
            className="link"
            data-ui="lessonPage.nav.next.link"
          >
            successiva →
          </Link>
        ) : (
          <span style={{ opacity: 0.6 }} data-ui="lessonPage.nav.next.disabled">
            Nessuna lezione successiva →
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.lessonPage}>
      {status ? <div className="text">{status}</div> : null}

      {lesson ? (
        <article>
          {topNavBlock}

          <header
            className={styles.lessonPage__header}
            data-ui="lessonPage.header"
          >
            <div className={styles.lessonPage__headerRow}>
              <h1 className={styles.lessonPage__title + " title"}>
                {lesson.title}
              </h1>
              <button
                type="button"
                className="button"
                onClick={() => {
                  void toggleCompletion();
                }}
                disabled={completionBusy}
                aria-busy={completionBusy}
                data-ui="lessonPage.completion.toggle"
              >
                {completionBusy
                  ? "Salvo..."
                  : isCompleted
                    ? "Segna come non completata"
                    : "Segna come completata"}
              </button>
            </div>

            <div
              className={styles.lessonPage__badges}
              data-ui="lessonPage.badges"
            >
              {isCompleted ? (
                <span
                  className={
                    styles.lessonPage__badge +
                    " " +
                    styles["lessonPage__badge--completed"]
                  }
                  data-ui="lessonPage.badge.status"
                >
                  completata
                </span>
              ) : (
                <span
                  className={
                    styles.lessonPage__badge +
                    " " +
                    styles["lessonPage__badge--pending"]
                  }
                  data-ui="lessonPage.badge.status"
                >
                  da completare
                </span>
              )}

              <span
                className={
                  styles.lessonPage__badge +
                  " " +
                  styles["lessonPage__badge--type"]
                }
                data-ui="lessonPage.badge.type"
              >
                {lesson.lesson_type ?? "esercizio"}
              </span>
            </div>
          </header>

          {lesson.description ? (
            <p className="text" style={{ marginBottom: "16px" }}>
              {lesson.description}
            </p>
          ) : null}

          {skillsHtml ? (
            <section style={{ marginBottom: "16px" }}>
              <h2 className="title title--sm" style={{ marginBottom: "8px" }}>
                Skills
              </h2>
              <div
                className="text lesson-markdown"
                dangerouslySetInnerHTML={{ __html: skillsHtml }}
              />
            </section>
          ) : null}

          {lesson.video_url && !videoSrc ? (
            <div className="text" style={{ marginBottom: "16px" }}>
              <a
                className="link"
                href={lesson.video_url}
                target="_blank"
                rel="noreferrer"
              >
                Apri video
              </a>
            </div>
          ) : null}

          {videoSrc ? (
            <div
              className={styles.lessonPage__video}
              data-ui="lessonPage.video"
            >
              <iframe
                src={videoSrc}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.lessonPage__videoIframe}
                data-ui="lessonPage.video.iframe"
              />
            </div>
          ) : null}

          {contentHtml ? (
            <div
              className="lesson-markdown"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          ) : null}

          {bottomNavBlock}
        </article>
      ) : null}
    </div>
  );
}

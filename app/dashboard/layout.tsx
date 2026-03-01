"use client";

import "../../public/components/button/button.css";
import "../../public/components/header/header.css";
import "../../public/components/link/link.css";

import { getSupabaseBrowserClient } from "../../lib/supabase-browser";
import Link from "next/link";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type DashboardProgress = {
  completedLessons: number;
  totalLessons: number;
  percentage: number;
} | null;

type DashboardProgressContextValue = {
  progress: DashboardProgress;
  setProgress: (progress: DashboardProgress) => void;
};

const DashboardProgressContext = createContext<DashboardProgressContextValue | null>(null);

export function useDashboardProgress() {
  const ctx = useContext(DashboardProgressContext);
  if (!ctx) {
    return {
      progress: null,
      setProgress: () => {},
    } as DashboardProgressContextValue;
  }
  return ctx;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = useMemo(() => {
    return getSupabaseBrowserClient(supabaseUrl, supabaseAnonKey);
  }, [supabaseUrl, supabaseAnonKey]);

  const [status, setStatus] = useState<string>("Caricamento...");
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<DashboardProgress>(null);

  const progressCtxValue = useMemo(() => {
    return {
      progress,
      setProgress,
    } satisfies DashboardProgressContextValue;
  }, [progress]);

  useEffect(() => {
    if (!supabase) {
      setStatus(
        "Configurazione mancante: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY",
      );
      return;
    }

    (async () => {
      setReady(false);
      setStatus("Verifica accesso...");

      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError) {
        setStatus(`Errore sessione: ${sessionError.message}`);
        return;
      }

      if (!sessionData.session) {
        window.location.href = "/welcome";
        return;
      }

      setReady(true);
      setStatus("");
    })();
  }, [supabase]);

  async function logout() {
    if (!supabase) return;
    setBusy(true);
    try {
      await supabase.auth.signOut();
      window.location.href = "/";
    } finally {
      setBusy(false);
    }
  }

  if (!ready) {
    return (
      <div
        style={{
          maxWidth: "800px",
          margin: "80px auto",
          padding: "0 20px",
          textAlign: "center",
        }}
      >
        <div className="title" style={{ marginBottom: "var(--spacing-2xl)" }}>
          Dashboard
        </div>
        <div className="text">{status}</div>
      </div>
    );
  }

  return (
    <DashboardProgressContext.Provider value={progressCtxValue}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <header className="topbar">
        <div className="topbar__logo">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "var(--spacing-l)",
            }}
          >
            <Link href="/" className="logo">
              MUCCA DESIGN
            </Link>
          </div>
          <div className="logo__subtitle">
            di{' '}
            <Link href="/pages/chi-sono.html" style={{ textDecoration: 'none', color: 'var(--blue-900)' }}>
              Luca Leone
            </Link>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        <nav className="topbar__nav" style={{ marginTop: 0, gap: '16px' }}>
          <Link href="/dashboard" className="link">
            Dashboard
          </Link>
          <a
            className="link"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              void logout();
            }}
            aria-disabled={busy}
            style={busy ? { opacity: 0.6, pointerEvents: "none" } : undefined}
          >
            Logout
          </a>
        </nav>
        </header>

        <main
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "var(--spacing-2xl)",
          }}
        >
          {children}
        </main>
      </div>
    </DashboardProgressContext.Provider>
  );
}

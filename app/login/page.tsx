"use client";

import "../../public/components/button/button.css";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useMemo, useState } from "react";

export default function LoginPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = useMemo(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      return null;
    }

    return createClient(supabaseUrl, supabaseAnonKey);
  }, [supabaseUrl, supabaseAnonKey]);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [isAuthed, setIsAuthed] = useState(false);
  const [authedEmail, setAuthedEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;

    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (!hash) return;

    const hashParams = new URLSearchParams(hash.replace(/^#/, ""));
    const access_token = hashParams.get("access_token");
    const refresh_token = hashParams.get("refresh_token");

    if (access_token && refresh_token) {
      (async () => {
        setBusy(true);
        setStatus("Sto completando l’accesso...");
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (error) {
          setStatus(`Errore sessione: ${error.message}`);
        } else {
          setStatus("Accesso completato. Ti reindirizzo alla dashboard...");
          window.location.replace("/dashboard");
        }
        setBusy(false);
      })();
    }
  }, [supabase]);

  useEffect(() => {
    if (!supabase) return;

    (async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (!session) {
        setIsAuthed(false);
        setAuthedEmail(null);
        return;
      }

      setIsAuthed(true);
      setAuthedEmail(session.user.email ?? null);
    })();
  }, [supabase]);

  async function sendMagicLink() {
    if (!supabase) {
      setStatus(
        "Supabase non inizializzato (controlla le env NEXT_PUBLIC_SUPABASE_...).",
      );
      return;
    }
    if (!email) {
      setStatus("Inserisci la tua email.");
      return;
    }

    const trimmed = email.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!emailOk) {
      setStatus("Inserisci una email valida.");
      return;
    }

    setBusy(true);
    setStatus("Sto inviando il magic link...");

    try {
      const redirectTo = process.env.NEXT_PUBLIC_URL
        ? `${process.env.NEXT_PUBLIC_URL}/auth/callback`
        : undefined;
      const { error } = await supabase.auth.signInWithOtp({
        email: trimmed,
        options: {
          emailRedirectTo: redirectTo,
        },
      });

      if (error) {
        setStatus(`Errore magic link: ${error.message}`);
      } else {
        setStatus("Ti ho inviato un link via email per accedere.");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Errore magic link: ${message}`);
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    if (!supabase) return;
    setBusy(true);
    setStatus("Logout...");

    try {
      await supabase.auth.signOut();
      setIsAuthed(false);
      setAuthedEmail(null);
      setStatus("Sei uscito.");
    } finally {
      setBusy(false);
    }
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "80px auto",
          padding: "0 20px",
          textAlign: "center",
        }}
      >
        <div className="title" style={{ marginBottom: "var(--spacing-2xl)" }}>
          Login
        </div>
        <div className="text">
          Mancano le env `NEXT_PUBLIC_SUPABASE_URL` o
          `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "80px auto",
        padding: "0 20px",
        textAlign: "center",
      }}
    >
      <div className="title" style={{ marginBottom: "var(--spacing-2xl)" }}>
        Login
      </div>

      {isAuthed ? (
        <div className="text" style={{ marginBottom: "var(--spacing-l)" }}>
          Sei già autenticato{authedEmail ? ` come ${authedEmail}` : ""}.
        </div>
      ) : null}

      <div
        style={{
          display: "grid",
          gap: "12px",
          textAlign: "left",
          marginBottom: "var(--spacing-l)",
        }}
      >
        <label className="text">
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
            placeholder="tuo@email.com"
          />
        </label>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <button
          className="button"
          type="button"
          onClick={sendMagicLink}
          disabled={busy}
        >
          Invia Magic Link
        </button>

        {isAuthed ? (
          <a className="button" href="/dashboard">
            Vai in Dashboard
          </a>
        ) : null}

        {isAuthed ? (
          <button
            className="button"
            type="button"
            onClick={logout}
            disabled={busy}
          >
            Logout
          </button>
        ) : null}
      </div>

      {status ? (
        <div className="text" style={{ marginTop: "var(--spacing-2xl)" }}>
          {status}
        </div>
      ) : null}
    </div>
  );
}

'use client';

import '../../../public/components/button/button.css';
import '../../../public/components/link/link.css';

import { useEffect, useMemo, useState } from 'react';

type ModuleRow = {
  id: string;
  title: string;
  order_index: number;
  access_level: 'free' | 'paid';
  is_published: boolean;
};

type LessonRow = {
  id: string;
  title: string;
  slug: string;
  public_id: string;
  module_id: string;
  lesson_index: number;
  lesson_type?: 'esercizio' | 'intermezzo' | 'milestone' | null;
  description: string | null;
  skills?: string | null;
  video_url: string | null;
  content: string | null;
  order_index: number;
  duration_minutes: number | null;
  is_published: boolean;
};

function normalizeVideoUrl(input: string) {
  const raw = input.trim();
  if (!raw) return { value: null as string | null };

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return { value: raw };
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return { value: raw };
  }

  const host = url.hostname.replace(/^www\./i, '').toLowerCase();
  const isYouTube = host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtu.be' || host === 'youtube-nocookie.com';
  if (!isYouTube) {
    return { value: raw };
  }

  let videoId = '';
  if (host === 'youtu.be') {
    videoId = url.pathname.split('/').filter(Boolean)[0] ?? '';
  } else if (url.pathname === '/watch') {
    videoId = url.searchParams.get('v')?.trim() ?? '';
  } else if (url.pathname.startsWith('/shorts/')) {
    videoId = url.pathname.split('/').filter(Boolean)[1] ?? '';
  } else if (url.pathname.startsWith('/embed/')) {
    videoId = url.pathname.split('/').filter(Boolean)[1] ?? '';
  }

  if (!videoId) {
    return {
      value: null as string | null,
      error:
        'Link YouTube non valido. Usa un link tipo https://youtu.be/<id> oppure https://www.youtube.com/watch?v=<id>.',
    };
  }

  return { value: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}` };
}

export default function DevLessonsClient() {
  const activeModuleStorageKey = 'dev_lessons_active_module_id';

  const [status, setStatus] = useState<string>('');
  const [busy, setBusy] = useState(false);
  const [modules, setModules] = useState<ModuleRow[]>([]);
  const [lessons, setLessons] = useState<LessonRow[]>([]);

  const devToolKey = process.env.NEXT_PUBLIC_DEV_TOOL_KEY;

  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [moduleId, setModuleId] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState('');
  const [lessonType, setLessonType] = useState<'esercizio' | 'intermezzo' | 'milestone'>('esercizio');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newModuleAccessLevel, setNewModuleAccessLevel] = useState<'free' | 'paid'>('free');
  const [newModulePublished, setNewModulePublished] = useState(true);
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);

  const [moduleDialogOpen, setModuleDialogOpen] = useState(false);
  const [lessonDialogOpen, setLessonDialogOpen] = useState(false);

  const linkButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
  };

  const formMode = useMemo(() => (editingId ? 'edit' : 'create'), [editingId]);
  const moduleFormMode = useMemo(() => (editingModuleId ? 'edit' : 'create'), [editingModuleId]);

  const modulesById = useMemo(() => {
    const map: Record<string, ModuleRow> = {};
    modules.forEach((m) => {
      map[m.id] = m;
    });
    return map;
  }, [modules]);

  const sortedModules = useMemo(() => {
    return modules.slice().sort((a, b) => a.order_index - b.order_index);
  }, [modules]);

  const sortedLessons = useMemo(() => {
    const list = lessons.slice();
    list.sort((a, b) => {
      const aModOrder = modulesById[a.module_id]?.order_index ?? Number.MAX_SAFE_INTEGER;
      const bModOrder = modulesById[b.module_id]?.order_index ?? Number.MAX_SAFE_INTEGER;
      if (aModOrder !== bModOrder) return aModOrder - bModOrder;
      if (a.lesson_index !== b.lesson_index) return a.lesson_index - b.lesson_index;
      return a.order_index - b.order_index;
    });
    return list;
  }, [lessons, modulesById]);

  const activeModuleLessons = useMemo(() => {
    if (!selectedModuleId) return [];
    return sortedLessons.filter((lesson) => lesson.module_id === selectedModuleId);
  }, [sortedLessons, selectedModuleId]);

  async function loadModules() {
    const res = await fetch('/api/dev/modules', {
      method: 'GET',
      headers: devToolKey ? { 'x-dev-tool-key': devToolKey } : undefined,
    });
    const json = await res.json().catch(() => null);
    if (!res.ok || !json?.ok) {
      throw new Error((json && (json.error as string)) || 'impossibile caricare moduli');
    }

    const list = (json.modules as ModuleRow[]) ?? [];
    setModules(list);
    return list;
  }

  async function load() {
    setStatus('Carico...');
    try {
      await loadModules();

      const res = await fetch('/api/dev/lessons', {
        method: 'GET',
        headers: devToolKey ? { 'x-dev-tool-key': devToolKey } : undefined,
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        setStatus(`Errore: ${(json && (json.error as string)) || 'impossibile caricare lezioni'}`);
        return;
      }

      setLessons((json.lessons as LessonRow[]) ?? []);
      setStatus('');
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setStatus(`Errore: ${message}`);
    }
  }

  function resetForm() {
    setEditingId(null);
    setTitle('');
    setModuleId('');
    setLessonType('esercizio');
    setDescription('');
    setSkills('');
    setShowVideo(false);
    setVideoUrl('');
    setContent('');
    setIsPublished(false);
  }

  function fillFormFromLesson(l: LessonRow) {
    setEditingId(l.id);
    setTitle(l.title ?? '');
    setModuleId(l.module_id ?? '');
    setLessonType(
      l.lesson_type === 'intermezzo' || l.lesson_type === 'milestone' ? l.lesson_type : 'esercizio',
    );
    setDescription(l.description ?? '');
    setSkills((l.skills as string | null) ?? '');
    setShowVideo(Boolean(l.video_url));
    setVideoUrl(l.video_url ?? '');
    setContent(l.content ?? '');
    setIsPublished(Boolean(l.is_published));
  }

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    if (moduleId) return;
    if (!modules.length) return;
    setModuleId(modules[0]?.id ?? '');
  }, [modules, moduleId]);

  useEffect(() => {
    if (!modules.length) return;
    if (selectedModuleId && modules.some((m) => m.id === selectedModuleId)) return;

    const sortedByOrder = modules.slice().sort((a, b) => a.order_index - b.order_index);

    const savedId = typeof window !== 'undefined' ? window.localStorage.getItem(activeModuleStorageKey) : null;
    const nextActiveId =
      savedId && sortedByOrder.some((m) => m.id === savedId) ? savedId : (sortedByOrder[0]?.id ?? '');

    if (nextActiveId) {
      setSelectedModuleId(nextActiveId);
    }
  }, [modules, selectedModuleId]);

  useEffect(() => {
    if (!selectedModuleId) return;
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(activeModuleStorageKey, selectedModuleId);
  }, [selectedModuleId]);

  useEffect(() => {
    if (!moduleDialogOpen && !lessonDialogOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape') return;
      if (busy) return;
      if (lessonDialogOpen) {
        setLessonDialogOpen(false);
        resetForm();
        setStatus('');
      }
      if (moduleDialogOpen) {
        setModuleDialogOpen(false);
        resetModuleForm();
        setStatus('');
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lessonDialogOpen, moduleDialogOpen, busy]);

  function resetModuleForm() {
    setEditingModuleId(null);
    setNewModuleTitle('');
    setNewModuleAccessLevel('free');
    setNewModulePublished(true);
  }

  function fillModuleFormFromModule(m: ModuleRow) {
    setEditingModuleId(m.id);
    setNewModuleTitle(m.title ?? '');
    setNewModuleAccessLevel(m.access_level);
    setNewModulePublished(Boolean(m.is_published));
  }

  async function createModule() {
    if (!newModuleTitle.trim()) {
      setStatus('Titolo modulo obbligatorio.');
      return;
    }

    setBusy(true);
    setStatus(editingModuleId ? 'Salvo modulo...' : 'Creo modulo...');
    try {
      const res = await fetch(
        editingModuleId ? `/api/dev/modules/${encodeURIComponent(editingModuleId)}` : '/api/dev/modules',
        {
          method: editingModuleId ? 'PATCH' : 'POST',
          headers: {
            'content-type': 'application/json',
            ...(devToolKey ? { 'x-dev-tool-key': devToolKey } : null),
          },
          body: JSON.stringify({
            title: newModuleTitle.trim(),
            access_level: newModuleAccessLevel,
            is_published: newModulePublished,
          }),
        },
      );
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        setStatus(`Errore: ${(json && (json.error as string)) || 'impossibile creare modulo'}`);
        return;
      }

      const list = await loadModules();
      const createdId = (json.module as any)?.id as string | undefined;

      if (!editingModuleId) {
        if (createdId) {
          setModuleId(createdId);
        } else if (list[0]?.id) {
          setModuleId(list[0].id);
        }
      }

      resetModuleForm();
      setStatus('');
      setModuleDialogOpen(false);
    } finally {
      setBusy(false);
    }
  }

  function openNewModuleDialog() {
    resetModuleForm();
    setStatus('');
    setModuleDialogOpen(true);
  }

  function openEditModuleDialog(m: ModuleRow) {
    fillModuleFormFromModule(m);
    setStatus('');
    setModuleDialogOpen(true);
  }

  function closeModuleDialog() {
    if (busy) return;
    setModuleDialogOpen(false);
    resetModuleForm();
    setStatus('');
  }

  function openNewLessonDialog() {
    resetForm();
    if (selectedModuleId) {
      setModuleId(selectedModuleId);
    }
    setStatus('');
    setLessonDialogOpen(true);
  }

  function openEditLessonDialog(l: LessonRow) {
    fillFormFromLesson(l);
    setStatus('');
    setLessonDialogOpen(true);
  }

  function closeLessonDialog() {
    if (busy) return;
    setLessonDialogOpen(false);
    resetForm();
    setStatus('');
  }

  async function reorderModule(id: string, direction: 'up' | 'down') {
    setBusy(true);
    setStatus('Riordino modulo...');

    try {
      const list = sortedModules;
      const idx = list.findIndex((m) => m.id === id);
      if (idx < 0) {
        setStatus('Errore: modulo non trovato');
        return;
      }

      const neighbor = direction === 'up' ? list[idx - 1] : list[idx + 1];
      if (!neighbor) {
        setStatus('');
        return;
      }

      const current = list[idx];
      const minOrder = list.reduce((acc, m) => Math.min(acc, m.order_index), Number.POSITIVE_INFINITY);
      const tempOrderIndex = minOrder - 1000;

      const headers = {
        'content-type': 'application/json',
        ...(devToolKey ? { 'x-dev-tool-key': devToolKey } : null),
      };

      const resA = await fetch(`/api/dev/modules/${encodeURIComponent(current.id)}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ order_index: tempOrderIndex }),
      });
      const jsonA = await resA.json().catch(() => null);
      if (!resA.ok || !jsonA?.ok) {
        setStatus(`Errore: ${(jsonA && (jsonA.error as string)) || 'impossibile riordinare'}`);
        return;
      }

      const resB = await fetch(`/api/dev/modules/${encodeURIComponent(neighbor.id)}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ order_index: current.order_index }),
      });
      const jsonB = await resB.json().catch(() => null);
      if (!resB.ok || !jsonB?.ok) {
        setStatus(`Errore: ${(jsonB && (jsonB.error as string)) || 'impossibile riordinare'}`);
        return;
      }

      const resC = await fetch(`/api/dev/modules/${encodeURIComponent(current.id)}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ order_index: neighbor.order_index }),
      });
      const jsonC = await resC.json().catch(() => null);
      if (!resC.ok || !jsonC?.ok) {
        setStatus(`Errore: ${(jsonC && (jsonC.error as string)) || 'impossibile riordinare'}`);
        return;
      }

      await load();
      setStatus('');
    } finally {
      setBusy(false);
    }
  }

  async function deleteModule(id: string) {
    const ok = window.confirm('Eliminare il modulo? (azione irreversibile)');
    if (!ok) return;

    setBusy(true);
    setStatus('Elimino modulo...');

    try {
      const res = await fetch(`/api/dev/modules/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: devToolKey ? { 'x-dev-tool-key': devToolKey } : undefined,
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        setStatus(`Errore: ${(json && (json.error as string)) || 'impossibile eliminare modulo'}`);
        return;
      }

      if (editingModuleId === id) {
        resetModuleForm();
      }

      if (moduleId === id) {
        setModuleId('');
      }

      if (selectedModuleId === id) {
        setSelectedModuleId('');
      }

      await load();
      setStatus('');
    } finally {
      setBusy(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      setStatus('Titolo obbligatorio.');
      return;
    }

    const nextVideoUrl = showVideo && videoUrl.trim() ? normalizeVideoUrl(videoUrl) : { value: null as string | null };
    if (showVideo && videoUrl.trim() && !nextVideoUrl.value) {
      setStatus(nextVideoUrl.error ?? 'Link video non valido.');
      return;
    }

    setBusy(true);
    setStatus(formMode === 'create' ? 'Creo...' : 'Salvo...');

    try {
      if (formMode === 'create') {
        const res = await fetch('/api/dev/lessons', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            ...(devToolKey ? { 'x-dev-tool-key': devToolKey } : null),
          },
          body: JSON.stringify({
            title: title.trim(),
            module_id: moduleId || null,
            lesson_type: lessonType,
            description: description.trim() ? description : null,
            skills: skills.trim() ? skills : null,
            video_url: nextVideoUrl.value,
            content: content.trim() ? content : null,
            is_published: isPublished,
          }),
        });
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.ok) {
          setStatus(`Errore: ${(json && (json.error as string)) || 'impossibile creare'}`);
          return;
        }
      } else {
        const res = await fetch(`/api/dev/lessons/${encodeURIComponent(editingId as string)}`, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json',
            ...(devToolKey ? { 'x-dev-tool-key': devToolKey } : null),
          },
          body: JSON.stringify({
            title: title.trim(),
            module_id: moduleId || null,
            lesson_type: lessonType,
            description: description.trim() ? description : null,
            skills: skills.trim() ? skills : null,
            video_url: nextVideoUrl.value,
            content: content.trim() ? content : null,
            is_published: isPublished,
          }),
        });
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.ok) {
          setStatus(`Errore: ${(json && (json.error as string)) || 'impossibile salvare'}`);
          return;
        }
      }

      resetForm();
      await load();
      setStatus('');
      setLessonDialogOpen(false);
    } finally {
      setBusy(false);
    }
  }

  async function reorder(id: string, direction: 'up' | 'down') {
    setBusy(true);
    setStatus('Riordino...');

    try {
      const res = await fetch('/api/dev/lessons/reorder', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(devToolKey ? { 'x-dev-tool-key': devToolKey } : null),
        },
        body: JSON.stringify({ id, direction }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        setStatus(`Errore: ${(json && (json.error as string)) || 'impossibile riordinare'}`);
        return;
      }

      await load();
      setStatus('');
    } finally {
      setBusy(false);
    }
  }

  async function deleteLesson(id: string) {
    const ok = window.confirm('Eliminare la lezione? (azione irreversibile)');
    if (!ok) return;

    setBusy(true);
    setStatus('Elimino...');

    try {
      const res = await fetch(`/api/dev/lessons/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: devToolKey ? { 'x-dev-tool-key': devToolKey } : undefined,
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        setStatus(`Errore: ${(json && (json.error as string)) || 'impossibile eliminare'}`);
        return;
      }

      await load();
      setStatus('');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 20px' }}>
      {status ? (
        <div className="text" style={{ marginBottom: 'var(--spacing-l)' }}>
          {status}
        </div>
      ) : null}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 3fr',
          gap: '20px',
          alignItems: 'start',
        }}
      >
        <div style={{ display: 'grid', gap: '16px' }}>
          <div
            style={{
              border: '1px solid var(--grey-300)',
              backgroundColor: 'var(--white)',
              padding: 'var(--spacing-2xl)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px', marginBottom: 'var(--spacing-l)' }}>
              <div className="title title--md">Moduli ({modules.length})</div>
              <button className="link" type="button" onClick={() => openNewModuleDialog()} disabled={busy} style={linkButtonStyle}>
                Nuovo modulo
              </button>
            </div>

            <div style={{ display: 'grid', gap: '10px' }}>
              {sortedModules.map((m, idx) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedModuleId(m.id)}
                  style={{
                    border:
                      selectedModuleId === m.id
                        ? '4px solid var(--grey-900)'
                        : editingModuleId === m.id
                          ? '1px solid var(--blue-900)'
                          : '1px solid var(--grey-300)',
                    backgroundColor: editingModuleId === m.id ? 'var(--grey-100)' : undefined,
                    padding: '12px',
                    display: 'grid',
                    gap: '8px',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                    <div>
                      <div className="link link--large" style={{ color: 'inherit' }}>
                        {m.order_index}. {m.title}
                      </div>
                      <div className="text" style={{ opacity: 0.8 }}>
                        accesso: {m.access_level} {m.is_published ? '· pubblicato' : '· bozza'}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <button
                        className="link"
                        type="button"
                        onClick={() => void reorderModule(m.id, 'up')}
                        disabled={busy || idx === 0}
                        style={{ ...linkButtonStyle, opacity: busy || idx === 0 ? 0.4 : 1 }}
                      >
                        ↑
                      </button>
                      <button
                        className="link"
                        type="button"
                        onClick={() => void reorderModule(m.id, 'down')}
                        disabled={busy || idx === sortedModules.length - 1}
                        style={{ ...linkButtonStyle, opacity: busy || idx === sortedModules.length - 1 ? 0.4 : 1 }}
                      >
                        ↓
                      </button>
                      <button className="link" type="button" onClick={() => openEditModuleDialog(m)} disabled={busy} style={linkButtonStyle}>
                        Modifica
                      </button>
                      <button className="link" type="button" onClick={() => void deleteModule(m.id)} disabled={busy} style={linkButtonStyle}>
                        Elimina
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div
            style={{
              border: '1px solid var(--grey-300)',
              backgroundColor: 'var(--white)',
              padding: 'var(--spacing-2xl)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px', marginBottom: 'var(--spacing-m)' }}>
              <div className="title title--md">Lezioni ({activeModuleLessons.length})</div>
              <button className="link" type="button" onClick={() => openNewLessonDialog()} disabled={busy} style={linkButtonStyle}>
                Nuova lezione
              </button>
            </div>

            <div style={{ display: 'grid', gap: '10px' }}>
              {activeModuleLessons.map((l, lessonIdx) => (
                <div
                  key={l.id}
                  style={{
                    border: '1px solid var(--grey-300)',
                    backgroundColor: 'var(--white)',
                    padding: '12px',
                    display: 'grid',
                    gap: '8px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                    <div>
                      <div className="link link--large" style={{ color: 'inherit' }}>
                        {(modulesById[l.module_id]?.order_index ?? '?')}.{l.lesson_index}. {l.title}
                      </div>
                      <div className="text" style={{ opacity: 0.8 }}>
                        modulo: {modulesById[l.module_id]?.title ?? l.module_id} · slug: {l.slug} {l.is_published ? '· pubblicata' : '· bozza'}
                      </div>
                      {l.skills ? (
                        <div className="text" style={{ opacity: 0.8 }}>
                          skills: {l.skills}
                        </div>
                      ) : null}
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <button
                        className="link"
                        type="button"
                        onClick={() => void reorder(l.id, 'up')}
                        disabled={busy || lessonIdx === 0}
                        style={{ ...linkButtonStyle, opacity: busy || lessonIdx === 0 ? 0.4 : 1 }}
                      >
                        ↑
                      </button>
                      <button
                        className="link"
                        type="button"
                        onClick={() => void reorder(l.id, 'down')}
                        disabled={busy || lessonIdx === activeModuleLessons.length - 1}
                        style={{ ...linkButtonStyle, opacity: busy || lessonIdx === activeModuleLessons.length - 1 ? 0.4 : 1 }}
                      >
                        ↓
                      </button>
                      <button className="link" type="button" onClick={() => openEditLessonDialog(l)} disabled={busy} style={linkButtonStyle}>
                        Modifica
                      </button>
                      <button className="link" type="button" onClick={() => void deleteLesson(l.id)} disabled={busy} style={linkButtonStyle}>
                        Elimina
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {!activeModuleLessons.length ? (
                <div className="text" style={{ opacity: 0.8 }}>
                  Nessuna lezione nel modulo attivo.
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {moduleDialogOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => {
            closeModuleDialog();
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '720px',
              border: '1px solid var(--grey-300)',
              backgroundColor: 'var(--white)',
              padding: 'var(--spacing-2xl)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '12px',
                marginBottom: 'var(--spacing-l)',
              }}
            >
              <div className="title title--md">{moduleFormMode === 'create' ? 'Nuovo modulo' : 'Modifica modulo'}</div>
              <button className="link" type="button" onClick={() => closeModuleDialog()} disabled={busy} style={linkButtonStyle}>
                Chiudi
              </button>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              <label className="text">
                Titolo
                <input
                  value={newModuleTitle}
                  onChange={(e) => setNewModuleTitle(e.target.value)}
                  style={{ width: '100%', padding: '10px', marginTop: '6px' }}
                />
              </label>

              <label className="text">
                Accesso
                <select
                  value={newModuleAccessLevel}
                  onChange={(e) => setNewModuleAccessLevel(e.target.value === 'paid' ? 'paid' : 'free')}
                  style={{ display: 'block', width: '100%', maxWidth: '220px', padding: '10px', marginTop: '6px' }}
                >
                  <option value="free">free</option>
                  <option value="paid">paid</option>
                </select>
              </label>

              <label className="text" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input checked={newModulePublished} onChange={(e) => setNewModulePublished(e.target.checked)} type="checkbox" />
                Pubblicato
              </label>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button className="link" type="button" onClick={() => void createModule()} disabled={busy} style={linkButtonStyle}>
                  {moduleFormMode === 'create' ? 'Crea' : 'Salva'}
                </button>
                <button className="link" type="button" onClick={() => closeModuleDialog()} disabled={busy} style={linkButtonStyle}>
                  Annulla
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {lessonDialogOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => {
            closeLessonDialog();
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '860px',
              border: '1px solid var(--grey-300)',
              backgroundColor: 'var(--white)',
              padding: 'var(--spacing-2xl)',
              maxHeight: '90vh',
              overflow: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '12px',
                marginBottom: 'var(--spacing-l)',
              }}
            >
              <div className="title title--md">{formMode === 'create' ? 'Nuova lezione' : 'Modifica lezione'}</div>
              <button className="link" type="button" onClick={() => closeLessonDialog()} disabled={busy} style={linkButtonStyle}>
                Chiudi
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void onSubmit(e);
              }}
              style={{ display: 'grid', gap: '12px' }}
            >
              <label className="text">
                Titolo
                <input value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '6px' }} />
              </label>

              <label className="text" style={{ display: 'grid', gap: '6px' }}>
                Tipo lezione
                <select
                  value={lessonType}
                  onChange={(e) =>
                    setLessonType(
                      e.target.value === 'intermezzo'
                        ? 'intermezzo'
                        : e.target.value === 'milestone'
                          ? 'milestone'
                          : 'esercizio',
                    )
                  }
                  style={{ width: '100%', padding: '10px', display: 'block', maxWidth: '260px' }}
                >
                  <option value="esercizio">esercizio</option>
                  <option value="intermezzo">intermezzo</option>
                  <option value="milestone">milestone</option>
                </select>
              </label>

              <label className="text">
                Modulo
                <select value={moduleId} onChange={(e) => setModuleId(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '6px' }}>
                  {modules.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.order_index}. {m.title} ({m.access_level}{m.is_published ? '' : ', bozza'})
                    </option>
                  ))}
                </select>
              </label>

              <label className="text">
                Descrizione
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} style={{ width: '100%', padding: '10px', marginTop: '6px' }} />
              </label>

              <label className="text">
                Skills
                <textarea value={skills} onChange={(e) => setSkills(e.target.value)} rows={3} style={{ width: '100%', padding: '10px', marginTop: '6px' }} />
              </label>

              <label className="text" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  checked={showVideo}
                  onChange={(e) => {
                    const next = e.target.checked;
                    setShowVideo(next);
                    if (!next) setVideoUrl('');
                  }}
                  type="checkbox"
                />
                Mostra video
              </label>

              <label className="text">
                Link video
                <input
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  disabled={!showVideo}
                  style={{ width: '100%', padding: '10px', marginTop: '6px' }}
                />
              </label>

              <label className="text">
                Contenuto (md)
                <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10} style={{ width: '100%', padding: '10px', marginTop: '6px', fontFamily: 'monospace' }} />
              </label>

              <label className="text" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} type="checkbox" />
                Pubblicata
              </label>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button className="link" type="submit" disabled={busy} style={linkButtonStyle}>
                  {formMode === 'create' ? 'Crea' : 'Salva'}
                </button>
                <button className="link" type="button" onClick={() => closeLessonDialog()} disabled={busy} style={linkButtonStyle}>
                  Annulla
                </button>
                <button className="link" type="button" onClick={() => void load()} disabled={busy} style={linkButtonStyle}>
                  Ricarica
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

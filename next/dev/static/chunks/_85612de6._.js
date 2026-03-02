(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/dev/lessons/DevLessonsClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DevLessonsClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function DevLessonsClient() {
    _s();
    const activeModuleStorageKey = 'dev_lessons_active_module_id';
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [modules, setModules] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [lessons, setLessons] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const devToolKey = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_DEV_TOOL_KEY;
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [moduleId, setModuleId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedModuleId, setSelectedModuleId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [lessonType, setLessonType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('esercizio');
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [skills, setSkills] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showVideo, setShowVideo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [videoUrl, setVideoUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isPublished, setIsPublished] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newModuleTitle, setNewModuleTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newModuleAccessLevel, setNewModuleAccessLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('free');
    const [newModulePublished, setNewModulePublished] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [editingModuleId, setEditingModuleId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [moduleDialogOpen, setModuleDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lessonDialogOpen, setLessonDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const linkButtonStyle = {
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer'
    };
    const formMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DevLessonsClient.useMemo[formMode]": ()=>editingId ? 'edit' : 'create'
    }["DevLessonsClient.useMemo[formMode]"], [
        editingId
    ]);
    const moduleFormMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DevLessonsClient.useMemo[moduleFormMode]": ()=>editingModuleId ? 'edit' : 'create'
    }["DevLessonsClient.useMemo[moduleFormMode]"], [
        editingModuleId
    ]);
    const modulesById = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DevLessonsClient.useMemo[modulesById]": ()=>{
            const map = {};
            modules.forEach({
                "DevLessonsClient.useMemo[modulesById]": (m)=>{
                    map[m.id] = m;
                }
            }["DevLessonsClient.useMemo[modulesById]"]);
            return map;
        }
    }["DevLessonsClient.useMemo[modulesById]"], [
        modules
    ]);
    const sortedModules = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DevLessonsClient.useMemo[sortedModules]": ()=>{
            return modules.slice().sort({
                "DevLessonsClient.useMemo[sortedModules]": (a, b)=>a.order_index - b.order_index
            }["DevLessonsClient.useMemo[sortedModules]"]);
        }
    }["DevLessonsClient.useMemo[sortedModules]"], [
        modules
    ]);
    const sortedLessons = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DevLessonsClient.useMemo[sortedLessons]": ()=>{
            const list = lessons.slice();
            list.sort({
                "DevLessonsClient.useMemo[sortedLessons]": (a, b)=>{
                    const aModOrder = modulesById[a.module_id]?.order_index ?? Number.MAX_SAFE_INTEGER;
                    const bModOrder = modulesById[b.module_id]?.order_index ?? Number.MAX_SAFE_INTEGER;
                    if (aModOrder !== bModOrder) return aModOrder - bModOrder;
                    if (a.lesson_index !== b.lesson_index) return a.lesson_index - b.lesson_index;
                    return a.order_index - b.order_index;
                }
            }["DevLessonsClient.useMemo[sortedLessons]"]);
            return list;
        }
    }["DevLessonsClient.useMemo[sortedLessons]"], [
        lessons,
        modulesById
    ]);
    const activeModuleLessons = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DevLessonsClient.useMemo[activeModuleLessons]": ()=>{
            if (!selectedModuleId) return [];
            return sortedLessons.filter({
                "DevLessonsClient.useMemo[activeModuleLessons]": (lesson)=>lesson.module_id === selectedModuleId
            }["DevLessonsClient.useMemo[activeModuleLessons]"]);
        }
    }["DevLessonsClient.useMemo[activeModuleLessons]"], [
        sortedLessons,
        selectedModuleId
    ]);
    async function loadModules() {
        const res = await fetch('/api/dev/modules', {
            method: 'GET',
            headers: devToolKey ? {
                'x-dev-tool-key': devToolKey
            } : undefined
        });
        const json = await res.json().catch(()=>null);
        if (!res.ok || !json?.ok) {
            throw new Error(json && json.error || 'impossibile caricare moduli');
        }
        const list = json.modules ?? [];
        setModules(list);
        return list;
    }
    async function load() {
        setStatus('Carico...');
        try {
            await loadModules();
            const res = await fetch('/api/dev/lessons', {
                method: 'GET',
                headers: devToolKey ? {
                    'x-dev-tool-key': devToolKey
                } : undefined
            });
            const json = await res.json().catch(()=>null);
            if (!res.ok || !json?.ok) {
                setStatus(`Errore: ${json && json.error || 'impossibile caricare lezioni'}`);
                return;
            }
            setLessons(json.lessons ?? []);
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
    function fillFormFromLesson(l) {
        setEditingId(l.id);
        setTitle(l.title ?? '');
        setModuleId(l.module_id ?? '');
        setLessonType(l.lesson_type === 'intermezzo' || l.lesson_type === 'milestone' ? l.lesson_type : 'esercizio');
        setDescription(l.description ?? '');
        setSkills(l.skills ?? '');
        setShowVideo(Boolean(l.video_url));
        setVideoUrl(l.video_url ?? '');
        setContent(l.content ?? '');
        setIsPublished(Boolean(l.is_published));
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DevLessonsClient.useEffect": ()=>{
            void load();
        }
    }["DevLessonsClient.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DevLessonsClient.useEffect": ()=>{
            if (moduleId) return;
            if (!modules.length) return;
            setModuleId(modules[0]?.id ?? '');
        }
    }["DevLessonsClient.useEffect"], [
        modules,
        moduleId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DevLessonsClient.useEffect": ()=>{
            if (!modules.length) return;
            if (selectedModuleId && modules.some({
                "DevLessonsClient.useEffect": (m)=>m.id === selectedModuleId
            }["DevLessonsClient.useEffect"])) return;
            const sortedByOrder = modules.slice().sort({
                "DevLessonsClient.useEffect.sortedByOrder": (a, b)=>a.order_index - b.order_index
            }["DevLessonsClient.useEffect.sortedByOrder"]);
            const savedId = ("TURBOPACK compile-time truthy", 1) ? window.localStorage.getItem(activeModuleStorageKey) : "TURBOPACK unreachable";
            const nextActiveId = savedId && sortedByOrder.some({
                "DevLessonsClient.useEffect": (m)=>m.id === savedId
            }["DevLessonsClient.useEffect"]) ? savedId : sortedByOrder[0]?.id ?? '';
            if (nextActiveId) {
                setSelectedModuleId(nextActiveId);
            }
        }
    }["DevLessonsClient.useEffect"], [
        modules,
        selectedModuleId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DevLessonsClient.useEffect": ()=>{
            if (!selectedModuleId) return;
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            window.localStorage.setItem(activeModuleStorageKey, selectedModuleId);
        }
    }["DevLessonsClient.useEffect"], [
        selectedModuleId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DevLessonsClient.useEffect": ()=>{
            if (!moduleDialogOpen && !lessonDialogOpen) return;
            function onKeyDown(e) {
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
            return ({
                "DevLessonsClient.useEffect": ()=>window.removeEventListener('keydown', onKeyDown)
            })["DevLessonsClient.useEffect"];
        }
    }["DevLessonsClient.useEffect"], [
        lessonDialogOpen,
        moduleDialogOpen,
        busy
    ]);
    function resetModuleForm() {
        setEditingModuleId(null);
        setNewModuleTitle('');
        setNewModuleAccessLevel('free');
        setNewModulePublished(true);
    }
    function fillModuleFormFromModule(m) {
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
            const res = await fetch(editingModuleId ? `/api/dev/modules/${encodeURIComponent(editingModuleId)}` : '/api/dev/modules', {
                method: editingModuleId ? 'PATCH' : 'POST',
                headers: {
                    'content-type': 'application/json',
                    ...devToolKey ? {
                        'x-dev-tool-key': devToolKey
                    } : null
                },
                body: JSON.stringify({
                    title: newModuleTitle.trim(),
                    access_level: newModuleAccessLevel,
                    is_published: newModulePublished
                })
            });
            const json = await res.json().catch(()=>null);
            if (!res.ok || !json?.ok) {
                setStatus(`Errore: ${json && json.error || 'impossibile creare modulo'}`);
                return;
            }
            const list = await loadModules();
            const createdId = json.module?.id;
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
        } finally{
            setBusy(false);
        }
    }
    function openNewModuleDialog() {
        resetModuleForm();
        setStatus('');
        setModuleDialogOpen(true);
    }
    function openEditModuleDialog(m) {
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
    function openEditLessonDialog(l) {
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
    async function reorderModule(id, direction) {
        setBusy(true);
        setStatus('Riordino modulo...');
        try {
            const list = sortedModules;
            const idx = list.findIndex((m)=>m.id === id);
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
            const minOrder = list.reduce((acc, m)=>Math.min(acc, m.order_index), Number.POSITIVE_INFINITY);
            const tempOrderIndex = minOrder - 1000;
            const headers = {
                'content-type': 'application/json',
                ...devToolKey ? {
                    'x-dev-tool-key': devToolKey
                } : null
            };
            const resA = await fetch(`/api/dev/modules/${encodeURIComponent(current.id)}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({
                    order_index: tempOrderIndex
                })
            });
            const jsonA = await resA.json().catch(()=>null);
            if (!resA.ok || !jsonA?.ok) {
                setStatus(`Errore: ${jsonA && jsonA.error || 'impossibile riordinare'}`);
                return;
            }
            const resB = await fetch(`/api/dev/modules/${encodeURIComponent(neighbor.id)}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({
                    order_index: current.order_index
                })
            });
            const jsonB = await resB.json().catch(()=>null);
            if (!resB.ok || !jsonB?.ok) {
                setStatus(`Errore: ${jsonB && jsonB.error || 'impossibile riordinare'}`);
                return;
            }
            const resC = await fetch(`/api/dev/modules/${encodeURIComponent(current.id)}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({
                    order_index: neighbor.order_index
                })
            });
            const jsonC = await resC.json().catch(()=>null);
            if (!resC.ok || !jsonC?.ok) {
                setStatus(`Errore: ${jsonC && jsonC.error || 'impossibile riordinare'}`);
                return;
            }
            await load();
            setStatus('');
        } finally{
            setBusy(false);
        }
    }
    async function deleteModule(id) {
        const ok = window.confirm('Eliminare il modulo? (azione irreversibile)');
        if (!ok) return;
        setBusy(true);
        setStatus('Elimino modulo...');
        try {
            const res = await fetch(`/api/dev/modules/${encodeURIComponent(id)}`, {
                method: 'DELETE',
                headers: devToolKey ? {
                    'x-dev-tool-key': devToolKey
                } : undefined
            });
            const json = await res.json().catch(()=>null);
            if (!res.ok || !json?.ok) {
                setStatus(`Errore: ${json && json.error || 'impossibile eliminare modulo'}`);
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
        } finally{
            setBusy(false);
        }
    }
    async function onSubmit(e) {
        e.preventDefault();
        if (!title.trim()) {
            setStatus('Titolo obbligatorio.');
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
                        ...devToolKey ? {
                            'x-dev-tool-key': devToolKey
                        } : null
                    },
                    body: JSON.stringify({
                        title: title.trim(),
                        module_id: moduleId || null,
                        lesson_type: lessonType,
                        description: description.trim() ? description : null,
                        skills: skills.trim() ? skills : null,
                        video_url: showVideo && videoUrl.trim() ? videoUrl.trim() : null,
                        content: content.trim() ? content : null,
                        is_published: isPublished
                    })
                });
                const json = await res.json().catch(()=>null);
                if (!res.ok || !json?.ok) {
                    setStatus(`Errore: ${json && json.error || 'impossibile creare'}`);
                    return;
                }
            } else {
                const res = await fetch(`/api/dev/lessons/${encodeURIComponent(editingId)}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                        ...devToolKey ? {
                            'x-dev-tool-key': devToolKey
                        } : null
                    },
                    body: JSON.stringify({
                        title: title.trim(),
                        module_id: moduleId || null,
                        lesson_type: lessonType,
                        description: description.trim() ? description : null,
                        skills: skills.trim() ? skills : null,
                        video_url: showVideo && videoUrl.trim() ? videoUrl.trim() : null,
                        content: content.trim() ? content : null,
                        is_published: isPublished
                    })
                });
                const json = await res.json().catch(()=>null);
                if (!res.ok || !json?.ok) {
                    setStatus(`Errore: ${json && json.error || 'impossibile salvare'}`);
                    return;
                }
            }
            resetForm();
            await load();
            setStatus('');
            setLessonDialogOpen(false);
        } finally{
            setBusy(false);
        }
    }
    async function reorder(id, direction) {
        setBusy(true);
        setStatus('Riordino...');
        try {
            const res = await fetch('/api/dev/lessons/reorder', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    ...devToolKey ? {
                        'x-dev-tool-key': devToolKey
                    } : null
                },
                body: JSON.stringify({
                    id,
                    direction
                })
            });
            const json = await res.json().catch(()=>null);
            if (!res.ok || !json?.ok) {
                setStatus(`Errore: ${json && json.error || 'impossibile riordinare'}`);
                return;
            }
            await load();
            setStatus('');
        } finally{
            setBusy(false);
        }
    }
    async function deleteLesson(id) {
        const ok = window.confirm('Eliminare la lezione? (azione irreversibile)');
        if (!ok) return;
        setBusy(true);
        setStatus('Elimino...');
        try {
            const res = await fetch(`/api/dev/lessons/${encodeURIComponent(id)}`, {
                method: 'DELETE',
                headers: devToolKey ? {
                    'x-dev-tool-key': devToolKey
                } : undefined
            });
            const json = await res.json().catch(()=>null);
            if (!res.ok || !json?.ok) {
                setStatus(`Errore: ${json && json.error || 'impossibile eliminare'}`);
                return;
            }
            await load();
            setStatus('');
        } finally{
            setBusy(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            maxWidth: '1200px',
            margin: '80px auto',
            padding: '0 20px'
        },
        children: [
            status ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text",
                style: {
                    marginBottom: 'var(--spacing-l)'
                },
                children: status
            }, void 0, false, {
                fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                lineNumber: 553,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'grid',
                    gridTemplateColumns: '2fr 3fr',
                    gap: '20px',
                    alignItems: 'start'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gap: '16px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                border: '1px solid var(--grey-300)',
                                backgroundColor: 'var(--white)',
                                padding: 'var(--spacing-2xl)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'baseline',
                                        justifyContent: 'space-between',
                                        gap: '12px',
                                        marginBottom: 'var(--spacing-l)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "title title--md",
                                            children: [
                                                "Moduli (",
                                                modules.length,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                            lineNumber: 575,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "link",
                                            type: "button",
                                            onClick: ()=>openNewModuleDialog(),
                                            disabled: busy,
                                            style: linkButtonStyle,
                                            children: "Nuovo modulo"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                            lineNumber: 576,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                    lineNumber: 574,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'grid',
                                        gap: '10px'
                                    },
                                    children: sortedModules.map((m, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>setSelectedModuleId(m.id),
                                            style: {
                                                border: selectedModuleId === m.id ? '4px solid var(--grey-900)' : editingModuleId === m.id ? '1px solid var(--blue-900)' : '1px solid var(--grey-300)',
                                                backgroundColor: editingModuleId === m.id ? 'var(--grey-100)' : undefined,
                                                padding: '12px',
                                                display: 'grid',
                                                gap: '8px',
                                                cursor: 'pointer'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    gap: '12px',
                                                    flexWrap: 'wrap'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "link link--large",
                                                                style: {
                                                                    color: 'inherit'
                                                                },
                                                                children: [
                                                                    m.order_index,
                                                                    ". ",
                                                                    m.title
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                                lineNumber: 602,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text",
                                                                style: {
                                                                    opacity: 0.8
                                                                },
                                                                children: [
                                                                    "accesso: ",
                                                                    m.access_level,
                                                                    " ",
                                                                    m.is_published ? '· pubblicato' : '· bozza'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                                lineNumber: 605,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                        lineNumber: 601,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            gap: '8px',
                                                            flexWrap: 'wrap',
                                                            alignItems: 'center'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "link",
                                                                type: "button",
                                                                onClick: ()=>void reorderModule(m.id, 'up'),
                                                                disabled: busy || idx === 0,
                                                                style: {
                                                                    ...linkButtonStyle,
                                                                    opacity: busy || idx === 0 ? 0.4 : 1
                                                                },
                                                                children: "↑"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                                lineNumber: 611,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "link",
                                                                type: "button",
                                                                onClick: ()=>void reorderModule(m.id, 'down'),
                                                                disabled: busy || idx === sortedModules.length - 1,
                                                                style: {
                                                                    ...linkButtonStyle,
                                                                    opacity: busy || idx === sortedModules.length - 1 ? 0.4 : 1
                                                                },
                                                                children: "↓"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                                lineNumber: 620,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "link",
                                                                type: "button",
                                                                onClick: ()=>openEditModuleDialog(m),
                                                                disabled: busy,
                                                                style: linkButtonStyle,
                                                                children: "Modifica"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                                lineNumber: 629,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "link",
                                                                type: "button",
                                                                onClick: ()=>void deleteModule(m.id),
                                                                disabled: busy,
                                                                style: linkButtonStyle,
                                                                children: "Elimina"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                                lineNumber: 632,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                        lineNumber: 610,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                lineNumber: 600,
                                                columnNumber: 19
                                            }, this)
                                        }, m.id, false, {
                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                            lineNumber: 583,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                    lineNumber: 581,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                            lineNumber: 567,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                        lineNumber: 566,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gap: '16px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                border: '1px solid var(--grey-300)',
                                backgroundColor: 'var(--white)',
                                padding: 'var(--spacing-2xl)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        alignItems: 'baseline',
                                        justifyContent: 'space-between',
                                        gap: '12px',
                                        marginBottom: 'var(--spacing-m)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "title title--md",
                                            children: [
                                                "Lezioni (",
                                                activeModuleLessons.length,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                            lineNumber: 652,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "link",
                                            type: "button",
                                            onClick: ()=>openNewLessonDialog(),
                                            disabled: busy,
                                            style: linkButtonStyle,
                                            children: "Nuova lezione"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                            lineNumber: 653,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                    lineNumber: 651,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'grid',
                                        gap: '10px'
                                    },
                                    children: [
                                        activeModuleLessons.map((l, lessonIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    border: '1px solid var(--grey-300)',
                                                    backgroundColor: 'var(--white)',
                                                    padding: '12px',
                                                    display: 'grid',
                                                    gap: '8px'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        gap: '12px',
                                                        flexWrap: 'wrap'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "link link--large",
                                                                    style: {
                                                                        color: 'inherit'
                                                                    },
                                                                    children: [
                                                                        modulesById[l.module_id]?.order_index ?? '?',
                                                                        ".",
                                                                        l.lesson_index,
                                                                        ". ",
                                                                        l.title
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                                    lineNumber: 672,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text",
                                                                    style: {
                                                                        opacity: 0.8
                                                                    },
                                                                    children: [
                                                                        "modulo: ",
                                                                        modulesById[l.module_id]?.title ?? l.module_id,
                                                                        " · slug: ",
                                                                        l.slug,
                                                                        " ",
                                                                        l.is_published ? '· pubblicata' : '· bozza'
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                                    lineNumber: 675,
                                                                    columnNumber: 23
                                                                }, this),
                                                                l.skills ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text",
                                                                    style: {
                                                                        opacity: 0.8
                                                                    },
                                                                    children: [
                                                                        "skills: ",
                                                                        l.skills
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                                    lineNumber: 679,
                                                                    columnNumber: 25
                                                                }, this) : null
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                            lineNumber: 671,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                gap: '8px',
                                                                flexWrap: 'wrap',
                                                                alignItems: 'center'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "link",
                                                                    type: "button",
                                                                    onClick: ()=>void reorder(l.id, 'up'),
                                                                    disabled: busy || lessonIdx === 0,
                                                                    style: {
                                                                        ...linkButtonStyle,
                                                                        opacity: busy || lessonIdx === 0 ? 0.4 : 1
                                                                    },
                                                                    children: "↑"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                                    lineNumber: 686,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "link",
                                                                    type: "button",
                                                                    onClick: ()=>void reorder(l.id, 'down'),
                                                                    disabled: busy || lessonIdx === activeModuleLessons.length - 1,
                                                                    style: {
                                                                        ...linkButtonStyle,
                                                                        opacity: busy || lessonIdx === activeModuleLessons.length - 1 ? 0.4 : 1
                                                                    },
                                                                    children: "↓"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                                    lineNumber: 695,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "link",
                                                                    type: "button",
                                                                    onClick: ()=>openEditLessonDialog(l),
                                                                    disabled: busy,
                                                                    style: linkButtonStyle,
                                                                    children: "Modifica"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                                    lineNumber: 704,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "link",
                                                                    type: "button",
                                                                    onClick: ()=>void deleteLesson(l.id),
                                                                    disabled: busy,
                                                                    style: linkButtonStyle,
                                                                    children: "Elimina"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                                    lineNumber: 707,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                            lineNumber: 685,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                    lineNumber: 670,
                                                    columnNumber: 19
                                                }, this)
                                            }, l.id, false, {
                                                fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                lineNumber: 660,
                                                columnNumber: 17
                                            }, this)),
                                        !activeModuleLessons.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text",
                                            style: {
                                                opacity: 0.8
                                            },
                                            children: "Nessuna lezione nel modulo attivo."
                                        }, void 0, false, {
                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                            lineNumber: 716,
                                            columnNumber: 17
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                    lineNumber: 658,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                            lineNumber: 644,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                        lineNumber: 643,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                lineNumber: 558,
                columnNumber: 7
            }, this),
            moduleDialogOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "dialog",
                "aria-modal": "true",
                onClick: ()=>{
                    closeModuleDialog();
                },
                style: {
                    position: 'fixed',
                    inset: 0,
                    zIndex: 1000,
                    backgroundColor: 'rgba(0, 0, 0, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: (e)=>e.stopPropagation(),
                    style: {
                        width: '100%',
                        maxWidth: '720px',
                        border: '1px solid var(--grey-300)',
                        backgroundColor: 'var(--white)',
                        padding: 'var(--spacing-2xl)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'baseline',
                                justifyContent: 'space-between',
                                gap: '12px',
                                marginBottom: 'var(--spacing-l)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "title title--md",
                                    children: moduleFormMode === 'create' ? 'Nuovo modulo' : 'Modifica modulo'
                                }, void 0, false, {
                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                    lineNumber: 762,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "link",
                                    type: "button",
                                    onClick: ()=>closeModuleDialog(),
                                    disabled: busy,
                                    style: linkButtonStyle,
                                    children: "Chiudi"
                                }, void 0, false, {
                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                    lineNumber: 763,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                            lineNumber: 753,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'grid',
                                gap: '12px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text",
                                    children: [
                                        "Titolo",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: newModuleTitle,
                                            onChange: (e)=>setNewModuleTitle(e.target.value),
                                            style: {
                                                width: '100%',
                                                padding: '10px',
                                                marginTop: '6px'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                            lineNumber: 771,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                    lineNumber: 769,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text",
                                    children: [
                                        "Accesso",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: newModuleAccessLevel,
                                            onChange: (e)=>setNewModuleAccessLevel(e.target.value === 'paid' ? 'paid' : 'free'),
                                            style: {
                                                display: 'block',
                                                width: '100%',
                                                maxWidth: '220px',
                                                padding: '10px',
                                                marginTop: '6px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "free",
                                                    children: "free"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                    lineNumber: 785,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "paid",
                                                    children: "paid"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                    lineNumber: 786,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                            lineNumber: 780,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                    lineNumber: 778,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text",
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            checked: newModulePublished,
                                            onChange: (e)=>setNewModulePublished(e.target.checked),
                                            type: "checkbox"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                            lineNumber: 791,
                                            columnNumber: 17
                                        }, this),
                                        "Pubblicato"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                    lineNumber: 790,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '12px',
                                        flexWrap: 'wrap'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "link",
                                            type: "button",
                                            onClick: ()=>void createModule(),
                                            disabled: busy,
                                            style: linkButtonStyle,
                                            children: moduleFormMode === 'create' ? 'Crea' : 'Salva'
                                        }, void 0, false, {
                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                            lineNumber: 796,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "link",
                                            type: "button",
                                            onClick: ()=>closeModuleDialog(),
                                            disabled: busy,
                                            style: linkButtonStyle,
                                            children: "Annulla"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                            lineNumber: 799,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                    lineNumber: 795,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                            lineNumber: 768,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                    lineNumber: 743,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                lineNumber: 726,
                columnNumber: 9
            }, this) : null,
            lessonDialogOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "dialog",
                "aria-modal": "true",
                onClick: ()=>{
                    closeLessonDialog();
                },
                style: {
                    position: 'fixed',
                    inset: 0,
                    zIndex: 1000,
                    backgroundColor: 'rgba(0, 0, 0, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '24px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: (e)=>e.stopPropagation(),
                    style: {
                        width: '100%',
                        maxWidth: '860px',
                        border: '1px solid var(--grey-300)',
                        backgroundColor: 'var(--white)',
                        padding: 'var(--spacing-2xl)',
                        maxHeight: '90vh',
                        overflow: 'auto'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'baseline',
                                justifyContent: 'space-between',
                                gap: '12px',
                                marginBottom: 'var(--spacing-l)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "title title--md",
                                    children: formMode === 'create' ? 'Nuova lezione' : 'Modifica lezione'
                                }, void 0, false, {
                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                    lineNumber: 847,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "link",
                                    type: "button",
                                    onClick: ()=>closeLessonDialog(),
                                    disabled: busy,
                                    style: linkButtonStyle,
                                    children: "Chiudi"
                                }, void 0, false, {
                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                    lineNumber: 848,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                            lineNumber: 838,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: (e)=>{
                                e.preventDefault();
                                void onSubmit(e);
                            },
                            style: {
                                display: 'grid',
                                gap: '12px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text",
                                    children: [
                                        "Titolo",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: title,
                                            onChange: (e)=>setTitle(e.target.value),
                                            style: {
                                                width: '100%',
                                                padding: '10px',
                                                marginTop: '6px'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                            lineNumber: 862,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                    lineNumber: 860,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text",
                                    style: {
                                        display: 'grid',
                                        gap: '6px'
                                    },
                                    children: [
                                        "Tipo lezione",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: lessonType,
                                            onChange: (e)=>setLessonType(e.target.value === 'intermezzo' ? 'intermezzo' : e.target.value === 'milestone' ? 'milestone' : 'esercizio'),
                                            style: {
                                                width: '100%',
                                                padding: '10px',
                                                display: 'block',
                                                maxWidth: '260px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "esercizio",
                                                    children: "esercizio"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                    lineNumber: 880,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "intermezzo",
                                                    children: "intermezzo"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                    lineNumber: 881,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "milestone",
                                                    children: "milestone"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                    lineNumber: 882,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                            lineNumber: 867,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                    lineNumber: 865,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text",
                                    children: [
                                        "Modulo",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: moduleId,
                                            onChange: (e)=>setModuleId(e.target.value),
                                            style: {
                                                width: '100%',
                                                padding: '10px',
                                                marginTop: '6px'
                                            },
                                            children: modules.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: m.id,
                                                    children: [
                                                        m.order_index,
                                                        ". ",
                                                        m.title,
                                                        " (",
                                                        m.access_level,
                                                        m.is_published ? '' : ', bozza',
                                                        ")"
                                                    ]
                                                }, m.id, true, {
                                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                                    lineNumber: 890,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                            lineNumber: 888,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                    lineNumber: 886,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text",
                                    children: [
                                        "Descrizione",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: description,
                                            onChange: (e)=>setDescription(e.target.value),
                                            rows: 3,
                                            style: {
                                                width: '100%',
                                                padding: '10px',
                                                marginTop: '6px'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                            lineNumber: 899,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                    lineNumber: 897,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text",
                                    children: [
                                        "Skills",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: skills,
                                            onChange: (e)=>setSkills(e.target.value),
                                            rows: 3,
                                            style: {
                                                width: '100%',
                                                padding: '10px',
                                                marginTop: '6px'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                            lineNumber: 904,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                    lineNumber: 902,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text",
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            checked: showVideo,
                                            onChange: (e)=>{
                                                const next = e.target.checked;
                                                setShowVideo(next);
                                                if (!next) setVideoUrl('');
                                            },
                                            type: "checkbox"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                            lineNumber: 908,
                                            columnNumber: 17
                                        }, this),
                                        "Mostra video"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                    lineNumber: 907,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text",
                                    children: [
                                        "Link video",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: videoUrl,
                                            onChange: (e)=>setVideoUrl(e.target.value),
                                            disabled: !showVideo,
                                            style: {
                                                width: '100%',
                                                padding: '10px',
                                                marginTop: '6px'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                            lineNumber: 922,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                    lineNumber: 920,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text",
                                    children: [
                                        "Contenuto (md)",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: content,
                                            onChange: (e)=>setContent(e.target.value),
                                            rows: 10,
                                            style: {
                                                width: '100%',
                                                padding: '10px',
                                                marginTop: '6px',
                                                fontFamily: 'monospace'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                            lineNumber: 932,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                    lineNumber: 930,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text",
                                    style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            checked: isPublished,
                                            onChange: (e)=>setIsPublished(e.target.checked),
                                            type: "checkbox"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                            lineNumber: 936,
                                            columnNumber: 17
                                        }, this),
                                        "Pubblicata"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                    lineNumber: 935,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '12px',
                                        flexWrap: 'wrap'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "link",
                                            type: "submit",
                                            disabled: busy,
                                            style: linkButtonStyle,
                                            children: formMode === 'create' ? 'Crea' : 'Salva'
                                        }, void 0, false, {
                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                            lineNumber: 941,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "link",
                                            type: "button",
                                            onClick: ()=>closeLessonDialog(),
                                            disabled: busy,
                                            style: linkButtonStyle,
                                            children: "Annulla"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                            lineNumber: 944,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "link",
                                            type: "button",
                                            onClick: ()=>void load(),
                                            disabled: busy,
                                            style: linkButtonStyle,
                                            children: "Ricarica"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                            lineNumber: 947,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                                    lineNumber: 940,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                            lineNumber: 853,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                    lineNumber: 826,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
                lineNumber: 809,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/app/dev/lessons/DevLessonsClient.tsx",
        lineNumber: 551,
        columnNumber: 5
    }, this);
}
_s(DevLessonsClient, "YuU9l5Hh3Bc9CgF80reWhQJF89I=");
_c = DevLessonsClient;
var _c;
__turbopack_context__.k.register(_c, "DevLessonsClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=_85612de6._.js.map
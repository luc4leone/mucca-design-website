(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2d$browser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase-browser.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/marked/lib/marked.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function DashboardPage() {
    _s();
    const supabaseUrl = ("TURBOPACK compile-time value", "https://khjyueuersxyrlgbbhgs.supabase.co");
    const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtoanl1ZXVlcnN4eXJsZ2JiaGdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5ODQ3NjQsImV4cCI6MjA4MTU2MDc2NH0.dHGDBRrXWd4zgE60xHenzFmBlo8k1R1sENaruvJfjrY");
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardPage.useMemo[supabase]": ()=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2d$browser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSupabaseBrowserClient"])(supabaseUrl, supabaseAnonKey);
        }
    }["DashboardPage.useMemo[supabase]"], [
        supabaseUrl,
        supabaseAnonKey
    ]);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Caricamento...');
    const [modules, setModules] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [lessons, setLessons] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [lessonsSummary, setLessonsSummary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedModuleId, setSelectedModuleId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [authedEmail, setAuthedEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [completionByLessonId, setCompletionByLessonId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [accessByModuleId, setAccessByModuleId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const accessByModuleIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const [milestoneByModuleId, setMilestoneByModuleId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [milestoneProgressByModuleId, setMilestoneProgressByModuleId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    function formatMilestoneStatus(statusValue) {
        if (statusValue === 'passed') return 'superata';
        if (statusValue === 'submitted') return 'in revisione';
        if (statusValue === 'failed') return 'non superata';
        return 'non inviata';
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            if (!supabase) {
                setStatus('Configurazione mancante: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
                return;
            }
            const supabaseClient = supabase;
            let cancelled = false;
            let channel = null;
            async function loadCompletion(userId) {
                const { data, error } = await supabaseClient.from('user_progress').select('lesson_id,completed').eq('user_id', userId).eq('completed', true);
                if (cancelled) return;
                if (error) {
                    return;
                }
                const map = {};
                (data ?? []).forEach({
                    "DashboardPage.useEffect.loadCompletion": (row)=>{
                        if (row.completed) {
                            map[row.lesson_id] = true;
                        }
                    }
                }["DashboardPage.useEffect.loadCompletion"]);
                setCompletionByLessonId(map);
            }
            async function loadLessonsMeta(accessToken) {
                const res = await fetch('/api/dashboard/lessons', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                const json = await res.json().catch({
                    "DashboardPage.useEffect.loadLessonsMeta": ()=>null
                }["DashboardPage.useEffect.loadLessonsMeta"]);
                if (!res.ok || !json?.ok) {
                    const message = typeof json?.error === 'string' ? json.error : 'Impossibile caricare le lezioni.';
                    throw new Error(message);
                }
                return {
                    lessons: json.lessons ?? [],
                    summary: json.summary ?? null
                };
            }
            ({
                "DashboardPage.useEffect": async ()=>{
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
                    const [{ data: modulesData, error: modulesError }, { data: milestonesData, error: milestonesError }, { data: milestoneProgressData, error: milestoneProgressError }] = await Promise.all([
                        supabaseClient.from('modules').select('id,title,order_index,access_level').eq('is_published', true).order('order_index', {
                            ascending: true
                        }),
                        supabaseClient.from('module_milestones').select('module_id,title,description'),
                        supabaseClient.from('module_milestone_progress').select('module_id,status')
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
                    const moduleList = modulesData ?? [];
                    setModules(moduleList);
                    const milestoneMap = {};
                    (milestonesData ?? []).forEach({
                        "DashboardPage.useEffect": (m)=>{
                            milestoneMap[m.module_id] = m;
                        }
                    }["DashboardPage.useEffect"]);
                    setMilestoneByModuleId(milestoneMap);
                    const milestoneProgressMap = {};
                    (milestoneProgressData ?? []).forEach({
                        "DashboardPage.useEffect": (row)=>{
                            milestoneProgressMap[row.module_id] = row;
                        }
                    }["DashboardPage.useEffect"]);
                    setMilestoneProgressByModuleId(milestoneProgressMap);
                    const accessPairs = await Promise.all(moduleList.map({
                        "DashboardPage.useEffect": async (m)=>{
                            const { data, error } = await supabaseClient.rpc('can_access_module', {
                                p_module_id: m.id
                            });
                            if (error) {
                                return [
                                    m.id,
                                    false
                                ];
                            }
                            return [
                                m.id,
                                Boolean(data)
                            ];
                        }
                    }["DashboardPage.useEffect"]));
                    const accessMap = {};
                    accessPairs.forEach({
                        "DashboardPage.useEffect": ([id, canAccess])=>{
                            accessMap[id] = canAccess;
                        }
                    }["DashboardPage.useEffect"]);
                    setAccessByModuleId(accessMap);
                    accessByModuleIdRef.current = accessMap;
                    setStatus('Carico le lezioni...');
                    let lessonsMeta = [];
                    try {
                        const res = await loadLessonsMeta(accessToken);
                        lessonsMeta = res.lessons;
                        setLessonsSummary(res.summary);
                    } catch (err) {
                        const message = err instanceof Error ? err.message : String(err);
                        setStatus(`Errore lezioni: ${message}`);
                        return;
                    }
                    const missingLessonType = lessonsMeta.some({
                        "DashboardPage.useEffect.missingLessonType": (l)=>!l.lesson_type
                    }["DashboardPage.useEffect.missingLessonType"]);
                    if (missingLessonType) {
                        const lessonIds = lessonsMeta.map({
                            "DashboardPage.useEffect.lessonIds": (l)=>l.id
                        }["DashboardPage.useEffect.lessonIds"]).filter(Boolean);
                        if (lessonIds.length) {
                            const { data: lessonTypesData, error: lessonTypesError } = await supabaseClient.from('lessons').select('id,lesson_type').in('id', lessonIds);
                            if (!lessonTypesError) {
                                const lessonTypeById = {};
                                (lessonTypesData ?? []).forEach({
                                    "DashboardPage.useEffect": (row)=>{
                                        lessonTypeById[row.id] = row.lesson_type ?? null;
                                    }
                                }["DashboardPage.useEffect"]);
                                lessonsMeta = lessonsMeta.map({
                                    "DashboardPage.useEffect": (lesson)=>({
                                            ...lesson,
                                            lesson_type: lesson.lesson_type ?? lessonTypeById[lesson.id] ?? null
                                        })
                                }["DashboardPage.useEffect"]);
                            }
                        }
                    }
                    setLessons(lessonsMeta ?? []);
                    await loadCompletion(userId);
                    setStatus('');
                    channel = supabaseClient.channel('user_progress_changes').on('postgres_changes', {
                        event: '*',
                        schema: 'public',
                        table: 'user_progress',
                        filter: `user_id=eq.${userId}`
                    }, {
                        "DashboardPage.useEffect": async ()=>{
                            await loadCompletion(userId);
                        }
                    }["DashboardPage.useEffect"]).subscribe();
                }
            })["DashboardPage.useEffect"]();
            return ({
                "DashboardPage.useEffect": ()=>{
                    cancelled = true;
                    if (channel) {
                        supabaseClient.removeChannel(channel);
                    }
                }
            })["DashboardPage.useEffect"];
        }
    }["DashboardPage.useEffect"], [
        supabase
    ]);
    const lessonsByModuleId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardPage.useMemo[lessonsByModuleId]": ()=>{
            const map = {};
            lessons.forEach({
                "DashboardPage.useMemo[lessonsByModuleId]": (l)=>{
                    if (!map[l.module_id]) {
                        map[l.module_id] = [];
                    }
                    map[l.module_id].push(l);
                }
            }["DashboardPage.useMemo[lessonsByModuleId]"]);
            Object.keys(map).forEach({
                "DashboardPage.useMemo[lessonsByModuleId]": (moduleId)=>{
                    map[moduleId] = map[moduleId].slice().sort({
                        "DashboardPage.useMemo[lessonsByModuleId]": (a, b)=>{
                            if (a.lesson_index !== b.lesson_index) {
                                return a.lesson_index - b.lesson_index;
                            }
                            return a.order_index - b.order_index;
                        }
                    }["DashboardPage.useMemo[lessonsByModuleId]"]);
                }
            }["DashboardPage.useMemo[lessonsByModuleId]"]);
            return map;
        }
    }["DashboardPage.useMemo[lessonsByModuleId]"], [
        lessons
    ]);
    const selectedModuleIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardPage.useMemo[selectedModuleIndex]": ()=>{
            return modules.findIndex({
                "DashboardPage.useMemo[selectedModuleIndex]": (m)=>m.id === selectedModuleId
            }["DashboardPage.useMemo[selectedModuleIndex]"]);
        }
    }["DashboardPage.useMemo[selectedModuleIndex]"], [
        modules,
        selectedModuleId
    ]);
    const selectedModule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardPage.useMemo[selectedModule]": ()=>{
            return modules.find({
                "DashboardPage.useMemo[selectedModule]": (m)=>m.id === selectedModuleId
            }["DashboardPage.useMemo[selectedModule]"]) ?? null;
        }
    }["DashboardPage.useMemo[selectedModule]"], [
        modules,
        selectedModuleId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            if (selectedModuleId) return;
            if (!modules.length) return;
            setSelectedModuleId(modules[0]?.id ?? '');
        }
    }["DashboardPage.useEffect"], [
        modules,
        selectedModuleId
    ]);
    const progressStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardPage.useMemo[progressStats]": ()=>{
            const totalModules = lessonsSummary?.total_modules ?? modules.length;
            const unlockedModules = modules.filter({
                "DashboardPage.useMemo[progressStats].unlockedModules": (m)=>Boolean(accessByModuleId[m.id])
            }["DashboardPage.useMemo[progressStats].unlockedModules"]);
            const unlockedModulesCount = unlockedModules.length;
            const publishedLessonIds = lessons.map({
                "DashboardPage.useMemo[progressStats].publishedLessonIds": (l)=>l.id
            }["DashboardPage.useMemo[progressStats].publishedLessonIds"]);
            const totalLessons = lessonsSummary?.total_lessons ?? publishedLessonIds.length;
            const completedLessons = publishedLessonIds.reduce({
                "DashboardPage.useMemo[progressStats].completedLessons": (acc, id)=>acc + (completionByLessonId[id] ? 1 : 0)
            }["DashboardPage.useMemo[progressStats].completedLessons"], 0);
            const unlockedLessons = lessons.filter({
                "DashboardPage.useMemo[progressStats].unlockedLessons": (l)=>Boolean(accessByModuleId[l.module_id])
            }["DashboardPage.useMemo[progressStats].unlockedLessons"]);
            const completedUnlockedLessons = unlockedLessons.reduce({
                "DashboardPage.useMemo[progressStats].completedUnlockedLessons": (acc, l)=>acc + (completionByLessonId[l.id] ? 1 : 0)
            }["DashboardPage.useMemo[progressStats].completedUnlockedLessons"], 0);
            const totalUnlockedLessons = unlockedLessons.length;
            const completedUnlockedModules = unlockedModules.reduce({
                "DashboardPage.useMemo[progressStats].completedUnlockedModules": (acc, m)=>{
                    const moduleLessons = lessonsByModuleId[m.id] ?? [];
                    if (!moduleLessons.length) return acc;
                    const allDone = moduleLessons.every({
                        "DashboardPage.useMemo[progressStats].completedUnlockedModules.allDone": (l)=>Boolean(completionByLessonId[l.id])
                    }["DashboardPage.useMemo[progressStats].completedUnlockedModules.allDone"]);
                    return acc + (allDone ? 1 : 0);
                }
            }["DashboardPage.useMemo[progressStats].completedUnlockedModules"], 0);
            const percentage = totalLessons ? completedLessons / totalLessons * 100 : 0;
            return {
                totalModules,
                unlockedModulesCount,
                completedUnlockedModules,
                totalUnlockedLessons,
                completedUnlockedLessons,
                totalLessons,
                completedLessons,
                percentage
            };
        }
    }["DashboardPage.useMemo[progressStats]"], [
        modules,
        lessons,
        lessonsSummary,
        accessByModuleId,
        completionByLessonId,
        lessonsByModuleId
    ]);
    const progressPercentage = Number.isFinite(progressStats.percentage) ? Math.max(0, Math.min(100, progressStats.percentage)) : 0;
    const progressLabelPercentage = Math.round(progressPercentage);
    function renderLessonSkills(rawSkills) {
        if (!rawSkills?.trim()) return null;
        const html = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["marked"].parse(rawSkills);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text lesson-skills-markdown",
            style: {
                opacity: 0.8,
                marginTop: '6px'
            },
            dangerouslySetInnerHTML: {
                __html: html
            }
        }, void 0, false, {
            fileName: "[project]/app/dashboard/page.tsx",
            lineNumber: 373,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            maxWidth: '1080px',
            margin: '0 auto',
            padding: '0 20px'
        },
        className: "jsx-c60149f26a40b28f",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "c60149f26a40b28f",
                children: ".lesson-skills-markdown ul,.lesson-skills-markdown ol{margin-top:0}.lesson-skills-markdown h4{margin-bottom:0}.dashboard-lesson-card{transition:background-color .12s}.dashboard-lesson-card:hover{background-color:var(--grey-200)!important}.dashboard-module-card{transition:background-color .12s}.dashboard-module-card:hover{background-color:var(--grey-200)!important}"
            }, void 0, false, void 0, this),
            status ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 'var(--spacing-l)'
                },
                className: "jsx-c60149f26a40b28f" + " " + "text",
                children: status
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 417,
                columnNumber: 17
            }, this) : null,
            modules.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'start'
                },
                className: "jsx-c60149f26a40b28f",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            display: 'grid',
                            gap: '12px',
                            alignContent: 'start'
                        },
                        className: "jsx-c60149f26a40b28f",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    minHeight: '56px',
                                    paddingTop: '16px'
                                },
                                className: "jsx-c60149f26a40b28f",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                                    className: "jsx-c60149f26a40b28f",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                            style: {
                                                cursor: 'pointer'
                                            },
                                            className: "jsx-c60149f26a40b28f" + " " + "link",
                                            children: "Vuoi accedere a tutti i moduli?"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 430,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                margin: '8px 0 0',
                                                maxWidth: '42ch',
                                                fontSize: 'var(--font-size-sm)',
                                                lineHeight: 'var(--line-height-normal)'
                                            },
                                            className: "jsx-c60149f26a40b28f" + " " + "text",
                                            children: [
                                                "Per accedere ai moduli successivi al primo devi",
                                                ' ',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/pricing",
                                                    className: "link",
                                                    style: {
                                                        fontFamily: 'var(--font-family-serif)',
                                                        fontSize: 'var(--font-size-sm)'
                                                    },
                                                    children: "sottoscrivere un abbonamento mensile"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                    lineNumber: 444,
                                                    columnNumber: 19
                                                }, this),
                                                "."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 434,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 429,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 428,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    border: '1px solid var(--grey-300)',
                                    padding: '16px'
                                },
                                className: "jsx-c60149f26a40b28f",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: '12px'
                                        },
                                        className: "jsx-c60149f26a40b28f" + " " + "title title--md",
                                        children: "Moduli"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 465,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'grid',
                                            gap: '10px'
                                        },
                                        className: "jsx-c60149f26a40b28f",
                                        children: modules.map((m)=>{
                                            const active = m.id === selectedModuleId;
                                            const canAccess = Boolean(accessByModuleId[m.id]);
                                            const moduleLessons = lessonsByModuleId[m.id] ?? [];
                                            const isCompleted = moduleLessons.length > 0 && moduleLessons.every((l)=>Boolean(completionByLessonId[l.id]));
                                            const backgroundColor = !canAccess ? 'var(--white)' : isCompleted ? '#dcfce7' : 'var(--white)';
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setSelectedModuleId(m.id),
                                                style: {
                                                    border: active ? '4px solid var(--grey-900)' : '1px solid var(--grey-300)',
                                                    backgroundColor,
                                                    padding: '12px',
                                                    textAlign: 'left',
                                                    cursor: 'pointer'
                                                },
                                                className: "jsx-c60149f26a40b28f" + " " + "dashboard-module-card",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            opacity: 0.8,
                                                            marginBottom: '6px',
                                                            fontSize: 'var(--font-size-sm)',
                                                            display: 'flex',
                                                            gap: '8px',
                                                            flexWrap: 'wrap'
                                                        },
                                                        className: "jsx-c60149f26a40b28f" + " " + "text",
                                                        children: [
                                                            canAccess ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    padding: '2px 10px',
                                                                    borderRadius: '999px',
                                                                    border: '1px solid var(--grey-500)',
                                                                    backgroundColor: 'transparent',
                                                                    color: 'var(--grey-900)',
                                                                    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                                                                    fontSize: '14px',
                                                                    lineHeight: 1.2
                                                                },
                                                                className: "jsx-c60149f26a40b28f",
                                                                children: "sbloccato"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 504,
                                                                columnNumber: 27
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    padding: '2px 10px',
                                                                    borderRadius: '999px',
                                                                    border: '1px solid #ef4444',
                                                                    backgroundColor: '#fee2e2',
                                                                    color: '#991b1b',
                                                                    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                                                                    fontSize: '14px',
                                                                    lineHeight: 1.2
                                                                },
                                                                className: "jsx-c60149f26a40b28f",
                                                                children: "bloccato"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 522,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    padding: '2px 10px',
                                                                    borderRadius: '999px',
                                                                    border: '1px solid var(--grey-500)',
                                                                    backgroundColor: 'var(--grey-200)',
                                                                    color: 'var(--grey-900)',
                                                                    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                                                                    fontSize: '14px',
                                                                    lineHeight: 1.2
                                                                },
                                                                className: "jsx-c60149f26a40b28f",
                                                                children: [
                                                                    moduleLessons.length,
                                                                    " lezioni"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 541,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 492,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            color: 'inherit'
                                                        },
                                                        className: "jsx-c60149f26a40b28f" + " " + "link",
                                                        children: m.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 560,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, m.id, true, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 479,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 469,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 459,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 427,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 2,
                            display: 'grid',
                            gap: '12px',
                            alignContent: 'start'
                        },
                        className: "jsx-c60149f26a40b28f",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    minHeight: '56px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    justifySelf: 'start',
                                    width: '100%'
                                },
                                className: "jsx-c60149f26a40b28f",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginBottom: 'var(--spacing-xs)',
                                            fontSize: 'var(--font-size-sm)'
                                        },
                                        className: "jsx-c60149f26a40b28f" + " " + "text",
                                        children: [
                                            "Lezioni: ",
                                            progressStats.completedLessons,
                                            " di ",
                                            progressStats.totalLessons,
                                            " completate ~",
                                            progressLabelPercentage,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 581,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: '100%',
                                            height: '8px',
                                            border: '1px solid var(--grey-300)',
                                            backgroundColor: 'var(--grey-100, #f3f4f6)',
                                            overflow: 'hidden'
                                        },
                                        className: "jsx-c60149f26a40b28f",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: `${progressPercentage}%`,
                                                height: '100%',
                                                backgroundColor: 'var(--grey-900)'
                                            },
                                            className: "jsx-c60149f26a40b28f"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/page.tsx",
                                            lineNumber: 593,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 584,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 571,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    border: '1px solid var(--grey-300)',
                                    padding: '16px'
                                },
                                className: "jsx-c60149f26a40b28f",
                                children: selectedModule ? (()=>{
                                    const m = selectedModule;
                                    const canAccess = Boolean(accessByModuleId[m.id]);
                                    const moduleLessons = lessonsByModuleId[m.id] ?? [];
                                    const milestone = milestoneByModuleId[m.id];
                                    const milestoneProgress = milestoneProgressByModuleId[m.id];
                                    const prevModule = selectedModuleIndex > 0 ? modules[selectedModuleIndex - 1] : null;
                                    const prevMilestone = prevModule ? milestoneByModuleId[prevModule.id] : null;
                                    const prevMilestoneProgress = prevModule ? milestoneProgressByModuleId[prevModule.id] : null;
                                    const prevPassed = prevMilestoneProgress?.status === 'passed';
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-c60149f26a40b28f",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginBottom: '6px'
                                                },
                                                className: "jsx-c60149f26a40b28f" + " " + "title title--md",
                                                children: m.title
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 623,
                                                columnNumber: 19
                                            }, this),
                                            milestone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginBottom: '12px'
                                                },
                                                className: "jsx-c60149f26a40b28f",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            opacity: 0.8
                                                        },
                                                        className: "jsx-c60149f26a40b28f" + " " + "text",
                                                        children: [
                                                            "milestone: ",
                                                            milestone.title,
                                                            milestoneProgress ? ` · ${formatMilestoneStatus(milestoneProgress.status)}` : ''
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 629,
                                                        columnNumber: 23
                                                    }, this),
                                                    milestone.description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-c60149f26a40b28f" + " " + "text",
                                                        children: milestone.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 633,
                                                        columnNumber: 48
                                                    }, this) : null
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 628,
                                                columnNumber: 21
                                            }, this) : null,
                                            !canAccess ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-c60149f26a40b28f" + " " + "text",
                                                children: [
                                                    m.access_level === 'paid' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-c60149f26a40b28f",
                                                        children: "Bloccato: serve un abbonamento attivo."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 639,
                                                        columnNumber: 52
                                                    }, this) : null,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            opacity: 0.8,
                                                            marginTop: m.access_level === 'paid' ? '6px' : undefined
                                                        },
                                                        className: "jsx-c60149f26a40b28f",
                                                        children: "Le lezioni sono visibili, ma disabilitate finché il modulo è bloccato."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 641,
                                                        columnNumber: 23
                                                    }, this),
                                                    prevModule && !prevPassed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    marginTop: m.access_level === 'paid' ? '6px' : undefined
                                                                },
                                                                className: "jsx-c60149f26a40b28f",
                                                                children: "Bloccato: serve la milestone del modulo precedente."
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 647,
                                                                columnNumber: 27
                                                            }, this),
                                                            prevMilestone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    opacity: 0.8,
                                                                    marginTop: '6px'
                                                                },
                                                                className: "jsx-c60149f26a40b28f",
                                                                children: [
                                                                    prevModule.title,
                                                                    " · milestone: ",
                                                                    prevMilestone.title,
                                                                    prevMilestoneProgress ? ` · ${formatMilestoneStatus(prevMilestoneProgress.status)}` : ' · non inviata'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 651,
                                                                columnNumber: 29
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    opacity: 0.8,
                                                                    marginTop: '6px'
                                                                },
                                                                className: "jsx-c60149f26a40b28f",
                                                                children: prevModule.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 656,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true) : null,
                                                    m.access_level !== 'paid' && !prevModule ? 'Bloccato.' : null,
                                                    moduleLessons.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'grid',
                                                            gap: '10px',
                                                            marginTop: '12px'
                                                        },
                                                        className: "jsx-c60149f26a40b28f",
                                                        children: moduleLessons.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    border: '1px solid var(--grey-300)',
                                                                    padding: '12px',
                                                                    opacity: 0.5,
                                                                    cursor: 'not-allowed'
                                                                },
                                                                "aria-disabled": true,
                                                                className: "jsx-c60149f26a40b28f",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            opacity: 0.8,
                                                                            marginBottom: '6px'
                                                                        },
                                                                        className: "jsx-c60149f26a40b28f" + " " + "text",
                                                                        children: "Bloccata"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                                        lineNumber: 676,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            marginBottom: '6px'
                                                                        },
                                                                        className: "jsx-c60149f26a40b28f" + " " + "link link--large",
                                                                        children: l.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                                        lineNumber: 679,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    l.description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-c60149f26a40b28f" + " " + "text",
                                                                        children: l.description
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                                        lineNumber: 682,
                                                                        columnNumber: 48
                                                                    }, this) : null,
                                                                    renderLessonSkills(l.skills)
                                                                ]
                                                            }, l.id, true, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 666,
                                                                columnNumber: 29
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 664,
                                                        columnNumber: 25
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            marginTop: '12px'
                                                        },
                                                        className: "jsx-c60149f26a40b28f" + " " + "text",
                                                        children: "Nessuna lezione disponibile."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 688,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 638,
                                                columnNumber: 21
                                            }, this) : moduleLessons.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'grid',
                                                    gap: '10px'
                                                },
                                                className: "jsx-c60149f26a40b28f",
                                                children: moduleLessons.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: `/dashboard/lessons/${encodeURIComponent(l.public_id)}`,
                                                        style: {
                                                            color: 'inherit',
                                                            textDecoration: 'none'
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                border: '1px solid var(--grey-300)',
                                                                backgroundColor: 'var(--white)',
                                                                padding: '12px'
                                                            },
                                                            className: "jsx-c60149f26a40b28f" + " " + "dashboard-lesson-card",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        marginBottom: '6px',
                                                                        display: 'flex',
                                                                        gap: '8px',
                                                                        flexWrap: 'wrap'
                                                                    },
                                                                    className: "jsx-c60149f26a40b28f",
                                                                    children: [
                                                                        completionByLessonId[l.id] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            style: {
                                                                                display: 'inline-flex',
                                                                                alignItems: 'center',
                                                                                padding: '2px 10px',
                                                                                borderRadius: '999px',
                                                                                border: '1px solid #4ade80',
                                                                                backgroundColor: '#dcfce7',
                                                                                color: 'var(--green-700)',
                                                                                fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                                                                                fontSize: '14px',
                                                                                lineHeight: 1.2
                                                                            },
                                                                            className: "jsx-c60149f26a40b28f",
                                                                            children: "completata"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                                            lineNumber: 714,
                                                                            columnNumber: 33
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            style: {
                                                                                display: 'inline-flex',
                                                                                alignItems: 'center',
                                                                                padding: '2px 10px',
                                                                                borderRadius: '999px',
                                                                                border: '1px solid var(--grey-500)',
                                                                                backgroundColor: 'transparent',
                                                                                color: 'var(--grey-900)',
                                                                                fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                                                                                fontSize: '14px',
                                                                                lineHeight: 1.2
                                                                            },
                                                                            className: "jsx-c60149f26a40b28f",
                                                                            children: "da completare"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                                            lineNumber: 731,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            style: {
                                                                                display: 'inline-flex',
                                                                                alignItems: 'center',
                                                                                padding: '2px 10px',
                                                                                borderRadius: '999px',
                                                                                border: '1px solid var(--grey-500)',
                                                                                backgroundColor: 'var(--grey-300)',
                                                                                color: 'var(--grey-900)',
                                                                                fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
                                                                                fontSize: '14px',
                                                                                lineHeight: 1.2
                                                                            },
                                                                            className: "jsx-c60149f26a40b28f",
                                                                            children: l.lesson_type ?? 'esercizio'
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                                            lineNumber: 749,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 712,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        marginBottom: '6px'
                                                                    },
                                                                    className: "jsx-c60149f26a40b28f" + " " + "link link--large",
                                                                    children: l.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 766,
                                                                    columnNumber: 29
                                                                }, this),
                                                                l.description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-c60149f26a40b28f" + " " + "text",
                                                                    children: l.description
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 769,
                                                                    columnNumber: 46
                                                                }, this) : null,
                                                                renderLessonSkills(l.skills)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 704,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, l.id, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 696,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 694,
                                                columnNumber: 21
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-c60149f26a40b28f" + " " + "text",
                                                children: "Nessuna lezione disponibile."
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 776,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 622,
                                        columnNumber: 17
                                    }, this);
                                })() : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c60149f26a40b28f" + " " + "text",
                                    children: "Seleziona un modulo."
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 782,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 603,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 570,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 420,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-c60149f26a40b28f" + " " + "text",
                children: "Nessun modulo."
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 788,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/page.tsx",
        lineNumber: 382,
        columnNumber: 5
    }, this);
}
_s(DashboardPage, "8YDk4bTrEMfks3UUVOKGNUPi4UM=");
_c = DashboardPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/client-only/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/node_modules/styled-jsx/dist/index/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
__turbopack_context__.r("[project]/node_modules/next/dist/compiled/client-only/index.js [app-client] (ecmascript)");
var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
function _interopDefaultLegacy(e) {
    return e && typeof e === 'object' && 'default' in e ? e : {
        'default': e
    };
}
var React__default = /*#__PURE__*/ _interopDefaultLegacy(React);
/*
Based on Glamor's sheet
https://github.com/threepointone/glamor/blob/667b480d31b3721a905021b26e1290ce92ca2879/src/sheet.js
*/ function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
var isProd = typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== "undefined" && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env && ("TURBOPACK compile-time value", "development") === "production";
var isString = function(o) {
    return Object.prototype.toString.call(o) === "[object String]";
};
var StyleSheet = /*#__PURE__*/ function() {
    function StyleSheet(param) {
        var ref = param === void 0 ? {} : param, _name = ref.name, name = _name === void 0 ? "stylesheet" : _name, _optimizeForSpeed = ref.optimizeForSpeed, optimizeForSpeed = _optimizeForSpeed === void 0 ? isProd : _optimizeForSpeed;
        invariant$1(isString(name), "`name` must be a string");
        this._name = name;
        this._deletedRulePlaceholder = "#" + name + "-deleted-rule____{}";
        invariant$1(typeof optimizeForSpeed === "boolean", "`optimizeForSpeed` must be a boolean");
        this._optimizeForSpeed = optimizeForSpeed;
        this._serverSheet = undefined;
        this._tags = [];
        this._injected = false;
        this._rulesCount = 0;
        var node = typeof window !== "undefined" && document.querySelector('meta[property="csp-nonce"]');
        this._nonce = node ? node.getAttribute("content") : null;
    }
    var _proto = StyleSheet.prototype;
    _proto.setOptimizeForSpeed = function setOptimizeForSpeed(bool) {
        invariant$1(typeof bool === "boolean", "`setOptimizeForSpeed` accepts a boolean");
        invariant$1(this._rulesCount === 0, "optimizeForSpeed cannot be when rules have already been inserted");
        this.flush();
        this._optimizeForSpeed = bool;
        this.inject();
    };
    _proto.isOptimizeForSpeed = function isOptimizeForSpeed() {
        return this._optimizeForSpeed;
    };
    _proto.inject = function inject() {
        var _this = this;
        invariant$1(!this._injected, "sheet already injected");
        this._injected = true;
        if (typeof window !== "undefined" && this._optimizeForSpeed) {
            this._tags[0] = this.makeStyleTag(this._name);
            this._optimizeForSpeed = "insertRule" in this.getSheet();
            if (!this._optimizeForSpeed) {
                if ("TURBOPACK compile-time truthy", 1) {
                    console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode.");
                }
                this.flush();
                this._injected = true;
            }
            return;
        }
        this._serverSheet = {
            cssRules: [],
            insertRule: function(rule, index) {
                if (typeof index === "number") {
                    _this._serverSheet.cssRules[index] = {
                        cssText: rule
                    };
                } else {
                    _this._serverSheet.cssRules.push({
                        cssText: rule
                    });
                }
                return index;
            },
            deleteRule: function(index) {
                _this._serverSheet.cssRules[index] = null;
            }
        };
    };
    _proto.getSheetForTag = function getSheetForTag(tag) {
        if (tag.sheet) {
            return tag.sheet;
        }
        // this weirdness brought to you by firefox
        for(var i = 0; i < document.styleSheets.length; i++){
            if (document.styleSheets[i].ownerNode === tag) {
                return document.styleSheets[i];
            }
        }
    };
    _proto.getSheet = function getSheet() {
        return this.getSheetForTag(this._tags[this._tags.length - 1]);
    };
    _proto.insertRule = function insertRule(rule, index) {
        invariant$1(isString(rule), "`insertRule` accepts only strings");
        if (typeof window === "undefined") {
            if (typeof index !== "number") {
                index = this._serverSheet.cssRules.length;
            }
            this._serverSheet.insertRule(rule, index);
            return this._rulesCount++;
        }
        if (this._optimizeForSpeed) {
            var sheet = this.getSheet();
            if (typeof index !== "number") {
                index = sheet.cssRules.length;
            }
            // this weirdness for perf, and chrome's weird bug
            // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
            try {
                sheet.insertRule(rule, index);
            } catch (error) {
                if ("TURBOPACK compile-time truthy", 1) {
                    console.warn("StyleSheet: illegal rule: \n\n" + rule + "\n\nSee https://stackoverflow.com/q/20007992 for more info");
                }
                return -1;
            }
        } else {
            var insertionPoint = this._tags[index];
            this._tags.push(this.makeStyleTag(this._name, rule, insertionPoint));
        }
        return this._rulesCount++;
    };
    _proto.replaceRule = function replaceRule(index, rule) {
        if (this._optimizeForSpeed || typeof window === "undefined") {
            var sheet = typeof window !== "undefined" ? this.getSheet() : this._serverSheet;
            if (!rule.trim()) {
                rule = this._deletedRulePlaceholder;
            }
            if (!sheet.cssRules[index]) {
                // @TBD Should we throw an error?
                return index;
            }
            sheet.deleteRule(index);
            try {
                sheet.insertRule(rule, index);
            } catch (error) {
                if ("TURBOPACK compile-time truthy", 1) {
                    console.warn("StyleSheet: illegal rule: \n\n" + rule + "\n\nSee https://stackoverflow.com/q/20007992 for more info");
                }
                // In order to preserve the indices we insert a deleteRulePlaceholder
                sheet.insertRule(this._deletedRulePlaceholder, index);
            }
        } else {
            var tag = this._tags[index];
            invariant$1(tag, "old rule at index `" + index + "` not found");
            tag.textContent = rule;
        }
        return index;
    };
    _proto.deleteRule = function deleteRule(index) {
        if (typeof window === "undefined") {
            this._serverSheet.deleteRule(index);
            return;
        }
        if (this._optimizeForSpeed) {
            this.replaceRule(index, "");
        } else {
            var tag = this._tags[index];
            invariant$1(tag, "rule at index `" + index + "` not found");
            tag.parentNode.removeChild(tag);
            this._tags[index] = null;
        }
    };
    _proto.flush = function flush() {
        this._injected = false;
        this._rulesCount = 0;
        if (typeof window !== "undefined") {
            this._tags.forEach(function(tag) {
                return tag && tag.parentNode.removeChild(tag);
            });
            this._tags = [];
        } else {
            // simpler on server
            this._serverSheet.cssRules = [];
        }
    };
    _proto.cssRules = function cssRules() {
        var _this = this;
        if (typeof window === "undefined") {
            return this._serverSheet.cssRules;
        }
        return this._tags.reduce(function(rules, tag) {
            if (tag) {
                rules = rules.concat(Array.prototype.map.call(_this.getSheetForTag(tag).cssRules, function(rule) {
                    return rule.cssText === _this._deletedRulePlaceholder ? null : rule;
                }));
            } else {
                rules.push(null);
            }
            return rules;
        }, []);
    };
    _proto.makeStyleTag = function makeStyleTag(name, cssString, relativeToTag) {
        if (cssString) {
            invariant$1(isString(cssString), "makeStyleTag accepts only strings as second parameter");
        }
        var tag = document.createElement("style");
        if (this._nonce) tag.setAttribute("nonce", this._nonce);
        tag.type = "text/css";
        tag.setAttribute("data-" + name, "");
        if (cssString) {
            tag.appendChild(document.createTextNode(cssString));
        }
        var head = document.head || document.getElementsByTagName("head")[0];
        if (relativeToTag) {
            head.insertBefore(tag, relativeToTag);
        } else {
            head.appendChild(tag);
        }
        return tag;
    };
    _createClass(StyleSheet, [
        {
            key: "length",
            get: function get() {
                return this._rulesCount;
            }
        }
    ]);
    return StyleSheet;
}();
function invariant$1(condition, message) {
    if (!condition) {
        throw new Error("StyleSheet: " + message + ".");
    }
}
function hash(str) {
    var _$hash = 5381, i = str.length;
    while(i){
        _$hash = _$hash * 33 ^ str.charCodeAt(--i);
    }
    /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */ return _$hash >>> 0;
}
var stringHash = hash;
var sanitize = function(rule) {
    return rule.replace(/\/style/gi, "\\/style");
};
var cache = {};
/**
 * computeId
 *
 * Compute and memoize a jsx id from a basedId and optionally props.
 */ function computeId(baseId, props) {
    if (!props) {
        return "jsx-" + baseId;
    }
    var propsToString = String(props);
    var key = baseId + propsToString;
    if (!cache[key]) {
        cache[key] = "jsx-" + stringHash(baseId + "-" + propsToString);
    }
    return cache[key];
}
/**
 * computeSelector
 *
 * Compute and memoize dynamic selectors.
 */ function computeSelector(id, css) {
    var selectoPlaceholderRegexp = /__jsx-style-dynamic-selector/g;
    // Sanitize SSR-ed CSS.
    // Client side code doesn't need to be sanitized since we use
    // document.createTextNode (dev) and the CSSOM api sheet.insertRule (prod).
    if (typeof window === "undefined") {
        css = sanitize(css);
    }
    var idcss = id + css;
    if (!cache[idcss]) {
        cache[idcss] = css.replace(selectoPlaceholderRegexp, id);
    }
    return cache[idcss];
}
function mapRulesToStyle(cssRules, options) {
    if (options === void 0) options = {};
    return cssRules.map(function(args) {
        var id = args[0];
        var css = args[1];
        return /*#__PURE__*/ React__default["default"].createElement("style", {
            id: "__" + id,
            // Avoid warnings upon render with a key
            key: "__" + id,
            nonce: options.nonce ? options.nonce : undefined,
            dangerouslySetInnerHTML: {
                __html: css
            }
        });
    });
}
var StyleSheetRegistry = /*#__PURE__*/ function() {
    function StyleSheetRegistry(param) {
        var ref = param === void 0 ? {} : param, _styleSheet = ref.styleSheet, styleSheet = _styleSheet === void 0 ? null : _styleSheet, _optimizeForSpeed = ref.optimizeForSpeed, optimizeForSpeed = _optimizeForSpeed === void 0 ? false : _optimizeForSpeed;
        this._sheet = styleSheet || new StyleSheet({
            name: "styled-jsx",
            optimizeForSpeed: optimizeForSpeed
        });
        this._sheet.inject();
        if (styleSheet && typeof optimizeForSpeed === "boolean") {
            this._sheet.setOptimizeForSpeed(optimizeForSpeed);
            this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
        }
        this._fromServer = undefined;
        this._indices = {};
        this._instancesCounts = {};
    }
    var _proto = StyleSheetRegistry.prototype;
    _proto.add = function add(props) {
        var _this = this;
        if (undefined === this._optimizeForSpeed) {
            this._optimizeForSpeed = Array.isArray(props.children);
            this._sheet.setOptimizeForSpeed(this._optimizeForSpeed);
            this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
        }
        if (typeof window !== "undefined" && !this._fromServer) {
            this._fromServer = this.selectFromServer();
            this._instancesCounts = Object.keys(this._fromServer).reduce(function(acc, tagName) {
                acc[tagName] = 0;
                return acc;
            }, {});
        }
        var ref = this.getIdAndRules(props), styleId = ref.styleId, rules = ref.rules;
        // Deduping: just increase the instances count.
        if (styleId in this._instancesCounts) {
            this._instancesCounts[styleId] += 1;
            return;
        }
        var indices = rules.map(function(rule) {
            return _this._sheet.insertRule(rule);
        }) // Filter out invalid rules
        .filter(function(index) {
            return index !== -1;
        });
        this._indices[styleId] = indices;
        this._instancesCounts[styleId] = 1;
    };
    _proto.remove = function remove(props) {
        var _this = this;
        var styleId = this.getIdAndRules(props).styleId;
        invariant(styleId in this._instancesCounts, "styleId: `" + styleId + "` not found");
        this._instancesCounts[styleId] -= 1;
        if (this._instancesCounts[styleId] < 1) {
            var tagFromServer = this._fromServer && this._fromServer[styleId];
            if (tagFromServer) {
                tagFromServer.parentNode.removeChild(tagFromServer);
                delete this._fromServer[styleId];
            } else {
                this._indices[styleId].forEach(function(index) {
                    return _this._sheet.deleteRule(index);
                });
                delete this._indices[styleId];
            }
            delete this._instancesCounts[styleId];
        }
    };
    _proto.update = function update(props, nextProps) {
        this.add(nextProps);
        this.remove(props);
    };
    _proto.flush = function flush() {
        this._sheet.flush();
        this._sheet.inject();
        this._fromServer = undefined;
        this._indices = {};
        this._instancesCounts = {};
    };
    _proto.cssRules = function cssRules() {
        var _this = this;
        var fromServer = this._fromServer ? Object.keys(this._fromServer).map(function(styleId) {
            return [
                styleId,
                _this._fromServer[styleId]
            ];
        }) : [];
        var cssRules = this._sheet.cssRules();
        return fromServer.concat(Object.keys(this._indices).map(function(styleId) {
            return [
                styleId,
                _this._indices[styleId].map(function(index) {
                    return cssRules[index].cssText;
                }).join(_this._optimizeForSpeed ? "" : "\n")
            ];
        }) // filter out empty rules
        .filter(function(rule) {
            return Boolean(rule[1]);
        }));
    };
    _proto.styles = function styles(options) {
        return mapRulesToStyle(this.cssRules(), options);
    };
    _proto.getIdAndRules = function getIdAndRules(props) {
        var css = props.children, dynamic = props.dynamic, id = props.id;
        if (dynamic) {
            var styleId = computeId(id, dynamic);
            return {
                styleId: styleId,
                rules: Array.isArray(css) ? css.map(function(rule) {
                    return computeSelector(styleId, rule);
                }) : [
                    computeSelector(styleId, css)
                ]
            };
        }
        return {
            styleId: computeId(id),
            rules: Array.isArray(css) ? css : [
                css
            ]
        };
    };
    /**
   * selectFromServer
   *
   * Collects style tags from the document with id __jsx-XXX
   */ _proto.selectFromServer = function selectFromServer() {
        var elements = Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]'));
        return elements.reduce(function(acc, element) {
            var id = element.id.slice(2);
            acc[id] = element;
            return acc;
        }, {});
    };
    return StyleSheetRegistry;
}();
function invariant(condition, message) {
    if (!condition) {
        throw new Error("StyleSheetRegistry: " + message + ".");
    }
}
var StyleSheetContext = /*#__PURE__*/ React.createContext(null);
StyleSheetContext.displayName = "StyleSheetContext";
function createStyleRegistry() {
    return new StyleSheetRegistry();
}
function StyleRegistry(param) {
    var configuredRegistry = param.registry, children = param.children;
    var rootRegistry = React.useContext(StyleSheetContext);
    var ref = React.useState({
        "StyleRegistry.useState[ref]": function() {
            return rootRegistry || configuredRegistry || createStyleRegistry();
        }
    }["StyleRegistry.useState[ref]"]), registry = ref[0];
    return /*#__PURE__*/ React__default["default"].createElement(StyleSheetContext.Provider, {
        value: registry
    }, children);
}
function useStyleRegistry() {
    return React.useContext(StyleSheetContext);
}
// Opt-into the new `useInsertionEffect` API in React 18, fallback to `useLayoutEffect`.
// https://github.com/reactwg/react-18/discussions/110
var useInsertionEffect = React__default["default"].useInsertionEffect || React__default["default"].useLayoutEffect;
var defaultRegistry = typeof window !== "undefined" ? createStyleRegistry() : undefined;
function JSXStyle(props) {
    var registry = defaultRegistry ? defaultRegistry : useStyleRegistry();
    // If `registry` does not exist, we do nothing here.
    if (!registry) {
        return null;
    }
    if (typeof window === "undefined") {
        registry.add(props);
        return null;
    }
    useInsertionEffect({
        "JSXStyle.useInsertionEffect": function() {
            registry.add(props);
            return ({
                "JSXStyle.useInsertionEffect": function() {
                    registry.remove(props);
                }
            })["JSXStyle.useInsertionEffect"];
        // props.children can be string[], will be striped since id is identical
        }
    }["JSXStyle.useInsertionEffect"], [
        props.id,
        String(props.dynamic)
    ]);
    return null;
}
JSXStyle.dynamic = function(info) {
    return info.map(function(tagInfo) {
        var baseId = tagInfo[0];
        var props = tagInfo[1];
        return computeId(baseId, props);
    }).join(" ");
};
exports.StyleRegistry = StyleRegistry;
exports.createStyleRegistry = createStyleRegistry;
exports.style = JSXStyle;
exports.useStyleRegistry = useStyleRegistry;
}),
"[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/styled-jsx/dist/index/index.js [app-client] (ecmascript)").style;
}),
"[project]/node_modules/marked/lib/marked.esm.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * marked v12.0.2 - a markdown parser
 * Copyright (c) 2011-2024, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */ /**
 * DO NOT EDIT THIS FILE
 * The code in this file is generated from files in ./src/
 */ /**
 * Gets the original marked default options.
 */ __turbopack_context__.s([
    "Hooks",
    ()=>_Hooks,
    "Lexer",
    ()=>_Lexer,
    "Marked",
    ()=>Marked,
    "Parser",
    ()=>_Parser,
    "Renderer",
    ()=>_Renderer,
    "TextRenderer",
    ()=>_TextRenderer,
    "Tokenizer",
    ()=>_Tokenizer,
    "defaults",
    ()=>_defaults,
    "getDefaults",
    ()=>_getDefaults,
    "lexer",
    ()=>lexer,
    "marked",
    ()=>marked,
    "options",
    ()=>options,
    "parse",
    ()=>parse,
    "parseInline",
    ()=>parseInline,
    "parser",
    ()=>parser,
    "setOptions",
    ()=>setOptions,
    "use",
    ()=>use,
    "walkTokens",
    ()=>walkTokens
]);
function _getDefaults() {
    return {
        async: false,
        breaks: false,
        extensions: null,
        gfm: true,
        hooks: null,
        pedantic: false,
        renderer: null,
        silent: false,
        tokenizer: null,
        walkTokens: null
    };
}
let _defaults = _getDefaults();
function changeDefaults(newDefaults) {
    _defaults = newDefaults;
}
/**
 * Helpers
 */ const escapeTest = /[&<>"']/;
const escapeReplace = new RegExp(escapeTest.source, 'g');
const escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
const escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, 'g');
const escapeReplacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
};
const getEscapeReplacement = (ch)=>escapeReplacements[ch];
function escape$1(html, encode) {
    if (encode) {
        if (escapeTest.test(html)) {
            return html.replace(escapeReplace, getEscapeReplacement);
        }
    } else {
        if (escapeTestNoEncode.test(html)) {
            return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
        }
    }
    return html;
}
const unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;
function unescape(html) {
    // explicitly match decimal, hex, and named HTML entities
    return html.replace(unescapeTest, (_, n)=>{
        n = n.toLowerCase();
        if (n === 'colon') return ':';
        if (n.charAt(0) === '#') {
            return n.charAt(1) === 'x' ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
        }
        return '';
    });
}
const caret = /(^|[^\[])\^/g;
function edit(regex, opt) {
    let source = typeof regex === 'string' ? regex : regex.source;
    opt = opt || '';
    const obj = {
        replace: (name, val)=>{
            let valSource = typeof val === 'string' ? val : val.source;
            valSource = valSource.replace(caret, '$1');
            source = source.replace(name, valSource);
            return obj;
        },
        getRegex: ()=>{
            return new RegExp(source, opt);
        }
    };
    return obj;
}
function cleanUrl(href) {
    try {
        href = encodeURI(href).replace(/%25/g, '%');
    } catch (e) {
        return null;
    }
    return href;
}
const noopTest = {
    exec: ()=>null
};
function splitCells(tableRow, count) {
    // ensure that every cell-delimiting pipe has a space
    // before it to distinguish it from an escaped pipe
    const row = tableRow.replace(/\|/g, (match, offset, str)=>{
        let escaped = false;
        let curr = offset;
        while(--curr >= 0 && str[curr] === '\\')escaped = !escaped;
        if (escaped) {
            // odd number of slashes means | is escaped
            // so we leave it alone
            return '|';
        } else {
            // add space before unescaped |
            return ' |';
        }
    }), cells = row.split(/ \|/);
    let i = 0;
    // First/last cell in a row cannot be empty if it has no leading/trailing pipe
    if (!cells[0].trim()) {
        cells.shift();
    }
    if (cells.length > 0 && !cells[cells.length - 1].trim()) {
        cells.pop();
    }
    if (count) {
        if (cells.length > count) {
            cells.splice(count);
        } else {
            while(cells.length < count)cells.push('');
        }
    }
    for(; i < cells.length; i++){
        // leading or trailing whitespace is ignored per the gfm spec
        cells[i] = cells[i].trim().replace(/\\\|/g, '|');
    }
    return cells;
}
/**
 * Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
 * /c*$/ is vulnerable to REDOS.
 *
 * @param str
 * @param c
 * @param invert Remove suffix of non-c chars instead. Default falsey.
 */ function rtrim(str, c, invert) {
    const l = str.length;
    if (l === 0) {
        return '';
    }
    // Length of suffix matching the invert condition.
    let suffLen = 0;
    // Step left until we fail to match the invert condition.
    while(suffLen < l){
        const currChar = str.charAt(l - suffLen - 1);
        if (currChar === c && !invert) {
            suffLen++;
        } else if (currChar !== c && invert) {
            suffLen++;
        } else {
            break;
        }
    }
    return str.slice(0, l - suffLen);
}
function findClosingBracket(str, b) {
    if (str.indexOf(b[1]) === -1) {
        return -1;
    }
    let level = 0;
    for(let i = 0; i < str.length; i++){
        if (str[i] === '\\') {
            i++;
        } else if (str[i] === b[0]) {
            level++;
        } else if (str[i] === b[1]) {
            level--;
            if (level < 0) {
                return i;
            }
        }
    }
    return -1;
}
function outputLink(cap, link, raw, lexer) {
    const href = link.href;
    const title = link.title ? escape$1(link.title) : null;
    const text = cap[1].replace(/\\([\[\]])/g, '$1');
    if (cap[0].charAt(0) !== '!') {
        lexer.state.inLink = true;
        const token = {
            type: 'link',
            raw,
            href,
            title,
            text,
            tokens: lexer.inlineTokens(text)
        };
        lexer.state.inLink = false;
        return token;
    }
    return {
        type: 'image',
        raw,
        href,
        title,
        text: escape$1(text)
    };
}
function indentCodeCompensation(raw, text) {
    const matchIndentToCode = raw.match(/^(\s+)(?:```)/);
    if (matchIndentToCode === null) {
        return text;
    }
    const indentToCode = matchIndentToCode[1];
    return text.split('\n').map((node)=>{
        const matchIndentInNode = node.match(/^\s+/);
        if (matchIndentInNode === null) {
            return node;
        }
        const [indentInNode] = matchIndentInNode;
        if (indentInNode.length >= indentToCode.length) {
            return node.slice(indentToCode.length);
        }
        return node;
    }).join('\n');
}
/**
 * Tokenizer
 */ class _Tokenizer {
    options;
    rules;
    lexer;
    constructor(options){
        this.options = options || _defaults;
    }
    space(src) {
        const cap = this.rules.block.newline.exec(src);
        if (cap && cap[0].length > 0) {
            return {
                type: 'space',
                raw: cap[0]
            };
        }
    }
    code(src) {
        const cap = this.rules.block.code.exec(src);
        if (cap) {
            const text = cap[0].replace(/^ {1,4}/gm, '');
            return {
                type: 'code',
                raw: cap[0],
                codeBlockStyle: 'indented',
                text: !this.options.pedantic ? rtrim(text, '\n') : text
            };
        }
    }
    fences(src) {
        const cap = this.rules.block.fences.exec(src);
        if (cap) {
            const raw = cap[0];
            const text = indentCodeCompensation(raw, cap[3] || '');
            return {
                type: 'code',
                raw,
                lang: cap[2] ? cap[2].trim().replace(this.rules.inline.anyPunctuation, '$1') : cap[2],
                text
            };
        }
    }
    heading(src) {
        const cap = this.rules.block.heading.exec(src);
        if (cap) {
            let text = cap[2].trim();
            // remove trailing #s
            if (/#$/.test(text)) {
                const trimmed = rtrim(text, '#');
                if (this.options.pedantic) {
                    text = trimmed.trim();
                } else if (!trimmed || / $/.test(trimmed)) {
                    // CommonMark requires space before trailing #s
                    text = trimmed.trim();
                }
            }
            return {
                type: 'heading',
                raw: cap[0],
                depth: cap[1].length,
                text,
                tokens: this.lexer.inline(text)
            };
        }
    }
    hr(src) {
        const cap = this.rules.block.hr.exec(src);
        if (cap) {
            return {
                type: 'hr',
                raw: cap[0]
            };
        }
    }
    blockquote(src) {
        const cap = this.rules.block.blockquote.exec(src);
        if (cap) {
            // precede setext continuation with 4 spaces so it isn't a setext
            let text = cap[0].replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g, '\n    $1');
            text = rtrim(text.replace(/^ *>[ \t]?/gm, ''), '\n');
            const top = this.lexer.state.top;
            this.lexer.state.top = true;
            const tokens = this.lexer.blockTokens(text);
            this.lexer.state.top = top;
            return {
                type: 'blockquote',
                raw: cap[0],
                tokens,
                text
            };
        }
    }
    list(src) {
        let cap = this.rules.block.list.exec(src);
        if (cap) {
            let bull = cap[1].trim();
            const isordered = bull.length > 1;
            const list = {
                type: 'list',
                raw: '',
                ordered: isordered,
                start: isordered ? +bull.slice(0, -1) : '',
                loose: false,
                items: []
            };
            bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
            if (this.options.pedantic) {
                bull = isordered ? bull : '[*+-]';
            }
            // Get next list item
            const itemRegex = new RegExp(`^( {0,3}${bull})((?:[\t ][^\\n]*)?(?:\\n|$))`);
            let raw = '';
            let itemContents = '';
            let endsWithBlankLine = false;
            // Check if current bullet point can start a new List Item
            while(src){
                let endEarly = false;
                if (!(cap = itemRegex.exec(src))) {
                    break;
                }
                if (this.rules.block.hr.test(src)) {
                    break;
                }
                raw = cap[0];
                src = src.substring(raw.length);
                let line = cap[2].split('\n', 1)[0].replace(/^\t+/, (t)=>' '.repeat(3 * t.length));
                let nextLine = src.split('\n', 1)[0];
                let indent = 0;
                if (this.options.pedantic) {
                    indent = 2;
                    itemContents = line.trimStart();
                } else {
                    indent = cap[2].search(/[^ ]/); // Find first non-space char
                    indent = indent > 4 ? 1 : indent; // Treat indented code blocks (> 4 spaces) as having only 1 indent
                    itemContents = line.slice(indent);
                    indent += cap[1].length;
                }
                let blankLine = false;
                if (!line && /^ *$/.test(nextLine)) {
                    raw += nextLine + '\n';
                    src = src.substring(nextLine.length + 1);
                    endEarly = true;
                }
                if (!endEarly) {
                    const nextBulletRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`);
                    const hrRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`);
                    const fencesBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`);
                    const headingBeginRegex = new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`);
                    // Check if following lines should be included in List Item
                    while(src){
                        const rawLine = src.split('\n', 1)[0];
                        nextLine = rawLine;
                        // Re-align to follow commonmark nesting rules
                        if (this.options.pedantic) {
                            nextLine = nextLine.replace(/^ {1,4}(?=( {4})*[^ ])/g, '  ');
                        }
                        // End list item if found code fences
                        if (fencesBeginRegex.test(nextLine)) {
                            break;
                        }
                        // End list item if found start of new heading
                        if (headingBeginRegex.test(nextLine)) {
                            break;
                        }
                        // End list item if found start of new bullet
                        if (nextBulletRegex.test(nextLine)) {
                            break;
                        }
                        // Horizontal rule found
                        if (hrRegex.test(src)) {
                            break;
                        }
                        if (nextLine.search(/[^ ]/) >= indent || !nextLine.trim()) {
                            itemContents += '\n' + nextLine.slice(indent);
                        } else {
                            // not enough indentation
                            if (blankLine) {
                                break;
                            }
                            // paragraph continuation unless last line was a different block level element
                            if (line.search(/[^ ]/) >= 4) {
                                break;
                            }
                            if (fencesBeginRegex.test(line)) {
                                break;
                            }
                            if (headingBeginRegex.test(line)) {
                                break;
                            }
                            if (hrRegex.test(line)) {
                                break;
                            }
                            itemContents += '\n' + nextLine;
                        }
                        if (!blankLine && !nextLine.trim()) {
                            blankLine = true;
                        }
                        raw += rawLine + '\n';
                        src = src.substring(rawLine.length + 1);
                        line = nextLine.slice(indent);
                    }
                }
                if (!list.loose) {
                    // If the previous item ended with a blank line, the list is loose
                    if (endsWithBlankLine) {
                        list.loose = true;
                    } else if (/\n *\n *$/.test(raw)) {
                        endsWithBlankLine = true;
                    }
                }
                let istask = null;
                let ischecked;
                // Check for task list items
                if (this.options.gfm) {
                    istask = /^\[[ xX]\] /.exec(itemContents);
                    if (istask) {
                        ischecked = istask[0] !== '[ ] ';
                        itemContents = itemContents.replace(/^\[[ xX]\] +/, '');
                    }
                }
                list.items.push({
                    type: 'list_item',
                    raw,
                    task: !!istask,
                    checked: ischecked,
                    loose: false,
                    text: itemContents,
                    tokens: []
                });
                list.raw += raw;
            }
            // Do not consume newlines at end of final item. Alternatively, make itemRegex *start* with any newlines to simplify/speed up endsWithBlankLine logic
            list.items[list.items.length - 1].raw = raw.trimEnd();
            list.items[list.items.length - 1].text = itemContents.trimEnd();
            list.raw = list.raw.trimEnd();
            // Item child tokens handled here at end because we needed to have the final item to trim it first
            for(let i = 0; i < list.items.length; i++){
                this.lexer.state.top = false;
                list.items[i].tokens = this.lexer.blockTokens(list.items[i].text, []);
                if (!list.loose) {
                    // Check if list should be loose
                    const spacers = list.items[i].tokens.filter((t)=>t.type === 'space');
                    const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t)=>/\n.*\n/.test(t.raw));
                    list.loose = hasMultipleLineBreaks;
                }
            }
            // Set all items to loose if list is loose
            if (list.loose) {
                for(let i = 0; i < list.items.length; i++){
                    list.items[i].loose = true;
                }
            }
            return list;
        }
    }
    html(src) {
        const cap = this.rules.block.html.exec(src);
        if (cap) {
            const token = {
                type: 'html',
                block: true,
                raw: cap[0],
                pre: cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style',
                text: cap[0]
            };
            return token;
        }
    }
    def(src) {
        const cap = this.rules.block.def.exec(src);
        if (cap) {
            const tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
            const href = cap[2] ? cap[2].replace(/^<(.*)>$/, '$1').replace(this.rules.inline.anyPunctuation, '$1') : '';
            const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline.anyPunctuation, '$1') : cap[3];
            return {
                type: 'def',
                tag,
                raw: cap[0],
                href,
                title
            };
        }
    }
    table(src) {
        const cap = this.rules.block.table.exec(src);
        if (!cap) {
            return;
        }
        if (!/[:|]/.test(cap[2])) {
            // delimiter row must have a pipe (|) or colon (:) otherwise it is a setext heading
            return;
        }
        const headers = splitCells(cap[1]);
        const aligns = cap[2].replace(/^\||\| *$/g, '').split('|');
        const rows = cap[3] && cap[3].trim() ? cap[3].replace(/\n[ \t]*$/, '').split('\n') : [];
        const item = {
            type: 'table',
            raw: cap[0],
            header: [],
            align: [],
            rows: []
        };
        if (headers.length !== aligns.length) {
            // header and align columns must be equal, rows can be different.
            return;
        }
        for (const align of aligns){
            if (/^ *-+: *$/.test(align)) {
                item.align.push('right');
            } else if (/^ *:-+: *$/.test(align)) {
                item.align.push('center');
            } else if (/^ *:-+ *$/.test(align)) {
                item.align.push('left');
            } else {
                item.align.push(null);
            }
        }
        for (const header of headers){
            item.header.push({
                text: header,
                tokens: this.lexer.inline(header)
            });
        }
        for (const row of rows){
            item.rows.push(splitCells(row, item.header.length).map((cell)=>{
                return {
                    text: cell,
                    tokens: this.lexer.inline(cell)
                };
            }));
        }
        return item;
    }
    lheading(src) {
        const cap = this.rules.block.lheading.exec(src);
        if (cap) {
            return {
                type: 'heading',
                raw: cap[0],
                depth: cap[2].charAt(0) === '=' ? 1 : 2,
                text: cap[1],
                tokens: this.lexer.inline(cap[1])
            };
        }
    }
    paragraph(src) {
        const cap = this.rules.block.paragraph.exec(src);
        if (cap) {
            const text = cap[1].charAt(cap[1].length - 1) === '\n' ? cap[1].slice(0, -1) : cap[1];
            return {
                type: 'paragraph',
                raw: cap[0],
                text,
                tokens: this.lexer.inline(text)
            };
        }
    }
    text(src) {
        const cap = this.rules.block.text.exec(src);
        if (cap) {
            return {
                type: 'text',
                raw: cap[0],
                text: cap[0],
                tokens: this.lexer.inline(cap[0])
            };
        }
    }
    escape(src) {
        const cap = this.rules.inline.escape.exec(src);
        if (cap) {
            return {
                type: 'escape',
                raw: cap[0],
                text: escape$1(cap[1])
            };
        }
    }
    tag(src) {
        const cap = this.rules.inline.tag.exec(src);
        if (cap) {
            if (!this.lexer.state.inLink && /^<a /i.test(cap[0])) {
                this.lexer.state.inLink = true;
            } else if (this.lexer.state.inLink && /^<\/a>/i.test(cap[0])) {
                this.lexer.state.inLink = false;
            }
            if (!this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
                this.lexer.state.inRawBlock = true;
            } else if (this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
                this.lexer.state.inRawBlock = false;
            }
            return {
                type: 'html',
                raw: cap[0],
                inLink: this.lexer.state.inLink,
                inRawBlock: this.lexer.state.inRawBlock,
                block: false,
                text: cap[0]
            };
        }
    }
    link(src) {
        const cap = this.rules.inline.link.exec(src);
        if (cap) {
            const trimmedUrl = cap[2].trim();
            if (!this.options.pedantic && /^</.test(trimmedUrl)) {
                // commonmark requires matching angle brackets
                if (!/>$/.test(trimmedUrl)) {
                    return;
                }
                // ending angle bracket cannot be escaped
                const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), '\\');
                if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
                    return;
                }
            } else {
                // find closing parenthesis
                const lastParenIndex = findClosingBracket(cap[2], '()');
                if (lastParenIndex > -1) {
                    const start = cap[0].indexOf('!') === 0 ? 5 : 4;
                    const linkLen = start + cap[1].length + lastParenIndex;
                    cap[2] = cap[2].substring(0, lastParenIndex);
                    cap[0] = cap[0].substring(0, linkLen).trim();
                    cap[3] = '';
                }
            }
            let href = cap[2];
            let title = '';
            if (this.options.pedantic) {
                // split pedantic href and title
                const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
                if (link) {
                    href = link[1];
                    title = link[3];
                }
            } else {
                title = cap[3] ? cap[3].slice(1, -1) : '';
            }
            href = href.trim();
            if (/^</.test(href)) {
                if (this.options.pedantic && !/>$/.test(trimmedUrl)) {
                    // pedantic allows starting angle bracket without ending angle bracket
                    href = href.slice(1);
                } else {
                    href = href.slice(1, -1);
                }
            }
            return outputLink(cap, {
                href: href ? href.replace(this.rules.inline.anyPunctuation, '$1') : href,
                title: title ? title.replace(this.rules.inline.anyPunctuation, '$1') : title
            }, cap[0], this.lexer);
        }
    }
    reflink(src, links) {
        let cap;
        if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
            const linkString = (cap[2] || cap[1]).replace(/\s+/g, ' ');
            const link = links[linkString.toLowerCase()];
            if (!link) {
                const text = cap[0].charAt(0);
                return {
                    type: 'text',
                    raw: text,
                    text
                };
            }
            return outputLink(cap, link, cap[0], this.lexer);
        }
    }
    emStrong(src, maskedSrc, prevChar = '') {
        let match = this.rules.inline.emStrongLDelim.exec(src);
        if (!match) return;
        // _ can't be between two alphanumerics. \p{L}\p{N} includes non-english alphabet/numbers as well
        if (match[3] && prevChar.match(/[\p{L}\p{N}]/u)) return;
        const nextChar = match[1] || match[2] || '';
        if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
            // unicode Regex counts emoji as 1 char; spread into array for proper count (used multiple times below)
            const lLength = [
                ...match[0]
            ].length - 1;
            let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
            const endReg = match[0][0] === '*' ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
            endReg.lastIndex = 0;
            // Clip maskedSrc to same section of string as src (move to lexer?)
            maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
            while((match = endReg.exec(maskedSrc)) != null){
                rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
                if (!rDelim) continue; // skip single * in __abc*abc__
                rLength = [
                    ...rDelim
                ].length;
                if (match[3] || match[4]) {
                    delimTotal += rLength;
                    continue;
                } else if (match[5] || match[6]) {
                    if (lLength % 3 && !((lLength + rLength) % 3)) {
                        midDelimTotal += rLength;
                        continue; // CommonMark Emphasis Rules 9-10
                    }
                }
                delimTotal -= rLength;
                if (delimTotal > 0) continue; // Haven't found enough closing delimiters
                // Remove extra characters. *a*** -> *a*
                rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
                // char length can be >1 for unicode characters;
                const lastCharLength = [
                    ...match[0]
                ][0].length;
                const raw = src.slice(0, lLength + match.index + lastCharLength + rLength);
                // Create `em` if smallest delimiter has odd char count. *a***
                if (Math.min(lLength, rLength) % 2) {
                    const text = raw.slice(1, -1);
                    return {
                        type: 'em',
                        raw,
                        text,
                        tokens: this.lexer.inlineTokens(text)
                    };
                }
                // Create 'strong' if smallest delimiter has even char count. **a***
                const text = raw.slice(2, -2);
                return {
                    type: 'strong',
                    raw,
                    text,
                    tokens: this.lexer.inlineTokens(text)
                };
            }
        }
    }
    codespan(src) {
        const cap = this.rules.inline.code.exec(src);
        if (cap) {
            let text = cap[2].replace(/\n/g, ' ');
            const hasNonSpaceChars = /[^ ]/.test(text);
            const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
            if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
                text = text.substring(1, text.length - 1);
            }
            text = escape$1(text, true);
            return {
                type: 'codespan',
                raw: cap[0],
                text
            };
        }
    }
    br(src) {
        const cap = this.rules.inline.br.exec(src);
        if (cap) {
            return {
                type: 'br',
                raw: cap[0]
            };
        }
    }
    del(src) {
        const cap = this.rules.inline.del.exec(src);
        if (cap) {
            return {
                type: 'del',
                raw: cap[0],
                text: cap[2],
                tokens: this.lexer.inlineTokens(cap[2])
            };
        }
    }
    autolink(src) {
        const cap = this.rules.inline.autolink.exec(src);
        if (cap) {
            let text, href;
            if (cap[2] === '@') {
                text = escape$1(cap[1]);
                href = 'mailto:' + text;
            } else {
                text = escape$1(cap[1]);
                href = text;
            }
            return {
                type: 'link',
                raw: cap[0],
                text,
                href,
                tokens: [
                    {
                        type: 'text',
                        raw: text,
                        text
                    }
                ]
            };
        }
    }
    url(src) {
        let cap;
        if (cap = this.rules.inline.url.exec(src)) {
            let text, href;
            if (cap[2] === '@') {
                text = escape$1(cap[0]);
                href = 'mailto:' + text;
            } else {
                // do extended autolink path validation
                let prevCapZero;
                do {
                    prevCapZero = cap[0];
                    cap[0] = this.rules.inline._backpedal.exec(cap[0])?.[0] ?? '';
                }while (prevCapZero !== cap[0])
                text = escape$1(cap[0]);
                if (cap[1] === 'www.') {
                    href = 'http://' + cap[0];
                } else {
                    href = cap[0];
                }
            }
            return {
                type: 'link',
                raw: cap[0],
                text,
                href,
                tokens: [
                    {
                        type: 'text',
                        raw: text,
                        text
                    }
                ]
            };
        }
    }
    inlineText(src) {
        const cap = this.rules.inline.text.exec(src);
        if (cap) {
            let text;
            if (this.lexer.state.inRawBlock) {
                text = cap[0];
            } else {
                text = escape$1(cap[0]);
            }
            return {
                type: 'text',
                raw: cap[0],
                text
            };
        }
    }
}
/**
 * Block-Level Grammar
 */ const newline = /^(?: *(?:\n|$))+/;
const blockCode = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/;
const fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
const hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
const heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
const bullet = /(?:[*+-]|\d{1,9}[.)])/;
const lheading = edit(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, bullet) // lists can interrupt
.replace(/blockCode/g, / {4}/) // indented code blocks can interrupt
.replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/) // fenced code blocks can interrupt
.replace(/blockquote/g, / {0,3}>/) // blockquote can interrupt
.replace(/heading/g, / {0,3}#{1,6}/) // ATX heading can interrupt
.replace(/html/g, / {0,3}<[^\n>]+>\n/) // block html can interrupt
.getRegex();
const _paragraph = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
const blockText = /^[^\n]+/;
const _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
const def = edit(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace('label', _blockLabel).replace('title', /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
const list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, bullet).getRegex();
const _tag = 'address|article|aside|base|basefont|blockquote|body|caption' + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption' + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe' + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option' + '|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title' + '|tr|track|ul';
const _comment = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
const html = edit('^ {0,3}(?:' // optional indentation
 + '<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
 + '|comment[^\\n]*(\\n+|$)' // (2)
 + '|<\\?[\\s\\S]*?(?:\\?>\\n*|$)' // (3)
 + '|<![A-Z][\\s\\S]*?(?:>\\n*|$)' // (4)
 + '|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)' // (5)
 + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (6)
 + '|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (7) open tag
 + '|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (7) closing tag
 + ')', 'i').replace('comment', _comment).replace('tag', _tag).replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
const paragraph = edit(_paragraph).replace('hr', hr).replace('heading', ' {0,3}#{1,6}(?:\\s|$)').replace('|lheading', '') // setext headings don't interrupt commonmark paragraphs
.replace('|table', '').replace('blockquote', ' {0,3}>').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
.replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)').replace('tag', _tag) // pars can be interrupted by type (6) html blocks
.getRegex();
const blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace('paragraph', paragraph).getRegex();
/**
 * Normal Block Grammar
 */ const blockNormal = {
    blockquote,
    code: blockCode,
    def,
    fences,
    heading,
    hr,
    html,
    lheading,
    list,
    newline,
    paragraph,
    table: noopTest,
    text: blockText
};
/**
 * GFM Block Grammar
 */ const gfmTable = edit('^ *([^\\n ].*)\\n' // Header
 + ' {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)' // Align
 + '(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)') // Cells
.replace('hr', hr).replace('heading', ' {0,3}#{1,6}(?:\\s|$)').replace('blockquote', ' {0,3}>').replace('code', ' {4}[^\\n]').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
.replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)').replace('tag', _tag) // tables can be interrupted by type (6) html blocks
.getRegex();
const blockGfm = {
    ...blockNormal,
    table: gfmTable,
    paragraph: edit(_paragraph).replace('hr', hr).replace('heading', ' {0,3}#{1,6}(?:\\s|$)').replace('|lheading', '') // setext headings don't interrupt commonmark paragraphs
    .replace('table', gfmTable) // interrupt paragraphs with table
    .replace('blockquote', ' {0,3}>').replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n').replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
    .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)').replace('tag', _tag) // pars can be interrupted by type (6) html blocks
    .getRegex()
};
/**
 * Pedantic grammar (original John Gruber's loose markdown specification)
 */ const blockPedantic = {
    ...blockNormal,
    html: edit('^ *(?:comment *(?:\\n|\\s*$)' + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
     + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))').replace('comment', _comment).replace(/tag/g, '(?!(?:' + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub' + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)' + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b').getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: noopTest,
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: edit(_paragraph).replace('hr', hr).replace('heading', ' *#{1,6} *[^\n]').replace('lheading', lheading).replace('|table', '').replace('blockquote', ' {0,3}>').replace('|fences', '').replace('|list', '').replace('|html', '').replace('|tag', '').getRegex()
};
/**
 * Inline-Level Grammar
 */ const escape = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
const inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
const br = /^( {2,}|\\)\n(?!\s*$)/;
const inlineText = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
// list of unicode punctuation marks, plus any missing characters from CommonMark spec
const _punctuation = '\\p{P}\\p{S}';
const punctuation = edit(/^((?![*_])[\spunctuation])/, 'u').replace(/punctuation/g, _punctuation).getRegex();
// sequences em should skip over [title](link), `code`, <html>
const blockSkip = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g;
const emStrongLDelim = edit(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, 'u').replace(/punct/g, _punctuation).getRegex();
const emStrongRDelimAst = edit('^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)' // Skip orphan inside strong
 + '|[^*]+(?=[^*])' // Consume to delim
 + '|(?!\\*)[punct](\\*+)(?=[\\s]|$)' // (1) #*** can only be a Right Delimiter
 + '|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)' // (2) a***#, a*** can only be a Right Delimiter
 + '|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])' // (3) #***a, ***a can only be Left Delimiter
 + '|[\\s](\\*+)(?!\\*)(?=[punct])' // (4) ***# can only be Left Delimiter
 + '|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])' // (5) #***# can be either Left or Right Delimiter
 + '|[^punct\\s](\\*+)(?=[^punct\\s])', 'gu') // (6) a***a can be either Left or Right Delimiter
.replace(/punct/g, _punctuation).getRegex();
// (6) Not allowed for _
const emStrongRDelimUnd = edit('^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)' // Skip orphan inside strong
 + '|[^_]+(?=[^_])' // Consume to delim
 + '|(?!_)[punct](_+)(?=[\\s]|$)' // (1) #___ can only be a Right Delimiter
 + '|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)' // (2) a___#, a___ can only be a Right Delimiter
 + '|(?!_)[punct\\s](_+)(?=[^punct\\s])' // (3) #___a, ___a can only be Left Delimiter
 + '|[\\s](_+)(?!_)(?=[punct])' // (4) ___# can only be Left Delimiter
 + '|(?!_)[punct](_+)(?!_)(?=[punct])', 'gu') // (5) #___# can be either Left or Right Delimiter
.replace(/punct/g, _punctuation).getRegex();
const anyPunctuation = edit(/\\([punct])/, 'gu').replace(/punct/g, _punctuation).getRegex();
const autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace('scheme', /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace('email', /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
const _inlineComment = edit(_comment).replace('(?:-->|$)', '-->').getRegex();
const tag = edit('^comment' + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
 + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
 + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
 + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
 + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>') // CDATA section
.replace('comment', _inlineComment).replace('attribute', /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
const _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
const link = edit(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace('label', _inlineLabel).replace('href', /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace('title', /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
const reflink = edit(/^!?\[(label)\]\[(ref)\]/).replace('label', _inlineLabel).replace('ref', _blockLabel).getRegex();
const nolink = edit(/^!?\[(ref)\](?:\[\])?/).replace('ref', _blockLabel).getRegex();
const reflinkSearch = edit('reflink|nolink(?!\\()', 'g').replace('reflink', reflink).replace('nolink', nolink).getRegex();
/**
 * Normal Inline Grammar
 */ const inlineNormal = {
    _backpedal: noopTest,
    anyPunctuation,
    autolink,
    blockSkip,
    br,
    code: inlineCode,
    del: noopTest,
    emStrongLDelim,
    emStrongRDelimAst,
    emStrongRDelimUnd,
    escape,
    link,
    nolink,
    punctuation,
    reflink,
    reflinkSearch,
    tag,
    text: inlineText,
    url: noopTest
};
/**
 * Pedantic Inline Grammar
 */ const inlinePedantic = {
    ...inlineNormal,
    link: edit(/^!?\[(label)\]\((.*?)\)/).replace('label', _inlineLabel).getRegex(),
    reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace('label', _inlineLabel).getRegex()
};
/**
 * GFM Inline Grammar
 */ const inlineGfm = {
    ...inlineNormal,
    escape: edit(escape).replace('])', '~|])').getRegex(),
    url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, 'i').replace('email', /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
    _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
};
/**
 * GFM + Line Breaks Inline Grammar
 */ const inlineBreaks = {
    ...inlineGfm,
    br: edit(br).replace('{2,}', '*').getRegex(),
    text: edit(inlineGfm.text).replace('\\b_', '\\b_| {2,}\\n').replace(/\{2,\}/g, '*').getRegex()
};
/**
 * exports
 */ const block = {
    normal: blockNormal,
    gfm: blockGfm,
    pedantic: blockPedantic
};
const inline = {
    normal: inlineNormal,
    gfm: inlineGfm,
    breaks: inlineBreaks,
    pedantic: inlinePedantic
};
/**
 * Block Lexer
 */ class _Lexer {
    tokens;
    options;
    state;
    tokenizer;
    inlineQueue;
    constructor(options){
        // TokenList cannot be created in one go
        this.tokens = [];
        this.tokens.links = Object.create(null);
        this.options = options || _defaults;
        this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
        this.tokenizer = this.options.tokenizer;
        this.tokenizer.options = this.options;
        this.tokenizer.lexer = this;
        this.inlineQueue = [];
        this.state = {
            inLink: false,
            inRawBlock: false,
            top: true
        };
        const rules = {
            block: block.normal,
            inline: inline.normal
        };
        if (this.options.pedantic) {
            rules.block = block.pedantic;
            rules.inline = inline.pedantic;
        } else if (this.options.gfm) {
            rules.block = block.gfm;
            if (this.options.breaks) {
                rules.inline = inline.breaks;
            } else {
                rules.inline = inline.gfm;
            }
        }
        this.tokenizer.rules = rules;
    }
    /**
     * Expose Rules
     */ static get rules() {
        return {
            block,
            inline
        };
    }
    /**
     * Static Lex Method
     */ static lex(src, options) {
        const lexer = new _Lexer(options);
        return lexer.lex(src);
    }
    /**
     * Static Lex Inline Method
     */ static lexInline(src, options) {
        const lexer = new _Lexer(options);
        return lexer.inlineTokens(src);
    }
    /**
     * Preprocessing
     */ lex(src) {
        src = src.replace(/\r\n|\r/g, '\n');
        this.blockTokens(src, this.tokens);
        for(let i = 0; i < this.inlineQueue.length; i++){
            const next = this.inlineQueue[i];
            this.inlineTokens(next.src, next.tokens);
        }
        this.inlineQueue = [];
        return this.tokens;
    }
    blockTokens(src, tokens = []) {
        if (this.options.pedantic) {
            src = src.replace(/\t/g, '    ').replace(/^ +$/gm, '');
        } else {
            src = src.replace(/^( *)(\t+)/gm, (_, leading, tabs)=>{
                return leading + '    '.repeat(tabs.length);
            });
        }
        let token;
        let lastToken;
        let cutSrc;
        let lastParagraphClipped;
        while(src){
            if (this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((extTokenizer)=>{
                if (token = extTokenizer.call({
                    lexer: this
                }, src, tokens)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    return true;
                }
                return false;
            })) {
                continue;
            }
            // newline
            if (token = this.tokenizer.space(src)) {
                src = src.substring(token.raw.length);
                if (token.raw.length === 1 && tokens.length > 0) {
                    // if there's a single \n as a spacer, it's terminating the last line,
                    // so move it there so that we don't get unnecessary paragraph tags
                    tokens[tokens.length - 1].raw += '\n';
                } else {
                    tokens.push(token);
                }
                continue;
            }
            // code
            if (token = this.tokenizer.code(src)) {
                src = src.substring(token.raw.length);
                lastToken = tokens[tokens.length - 1];
                // An indented code block cannot interrupt a paragraph.
                if (lastToken && (lastToken.type === 'paragraph' || lastToken.type === 'text')) {
                    lastToken.raw += '\n' + token.raw;
                    lastToken.text += '\n' + token.text;
                    this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
                } else {
                    tokens.push(token);
                }
                continue;
            }
            // fences
            if (token = this.tokenizer.fences(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // heading
            if (token = this.tokenizer.heading(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // hr
            if (token = this.tokenizer.hr(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // blockquote
            if (token = this.tokenizer.blockquote(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // list
            if (token = this.tokenizer.list(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // html
            if (token = this.tokenizer.html(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // def
            if (token = this.tokenizer.def(src)) {
                src = src.substring(token.raw.length);
                lastToken = tokens[tokens.length - 1];
                if (lastToken && (lastToken.type === 'paragraph' || lastToken.type === 'text')) {
                    lastToken.raw += '\n' + token.raw;
                    lastToken.text += '\n' + token.raw;
                    this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
                } else if (!this.tokens.links[token.tag]) {
                    this.tokens.links[token.tag] = {
                        href: token.href,
                        title: token.title
                    };
                }
                continue;
            }
            // table (gfm)
            if (token = this.tokenizer.table(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // lheading
            if (token = this.tokenizer.lheading(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // top-level paragraph
            // prevent paragraph consuming extensions by clipping 'src' to extension start
            cutSrc = src;
            if (this.options.extensions && this.options.extensions.startBlock) {
                let startIndex = Infinity;
                const tempSrc = src.slice(1);
                let tempStart;
                this.options.extensions.startBlock.forEach((getStartIndex)=>{
                    tempStart = getStartIndex.call({
                        lexer: this
                    }, tempSrc);
                    if (typeof tempStart === 'number' && tempStart >= 0) {
                        startIndex = Math.min(startIndex, tempStart);
                    }
                });
                if (startIndex < Infinity && startIndex >= 0) {
                    cutSrc = src.substring(0, startIndex + 1);
                }
            }
            if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
                lastToken = tokens[tokens.length - 1];
                if (lastParagraphClipped && lastToken.type === 'paragraph') {
                    lastToken.raw += '\n' + token.raw;
                    lastToken.text += '\n' + token.text;
                    this.inlineQueue.pop();
                    this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
                } else {
                    tokens.push(token);
                }
                lastParagraphClipped = cutSrc.length !== src.length;
                src = src.substring(token.raw.length);
                continue;
            }
            // text
            if (token = this.tokenizer.text(src)) {
                src = src.substring(token.raw.length);
                lastToken = tokens[tokens.length - 1];
                if (lastToken && lastToken.type === 'text') {
                    lastToken.raw += '\n' + token.raw;
                    lastToken.text += '\n' + token.text;
                    this.inlineQueue.pop();
                    this.inlineQueue[this.inlineQueue.length - 1].src = lastToken.text;
                } else {
                    tokens.push(token);
                }
                continue;
            }
            if (src) {
                const errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
                if (this.options.silent) {
                    console.error(errMsg);
                    break;
                } else {
                    throw new Error(errMsg);
                }
            }
        }
        this.state.top = true;
        return tokens;
    }
    inline(src, tokens = []) {
        this.inlineQueue.push({
            src,
            tokens
        });
        return tokens;
    }
    /**
     * Lexing/Compiling
     */ inlineTokens(src, tokens = []) {
        let token, lastToken, cutSrc;
        // String with links masked to avoid interference with em and strong
        let maskedSrc = src;
        let match;
        let keepPrevChar, prevChar;
        // Mask out reflinks
        if (this.tokens.links) {
            const links = Object.keys(this.tokens.links);
            if (links.length > 0) {
                while((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null){
                    if (links.includes(match[0].slice(match[0].lastIndexOf('[') + 1, -1))) {
                        maskedSrc = maskedSrc.slice(0, match.index) + '[' + 'a'.repeat(match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
                    }
                }
            }
        }
        // Mask out other blocks
        while((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null){
            maskedSrc = maskedSrc.slice(0, match.index) + '[' + 'a'.repeat(match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
        }
        // Mask out escaped characters
        while((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null){
            maskedSrc = maskedSrc.slice(0, match.index) + '++' + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
        }
        while(src){
            if (!keepPrevChar) {
                prevChar = '';
            }
            keepPrevChar = false;
            // extensions
            if (this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((extTokenizer)=>{
                if (token = extTokenizer.call({
                    lexer: this
                }, src, tokens)) {
                    src = src.substring(token.raw.length);
                    tokens.push(token);
                    return true;
                }
                return false;
            })) {
                continue;
            }
            // escape
            if (token = this.tokenizer.escape(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // tag
            if (token = this.tokenizer.tag(src)) {
                src = src.substring(token.raw.length);
                lastToken = tokens[tokens.length - 1];
                if (lastToken && token.type === 'text' && lastToken.type === 'text') {
                    lastToken.raw += token.raw;
                    lastToken.text += token.text;
                } else {
                    tokens.push(token);
                }
                continue;
            }
            // link
            if (token = this.tokenizer.link(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // reflink, nolink
            if (token = this.tokenizer.reflink(src, this.tokens.links)) {
                src = src.substring(token.raw.length);
                lastToken = tokens[tokens.length - 1];
                if (lastToken && token.type === 'text' && lastToken.type === 'text') {
                    lastToken.raw += token.raw;
                    lastToken.text += token.text;
                } else {
                    tokens.push(token);
                }
                continue;
            }
            // em & strong
            if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // code
            if (token = this.tokenizer.codespan(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // br
            if (token = this.tokenizer.br(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // del (gfm)
            if (token = this.tokenizer.del(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // autolink
            if (token = this.tokenizer.autolink(src)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // url (gfm)
            if (!this.state.inLink && (token = this.tokenizer.url(src))) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                continue;
            }
            // text
            // prevent inlineText consuming extensions by clipping 'src' to extension start
            cutSrc = src;
            if (this.options.extensions && this.options.extensions.startInline) {
                let startIndex = Infinity;
                const tempSrc = src.slice(1);
                let tempStart;
                this.options.extensions.startInline.forEach((getStartIndex)=>{
                    tempStart = getStartIndex.call({
                        lexer: this
                    }, tempSrc);
                    if (typeof tempStart === 'number' && tempStart >= 0) {
                        startIndex = Math.min(startIndex, tempStart);
                    }
                });
                if (startIndex < Infinity && startIndex >= 0) {
                    cutSrc = src.substring(0, startIndex + 1);
                }
            }
            if (token = this.tokenizer.inlineText(cutSrc)) {
                src = src.substring(token.raw.length);
                if (token.raw.slice(-1) !== '_') {
                    prevChar = token.raw.slice(-1);
                }
                keepPrevChar = true;
                lastToken = tokens[tokens.length - 1];
                if (lastToken && lastToken.type === 'text') {
                    lastToken.raw += token.raw;
                    lastToken.text += token.text;
                } else {
                    tokens.push(token);
                }
                continue;
            }
            if (src) {
                const errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
                if (this.options.silent) {
                    console.error(errMsg);
                    break;
                } else {
                    throw new Error(errMsg);
                }
            }
        }
        return tokens;
    }
}
/**
 * Renderer
 */ class _Renderer {
    options;
    constructor(options){
        this.options = options || _defaults;
    }
    code(code, infostring, escaped) {
        const lang = (infostring || '').match(/^\S*/)?.[0];
        code = code.replace(/\n$/, '') + '\n';
        if (!lang) {
            return '<pre><code>' + (escaped ? code : escape$1(code, true)) + '</code></pre>\n';
        }
        return '<pre><code class="language-' + escape$1(lang) + '">' + (escaped ? code : escape$1(code, true)) + '</code></pre>\n';
    }
    blockquote(quote) {
        return `<blockquote>\n${quote}</blockquote>\n`;
    }
    html(html, block) {
        return html;
    }
    heading(text, level, raw) {
        // ignore IDs
        return `<h${level}>${text}</h${level}>\n`;
    }
    hr() {
        return '<hr>\n';
    }
    list(body, ordered, start) {
        const type = ordered ? 'ol' : 'ul';
        const startatt = ordered && start !== 1 ? ' start="' + start + '"' : '';
        return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
    }
    listitem(text, task, checked) {
        return `<li>${text}</li>\n`;
    }
    checkbox(checked) {
        return '<input ' + (checked ? 'checked="" ' : '') + 'disabled="" type="checkbox">';
    }
    paragraph(text) {
        return `<p>${text}</p>\n`;
    }
    table(header, body) {
        if (body) body = `<tbody>${body}</tbody>`;
        return '<table>\n' + '<thead>\n' + header + '</thead>\n' + body + '</table>\n';
    }
    tablerow(content) {
        return `<tr>\n${content}</tr>\n`;
    }
    tablecell(content, flags) {
        const type = flags.header ? 'th' : 'td';
        const tag = flags.align ? `<${type} align="${flags.align}">` : `<${type}>`;
        return tag + content + `</${type}>\n`;
    }
    /**
     * span level renderer
     */ strong(text) {
        return `<strong>${text}</strong>`;
    }
    em(text) {
        return `<em>${text}</em>`;
    }
    codespan(text) {
        return `<code>${text}</code>`;
    }
    br() {
        return '<br>';
    }
    del(text) {
        return `<del>${text}</del>`;
    }
    link(href, title, text) {
        const cleanHref = cleanUrl(href);
        if (cleanHref === null) {
            return text;
        }
        href = cleanHref;
        let out = '<a href="' + href + '"';
        if (title) {
            out += ' title="' + title + '"';
        }
        out += '>' + text + '</a>';
        return out;
    }
    image(href, title, text) {
        const cleanHref = cleanUrl(href);
        if (cleanHref === null) {
            return text;
        }
        href = cleanHref;
        let out = `<img src="${href}" alt="${text}"`;
        if (title) {
            out += ` title="${title}"`;
        }
        out += '>';
        return out;
    }
    text(text) {
        return text;
    }
}
/**
 * TextRenderer
 * returns only the textual part of the token
 */ class _TextRenderer {
    // no need for block level renderers
    strong(text) {
        return text;
    }
    em(text) {
        return text;
    }
    codespan(text) {
        return text;
    }
    del(text) {
        return text;
    }
    html(text) {
        return text;
    }
    text(text) {
        return text;
    }
    link(href, title, text) {
        return '' + text;
    }
    image(href, title, text) {
        return '' + text;
    }
    br() {
        return '';
    }
}
/**
 * Parsing & Compiling
 */ class _Parser {
    options;
    renderer;
    textRenderer;
    constructor(options){
        this.options = options || _defaults;
        this.options.renderer = this.options.renderer || new _Renderer();
        this.renderer = this.options.renderer;
        this.renderer.options = this.options;
        this.textRenderer = new _TextRenderer();
    }
    /**
     * Static Parse Method
     */ static parse(tokens, options) {
        const parser = new _Parser(options);
        return parser.parse(tokens);
    }
    /**
     * Static Parse Inline Method
     */ static parseInline(tokens, options) {
        const parser = new _Parser(options);
        return parser.parseInline(tokens);
    }
    /**
     * Parse Loop
     */ parse(tokens, top = true) {
        let out = '';
        for(let i = 0; i < tokens.length; i++){
            const token = tokens[i];
            // Run any renderer extensions
            if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
                const genericToken = token;
                const ret = this.options.extensions.renderers[genericToken.type].call({
                    parser: this
                }, genericToken);
                if (ret !== false || ![
                    'space',
                    'hr',
                    'heading',
                    'code',
                    'table',
                    'blockquote',
                    'list',
                    'html',
                    'paragraph',
                    'text'
                ].includes(genericToken.type)) {
                    out += ret || '';
                    continue;
                }
            }
            switch(token.type){
                case 'space':
                    {
                        continue;
                    }
                case 'hr':
                    {
                        out += this.renderer.hr();
                        continue;
                    }
                case 'heading':
                    {
                        const headingToken = token;
                        out += this.renderer.heading(this.parseInline(headingToken.tokens), headingToken.depth, unescape(this.parseInline(headingToken.tokens, this.textRenderer)));
                        continue;
                    }
                case 'code':
                    {
                        const codeToken = token;
                        out += this.renderer.code(codeToken.text, codeToken.lang, !!codeToken.escaped);
                        continue;
                    }
                case 'table':
                    {
                        const tableToken = token;
                        let header = '';
                        // header
                        let cell = '';
                        for(let j = 0; j < tableToken.header.length; j++){
                            cell += this.renderer.tablecell(this.parseInline(tableToken.header[j].tokens), {
                                header: true,
                                align: tableToken.align[j]
                            });
                        }
                        header += this.renderer.tablerow(cell);
                        let body = '';
                        for(let j = 0; j < tableToken.rows.length; j++){
                            const row = tableToken.rows[j];
                            cell = '';
                            for(let k = 0; k < row.length; k++){
                                cell += this.renderer.tablecell(this.parseInline(row[k].tokens), {
                                    header: false,
                                    align: tableToken.align[k]
                                });
                            }
                            body += this.renderer.tablerow(cell);
                        }
                        out += this.renderer.table(header, body);
                        continue;
                    }
                case 'blockquote':
                    {
                        const blockquoteToken = token;
                        const body = this.parse(blockquoteToken.tokens);
                        out += this.renderer.blockquote(body);
                        continue;
                    }
                case 'list':
                    {
                        const listToken = token;
                        const ordered = listToken.ordered;
                        const start = listToken.start;
                        const loose = listToken.loose;
                        let body = '';
                        for(let j = 0; j < listToken.items.length; j++){
                            const item = listToken.items[j];
                            const checked = item.checked;
                            const task = item.task;
                            let itemBody = '';
                            if (item.task) {
                                const checkbox = this.renderer.checkbox(!!checked);
                                if (loose) {
                                    if (item.tokens.length > 0 && item.tokens[0].type === 'paragraph') {
                                        item.tokens[0].text = checkbox + ' ' + item.tokens[0].text;
                                        if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === 'text') {
                                            item.tokens[0].tokens[0].text = checkbox + ' ' + item.tokens[0].tokens[0].text;
                                        }
                                    } else {
                                        item.tokens.unshift({
                                            type: 'text',
                                            text: checkbox + ' '
                                        });
                                    }
                                } else {
                                    itemBody += checkbox + ' ';
                                }
                            }
                            itemBody += this.parse(item.tokens, loose);
                            body += this.renderer.listitem(itemBody, task, !!checked);
                        }
                        out += this.renderer.list(body, ordered, start);
                        continue;
                    }
                case 'html':
                    {
                        const htmlToken = token;
                        out += this.renderer.html(htmlToken.text, htmlToken.block);
                        continue;
                    }
                case 'paragraph':
                    {
                        const paragraphToken = token;
                        out += this.renderer.paragraph(this.parseInline(paragraphToken.tokens));
                        continue;
                    }
                case 'text':
                    {
                        let textToken = token;
                        let body = textToken.tokens ? this.parseInline(textToken.tokens) : textToken.text;
                        while(i + 1 < tokens.length && tokens[i + 1].type === 'text'){
                            textToken = tokens[++i];
                            body += '\n' + (textToken.tokens ? this.parseInline(textToken.tokens) : textToken.text);
                        }
                        out += top ? this.renderer.paragraph(body) : body;
                        continue;
                    }
                default:
                    {
                        const errMsg = 'Token with "' + token.type + '" type was not found.';
                        if (this.options.silent) {
                            console.error(errMsg);
                            return '';
                        } else {
                            throw new Error(errMsg);
                        }
                    }
            }
        }
        return out;
    }
    /**
     * Parse Inline Tokens
     */ parseInline(tokens, renderer) {
        renderer = renderer || this.renderer;
        let out = '';
        for(let i = 0; i < tokens.length; i++){
            const token = tokens[i];
            // Run any renderer extensions
            if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
                const ret = this.options.extensions.renderers[token.type].call({
                    parser: this
                }, token);
                if (ret !== false || ![
                    'escape',
                    'html',
                    'link',
                    'image',
                    'strong',
                    'em',
                    'codespan',
                    'br',
                    'del',
                    'text'
                ].includes(token.type)) {
                    out += ret || '';
                    continue;
                }
            }
            switch(token.type){
                case 'escape':
                    {
                        const escapeToken = token;
                        out += renderer.text(escapeToken.text);
                        break;
                    }
                case 'html':
                    {
                        const tagToken = token;
                        out += renderer.html(tagToken.text);
                        break;
                    }
                case 'link':
                    {
                        const linkToken = token;
                        out += renderer.link(linkToken.href, linkToken.title, this.parseInline(linkToken.tokens, renderer));
                        break;
                    }
                case 'image':
                    {
                        const imageToken = token;
                        out += renderer.image(imageToken.href, imageToken.title, imageToken.text);
                        break;
                    }
                case 'strong':
                    {
                        const strongToken = token;
                        out += renderer.strong(this.parseInline(strongToken.tokens, renderer));
                        break;
                    }
                case 'em':
                    {
                        const emToken = token;
                        out += renderer.em(this.parseInline(emToken.tokens, renderer));
                        break;
                    }
                case 'codespan':
                    {
                        const codespanToken = token;
                        out += renderer.codespan(codespanToken.text);
                        break;
                    }
                case 'br':
                    {
                        out += renderer.br();
                        break;
                    }
                case 'del':
                    {
                        const delToken = token;
                        out += renderer.del(this.parseInline(delToken.tokens, renderer));
                        break;
                    }
                case 'text':
                    {
                        const textToken = token;
                        out += renderer.text(textToken.text);
                        break;
                    }
                default:
                    {
                        const errMsg = 'Token with "' + token.type + '" type was not found.';
                        if (this.options.silent) {
                            console.error(errMsg);
                            return '';
                        } else {
                            throw new Error(errMsg);
                        }
                    }
            }
        }
        return out;
    }
}
class _Hooks {
    options;
    constructor(options){
        this.options = options || _defaults;
    }
    static passThroughHooks = new Set([
        'preprocess',
        'postprocess',
        'processAllTokens'
    ]);
    /**
     * Process markdown before marked
     */ preprocess(markdown) {
        return markdown;
    }
    /**
     * Process HTML after marked is finished
     */ postprocess(html) {
        return html;
    }
    /**
     * Process all tokens before walk tokens
     */ processAllTokens(tokens) {
        return tokens;
    }
}
class Marked {
    defaults = _getDefaults();
    options = this.setOptions;
    parse = this.#parseMarkdown(_Lexer.lex, _Parser.parse);
    parseInline = this.#parseMarkdown(_Lexer.lexInline, _Parser.parseInline);
    Parser = _Parser;
    Renderer = _Renderer;
    TextRenderer = _TextRenderer;
    Lexer = _Lexer;
    Tokenizer = _Tokenizer;
    Hooks = _Hooks;
    constructor(...args){
        this.use(...args);
    }
    /**
     * Run callback for every token
     */ walkTokens(tokens, callback) {
        let values = [];
        for (const token of tokens){
            values = values.concat(callback.call(this, token));
            switch(token.type){
                case 'table':
                    {
                        const tableToken = token;
                        for (const cell of tableToken.header){
                            values = values.concat(this.walkTokens(cell.tokens, callback));
                        }
                        for (const row of tableToken.rows){
                            for (const cell of row){
                                values = values.concat(this.walkTokens(cell.tokens, callback));
                            }
                        }
                        break;
                    }
                case 'list':
                    {
                        const listToken = token;
                        values = values.concat(this.walkTokens(listToken.items, callback));
                        break;
                    }
                default:
                    {
                        const genericToken = token;
                        if (this.defaults.extensions?.childTokens?.[genericToken.type]) {
                            this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens)=>{
                                const tokens = genericToken[childTokens].flat(Infinity);
                                values = values.concat(this.walkTokens(tokens, callback));
                            });
                        } else if (genericToken.tokens) {
                            values = values.concat(this.walkTokens(genericToken.tokens, callback));
                        }
                    }
            }
        }
        return values;
    }
    use(...args) {
        const extensions = this.defaults.extensions || {
            renderers: {},
            childTokens: {}
        };
        args.forEach((pack)=>{
            // copy options to new object
            const opts = {
                ...pack
            };
            // set async to true if it was set to true before
            opts.async = this.defaults.async || opts.async || false;
            // ==-- Parse "addon" extensions --== //
            if (pack.extensions) {
                pack.extensions.forEach((ext)=>{
                    if (!ext.name) {
                        throw new Error('extension name required');
                    }
                    if ('renderer' in ext) {
                        const prevRenderer = extensions.renderers[ext.name];
                        if (prevRenderer) {
                            // Replace extension with func to run new extension but fall back if false
                            extensions.renderers[ext.name] = function(...args) {
                                let ret = ext.renderer.apply(this, args);
                                if (ret === false) {
                                    ret = prevRenderer.apply(this, args);
                                }
                                return ret;
                            };
                        } else {
                            extensions.renderers[ext.name] = ext.renderer;
                        }
                    }
                    if ('tokenizer' in ext) {
                        if (!ext.level || ext.level !== 'block' && ext.level !== 'inline') {
                            throw new Error("extension level must be 'block' or 'inline'");
                        }
                        const extLevel = extensions[ext.level];
                        if (extLevel) {
                            extLevel.unshift(ext.tokenizer);
                        } else {
                            extensions[ext.level] = [
                                ext.tokenizer
                            ];
                        }
                        if (ext.start) {
                            if (ext.level === 'block') {
                                if (extensions.startBlock) {
                                    extensions.startBlock.push(ext.start);
                                } else {
                                    extensions.startBlock = [
                                        ext.start
                                    ];
                                }
                            } else if (ext.level === 'inline') {
                                if (extensions.startInline) {
                                    extensions.startInline.push(ext.start);
                                } else {
                                    extensions.startInline = [
                                        ext.start
                                    ];
                                }
                            }
                        }
                    }
                    if ('childTokens' in ext && ext.childTokens) {
                        extensions.childTokens[ext.name] = ext.childTokens;
                    }
                });
                opts.extensions = extensions;
            }
            // ==-- Parse "overwrite" extensions --== //
            if (pack.renderer) {
                const renderer = this.defaults.renderer || new _Renderer(this.defaults);
                for(const prop in pack.renderer){
                    if (!(prop in renderer)) {
                        throw new Error(`renderer '${prop}' does not exist`);
                    }
                    if (prop === 'options') {
                        continue;
                    }
                    const rendererProp = prop;
                    const rendererFunc = pack.renderer[rendererProp];
                    const prevRenderer = renderer[rendererProp];
                    // Replace renderer with func to run extension, but fall back if false
                    renderer[rendererProp] = (...args)=>{
                        let ret = rendererFunc.apply(renderer, args);
                        if (ret === false) {
                            ret = prevRenderer.apply(renderer, args);
                        }
                        return ret || '';
                    };
                }
                opts.renderer = renderer;
            }
            if (pack.tokenizer) {
                const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
                for(const prop in pack.tokenizer){
                    if (!(prop in tokenizer)) {
                        throw new Error(`tokenizer '${prop}' does not exist`);
                    }
                    if ([
                        'options',
                        'rules',
                        'lexer'
                    ].includes(prop)) {
                        continue;
                    }
                    const tokenizerProp = prop;
                    const tokenizerFunc = pack.tokenizer[tokenizerProp];
                    const prevTokenizer = tokenizer[tokenizerProp];
                    // Replace tokenizer with func to run extension, but fall back if false
                    // @ts-expect-error cannot type tokenizer function dynamically
                    tokenizer[tokenizerProp] = (...args)=>{
                        let ret = tokenizerFunc.apply(tokenizer, args);
                        if (ret === false) {
                            ret = prevTokenizer.apply(tokenizer, args);
                        }
                        return ret;
                    };
                }
                opts.tokenizer = tokenizer;
            }
            // ==-- Parse Hooks extensions --== //
            if (pack.hooks) {
                const hooks = this.defaults.hooks || new _Hooks();
                for(const prop in pack.hooks){
                    if (!(prop in hooks)) {
                        throw new Error(`hook '${prop}' does not exist`);
                    }
                    if (prop === 'options') {
                        continue;
                    }
                    const hooksProp = prop;
                    const hooksFunc = pack.hooks[hooksProp];
                    const prevHook = hooks[hooksProp];
                    if (_Hooks.passThroughHooks.has(prop)) {
                        // @ts-expect-error cannot type hook function dynamically
                        hooks[hooksProp] = (arg)=>{
                            if (this.defaults.async) {
                                return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret)=>{
                                    return prevHook.call(hooks, ret);
                                });
                            }
                            const ret = hooksFunc.call(hooks, arg);
                            return prevHook.call(hooks, ret);
                        };
                    } else {
                        // @ts-expect-error cannot type hook function dynamically
                        hooks[hooksProp] = (...args)=>{
                            let ret = hooksFunc.apply(hooks, args);
                            if (ret === false) {
                                ret = prevHook.apply(hooks, args);
                            }
                            return ret;
                        };
                    }
                }
                opts.hooks = hooks;
            }
            // ==-- Parse WalkTokens extensions --== //
            if (pack.walkTokens) {
                const walkTokens = this.defaults.walkTokens;
                const packWalktokens = pack.walkTokens;
                opts.walkTokens = function(token) {
                    let values = [];
                    values.push(packWalktokens.call(this, token));
                    if (walkTokens) {
                        values = values.concat(walkTokens.call(this, token));
                    }
                    return values;
                };
            }
            this.defaults = {
                ...this.defaults,
                ...opts
            };
        });
        return this;
    }
    setOptions(opt) {
        this.defaults = {
            ...this.defaults,
            ...opt
        };
        return this;
    }
    lexer(src, options) {
        return _Lexer.lex(src, options ?? this.defaults);
    }
    parser(tokens, options) {
        return _Parser.parse(tokens, options ?? this.defaults);
    }
    #parseMarkdown(lexer, parser) {
        return (src, options)=>{
            const origOpt = {
                ...options
            };
            const opt = {
                ...this.defaults,
                ...origOpt
            };
            // Show warning if an extension set async to true but the parse was called with async: false
            if (this.defaults.async === true && origOpt.async === false) {
                if (!opt.silent) {
                    console.warn('marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored.');
                }
                opt.async = true;
            }
            const throwError = this.#onError(!!opt.silent, !!opt.async);
            // throw error in case of non string input
            if (typeof src === 'undefined' || src === null) {
                return throwError(new Error('marked(): input parameter is undefined or null'));
            }
            if (typeof src !== 'string') {
                return throwError(new Error('marked(): input parameter is of type ' + Object.prototype.toString.call(src) + ', string expected'));
            }
            if (opt.hooks) {
                opt.hooks.options = opt;
            }
            if (opt.async) {
                return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src)=>lexer(src, opt)).then((tokens)=>opt.hooks ? opt.hooks.processAllTokens(tokens) : tokens).then((tokens)=>opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(()=>tokens) : tokens).then((tokens)=>parser(tokens, opt)).then((html)=>opt.hooks ? opt.hooks.postprocess(html) : html).catch(throwError);
            }
            try {
                if (opt.hooks) {
                    src = opt.hooks.preprocess(src);
                }
                let tokens = lexer(src, opt);
                if (opt.hooks) {
                    tokens = opt.hooks.processAllTokens(tokens);
                }
                if (opt.walkTokens) {
                    this.walkTokens(tokens, opt.walkTokens);
                }
                let html = parser(tokens, opt);
                if (opt.hooks) {
                    html = opt.hooks.postprocess(html);
                }
                return html;
            } catch (e) {
                return throwError(e);
            }
        };
    }
    #onError(silent, async) {
        return (e)=>{
            e.message += '\nPlease report this to https://github.com/markedjs/marked.';
            if (silent) {
                const msg = '<p>An error occurred:</p><pre>' + escape$1(e.message + '', true) + '</pre>';
                if (async) {
                    return Promise.resolve(msg);
                }
                return msg;
            }
            if (async) {
                return Promise.reject(e);
            }
            throw e;
        };
    }
}
const markedInstance = new Marked();
function marked(src, opt) {
    return markedInstance.parse(src, opt);
}
/**
 * Sets the default options.
 *
 * @param options Hash of options
 */ marked.options = marked.setOptions = function(options) {
    markedInstance.setOptions(options);
    marked.defaults = markedInstance.defaults;
    changeDefaults(marked.defaults);
    return marked;
};
/**
 * Gets the original marked default options.
 */ marked.getDefaults = _getDefaults;
marked.defaults = _defaults;
/**
 * Use Extension
 */ marked.use = function(...args) {
    markedInstance.use(...args);
    marked.defaults = markedInstance.defaults;
    changeDefaults(marked.defaults);
    return marked;
};
/**
 * Run callback for every token
 */ marked.walkTokens = function(tokens, callback) {
    return markedInstance.walkTokens(tokens, callback);
};
/**
 * Compiles markdown to HTML without enclosing `p` tag.
 *
 * @param src String of markdown source to be compiled
 * @param options Hash of options
 * @return String of compiled HTML
 */ marked.parseInline = markedInstance.parseInline;
/**
 * Expose
 */ marked.Parser = _Parser;
marked.parser = _Parser.parse;
marked.Renderer = _Renderer;
marked.TextRenderer = _TextRenderer;
marked.Lexer = _Lexer;
marked.lexer = _Lexer.lex;
marked.Tokenizer = _Tokenizer;
marked.Hooks = _Hooks;
marked.parse = marked;
const options = marked.options;
const setOptions = marked.setOptions;
const use = marked.use;
const walkTokens = marked.walkTokens;
const parseInline = marked.parseInline;
const parse = marked;
const parser = _Parser.parse;
const lexer = _Lexer.lex;
;
 //# sourceMappingURL=marked.esm.js.map
}),
]);

//# sourceMappingURL=_284c1768._.js.map
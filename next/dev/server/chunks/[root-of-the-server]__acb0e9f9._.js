module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/dev/lessons/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
;
const runtime = 'nodejs';
function isDevRequest(request) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const host = request.headers.get('host') ?? '';
    const isLocalHost = host.startsWith('localhost') || host.startsWith('127.0.0.1') || host.startsWith('0.0.0.0');
    if (!isLocalHost) return false;
    const expected = process.env.DEV_TOOL_KEY;
    if (!expected) {
        return true;
    }
    const provided = request.headers.get('x-dev-tool-key') ?? '';
    return provided === expected;
}
function devKeyWarning() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (process.env.DEV_TOOL_KEY) return null;
    return 'DEV_TOOL_KEY not set: dev tool is protected only by localhost host check.';
}
function getSupabaseAdmin() {
    const supabaseUrl = ("TURBOPACK compile-time value", "https://khjyueuersxyrlgbbhgs.supabase.co");
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseServiceRoleKey) {
        throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
            persistSession: false
        }
    });
}
function slugify(input) {
    const base = input.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').replace(/-{2,}/g, '-');
    return base || 'lesson';
}
async function GET(request) {
    if (!isDevRequest(request)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: 'Not found'
        }, {
            status: 404
        });
    }
    let supabaseAdmin;
    try {
        supabaseAdmin = getSupabaseAdmin();
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: message
        }, {
            status: 500
        });
    }
    const { data, error } = await supabaseAdmin.from('lessons').select('id,title,slug,public_id,module_id,lesson_index,lesson_type,description,skills,video_url,content,order_index,duration_minutes,is_published').order('order_index', {
        ascending: true
    }).order('lesson_index', {
        ascending: true
    });
    if (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: error.message
        }, {
            status: 500
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true,
        lessons: data ?? [],
        warning: devKeyWarning()
    });
}
async function POST(request) {
    if (!isDevRequest(request)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: 'Not found'
        }, {
            status: 404
        });
    }
    let body;
    try {
        body = await request.json();
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: 'Invalid JSON body'
        }, {
            status: 400
        });
    }
    const title = typeof body?.title === 'string' ? String(body.title).trim() : '';
    const moduleId = typeof body?.module_id === 'string' ? String(body.module_id).trim() : '';
    if (!title) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: 'Missing title'
        }, {
            status: 400
        });
    }
    if (!moduleId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: 'Missing module_id'
        }, {
            status: 400
        });
    }
    let supabaseAdmin;
    try {
        supabaseAdmin = getSupabaseAdmin();
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: message
        }, {
            status: 500
        });
    }
    const { data: lastInModule, error: lastInModuleError } = await supabaseAdmin.from('lessons').select('lesson_index,order_index').eq('module_id', moduleId).order('lesson_index', {
        ascending: false
    }).limit(1).maybeSingle();
    if (lastInModuleError) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: lastInModuleError.message
        }, {
            status: 500
        });
    }
    const nextLessonIndex = typeof lastInModule?.lesson_index === 'number' ? lastInModule.lesson_index + 1 : 0;
    const nextOrderIndex = typeof lastInModule?.order_index === 'number' ? lastInModule.order_index + 1 : 1;
    const payload = {
        title,
        slug: `${slugify(title)}-${Date.now().toString(36)}`,
        module_id: moduleId,
        lesson_index: typeof body?.lesson_index === 'number' ? body.lesson_index : nextLessonIndex,
        lesson_type: body?.lesson_type === 'intermezzo' || body?.lesson_type === 'milestone' ? body.lesson_type : 'esercizio',
        description: typeof body?.description === 'string' && body.description.trim().length > 0 ? String(body.description) : null,
        skills: typeof body?.skills === 'string' && body.skills.trim().length > 0 ? String(body.skills) : null,
        video_url: typeof body?.video_url === 'string' && body.video_url.trim().length > 0 ? String(body.video_url) : null,
        content: typeof body?.content === 'string' && body.content.trim().length > 0 ? String(body.content) : null,
        duration_minutes: typeof body?.duration_minutes === 'number' ? body.duration_minutes : null,
        is_published: typeof body?.is_published === 'boolean' ? body.is_published : false,
        order_index: typeof body?.order_index === 'number' ? body.order_index : nextOrderIndex
    };
    const { data, error } = await supabaseAdmin.from('lessons').insert(payload).select('*').single();
    if (error) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: error.message
        }, {
            status: 500
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true,
        lesson: data,
        warning: devKeyWarning()
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__acb0e9f9._.js.map
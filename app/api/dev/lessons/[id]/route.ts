import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

function isDevRequest(request: Request) {
  if (process.env.NODE_ENV === 'production') return false;
  const host = request.headers.get('host') ?? '';
  const isLocalHost =
    host.startsWith('localhost') || host.startsWith('127.0.0.1') || host.startsWith('0.0.0.0');
  if (!isLocalHost) return false;

  const expected = process.env.DEV_TOOL_KEY;
  if (!expected) {
    return true;
  }

  const provided = request.headers.get('x-dev-tool-key') ?? '';
  return provided === expected;
}

function devKeyWarning() {
  if (process.env.NODE_ENV === 'production') return null;
  if (process.env.DEV_TOOL_KEY) return null;
  return 'DEV_TOOL_KEY not set: dev tool is protected only by localhost host check.';
}

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  return createClient<any>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
    },
  });
}

export async function PATCH(request: Request, ctx: { params: { id: string } }) {
  if (!isDevRequest(request)) {
    return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  }

  const params = await (ctx as any).params;
  const id = params?.id;
  if (!id) {
    return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const patch: Record<string, unknown> = {};

  const fields: Array<[string, (v: any) => unknown]> = [
    ['title', (v) => (typeof v === 'string' ? String(v).trim() : undefined)],
    ['slug', (v) => (typeof v === 'string' ? String(v).trim() : undefined)],
    ['module_id', (v) => (typeof v === 'string' ? String(v).trim() : undefined)],
    [
      'lesson_type',
      (v) =>
        v === 'esercizio' || v === 'intermezzo' || v === 'milestone' ? (v as string) : undefined,
    ],
    ['lesson_index', (v) => (typeof v === 'number' ? v : undefined)],
    ['description', (v) => (typeof v === 'string' ? String(v) : null)],
    ['skills', (v) => (typeof v === 'string' ? String(v) : null)],
    ['video_url', (v) => (typeof v === 'string' ? String(v) : null)],
    ['content', (v) => (typeof v === 'string' ? String(v) : null)],
    ['duration_minutes', (v) => (typeof v === 'number' ? v : null)],
    ['is_published', (v) => (typeof v === 'boolean' ? v : undefined)],
    ['order_index', (v) => (typeof v === 'number' ? v : undefined)],
  ];

  for (const [key, parse] of fields) {
    if (Object.prototype.hasOwnProperty.call(body as any, key)) {
      const parsed = parse((body as any)[key]);
      if (parsed !== undefined) {
        patch[key] = parsed;
      }
    }
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ ok: false, error: 'No fields to update' }, { status: 400 });
  }

  let supabaseAdmin: ReturnType<typeof getSupabaseAdmin>;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  const nextModuleId = typeof patch.module_id === 'string' ? (patch.module_id as string) : null;
  const hasExplicitLessonIndex = Object.prototype.hasOwnProperty.call(patch, 'lesson_index');

  if (nextModuleId && !hasExplicitLessonIndex) {
    const { data: currentLesson, error: currentLessonError } = await supabaseAdmin
      .from('lessons')
      .select('module_id')
      .eq('id', id)
      .maybeSingle();

    if (currentLessonError) {
      return NextResponse.json({ ok: false, error: currentLessonError.message }, { status: 500 });
    }

    const currentModuleId = (currentLesson as any)?.module_id as string | undefined;

    if (currentModuleId && currentModuleId !== nextModuleId) {
      const { data: lastInTargetModule, error: lastInTargetModuleError } = await supabaseAdmin
        .from('lessons')
        .select('lesson_index')
        .eq('module_id', nextModuleId)
        .order('lesson_index', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (lastInTargetModuleError) {
        return NextResponse.json({ ok: false, error: lastInTargetModuleError.message }, { status: 500 });
      }

      const nextLessonIndex =
        typeof (lastInTargetModule as any)?.lesson_index === 'number' ? (lastInTargetModule as any).lesson_index + 1 : 1;
      patch.lesson_index = nextLessonIndex;
    }
  }

  const { data, error } = await supabaseAdmin.from('lessons').update(patch).eq('id', id).select('*').single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, lesson: data, warning: devKeyWarning() });
}

export async function DELETE(request: Request, ctx: { params: { id: string } }) {
  if (!isDevRequest(request)) {
    return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  }

  const params = await (ctx as any).params;
  const id = params?.id;
  if (!id) {
    return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 });
  }

  let supabaseAdmin: ReturnType<typeof getSupabaseAdmin>;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  const { error } = await supabaseAdmin.from('lessons').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, warning: devKeyWarning() });
}

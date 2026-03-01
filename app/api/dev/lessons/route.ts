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

function slugify(input: string) {
  const base = input
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');

  return base || 'lesson';
}

export async function GET(request: Request) {
  if (!isDevRequest(request)) {
    return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  }

  let supabaseAdmin: ReturnType<typeof getSupabaseAdmin>;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  const { data, error } = await supabaseAdmin
    .from('lessons')
    .select(
      'id,title,slug,public_id,module_id,lesson_index,lesson_type,description,skills,video_url,content,order_index,duration_minutes,is_published',
    )
    .order('order_index', { ascending: true })
    .order('lesson_index', { ascending: true });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, lessons: data ?? [], warning: devKeyWarning() });
}

export async function POST(request: Request) {
  if (!isDevRequest(request)) {
    return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const title = typeof (body as any)?.title === 'string' ? String((body as any).title).trim() : '';
  const moduleId =
    typeof (body as any)?.module_id === 'string' ? String((body as any).module_id).trim() : '';

  if (!title) {
    return NextResponse.json({ ok: false, error: 'Missing title' }, { status: 400 });
  }

  if (!moduleId) {
    return NextResponse.json({ ok: false, error: 'Missing module_id' }, { status: 400 });
  }

  let supabaseAdmin: ReturnType<typeof getSupabaseAdmin>;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  const { data: lastInModule, error: lastInModuleError } = await supabaseAdmin
    .from('lessons')
    .select('lesson_index,order_index')
    .eq('module_id', moduleId)
    .order('lesson_index', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (lastInModuleError) {
    return NextResponse.json({ ok: false, error: lastInModuleError.message }, { status: 500 });
  }

  const nextLessonIndex =
    typeof lastInModule?.lesson_index === 'number' ? lastInModule.lesson_index + 1 : 0;
  const nextOrderIndex =
    typeof lastInModule?.order_index === 'number' ? lastInModule.order_index + 1 : 1;

  const payload: Record<string, unknown> = {
    title,
    slug: `${slugify(title)}-${Date.now().toString(36)}`,
    module_id: moduleId,
    lesson_index:
      typeof (body as any)?.lesson_index === 'number'
        ? (body as any).lesson_index
        : nextLessonIndex,
    lesson_type:
      (body as any)?.lesson_type === 'intermezzo' || (body as any)?.lesson_type === 'milestone'
        ? (body as any).lesson_type
        : 'esercizio',
    description:
      typeof (body as any)?.description === 'string' && (body as any).description.trim().length > 0
        ? String((body as any).description)
        : null,
    skills:
      typeof (body as any)?.skills === 'string' && (body as any).skills.trim().length > 0
        ? String((body as any).skills)
        : null,
    video_url:
      typeof (body as any)?.video_url === 'string' && (body as any).video_url.trim().length > 0
        ? String((body as any).video_url)
        : null,
    content:
      typeof (body as any)?.content === 'string' && (body as any).content.trim().length > 0
        ? String((body as any).content)
        : null,
    duration_minutes:
      typeof (body as any)?.duration_minutes === 'number' ? (body as any).duration_minutes : null,
    is_published:
      typeof (body as any)?.is_published === 'boolean' ? (body as any).is_published : false,
    order_index:
      typeof (body as any)?.order_index === 'number' ? (body as any).order_index : nextOrderIndex,
  };

  const { data, error } = await supabaseAdmin.from('lessons').insert(payload).select('*').single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, lesson: data, warning: devKeyWarning() });
}

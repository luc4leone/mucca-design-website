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

  const direction = (body as any)?.direction;
  const id = typeof (body as any)?.id === 'string' ? String((body as any).id) : '';

  if (!id || (direction !== 'up' && direction !== 'down')) {
    return NextResponse.json({ ok: false, error: 'Missing id or invalid direction' }, { status: 400 });
  }

  let supabaseAdmin: ReturnType<typeof getSupabaseAdmin>;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  const { data: current, error: currentError } = await supabaseAdmin
    .from('lessons')
    .select('id,module_id,lesson_index,order_index')
    .eq('id', id)
    .single();

  if (currentError || !current) {
    return NextResponse.json({ ok: false, error: currentError?.message ?? 'Lesson not found' }, { status: 404 });
  }

  const currentOrder = current.order_index as number;
  const currentModuleId = current.module_id as string;
  const currentLessonIndex = current.lesson_index as number;

  const neighborQuery = supabaseAdmin
    .from('lessons')
    .select('id,lesson_index,order_index')
    .eq('module_id', currentModuleId)
    .order('lesson_index', { ascending: direction === 'up' ? false : true })
    .limit(1);

  const { data: neighbor, error: neighborError } = await (direction === 'up'
    ? neighborQuery.lt('lesson_index', currentLessonIndex).maybeSingle()
    : neighborQuery.gt('lesson_index', currentLessonIndex).maybeSingle());

  if (neighborError) {
    return NextResponse.json({ ok: false, error: neighborError.message }, { status: 500 });
  }

  if (!neighbor) {
    return NextResponse.json({ ok: true, swapped: false });
  }

  const neighborId = neighbor.id as string;
  const neighborOrder = neighbor.order_index as number;
  const neighborLessonIndex = neighbor.lesson_index as number;

  const { error: updateAError } = await supabaseAdmin
    .from('lessons')
    .update({ order_index: neighborOrder, lesson_index: neighborLessonIndex })
    .eq('id', id);

  if (updateAError) {
    return NextResponse.json({ ok: false, error: updateAError.message }, { status: 500 });
  }

  const { error: updateBError } = await supabaseAdmin
    .from('lessons')
    .update({ order_index: currentOrder, lesson_index: currentLessonIndex })
    .eq('id', neighborId);

  if (updateBError) {
    await supabaseAdmin
      .from('lessons')
      .update({ order_index: currentOrder, lesson_index: currentLessonIndex })
      .eq('id', id);
    return NextResponse.json({ ok: false, error: updateBError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, swapped: true, warning: devKeyWarning() });
}

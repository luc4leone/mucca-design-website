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

  let supabaseAdmin: ReturnType<typeof getSupabaseAdmin>;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  const { data: modules, error: modulesError } = await supabaseAdmin
    .from('modules')
    .select('id,order_index')
    .order('order_index', { ascending: true });

  if (modulesError) {
    return NextResponse.json({ ok: false, error: modulesError.message }, { status: 500 });
  }

  const moduleRows = (modules as Array<{ id: string }> | null) ?? [];
  let updatedLessons = 0;

  for (const moduleRow of moduleRows) {
    const { data: lessons, error: lessonsError } = await supabaseAdmin
      .from('lessons')
      .select('id,lesson_index,order_index')
      .eq('module_id', moduleRow.id)
      .order('lesson_index', { ascending: true })
      .order('order_index', { ascending: true });

    if (lessonsError) {
      return NextResponse.json({ ok: false, error: lessonsError.message }, { status: 500 });
    }

    const lessonRows = (lessons as Array<{ id: string; lesson_index: number }> | null) ?? [];

    for (let idx = 0; idx < lessonRows.length; idx += 1) {
      const lessonRow = lessonRows[idx];
      if (lessonRow.lesson_index === idx) continue;

      const { error: updateError } = await supabaseAdmin
        .from('lessons')
        .update({ lesson_index: idx })
        .eq('id', lessonRow.id);

      if (updateError) {
        return NextResponse.json({ ok: false, error: updateError.message }, { status: 500 });
      }

      updatedLessons += 1;
    }
  }

  return NextResponse.json({
    ok: true,
    modules_processed: moduleRows.length,
    lessons_reindexed: updatedLessons,
    warning: devKeyWarning(),
  });
}

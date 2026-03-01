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

  try {
    const { data, error } = await supabaseAdmin
      .from('modules')
      .select('id,title,order_index,access_level,is_published,created_at,updated_at')
      .order('order_index', { ascending: true });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, modules: data ?? [], warning: devKeyWarning() });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
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
  const accessLevel = (body as any)?.access_level === 'paid' ? 'paid' : 'free';
  const isPublished = typeof (body as any)?.is_published === 'boolean' ? (body as any).is_published : false;

  if (!title) {
    return NextResponse.json({ ok: false, error: 'Missing title' }, { status: 400 });
  }

  let supabaseAdmin: ReturnType<typeof getSupabaseAdmin>;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  const { data: lastModule, error: lastModuleError } = await supabaseAdmin
    .from('modules')
    .select('order_index')
    .order('order_index', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (lastModuleError) {
    return NextResponse.json({ ok: false, error: lastModuleError.message }, { status: 500 });
  }

  const nextOrderIndex = typeof lastModule?.order_index === 'number' ? lastModule.order_index + 1 : 1;

  const payload = {
    title,
    order_index: typeof (body as any)?.order_index === 'number' ? (body as any).order_index : nextOrderIndex,
    access_level: accessLevel,
    is_published: isPublished,
  };

  const { data, error } = await supabaseAdmin.from('modules').insert(payload).select('*').single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, module: data, warning: devKeyWarning() });
}

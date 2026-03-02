import { NextRequest, NextResponse } from 'next/server';
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

export async function PATCH(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!isDevRequest(request)) {
    return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  }

  const params = await ctx.params;
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
    ['access_level', (v) => (v === 'paid' || v === 'free' ? v : undefined)],
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

  const { data, error } = await supabaseAdmin.from('modules').update(patch).eq('id', id).select('*').single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, module: data, warning: devKeyWarning() });
}

export async function DELETE(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!isDevRequest(request)) {
    return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  }

  const params = await ctx.params;
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

  const { error } = await supabaseAdmin.from('modules').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, warning: devKeyWarning() });
}

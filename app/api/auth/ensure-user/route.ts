import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

export const runtime = 'nodejs';

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
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const email = typeof (body as any)?.email === 'string' ? String((body as any).email).trim() : '';
  if (!email) {
    return NextResponse.json({ ok: false, error: 'Missing email' }, { status: 400 });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
  }

  let supabaseAdmin: ReturnType<typeof getSupabaseAdmin>;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  try {
    const randomPassword = `ml_${randomUUID()}`;
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: randomPassword,
      email_confirm: true,
    });

    if (error || !data.user) {
      const anyErr = error as unknown as { message?: string; code?: string; status?: number };
      const code = anyErr?.code;
      const status = anyErr?.status;

      console.error('[ensure-user] createUser error', {
        email,
        code,
        status,
        message: anyErr?.message,
      });

      if (code === 'email_exists') {
        return NextResponse.json({ ok: true, existed: true });
      }

      return NextResponse.json(
        {
          ok: false,
          error: anyErr?.message ?? 'Failed to create user',
          code,
          status,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, userId: data.user.id, existed: false });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[ensure-user] unexpected error', err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

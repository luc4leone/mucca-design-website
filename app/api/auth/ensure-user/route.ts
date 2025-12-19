import { NextResponse } from 'next/server';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
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

async function findUserIdByEmail(supabaseAdmin: SupabaseClient<any>, email: string) {
  const perPage = 200;
  let page = 1;

  for (;;) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage });
    if (error) {
      throw error;
    }

    const match = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
    if (match?.id) {
      return match.id;
    }

    if (data.users.length < perPage) {
      return null;
    }

    page += 1;
  }
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

  let supabaseAdmin: SupabaseClient<any>;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  try {
    const existingUserId = await findUserIdByEmail(supabaseAdmin, email);
    if (existingUserId) {
      return NextResponse.json({ ok: true, userId: existingUserId, existed: true });
    }

    const randomPassword = `ml_${randomUUID()}_${randomUUID()}`;
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: randomPassword,
      email_confirm: true,
    });

    if (error || !data.user) {
      return NextResponse.json(
        { ok: false, error: error?.message ?? 'Failed to create user' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, userId: data.user.id, existed: false });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

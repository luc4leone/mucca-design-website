import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export async function POST(request: Request) {
  let parsed: { email?: unknown; body?: unknown };

  try {
    parsed = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { email, body } = parsed;

  if (typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  if (typeof body !== 'string' || body.trim().length === 0) {
    return NextResponse.json({ error: 'Empty message' }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error: dbError } = await supabase.from('messages').insert({
    email: email.trim(),
    body: body.trim(),
  });

  if (dbError) {
    console.error('DB error:', dbError);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  // Email notification — requires RESEND_API_KEY in .env.local
  // From: uses Resend's default test address; change to a verified domain address for production
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Mucca Design <onboarding@resend.dev>',
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `Nuovo messaggio da ${email.trim()}`,
      text: `Email: ${email.trim()}\n\nMessaggio:\n${body.trim()}`,
    });
  } catch (emailError) {
    console.error('Email error:', emailError);
  }

  return NextResponse.json({ ok: true });
}

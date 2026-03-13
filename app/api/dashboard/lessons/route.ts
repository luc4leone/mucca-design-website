import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const userIdByTokenCache = new Map<string, { userId: string; expiresAtMs: number }>();

function parseJwtExpMs(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = JSON.parse(Buffer.from(parts[1]!, 'base64').toString('utf8')) as { exp?: number };
    if (!payload?.exp || typeof payload.exp !== 'number') return null;
    return payload.exp * 1000;
  } catch {
    return null;
  }
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

function getBearerToken(request: Request) {
  const auth = request.headers.get('authorization') ?? request.headers.get('Authorization');
  if (!auth) return null;
  const match = auth.match(/^Bearer\s+(.+)$/i);
  return match?.[1] ?? null;
}

export async function GET(request: Request) {
  const token = getBearerToken(request);
  if (!token) {
    return NextResponse.json({ ok: false, error: 'Missing Authorization header' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const lessonQueryValue = searchParams.get('q')?.trim() ?? '';
  const lessonPublicId = searchParams.get('public_id')?.trim() ?? '';
  const lessonSlug = searchParams.get('slug')?.trim() ?? '';
  const includeSummary = !['0', 'false', 'no'].includes((searchParams.get('summary') ?? '').trim().toLowerCase());

  let supabaseAdmin: ReturnType<typeof getSupabaseAdmin>;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  const now = Date.now();
  const cached = userIdByTokenCache.get(token);
  let userId: string | null = cached && cached.expiresAtMs > now ? cached.userId : null;

  if (!userId) {
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !userData?.user?.id) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    userId = userData.user.id;
    const expMs = parseJwtExpMs(token);
    const fallbackTtlMs = 5 * 60 * 1000;
    const expiresAtMs = typeof expMs === 'number' && expMs > now ? expMs : now + fallbackTtlMs;
    userIdByTokenCache.set(token, { userId, expiresAtMs });
  }

  if (lessonQueryValue || lessonPublicId || lessonSlug) {
    const value = lessonQueryValue || lessonPublicId || lessonSlug;

    const lessonSelect =
      'id,title,slug,public_id,description,skills,lesson_type,module_id,lesson_index,order_index,video_url,content,is_published';

    const { data: byPublicId, error: byPublicIdError } = await supabaseAdmin
      .from('lessons')
      .select(lessonSelect)
      .eq('is_published', true)
      .eq('public_id', value)
      .limit(1)
      .maybeSingle();
    if (byPublicIdError) {
      return NextResponse.json({ ok: false, error: byPublicIdError.message }, { status: 500 });
    }

    const { data: bySlug, error: bySlugError } = byPublicId
      ? { data: null, error: null }
      : await supabaseAdmin
          .from('lessons')
          .select(lessonSelect)
          .eq('is_published', true)
          .eq('slug', value)
          .limit(1)
          .maybeSingle();
    if (bySlugError) {
      return NextResponse.json({ ok: false, error: bySlugError.message }, { status: 500 });
    }

    const lesson = byPublicId ?? bySlug;
    if (!lesson) {
      return NextResponse.json({ ok: false, error: 'Lesson not found' }, { status: 404 });
    }

    const { data: progressData } = await supabaseAdmin
      .from('user_progress')
      .select('completed')
      .eq('user_id', userId)
      .eq('lesson_id', lesson.id)
      .maybeSingle();

    return NextResponse.json({ ok: true, lesson, completed: Boolean(progressData?.completed) });
  }

  const { data, error, count } = await supabaseAdmin
    .from('lessons')
    .select('id,title,public_id,description,skills,lesson_type,module_id,lesson_index,order_index', { count: 'exact' })
    .eq('is_published', true)
    .order('order_index', { ascending: true });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  if (!includeSummary) {
    return NextResponse.json({ ok: true, lessons: data ?? [] });
  }

  const { count: modulesCount, error: modulesCountError } = await supabaseAdmin
    .from('modules')
    .select('id', { count: 'exact', head: true })
    .eq('is_published', true);

  if (modulesCountError) {
    return NextResponse.json({ ok: false, error: modulesCountError.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    lessons: data ?? [],
    summary: {
      total_lessons: count ?? (data?.length ?? 0),
      total_modules: modulesCount ?? 0,
    },
  });
}

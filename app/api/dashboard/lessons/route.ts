import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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
  const lessonPublicId = searchParams.get('public_id')?.trim() ?? '';
  const lessonSlug = searchParams.get('slug')?.trim() ?? '';

  let supabaseAdmin: ReturnType<typeof getSupabaseAdmin>;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
  if (userError || !userData?.user?.id) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (lessonPublicId || lessonSlug) {
    let lessonQuery = supabaseAdmin
      .from('lessons')
      .select(
        'id,title,slug,public_id,description,skills,lesson_type,module_id,lesson_index,order_index,video_url,content,is_published',
      )
      .eq('is_published', true)
      .limit(1);

    if (lessonPublicId) {
      lessonQuery = lessonQuery.eq('public_id', lessonPublicId);
    } else {
      lessonQuery = lessonQuery.eq('slug', lessonSlug);
    }

    const { data: lesson, error: lessonError } = await lessonQuery.maybeSingle();

    if (lessonError) {
      return NextResponse.json({ ok: false, error: lessonError.message }, { status: 500 });
    }

    if (!lesson) {
      return NextResponse.json({ ok: false, error: 'Lesson not found' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, lesson });
  }

  const { data, error, count } = await supabaseAdmin
    .from('lessons')
    .select('id,title,public_id,description,skills,lesson_type,module_id,lesson_index,order_index', { count: 'exact' })
    .eq('is_published', true)
    .order('order_index', { ascending: true });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
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

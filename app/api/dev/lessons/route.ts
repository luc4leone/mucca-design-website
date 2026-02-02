import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { randomBytes } from 'crypto';

export const runtime = 'nodejs';

async function getDefaultModuleId(supabaseAdmin: ReturnType<typeof getSupabaseAdmin>) {
  const { data, error } = await supabaseAdmin
    .from('modules')
    .select('id')
    .order('order_index', { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data?.id) {
    throw new Error('No modules found. Did you run the modules migration?');
  }

  return data.id as string;
}

function slugify(value: string) {
  const base = value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return base || 'lesson';
}

async function ensureUniqueSlug(supabaseAdmin: ReturnType<typeof getSupabaseAdmin>, baseSlug: string) {
  let candidate = baseSlug;
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const { data, error } = await supabaseAdmin
      .from('lessons')
      .select('id')
      .eq('slug', candidate)
      .limit(1)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      return candidate;
    }

    candidate = `${baseSlug}-${randomBytes(3).toString('hex')}`;
  }

  throw new Error('Unable to generate a unique slug');
}

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

  const { data, error } = await supabaseAdmin
    .from('lessons')
    .select(
      'id,title,slug,public_id,module_id,lesson_index,lesson_type,description,skills,video_url,content,order_index,duration_minutes,is_published,created_at,updated_at',
    )
    .order('order_index', { ascending: true });

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
  const slugInput = typeof (body as any)?.slug === 'string' ? String((body as any).slug).trim() : '';
  const moduleId =
    typeof (body as any)?.module_id === 'string' ? String((body as any).module_id).trim() : '';
  const lessonTypeInput =
    typeof (body as any)?.lesson_type === 'string' ? String((body as any).lesson_type).trim() : '';

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

  const { data: lastLesson } = await supabaseAdmin
    .from('lessons')
    .select('order_index')
    .order('order_index', { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextOrderIndex = typeof lastLesson?.order_index === 'number' ? lastLesson.order_index + 1 : 1;

  let resolvedModuleId = moduleId;
  if (!resolvedModuleId) {
    try {
      resolvedModuleId = await getDefaultModuleId(supabaseAdmin);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
  }

  const { data: lastModuleLesson } = await supabaseAdmin
    .from('lessons')
    .select('lesson_index')
    .eq('module_id', resolvedModuleId)
    .order('lesson_index', { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextLessonIndex =
    typeof lastModuleLesson?.lesson_index === 'number' ? lastModuleLesson.lesson_index + 1 : 1;

  let resolvedSlug = slugInput;
  if (!resolvedSlug) {
    try {
      resolvedSlug = await ensureUniqueSlug(supabaseAdmin, slugify(title));
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
  }

  const payload = {
    title,
    slug: resolvedSlug,
    module_id: resolvedModuleId,
    lesson_type:
      lessonTypeInput === 'intermezzo' || lessonTypeInput === 'milestone' ? lessonTypeInput : 'esercizio',
    lesson_index:
      typeof (body as any)?.lesson_index === 'number' ? (body as any).lesson_index : nextLessonIndex,
    description: typeof (body as any)?.description === 'string' ? String((body as any).description) : null,
    skills: typeof (body as any)?.skills === 'string' ? String((body as any).skills) : null,
    video_url: typeof (body as any)?.video_url === 'string' ? String((body as any).video_url) : null,
    content: typeof (body as any)?.content === 'string' ? String((body as any).content) : null,
    duration_minutes: typeof (body as any)?.duration_minutes === 'number' ? (body as any).duration_minutes : null,
    is_published: typeof (body as any)?.is_published === 'boolean' ? (body as any).is_published : false,
    order_index: typeof (body as any)?.order_index === 'number' ? (body as any).order_index : nextOrderIndex,
  };

  const { data, error } = await supabaseAdmin.from('lessons').insert(payload).select('*').single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, lesson: data, warning: devKeyWarning() });
}

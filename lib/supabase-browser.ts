'use client';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

type GlobalWithSupabase = typeof globalThis & {
  __muccaSupabaseClient?: SupabaseClient;
};

export function getSupabaseBrowserClient(
  supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
) {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  const g = globalThis as GlobalWithSupabase;

  if (!g.__muccaSupabaseClient) {
    g.__muccaSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }

  return g.__muccaSupabaseClient;
}

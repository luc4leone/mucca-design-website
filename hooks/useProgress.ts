'use client';

import type { SupabaseClient } from '@supabase/supabase-js';
import { useCallback, useState } from 'react';

type ProgressStats = {
  total_lessons: number;
  completed_lessons: number;
  percentage: number;
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressStats | null>(null);
  const [progressError, setProgressError] = useState<string | null>(null);
  const [progressLoading, setProgressLoading] = useState(false);

  const loadProgress = useCallback(async (supabase: SupabaseClient, userId: string) => {
    setProgressLoading(true);
    setProgressError(null);

    const { data, error } = await supabase.rpc('get_user_progress_stats', { p_user_id: userId }).single();

    if (error) {
      setProgress(null);
      setProgressError(error.message);
      setProgressLoading(false);
      return;
    }

    const anyStats = data as unknown as ProgressStats;
    setProgress({
      total_lessons: anyStats.total_lessons ?? 0,
      completed_lessons: anyStats.completed_lessons ?? 0,
      percentage: Number(anyStats.percentage ?? 0),
    });

    setProgressLoading(false);
  }, []);

  return { progress, progressError, progressLoading, loadProgress };
}

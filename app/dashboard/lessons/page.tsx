'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useMemo, useState } from 'react';

type Lesson = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  order_index: number;
};

export default function DashboardLessonsPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = useMemo(() => {
    if (!supabaseUrl || !supabaseAnonKey) {
      return null;
    }

    return createClient(supabaseUrl, supabaseAnonKey);
  }, [supabaseUrl, supabaseAnonKey]);

  const [status, setStatus] = useState<string>('Caricamento...');
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    if (!supabase) {
      setStatus('Configurazione mancante: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY');
      return;
    }

    (async () => {
      setStatus('Carico le lezioni...');
      const { data: lessonsData, error: lessonsError } = await supabase
        .from('lessons')
        .select('id,title,slug,description,order_index')
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (lessonsError) {
        setStatus(`Errore lezioni: ${lessonsError.message}`);
        return;
      }

      setLessons((lessonsData as Lesson[]) ?? []);
      setStatus('');
    })();
  }, [supabase]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
      <div className="title" style={{ marginBottom: 'var(--spacing-xxl)' }}>
        Lezioni
      </div>

      {status ? <div className="text" style={{ marginBottom: 'var(--spacing-l)' }}>{status}</div> : null}

      {lessons.length ? (
        <div style={{ display: 'grid', gap: '12px' }}>
          {lessons.map((l) => (
            <div
              key={l.id}
              style={{
                border: '1px solid var(--grey-300)',
                padding: '16px',
              }}
            >
              <div className="text" style={{ fontWeight: 700, marginBottom: '6px' }}>
                {l.order_index}. {l.title}
              </div>
              {l.description ? <div className="text">{l.description}</div> : null}
            </div>
          ))}
        </div>
      ) : null}

      {!status && lessons.length === 0 ? <div className="text">Nessuna lezione disponibile.</div> : null}
    </div>
  );
}

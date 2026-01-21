'use client';

import { useState } from 'react';
import '../../public/components/button/button.css';

export default function PricingPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/create-checkout-session', { method: 'POST' });
      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        setError('Errore durante la creazione della sessione di pagamento.');
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError('Errore durante il checkout.');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '80px auto', padding: '0 20px' }}>
      <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
        <div className="title">Iscriviti al Corso</div>
      </div>

      <div
        style={{
          backgroundColor: 'var(--grey-100)',
          padding: 'var(--spacing-2xl)',
          marginBottom: 'var(--spacing-l)',
        }}
      >
        <div className="title title--md">Abbonamento Mensile</div>

        <div className="text" style={{ margin: 'var(--spacing-l) 0' }}>
          Accesso completo a tutte le lezioni del corso
        </div>

        <div className="title" style={{ fontSize: '48px', marginBottom: 'var(--spacing-l)' }}>
          €49<span className="text">/mese</span>
        </div>

        <ul
          className="text"
          style={{
            listStyle: 'disc',
            paddingLeft: 'var(--spacing-xl)',
            marginBottom: 'var(--spacing-xl)',
          }}
        >
          <li>Video lezioni HD</li>
          <li>Contenuti scritti approfonditi</li>
          <li>Esercizi pratici</li>
          <li>Supporto via Discord</li>
          <li>Certificato di completamento</li>
        </ul>

        <button
          onClick={handleCheckout}
          className="button"
          disabled={loading}
          style={{ width: '100%' }}
        >
          {loading ? 'Caricamento...' : 'Iscriviti Ora'}
        </button>

        {error ? (
          <div className="text text--sm" style={{ marginTop: 'var(--spacing-l)', color: 'var(--grey-600)' }}>
            {error}
          </div>
        ) : null}
      </div>

      <div className="text text--sm" style={{ color: 'var(--grey-600)', textAlign: 'center' }}>
        Puoi cancellare in qualsiasi momento. Nessun impegno a lungo termine.
      </div>
    </div>
  );
}

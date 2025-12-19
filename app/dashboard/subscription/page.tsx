'use client';

export default function DashboardSubscriptionPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
      <div className="title" style={{ marginBottom: 'var(--spacing-xxl)' }}>
        Abbonamento
      </div>

      <div className="text" style={{ marginBottom: 'var(--spacing-l)' }}>
        Da qui potrai gestire il tuo abbonamento. Per ora puoi farlo dalla pagina pricing.
      </div>

      <a className="button" href="/pricing">
        Vai a Pricing
      </a>
    </div>
  );
}

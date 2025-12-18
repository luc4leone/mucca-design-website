import '../../public/components/button/button.css';

export default function SubscriptionExpiredPage() {
  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '80px auto',
        padding: '0 20px',
        textAlign: 'center',
      }}
    >
      <div className="title" style={{ marginBottom: 'var(--spacing-l)' }}>
        Abbonamento Scaduto
      </div>
      <div className="text" style={{ marginBottom: 'var(--spacing-xxl)' }}>
        Il tuo abbonamento non è più attivo. Riattivalo per continuare ad accedere al corso.
      </div>
      <a href="/pricing" className="button">
        Riattiva Abbonamento
      </a>
    </div>
  );
}

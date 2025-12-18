import '../../public/components/button/button.css';

export default function WelcomePage() {
  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '80px auto',
        padding: '0 20px',
        textAlign: 'center',
      }}
    >
      <div className="title" style={{ marginBottom: 'var(--spacing-xxl)' }}>
        Benvenuto!
      </div>

      <div className="text" style={{ marginBottom: 'var(--spacing-l)' }}>
        Il tuo pagamento è stato completato con successo.
      </div>

      <div className="text" style={{ marginBottom: 'var(--spacing-xxl)' }}>
        Riceverai a breve un'email con le istruzioni per accedere al corso.
      </div>

      <a href="/login" className="button">
        Accedi al Corso
      </a>
    </div>
  );
}

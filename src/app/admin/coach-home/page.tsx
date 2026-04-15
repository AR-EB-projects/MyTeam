import "./page.css";

export default function CoachHomePage() {
  return (
    <main className="ch-page">
      <div className="ch-dot-grid" aria-hidden="true" />
      <div className="ch-inner">
        <div className="ch-card">
          <h1 className="ch-title">Добре дошли</h1>
          <div className="ch-title-line" />
          <p className="ch-message">
            Моля, отворете линка на вашия клуб или се свържете с администратор.
          </p>
        </div>
      </div>
    </main>
  );
}

import { STORE_RATINGS, visible } from '../data/proof';

export default function TrustStrip() {
  const ratings = visible(STORE_RATINGS);
  if (!ratings.length) return null;

  return (
    <section className="trust-strip" aria-label="App store ratings">
      <style>{`
        .trust-strip { min-height: 0; padding: 2.5rem 2rem; background: #fff; border-top: 1px solid rgba(0,0,0,0.05); }
        .trust-list { list-style: none; margin: 0 auto; padding: 0; max-width: 1200px; display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem 3rem; }
        .trust-item { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 2px; }
        .trust-score { font-size: 1.6rem; font-weight: 800; color: var(--onyx); }
        .trust-score .stars { color: #FFC24B; font-size: 1.1rem; margin-left: 6px; letter-spacing: 1px; }
        .trust-meta { font-size: 0.85rem; color: #667085; }
        @media (max-width: 600px) { .trust-strip { padding: 2rem 1rem; } .trust-list { gap: 1.25rem 2rem; } }
      `}</style>
      <ul className="trust-list">
        {ratings.map((r) => (
          <li key={r.store} className="trust-item">
            <span className="trust-score">
              {r.rating.toFixed(1)}<span className="stars" aria-hidden="true">★★★★★</span>
              {r.sample && <span className="sample-tag">Sample</span>}
            </span>
            <span className="trust-meta">on {r.store === 'App Store' ? 'the App Store' : 'Google Play'}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

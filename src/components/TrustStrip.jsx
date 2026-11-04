import { STORE_RATINGS, MENTIONS, visible } from '../data/proof';

const monthYear = (iso) => new Date(`${iso.length === 7 ? `${iso}-01` : iso}T00:00:00Z`)
  .toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

export default function TrustStrip() {
  const ratings = visible(STORE_RATINGS);
  const mentions = visible(MENTIONS);
  if (!ratings.length && !mentions.length) return null;

  return (
    <section className="trust-strip" aria-label="Ratings and mentions">
      <style>{`
        .trust-strip {
          min-height: 0;
          padding: 2.5rem 2rem;
          background: #fff;
          border-top: 1px solid rgba(0,0,0,0.05);
        }
        .trust-list {
          list-style: none;
          margin: 0 auto;
          padding: 0;
          max-width: 1200px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem 3rem;
        }
        .trust-item { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 2px; }
        .trust-score { font-size: 1.6rem; font-weight: 800; color: var(--onyx); }
        .trust-score .stars { color: #FFC24B; font-size: 1.1rem; margin-left: 6px; letter-spacing: 1px; }
        .trust-meta { font-size: 0.85rem; color: #667085; }
        .trust-quote { font-size: 1rem; font-weight: 600; color: var(--onyx); max-width: 320px; }
        @media (max-width: 600px) {
          .trust-strip { padding: 2rem 1rem; }
          .trust-list { gap: 1.25rem 2rem; }
        }
      `}</style>
      <ul className="trust-list">
        {ratings.map((r) => (
          <li key={r.store} className="trust-item">
            <span className="trust-score">
              {r.rating.toFixed(1)}<span className="stars" aria-hidden="true">★★★★★</span>
              {r.sample && <span className="sample-tag">Sample</span>}
            </span>
            <span className="trust-meta">{r.count} ratings on {r.store}, as of {monthYear(r.checked)}</span>
          </li>
        ))}
        {mentions.map((m) => (
          <li key={m.source} className="trust-item">
            <span className="trust-quote">“{m.quote}”{m.sample && <span className="sample-tag">Sample</span>}</span>
            <span className="trust-meta">
              {m.url ? <a href={m.url} target="_blank" rel="noreferrer">{m.source}</a> : m.source}, {monthYear(m.date)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

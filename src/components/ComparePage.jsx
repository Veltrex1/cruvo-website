import InfoPage from "./InfoPage";
import { getSitePage } from "../data/sitePages";
import { COMPARISONS } from "../data/comparisons";
import { storeUrl } from "./storeLinks";

const styles = `
  .compare-table-wrap { overflow-x: auto; margin-top: 8px; border-radius: 8px; border: 1px solid rgba(22,22,24,0.08); background: #fff; }
  .compare-table { width: 100%; border-collapse: collapse; min-width: 560px; }
  .compare-table th, .compare-table td { text-align: left; vertical-align: top; padding: 16px 18px; border-bottom: 1px solid rgba(22,22,24,0.06); line-height: 1.55; }
  .compare-table thead th { background: var(--onyx); color: #fff; font-size: 0.95rem; }
  .compare-table thead th:nth-child(2) { color: #FFB3B8; }
  .compare-table tbody th { width: 22%; font-size: 0.95rem; }
  .compare-table td { color: #4b5563; }
  .compare-table tr:last-child th, .compare-table tr:last-child td { border-bottom: 0; }
  .compare-note { margin-top: 10px; font-size: 0.85rem; color: #667085; }
  .compare-cta { display: inline-flex; margin-top: 8px; padding: 0.85rem 1.6rem; text-decoration: none; }
  @media (max-width: 600px) {
    .compare-table { min-width: 0; }
    .compare-table thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
    .compare-table tr { display: block; border-bottom: 1px solid rgba(22,22,24,0.08); padding: 6px 0; }
    .compare-table tr:last-child { border-bottom: 0; }
    .compare-table tbody th, .compare-table td { display: block; width: auto; border: 0; padding: 6px 16px; }
    .compare-table td::before { content: attr(data-label); display: block; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: var(--coral-red); }
  }
  .compare-faq dt { font-weight: 800; margin-top: 18px; }
  .compare-faq dd { margin: 6px 0 0; color: #4b5563; line-height: 1.7; max-width: 62ch; }
`;

export default function ComparePage({ path }) {
  const page = getSitePage(path);
  const c = COMPARISONS[path];
  const reviewed = new Date(`${c.reviewed}T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

  return (
    <InfoPage currentPath={path} crumb={page.title} eyebrow="Compare" heading={c.heading} lead={page.definition}>
      <style>{styles}</style>
      <section className="info-section">
        <p>{c.intro}</p>
      </section>

      <section className="info-section">
        <h2>Cruvo and {c.rival} side by side</h2>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr><th scope="col"><span className="lr-sr-only">Feature</span></th><th scope="col">Cruvo</th><th scope="col">{c.rival}</th></tr>
            </thead>
            <tbody>
              {c.rows.map(([label, cruvo, rival]) => (
                <tr key={label}><th scope="row">{label}</th><td data-label="Cruvo">{cruvo}</td><td data-label={c.rival}>{rival}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="compare-note">Last reviewed {reviewed}. Features and prices change, so check each app&rsquo;s store listing for the latest.</p>
      </section>

      <section className="info-section">
        <h2>Which one fits you?</h2>
        <div className="info-grid">
          <div className="info-card"><h3>Pick Cruvo if</h3><p>{c.pickCruvo}</p></div>
          <div className="info-card"><h3>Pick {c.rival} if</h3><p>{c.pickRival}</p></div>
        </div>
      </section>

      <section className="info-section">
        <h2>Questions</h2>
        <dl className="compare-faq">
          {c.faq.map((f) => (
            <div key={f.q}><dt>{f.q}</dt><dd>{f.a}</dd></div>
          ))}
        </dl>
      </section>

      <section className="info-section">
        <h2>Try Cruvo with your crew</h2>
        <p>The Rider plan is free forever, so everyone in your group can join. No credit card required.</p>
        <a className="btn-primary compare-cta" href={storeUrl()}>Get Cruvo free</a>
        <p style={{ marginTop: 14 }}>See <a className="info-link" href="/pricing">Cruvo pricing</a> or <a className="info-link" href="/clubs">Cruvo for Clubs</a>.</p>
      </section>
    </InfoPage>
  );
}

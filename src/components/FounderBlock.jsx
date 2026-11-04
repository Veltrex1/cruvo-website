import { FOUNDER, SHOW_SAMPLES } from '../data/proof';

export default function FounderBlock() {
  if (FOUNDER.sample && !SHOW_SAMPLES) return null;
  const initials = FOUNDER.name.split(/\s+/).map((p) => p[0]).join('').slice(0, 2);

  return (
    <section id="team" className="founder-section" aria-labelledby="founder-heading">
      <style>{`
        .founder-section { background: #fff; min-height: 0; padding: 6rem 2rem 2rem; }
        .founder-inner {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 3.5rem;
          align-items: center;
        }
        .founder-photo {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 28px;
          object-fit: cover;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, #0F2A2B, #1C3A3B);
          color: #fff;
          font-size: 4rem;
          font-weight: 800;
        }
        .founder-eyebrow { color: var(--coral-red); text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; font-weight: 800; margin: 0 0 0.5rem; }
        .founder-heading { font-size: 2.4rem; line-height: 1.15; margin: 0 0 1.25rem; }
        .founder-story p { color: #4b5563; line-height: 1.75; margin: 0 0 1rem; max-width: 62ch; }
        .founder-sign { font-weight: 800; color: var(--onyx); margin: 1.25rem 0 0.75rem; }
        .founder-sign span { display: block; font-weight: 500; color: #667085; font-size: 0.9rem; }
        .founder-links { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .founder-links a {
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid rgba(0,0,0,0.1);
          color: var(--onyx);
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
        }
        .founder-links a:hover { color: var(--coral-red); border-color: rgba(229,78,87,0.4); }
        @media (max-width: 800px) {
          .founder-section { padding: 4rem 1rem 1rem; }
          .founder-inner { grid-template-columns: 1fr; gap: 1.75rem; }
          .founder-photo { width: 160px; font-size: 2.5rem; }
          .founder-heading { font-size: 1.8rem; }
        }
      `}</style>
      <div className="founder-inner">
        {FOUNDER.photo
          ? <img className="founder-photo" src={FOUNDER.photo} alt={`${FOUNDER.name}, ${FOUNDER.title}`} width="280" height="280" loading="lazy" />
          : <div className="founder-photo" aria-hidden="true">{initials}</div>}
        <div>
          <p className="founder-eyebrow">Why I built Cruvo{FOUNDER.sample && <span className="sample-tag">Sample</span>}</p>
          <h2 id="founder-heading" className="founder-heading">Built by someone who kept losing the group.</h2>
          <div className="founder-story">
            {FOUNDER.story.map((para) => <p key={para.slice(0, 24)}>{para}</p>)}
          </div>
          <p className="founder-sign">{FOUNDER.name}<span>{FOUNDER.title}</span></p>
          <div className="founder-links">
            {FOUNDER.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

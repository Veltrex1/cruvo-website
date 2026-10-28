import { FOUNDER } from '../data/siteProof';
import './proof.css';

// Founder block (audit D3.3). Hidden until a real name and story are added in src/data/siteProof.js.
export default function FounderBlock() {
  if (!FOUNDER.name || !FOUNDER.story) return null;
  return (
    <section id="about" className="proof-section proof-light">
      <div className="proof-inner founder-grid">
        {FOUNDER.photo && (
          <img className="founder-photo" src={FOUNDER.photo} alt={`${FOUNDER.name}, ${FOUNDER.title}`} width="280" height="280" />
        )}
        <div>
          <p className="proof-eyebrow">Why I built Cruvo</p>
          <h2 className="proof-heading">{FOUNDER.name}</h2>
          {FOUNDER.title && <p className="founder-title">{FOUNDER.title}</p>}
          <p className="founder-story">{FOUNDER.story}</p>
          <div className="founder-links">
            {FOUNDER.links.map(l => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

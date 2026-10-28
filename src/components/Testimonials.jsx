import { TESTIMONIALS } from '../data/siteProof';
import './proof.css';

// Three-card testimonial row (audit D3.2). Hidden until real quotes are added in src/data/siteProof.js.
export default function Testimonials() {
  if (!TESTIMONIALS.length) return null;

  return (
    <section id="stories" className="proof-section proof-light">
      <div className="proof-inner">
        <p className="proof-eyebrow">From the crew</p>
        <h2 className="proof-heading">Riders and drivers who ride with Cruvo.</h2>
        <div className="testimonial-row">
          {TESTIMONIALS.slice(0, 3).map(t => (
            <figure key={t.name} className="testimonial-card">
              <blockquote>“{t.quote}”</blockquote>
              <figcaption>
                {t.photo && <img src={t.photo} alt={`${t.name}, ${t.role}`} width="48" height="48" />}
                <span>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

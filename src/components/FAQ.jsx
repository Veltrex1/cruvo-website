import { VISIBLE_FAQ_ITEMS } from '../data/faq';
import './proof.css';

// Objection-handling FAQ (audit D1.4). FAQPage structured data is generated from the same list at build time.
export default function FAQ() {
  if (!VISIBLE_FAQ_ITEMS.length) return null;
  return (
    <section id="faq" className="proof-section proof-light">
      <div className="proof-inner proof-narrow">
        <p className="proof-eyebrow">FAQ</p>
        <h2 className="proof-heading">Questions riders ask before they install.</h2>
        <div className="faq-list">
          {VISIBLE_FAQ_ITEMS.map(item => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { TESTIMONIALS, visible } from '../data/proof';

const initials = (name) => name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();

export default function Testimonials() {
  const items = visible(TESTIMONIALS);
  if (!items.length) return null;

  return (
    <section id="riders" className="proof-section" aria-labelledby="riders-heading">
      <style>{`
        .proof-section {
          background: #fff;
          min-height: 0;
          padding: 6rem 2rem;
        }
        .proof-inner { width: 100%; max-width: 1200px; margin: 0 auto; }
        .proof-eyebrow {
          color: var(--coral-red);
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.8rem;
          font-weight: 800;
          margin: 0 0 0.5rem;
          text-align: center;
        }
        .proof-heading {
          font-size: 3rem;
          line-height: 1.1;
          text-align: center;
          margin: 0 auto 3rem;
          max-width: 720px;
        }
        .testimonial-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .testimonial-card {
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          height: 100%;
          padding: 2rem;
          border-radius: 24px;
          background: var(--snowdrift);
          border: 1px solid rgba(0,0,0,0.05);
        }
        .testimonial-quote {
          margin: 0;
          flex: 1;
          font-size: 1.1rem;
          line-height: 1.55;
          color: var(--onyx);
          font-weight: 500;
        }
        .testimonial-quote::before { content: "\\201C"; color: var(--coral-red); font-weight: 800; }
        .testimonial-quote::after { content: "\\201D"; color: var(--coral-red); font-weight: 800; }
        .testimonial-person { display: flex; align-items: center; gap: 0.85rem; }
        .testimonial-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          object-fit: cover;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          background: var(--deep-teal);
          color: #fff;
          font-weight: 800;
        }
        .testimonial-name { display: block; font-weight: 800; font-style: normal; color: var(--onyx); }
        .testimonial-role { display: block; font-size: 0.85rem; color: #667085; }
        @media (max-width: 900px) {
          .proof-section { padding: 4rem 1rem; }
          .proof-heading { font-size: 2rem; margin-bottom: 2rem; }
          .testimonial-grid { grid-template-columns: 1fr; }
          .testimonial-card { padding: 1.5rem; }
        }
      `}</style>

      <div className="proof-inner">
        <p className="proof-eyebrow">From the crew</p>
        <h2 id="riders-heading" className="proof-heading">Riders and drivers who stopped losing each other.</h2>

        <ul className="testimonial-grid">
          {items.map((t, i) => (
            <motion.li
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <figure className="testimonial-card">
                <blockquote className="testimonial-quote">{t.quote}</blockquote>
                <figcaption className="testimonial-person">
                  {t.photo
                    ? <img className="testimonial-avatar" src={t.photo} alt={`${t.name}, ${t.role}`} width="52" height="52" loading="lazy" />
                    : <span className="testimonial-avatar" aria-hidden="true">{initials(t.name)}</span>}
                  <span>
                    <cite className="testimonial-name">{t.name}{t.sample && <span className="sample-tag">Sample</span>}</cite>
                    <span className="testimonial-role">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { HOME_FAQ } from '../data/faq';

export default function HomeFAQ() {
  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-heading">
      <style>{`
        .faq-section { background: var(--snowdrift); min-height: 0; padding: 6rem 2rem; }
        .faq-inner { width: 100%; max-width: 820px; margin: 0 auto; }
        .faq-eyebrow { color: var(--coral-red); text-transform: uppercase; letter-spacing: 2px; font-size: 0.8rem; font-weight: 800; margin: 0 0 0.5rem; }
        .faq-heading { font-size: 3rem; line-height: 1.1; margin: 0 0 2rem; }
        .faq-item {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 16px;
          margin-bottom: 0.75rem;
        }
        .faq-item summary {
          list-style: none;
          cursor: pointer;
          padding: 1.15rem 3rem 1.15rem 1.4rem;
          font-weight: 700;
          font-size: 1.05rem;
          position: relative;
        }
        .faq-item summary::-webkit-details-marker { display: none; }
        .faq-item summary::after {
          content: "+";
          position: absolute;
          right: 1.4rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--coral-red);
          font-size: 1.4rem;
          font-weight: 600;
        }
        .faq-item[open] summary::after { content: "\\2212"; }
        .faq-item summary:focus-visible { outline: 2px solid var(--coral-red); outline-offset: 2px; border-radius: 16px; }
        .faq-item p { margin: 0; padding: 0 1.4rem 1.25rem; color: #4b5563; line-height: 1.65; }
        .faq-more { margin-top: 1.5rem; color: #4b5563; }
        .faq-more a { color: var(--onyx); font-weight: 700; }
        @media (max-width: 600px) {
          .faq-section { padding: 4rem 1rem; }
          .faq-heading { font-size: 2rem; }
          .faq-item summary { font-size: 1rem; padding: 1rem 2.75rem 1rem 1.1rem; }
          .faq-item p { padding: 0 1.1rem 1.1rem; }
        }
      `}</style>
      <div className="faq-inner">
        <p className="faq-eyebrow">Questions</p>
        <h2 id="faq-heading" className="faq-heading">Before your first group ride.</h2>
        {HOME_FAQ.map((item) => (
          <details key={item.q} className="faq-item">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
        <p className="faq-more">
          Something else? <a href="/support">Ask Cruvo support</a>.
        </p>
      </div>
    </section>
  );
}

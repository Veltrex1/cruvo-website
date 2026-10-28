import { motion } from "framer-motion";
import { Breadcrumbs, RelatedPages } from "./PageLinks";
import { getSitePage } from "../data/sitePages";

function renderLegalLine(line, index) {
  if (!line.trim()) {
    return <div key={index} className="legal-spacer" aria-hidden="true" />;
  }

  if (/^\d+\.\s/.test(line)) {
    return <h2 key={index}>{line}</h2>;
  }

  if (/^\d+\.\d+\s/.test(line)) {
    return <h3 key={index}>{line}</h3>;
  }

  if (line === line.toUpperCase() && line.length > 40) {
    return (
      <p key={index} className="legal-warning">
        {line}
      </p>
    );
  }

  return <p key={index}>{line}</p>;
}

export default function LegalPage({ policy, currentPath }) {
  const lines = policy.content.split(/\r?\n/);
  const definition = getSitePage(currentPath)?.definition;
  const documentLines = lines;

  return (
    <main className="legal-page">
      <style>{`
        .legal-page {
          min-height: 100vh;
          background:
            linear-gradient(180deg, rgba(15,42,43,0.06), rgba(248,248,248,0) 360px),
            var(--snowdrift);
          color: var(--onyx);
        }

        .legal-nav {
          width: min(100% - 32px, 1180px);
          margin: 0 auto;
          padding: 22px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }

        .legal-logo {
          display: block;
          width: 130px;
          height: 28px;
          background-color: var(--coral-red);
          -webkit-mask-image: url("/logos/Fullstack - Onyx.svg");
          -webkit-mask-size: contain;
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-position: center;
          mask-image: url("/logos/Fullstack - Onyx.svg");
          mask-size: contain;
          mask-repeat: no-repeat;
          mask-position: center;
          flex: 0 0 auto;
        }

        .legal-nav-links {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .legal-nav-link {
          color: #4b5563;
          text-decoration: none;
          font-size: 0.92rem;
          font-weight: 700;
          padding: 10px 14px;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 999px;
          background: rgba(255,255,255,0.72);
          transition: color 0.2s, border-color 0.2s, transform 0.2s;
        }

        .legal-nav-link:hover {
          color: var(--coral-red);
          border-color: rgba(229,78,87,0.32);
          transform: translateY(-1px);
        }

        .legal-hero {
          width: min(100% - 32px, 1180px);
          margin: 34px auto 0;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(220px, 320px);
          gap: 40px;
          align-items: end;
          padding-bottom: 34px;
          border-bottom: 1px solid rgba(22,22,24,0.1);
        }

        .legal-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--coral-red);
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .legal-eyebrow::before {
          content: "";
          width: 30px;
          height: 1px;
          background: var(--coral-red);
        }

        .legal-hero h1 {
          margin: 0;
          font-size: clamp(2.6rem, 8vw, 5.8rem);
          line-height: 0.94;
          letter-spacing: -0.03em;
          max-width: 760px;
        }

        .legal-lead {
          margin: 22px 0 0;
          max-width: 62ch;
          color: #4b5563;
          font-size: clamp(1.05rem, 2vw, 1.2rem);
          line-height: 1.65;
        }

        .legal-meta {
          justify-self: end;
          width: 100%;
          max-width: 320px;
          border-left: 3px solid var(--coral-red);
          padding: 18px 0 18px 22px;
          color: #667085;
          line-height: 1.6;
        }

        .legal-meta strong {
          display: block;
          color: var(--onyx);
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 6px;
        }

        .legal-layout {
          width: min(100% - 32px, 1180px);
          margin: 0 auto;
          padding: 46px 0 80px;
          display: grid;
          grid-template-columns: 220px minmax(0, 780px);
          gap: 58px;
          align-items: start;
        }

        .legal-aside {
          position: sticky;
          top: 26px;
          color: #667085;
          font-size: 0.92rem;
          line-height: 1.6;
        }

        .legal-aside a {
          color: var(--coral-red);
          text-decoration: none;
          font-weight: 800;
        }

        .legal-document {
          background: #fff;
          border: 1px solid rgba(22,22,24,0.08);
          border-radius: 8px;
          box-shadow: 0 24px 60px rgba(15,42,43,0.08);
          padding: clamp(1.35rem, 4vw, 3.25rem);
        }

        .legal-document h2 {
          margin: 2rem 0 0.7rem;
          color: var(--onyx);
          font-size: clamp(1.35rem, 3vw, 1.9rem);
          line-height: 1.15;
        }

        .legal-document h2:first-child {
          margin-top: 0;
        }

        .legal-document h3 {
          margin: 1.35rem 0 0.45rem;
          color: #243536;
          font-size: 1.08rem;
          letter-spacing: 0;
        }

        .legal-document p {
          margin: 0.58rem 0;
          color: #4b5563;
          font-size: 1rem;
          line-height: 1.76;
          overflow-wrap: anywhere;
        }

        .legal-warning {
          color: var(--onyx) !important;
          font-weight: 800;
          letter-spacing: 0.01em;
          padding: 1rem;
          border-radius: 8px;
          background: rgba(229,78,87,0.08);
          border: 1px solid rgba(229,78,87,0.16);
        }

        .legal-spacer {
          height: 0.8rem;
        }

        .legal-footer {
          width: min(100% - 32px, 1180px);
          margin: 0 auto;
          padding: 0 0 34px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          color: #667085;
          font-size: 0.9rem;
          border-top: 1px solid rgba(22,22,24,0.08);
          padding-top: 24px;
        }

        .legal-footer a {
          color: #667085;
          font-weight: 700;
          text-decoration: none;
        }

        .legal-footer a:hover {
          color: var(--coral-red);
        }

        @media (max-width: 860px) {
          .legal-nav {
            align-items: flex-start;
          }

          .legal-hero {
            margin-top: 18px;
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .legal-meta {
            justify-self: start;
            max-width: none;
          }

          .legal-layout {
            grid-template-columns: 1fr;
            gap: 22px;
            padding-top: 28px;
          }

          .legal-aside {
            position: static;
          }
        }

        @media (max-width: 560px) {
          .legal-nav {
            width: min(100% - 24px, 1180px);
            flex-direction: column;
          }

          .legal-nav-links {
            width: 100%;
            justify-content: stretch;
          }

          .legal-nav-link {
            flex: 1;
            text-align: center;
            padding: 11px 10px;
          }

          .legal-hero,
          .legal-layout,
          .legal-footer {
            width: min(100% - 24px, 1180px);
          }

          .legal-hero h1 {
            font-size: clamp(2.25rem, 14vw, 3.5rem);
          }

          .legal-document {
            padding: 1.2rem;
          }

          .legal-document p {
            font-size: 0.96rem;
            line-height: 1.68;
          }

          .legal-footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <nav className="legal-nav" aria-label="Legal pages">
        <a href="/" className="legal-logo" aria-label="Cruvo home" />
        <div className="legal-nav-links">
          <a className="legal-nav-link" href="/">
            Home
          </a>
          <a className="legal-nav-link" href="/about">About</a>
          <a className="legal-nav-link" href="/clubs">Clubs</a>
          <a className="legal-nav-link" href="/support">Support</a>
          <a className="legal-nav-link" href="/eula">EULA</a>
          <a className="legal-nav-link" href="/terms">Terms</a>
          <a className="legal-nav-link" href="/privacy-policy">Privacy</a>
        </div>
      </nav>

      <Breadcrumbs current={policy.title} />

      <motion.header
        className="legal-hero"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div>
          <div className="legal-eyebrow">Cruvo legal</div>
          <h1>{policy.title}</h1>
          {definition && <p className="legal-lead">{definition}</p>}
        </div>
        <div className="legal-meta">
          <strong>Effective Date</strong>
          {policy.effectiveDate}
        </div>
      </motion.header>

      <div className="legal-layout">
        <aside className="legal-aside">
          This page contains the official Cruvo {policy.title}. For questions, contact{" "}
          <a href="mailto:hello@veltrex.ai">hello@veltrex.ai</a>.
        </aside>

        <motion.article
          className="legal-document"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
        >
          {documentLines.map(renderLegalLine)}
        </motion.article>
      </div>

      <RelatedPages currentPath={currentPath} />

      <footer className="legal-footer">
        <span>&copy; {new Date().getFullYear()} Cruvo. All rights reserved.</span>
        <span>
          <a href="/about">About Cruvo</a> &nbsp;·&nbsp; <a href="/contact">Contact</a> &nbsp;·&nbsp; <a href="mailto:hello@veltrex.ai">Email</a> &nbsp;/&nbsp; Veltrex Solutions LLC
        </span>
      </footer>
    </main>
  );
}

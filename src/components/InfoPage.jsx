import { motion } from "framer-motion";
import { Breadcrumbs, RelatedPages } from "./PageLinks";

const styles = `
  .info-page {
    min-height: 100vh;
    background:
      radial-gradient(circle at top right, rgba(229,78,87,0.12), transparent 34rem),
      linear-gradient(180deg, rgba(15,42,43,0.06), rgba(248,248,248,0) 28rem),
      var(--snowdrift);
    color: var(--onyx);
  }

  .info-nav {
    width: min(100% - 32px, 1180px);
    margin: 0 auto;
    padding: 22px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
  }

  .info-logo {
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

  .info-nav-links {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .info-nav-link {
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

  .info-nav-link:hover {
    color: var(--coral-red);
    border-color: rgba(229,78,87,0.32);
    transform: translateY(-1px);
  }

  .info-hero {
    width: min(100% - 32px, 1180px);
    margin: 40px auto 0;
  }

  .info-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--coral-red);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .info-eyebrow::before {
    content: "";
    width: 30px;
    height: 1px;
    background: var(--coral-red);
  }

  .info-hero h1 {
    margin: 0;
    font-size: clamp(2.6rem, 7vw, 5.4rem);
    line-height: 0.96;
    letter-spacing: -0.04em;
    max-width: 900px;
  }

  .info-lead {
    margin: 26px 0 0;
    color: #667085;
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    line-height: 1.7;
    max-width: 720px;
  }

  .info-section {
    width: min(100% - 32px, 1180px);
    margin: 58px auto 0;
    /* App.css styles every <section> as a full-height centered flex column */
    min-height: 0;
    display: block;
    padding: 0;
  }

  .info-section h2 {
    margin: 0 0 18px;
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    letter-spacing: -0.03em;
  }

  .info-section > p {
    margin: 0 0 14px;
    color: #4b5563;
    line-height: 1.75;
    max-width: 760px;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
    margin-top: 22px;
  }

  .info-card {
    background: #fff;
    border: 1px solid rgba(22,22,24,0.08);
    border-radius: 8px;
    padding: 22px;
    box-shadow: 0 18px 50px rgba(15,42,43,0.06);
  }

  .info-card h3 {
    margin: 0 0 10px;
    font-size: 1.12rem;
    letter-spacing: -0.01em;
  }

  .info-card p {
    margin: 0;
    color: #667085;
    line-height: 1.62;
    font-size: 0.98rem;
  }

  .info-link {
    color: var(--coral-red);
    font-weight: 800;
    text-decoration: none;
  }

  .info-bottom {
    margin-top: 58px;
    padding-bottom: 40px;
  }

  .info-footer {
    width: min(100% - 32px, 1180px);
    margin: 0 auto;
    padding: 24px 0 34px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    color: #667085;
    font-size: 0.9rem;
    border-top: 1px solid rgba(22,22,24,0.08);
  }

  .info-footer a {
    color: #667085;
    font-weight: 700;
    text-decoration: none;
  }

  .info-footer a:hover {
    color: var(--coral-red);
  }

  @media (max-width: 560px) {
    .info-nav {
      flex-direction: column;
      align-items: flex-start;
    }

    .info-nav-links {
      width: 100%;
      justify-content: stretch;
    }

    .info-nav-link {
      flex: 1;
      text-align: center;
      padding: 11px 10px;
    }

    .info-footer {
      flex-direction: column;
    }
  }
`;

export default function InfoPage({ currentPath, crumb, eyebrow, heading, lead, children }) {
  return (
    <main className="info-page">
      <style>{styles}</style>

      <nav className="info-nav" aria-label="Site navigation">
        <a href="/" className="info-logo" aria-label="Cruvo home" />
        <div className="info-nav-links">
          <a className="info-nav-link" href="/">Home</a>
          <a className="info-nav-link" href="/about">About</a>
          <a className="info-nav-link" href="/clubs">Clubs</a>
          <a className="info-nav-link" href="/support">Support</a>
        </div>
      </nav>

      <Breadcrumbs current={crumb} />

      <motion.header
        className="info-hero"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="info-eyebrow">{eyebrow}</div>
        <h1>{heading}</h1>
        <p className="info-lead">{lead}</p>
      </motion.header>

      {children}

      <div className="info-bottom">
        <RelatedPages currentPath={currentPath} />
      </div>

      <footer className="info-footer">
        <span>&copy; {new Date().getFullYear()} Cruvo. All rights reserved.</span>
        <span>
          <a href="/terms">Terms</a> &nbsp;/&nbsp; <a href="/privacy-policy">Privacy Policy</a> &nbsp;/&nbsp; <a href="/eula">EULA</a>
        </span>
      </footer>
    </main>
  );
}

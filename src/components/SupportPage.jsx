import { motion } from "framer-motion";
import { Breadcrumbs, RelatedPages } from "./PageLinks";
import { Mail, MapPin, Navigation, ShieldAlert, CreditCard, UserX, Route, LifeBuoy } from "lucide-react";

const supportTopics = [
  {
    title: "Account and login",
    description: "Help with email sign-in, Google, Apple, onboarding, profile details, and account access.",
    icon: LifeBuoy,
  },
  {
    title: "Subscriptions and billing",
    description: "Questions about Cruvo Pro, App Store or Google Play purchases, renewals, and restore purchases.",
    icon: CreditCard,
  },
  {
    title: "Ride planning and navigation",
    description: "Support for route planning, meetup locations, live group rides, route previews, and ride summaries.",
    icon: Navigation,
  },
  {
    title: "Safety and SOS",
    description: "Questions about emergency contacts, SOS alerts, live location sharing, and safety workflows.",
    icon: ShieldAlert,
  },
  {
    title: "Location and ride history",
    description: "Help with background location, ride stats, route history, and saved ride summaries.",
    icon: Route,
  },
  {
    title: "Account deletion and privacy",
    description: "Delete your Cruvo account in the app or submit a verified deletion or privacy request by email.",
    icon: UserX,
  },
];

export default function SupportPage() {
  return (
    <main className="support-page">
      <style>{`
        .support-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top right, rgba(229,78,87,0.12), transparent 34rem),
            linear-gradient(180deg, rgba(15,42,43,0.06), rgba(248,248,248,0) 28rem),
            var(--snowdrift);
          color: var(--onyx);
        }

        .support-nav {
          width: min(100% - 32px, 1180px);
          margin: 0 auto;
          padding: 22px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }

        .support-logo {
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
        }

        .support-nav-links {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .support-nav-link {
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

        .support-nav-link:hover {
          color: var(--coral-red);
          border-color: rgba(229,78,87,0.32);
          transform: translateY(-1px);
        }

        .support-hero {
          width: min(100% - 32px, 1180px);
          margin: 50px auto 0;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 400px);
          gap: 48px;
          align-items: stretch;
        }

        .support-eyebrow {
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

        .support-eyebrow::before {
          content: "";
          width: 30px;
          height: 1px;
          background: var(--coral-red);
        }

        .support-hero h1 {
          margin: 0;
          font-size: clamp(3rem, 8vw, 6.5rem);
          line-height: 0.94;
          letter-spacing: -0.04em;
          max-width: 790px;
        }

        .support-hero-copy {
          margin: 26px 0 0;
          color: #667085;
          font-size: clamp(1.05rem, 2vw, 1.25rem);
          line-height: 1.7;
          max-width: 690px;
        }

        .support-contact-card {
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(22,22,24,0.08);
          border-radius: 8px;
          box-shadow: 0 26px 70px rgba(15,42,43,0.1);
          padding: clamp(1.3rem, 4vw, 2rem);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 28px;
        }

        .support-card-title {
          margin: 0 0 10px;
          font-size: 1.45rem;
          letter-spacing: -0.02em;
        }

        .support-card-copy {
          text-wrap: pretty;
          color: #667085;
          line-height: 1.65;
          margin: 0;
        }

        .support-email-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          min-height: 54px;
          border-radius: 999px;
          background: var(--coral-red);
          color: #fff;
          font-weight: 800;
          text-decoration: none;
          box-shadow: 0 16px 40px rgba(229,78,87,0.25);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .support-email-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 48px rgba(229,78,87,0.33);
        }

        .support-contact-row {
          text-wrap: pretty;
          display: grid;
          grid-template-columns: 42px 1fr;
          gap: 14px;
          align-items: start;
          color: #4b5563;
          line-height: 1.55;
        }

        .support-contact-row svg {
          width: 42px;
          height: 42px;
          padding: 10px;
          border-radius: 999px;
          color: var(--coral-red);
          background: rgba(229,78,87,0.08);
        }

        .support-contact-row strong {
          display: block;
          color: var(--onyx);
          margin-bottom: 4px;
        }

        .support-contact-row a {
          color: var(--coral-red);
          font-weight: 800;
          text-decoration: none;
        }

        .support-section {
          width: min(100% - 32px, 1180px);
          margin: 58px auto 0;
          padding-bottom: 78px;
        }

        .support-section h2 {
          margin: 0 0 22px;
          font-size: clamp(2rem, 4vw, 3rem);
          letter-spacing: -0.03em;
        }

        .support-topic-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .support-topic-card {
          background: #fff;
          border: 1px solid rgba(22,22,24,0.08);
          border-radius: 8px;
          padding: 22px;
          min-height: 196px;
          box-shadow: 0 18px 50px rgba(15,42,43,0.06);
        }

        .support-topic-card svg {
          width: 44px;
          height: 44px;
          padding: 10px;
          border-radius: 999px;
          color: var(--coral-red);
          background: rgba(229,78,87,0.08);
          margin-bottom: 20px;
        }

        .support-topic-card h3 {
          margin: 0 0 10px;
          font-size: 1.12rem;
          letter-spacing: -0.01em;
        }

        .support-topic-card p {
          text-wrap: pretty;
          margin: 0;
          color: #667085;
          line-height: 1.62;
          font-size: 0.98rem;
        }

        .support-note {
          margin-top: 18px;
          color: #667085;
          line-height: 1.65;
          max-width: 60ch;
          text-wrap: pretty;
        }

        .account-deletion-panel {
          border-top: 1px solid rgba(22,22,24,0.1);
          display: grid;
          gap: 28px;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 390px);
          margin-top: 58px;
          padding-top: 42px;
        }

        .account-deletion-panel h2 {
          margin-bottom: 14px;
        }

        .account-deletion-copy {
          color: #667085;
          line-height: 1.7;
          margin: 0;
          max-width: 60ch;
          text-wrap: pretty;
        }

        .account-deletion-steps {
          color: #4b5563;
          max-width: 60ch;
          text-wrap: pretty;
          line-height: 1.7;
          margin: 22px 0 0;
          padding-left: 22px;
        }

        .account-deletion-steps li + li {
          margin-top: 8px;
        }

        .account-deletion-action {
          align-self: start;
          background: #fff;
          border: 1px solid rgba(22,22,24,0.08);
          border-radius: 8px;
          box-shadow: 0 18px 50px rgba(15,42,43,0.06);
          padding: 24px;
        }

        .account-deletion-action strong {
          display: block;
          font-size: 1.08rem;
          margin-bottom: 10px;
        }

        .account-deletion-action p {
          text-wrap: pretty;
          color: #667085;
          line-height: 1.62;
          margin: 0 0 18px;
        }

        .support-footer {
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

        .support-footer a {
          color: #667085;
          font-weight: 700;
          text-decoration: none;
        }

        .support-footer a:hover {
          color: var(--coral-red);
        }

        @media (max-width: 920px) {
          .support-hero {
            grid-template-columns: 1fr;
            margin-top: 26px;
          }

          .support-topic-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .account-deletion-panel {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 620px) {
          .support-nav,
          .support-hero,
          .support-section,
          .support-footer {
            width: min(100% - 24px, 1180px);
          }

          .support-nav {
            flex-direction: column;
            align-items: flex-start;
          }

          .support-nav-links {
            width: 100%;
            justify-content: stretch;
          }

          .support-nav-link {
            flex: 1;
            text-align: center;
            padding: 11px 10px;
          }

          .support-topic-grid {
            grid-template-columns: 1fr;
          }

          .support-contact-card,
          .support-topic-card {
            border-radius: 8px;
          }

          .support-footer {
            flex-direction: column;
          }
        }
      `}</style>

      <nav className="support-nav" aria-label="Support navigation">
        <a href="/" className="support-logo" aria-label="Cruvo home" />
        <div className="support-nav-links">
          <a className="support-nav-link" href="/">Home</a>
          <a className="support-nav-link" href="/about">About</a>
          <a className="support-nav-link" href="/clubs">Clubs</a>
          <a className="support-nav-link" href="/terms">Terms</a>
          <a className="support-nav-link" href="/privacy-policy">Privacy</a>
          <a className="support-nav-link" href="/eula">EULA</a>
        </div>
      </nav>

      <Breadcrumbs current="Support" />

      <motion.header
        className="support-hero"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div>
          <div className="support-eyebrow">Cruvo support</div>
          <h1>Talk to us.</h1>
          <p className="support-hero-copy">
            Need help with Cruvo? Send us an email and include your account email, device model,
            app version, and a short description of what happened so we can investigate quickly.
          </p>
        </div>

        <aside className="support-contact-card" aria-label="Cruvo support contact information">
          <div>
            <h2 className="support-card-title">Support contact</h2>
            <p className="support-card-copy">
              We usually respond within 1-2 business days. For urgent real-world emergencies,
              contact local emergency services first.
            </p>
          </div>

          <a className="support-email-button" href="mailto:hello@veltrex.ai?subject=Cruvo%20Support%20Request">
            <Mail size={20} aria-hidden="true" />
            Email support
          </a>

          <div className="support-contact-row">
            <Mail aria-hidden="true" />
            <div>
              <strong>Email</strong>
              <a href="mailto:hello@veltrex.ai">hello@veltrex.ai</a>
            </div>
          </div>

          <div className="support-contact-row">
            <MapPin aria-hidden="true" />
            <div>
              <strong>Address</strong>
              Veltrex Solutions LLC<br />
              850 S 800 E<br />
              Zionsville, IN 46077-9787<br />
              United States
            </div>
          </div>
        </aside>
      </motion.header>

      <section className="support-section" aria-labelledby="support-topics-heading">
        <h2 id="support-topics-heading">What we can help with</h2>
        <div className="support-topic-grid">
          {supportTopics.map(({ title, description, icon: Icon }) => (
            <article className="support-topic-card" key={title}>
              <Icon aria-hidden="true" />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <p className="support-note">
          For privacy rights or data questions that do not require account deletion, email
          hello@veltrex.ai with enough information for us to identify and verify your account.
        </p>

        <div className="account-deletion-panel" id="account-deletion">
          <div>
            <h2>Delete your Cruvo account</h2>
            <p className="account-deletion-copy">
              You do not need to reinstall or open Cruvo to request deletion. This support page is
              Cruvo&apos;s web-accessible account-deletion request path for users who cannot access
              the in-app control.
            </p>
            <ol className="account-deletion-steps">
              <li>
                In the app, go to Profile, Settings, Account Actions, then Delete Account for
                immediate self-service deletion.
              </li>
              <li>
                Or email us from the address associated with your Cruvo account and include your
                Cruvo username. We may ask you to verify account ownership.
              </li>
              <li>
                Deleting Cruvo does not cancel an App Store or Google Play subscription. Cancel it
                separately in the store account used to purchase Cruvo Pro.
              </li>
            </ol>
          </div>
          <aside className="account-deletion-action" aria-label="Request Cruvo account deletion">
            <strong>Email an account-deletion request</strong>
            <p>
              Use your account email when possible. We will reply with any verification or
              completion steps.
            </p>
            <a
              className="support-email-button"
              href="mailto:hello@veltrex.ai?subject=Cruvo%20Account%20Deletion%20Request&body=Cruvo%20username%3A%0AAccount%20email%3A%0A%0AI%20request%20deletion%20of%20my%20Cruvo%20account%20and%20associated%20personal%20data."
            >
              <UserX size={20} aria-hidden="true" />
              Request account deletion
            </a>
          </aside>
        </div>
      </section>

      <RelatedPages currentPath="/support" />

      <footer className="support-footer">
        <span>&copy; {new Date().getFullYear()} Cruvo. All rights reserved.</span>
        <span>
          <a href="/terms">Terms</a> &nbsp;/&nbsp; <a href="/privacy-policy">Privacy Policy</a> &nbsp;/&nbsp; <a href="/eula">EULA</a>
        </span>
      </footer>
    </main>
  );
}

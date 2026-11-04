import InfoPage from "./InfoPage";
import PricingCards from "./PricingCards";
import { getSitePage } from "../data/sitePages";
import { HOME_FAQ } from "../data/faq";

const BILLING_FAQ = HOME_FAQ.filter((f) => /plan|Captain|cancel/i.test(f.q));

export default function PricingPage() {
  return (
    <InfoPage
      currentPath="/pricing"
      crumb="Pricing"
      eyebrow="Pricing"
      heading="Your crew rides free. Captains get the scenic way."
      lead={getSitePage("/pricing").definition}
    >
      <div style={{ marginTop: 40 }}>
        <PricingCards headingLevel="h2" />
      </div>

      <section className="info-section">
        <h2>Billing questions</h2>
        <div className="info-grid">
          {BILLING_FAQ.map((f) => (
            <div className="info-card" key={f.q}><h3>{f.q}</h3><p>{f.a}</p></div>
          ))}
        </div>
      </section>
    </InfoPage>
  );
}

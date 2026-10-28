import InfoPage from "./InfoPage";
import { getSitePage } from "../data/sitePages";
import { COMPANY } from "../data/company";

const telHref = `tel:${COMPANY.phone.replace(/[^+\d]/g, "")}`;

export default function ContactPage() {
  return (
    <InfoPage
      currentPath="/contact"
      crumb="Contact"
      eyebrow="Contact Cruvo"
      heading="Talk to the team behind Cruvo."
      lead={getSitePage("/contact").definition}
    >
      <section className="info-section">
        <h2>Ways to reach us</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>Email</h3>
            <p>
              For support, privacy requests, and general questions, email{" "}
              <a className="info-link" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
            </p>
          </div>
          <div className="info-card">
            <h3>Phone</h3>
            <p>
              Call <a className="info-link" href={telHref}>{COMPANY.phone}</a>.
            </p>
          </div>
          <div className="info-card">
            <h3>Mail</h3>
            <address className="info-address">
              {COMPANY.name}<br />
              {COMPANY.street}<br />
              {COMPANY.city}, {COMPANY.region} {COMPANY.postalCode}<br />
              {COMPANY.country}
            </address>
          </div>
          <div className="info-card">
            <h3>Clubs</h3>
            <p>
              Run a motorcycle or car club? Use the <a className="info-link" href="/clubs#contact">club request form</a> or email{" "}
              <a className="info-link" href={`mailto:${COMPANY.clubsEmail}`}>{COMPANY.clubsEmail}</a>.
            </p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <h2>Help with the app</h2>
        <p>
          For account, billing, ride, and safety questions, or to delete your account, see{" "}
          <a className="info-link" href="/support">Cruvo Support</a>. Our{" "}
          <a className="info-link" href="/privacy-policy">Privacy Policy</a> and{" "}
          <a className="info-link" href="/terms">Terms and Conditions</a> name the same company and contact details.
        </p>
      </section>
    </InfoPage>
  );
}

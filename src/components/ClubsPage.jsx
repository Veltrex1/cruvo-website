import { useState } from "react";
import InfoPage from "./InfoPage";
import { getSitePage } from "../data/sitePages";

const support = [
  {
    title: "Group rides and drives",
    description: "Plan club outings, invite members, and keep the group together on the road.",
  },
  {
    title: "Shared routes",
    description: "Build and share routes your whole club can follow, from weekend loops to scenic runs.",
  },
  {
    title: "A home for your crew",
    description: "Keep members connected with posts, updates, and a community that loves the same roads.",
  },
  {
    title: "Charity rides and drives",
    description: "Organise and promote charity events for your club, on two wheels or four.",
  },
];

const formStyles = `
  .clubs-form-wrap {
    background: #fff;
    border: 1px solid rgba(22,22,24,0.08);
    border-radius: 8px;
    box-shadow: 0 26px 70px rgba(15,42,43,0.1);
    padding: clamp(1.3rem, 4vw, 2.2rem);
    max-width: 760px;
  }

  .clubs-form {
    display: grid;
    gap: 16px;
  }

  .clubs-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
  }

  .clubs-field label {
    display: block;
    font-weight: 700;
    font-size: 0.92rem;
    margin-bottom: 6px;
  }

  .clubs-field input,
  .clubs-field select,
  .clubs-field textarea {
    width: 100%;
    box-sizing: border-box;
    font: inherit;
    padding: 12px 14px;
    border: 1px solid rgba(22,22,24,0.18);
    border-radius: 8px;
    background: #fff;
    color: var(--onyx);
  }

  .clubs-field input:focus,
  .clubs-field select:focus,
  .clubs-field textarea:focus {
    outline: 2px solid rgba(229,78,87,0.4);
    border-color: var(--coral-red);
  }

  .clubs-field textarea {
    min-height: 140px;
    resize: vertical;
  }

  .clubs-hp {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .clubs-submit {
    min-height: 54px;
    border: 0;
    border-radius: 999px;
    background: var(--coral-red);
    color: #fff;
    font: inherit;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 16px 40px rgba(229,78,87,0.25);
  }

  .clubs-submit:disabled {
    opacity: 0.7;
    cursor: default;
  }

  .clubs-message {
    padding: 14px 16px;
    border-radius: 8px;
    line-height: 1.55;
  }

  .clubs-message.success {
    background: rgba(104,198,112,0.12);
    border: 1px solid rgba(104,198,112,0.3);
    color: #1f6b2a;
  }

  .clubs-message.error {
    background: rgba(229,78,87,0.08);
    border: 1px solid rgba(229,78,87,0.25);
    color: #9b1c25;
  }

  .clubs-message a {
    color: inherit;
    font-weight: 800;
  }
`;

const emptyForm = {
  clubName: "",
  name: "",
  email: "",
  clubType: "motorcycle",
  members: "",
  message: "",
  website: "",
};

function ClubForm() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle");

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/club-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error(`Request failed with ${response.status}`);
      setStatus("success");
      setForm(emptyForm);
    } catch (error) {
      console.error("Error sending club request:", error);
      setStatus("error");
    }
  };

  return (
    <div className="clubs-form-wrap">
      <style>{formStyles}</style>

      {status === "success" ? (
        <div className="clubs-message success" role="status">
          Thanks, your request is on its way. We will reply to the email address you gave us.
        </div>
      ) : (
        <form className="clubs-form" onSubmit={handleSubmit}>
          <div className="clubs-row">
            <div className="clubs-field">
              <label htmlFor="club-name">Club name</label>
              <input id="club-name" name="clubName" required maxLength={120} value={form.clubName} onChange={update("clubName")} />
            </div>
            <div className="clubs-field">
              <label htmlFor="club-contact">Your name</label>
              <input id="club-contact" name="name" required maxLength={120} autoComplete="name" value={form.name} onChange={update("name")} />
            </div>
          </div>

          <div className="clubs-row">
            <div className="clubs-field">
              <label htmlFor="club-email">Email</label>
              <input id="club-email" name="email" type="email" required maxLength={200} autoComplete="email" value={form.email} onChange={update("email")} />
            </div>
            <div className="clubs-field">
              <label htmlFor="club-type">Type of club</label>
              <select id="club-type" name="clubType" value={form.clubType} onChange={update("clubType")}>
                <option value="motorcycle">Motorcycle club</option>
                <option value="car">Car club</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>

          <div className="clubs-field">
            <label htmlFor="club-members">Approximate number of members (optional)</label>
            <input id="club-members" name="members" maxLength={40} value={form.members} onChange={update("members")} />
          </div>

          <div className="clubs-field">
            <label htmlFor="club-message">How can we help?</label>
            <textarea id="club-message" name="message" required maxLength={4000} value={form.message} onChange={update("message")} />
          </div>

          <div className="clubs-hp" aria-hidden="true">
            <label htmlFor="club-website">Leave this field empty</label>
            <input id="club-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update("website")} />
          </div>

          {status === "error" && (
            <div className="clubs-message error" role="alert">
              Something went wrong sending your request. Please email us at{" "}
              <a href="mailto:info@cruvo.co">info@cruvo.co</a> instead.
            </div>
          )}

          <button type="submit" className="clubs-submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Send request"}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ClubsPage() {
  return (
    <InfoPage
      currentPath="/clubs"
      crumb="Cruvo for Clubs"
      eyebrow="Cruvo for Clubs"
      heading="Run a club? Ride and drive together."
      lead={getSitePage("/clubs").definition}
    >
      <section className="info-section">
        <h2>How we support clubs</h2>
        <div className="info-grid">
          {support.map((item) => (
            <div className="info-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="info-section" id="contact">
        <h2>Contact us</h2>
        <p>
          Send us a request and it goes straight to our team at{" "}
          <a className="info-link" href="mailto:info@cruvo.co">info@cruvo.co</a>.
        </p>
        <ClubForm />
      </section>
    </InfoPage>
  );
}

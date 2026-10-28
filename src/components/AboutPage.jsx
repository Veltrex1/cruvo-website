import InfoPage from "./InfoPage";
import { getSitePage } from "../data/sitePages";

const features = [
  {
    title: "Group drives",
    description: "Plan a drive, bring your crew, and keep everyone together on the road, just like group rides on two wheels.",
  },
  {
    title: "Scenic routes",
    description: "Find and share routes chosen for the drive itself, not only the destination.",
  },
  {
    title: "Garage",
    description: "Keep your cars and bikes in one garage, with the stats that matter to the people who love them.",
  },
  {
    title: "Social",
    description: "Share posts, routes, and rides with a community that loves the same roads you do.",
  },
];

export default function AboutPage() {
  return (
    <InfoPage
      currentPath="/about"
      crumb="About"
      eyebrow="About Cruvo"
      heading="Built for the ride. Now for the drive too."
      lead={getSitePage("/about").definition}
    >
      <section className="info-section">
        <h2>From bikes to cars</h2>
        <p>
          Cruvo began with group rides, live navigation, crew updates, and a community built specifically for
          motorcyclists. Riders told us what mattered: staying together on the road, finding great routes, and
          sharing the journey afterward.
        </p>
        <p>
          Drivers care about the same things. So we are bringing Cruvo to cars with the same features, curated
          for the way people drive. Bikes are not going anywhere. Cruvo is for riders and drivers alike.
        </p>
      </section>

      <section className="info-section">
        <h2>Same features, curated for cars</h2>
        <div className="info-grid">
          {features.map((feature) => (
            <div className="info-card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="info-section">
        <h2>Charity rides and drives</h2>
        <p>
          We want to make it easier to organise and join charity rides and drives, for motorcycles and cars
          alike, so the roads we love can also do some good.
        </p>
      </section>

      <section className="info-section">
        <h2>Run a club?</h2>
        <p>
          Motorcycle and car clubs are at the heart of this community. See how we support them on the{" "}
          <a className="info-link" href="/clubs">Cruvo for Clubs</a> page, or get in touch there.
        </p>
      </section>
    </InfoPage>
  );
}

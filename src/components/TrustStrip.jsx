import { Star } from 'lucide-react';
import { STORE_RATINGS, MENTIONS } from '../data/siteProof';
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '../storeLinks';
import './proof.css';

function RatingItem({ store, data, href }) {
  if (!data) return null;
  return (
    <a className="trust-item" href={href} target="_blank" rel="noreferrer">
      <Star size={16} fill="currentColor" className="trust-star" />
      <span><strong>{data.rating}</strong> on the {store}</span>
      <span className="trust-muted">{data.count} {data.count === 1 ? 'rating' : 'ratings'}, {data.asOf}</span>
    </a>
  );
}

// Compact hero version: rating line under the store badges.
export function HeroRating() {
  const r = STORE_RATINGS.appStore;
  if (!r) return null;
  return (
    <p className="hero-rating">
      <Star size={14} fill="currentColor" /> {r.rating} on the App Store <span>({r.count} {r.count === 1 ? 'rating' : 'ratings'}, {r.asOf})</span>
    </p>
  );
}

// Trust strip above pricing (audit D3.5, D3.4).
export default function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Ratings and trust">
      <div className="trust-strip-inner">
        <RatingItem store="App Store" data={STORE_RATINGS.appStore} href={APP_STORE_URL} />
        <RatingItem store="Google Play" data={STORE_RATINGS.googlePlay} href={GOOGLE_PLAY_URL} />
        {MENTIONS.map(m => (
          <a key={m.source} className="trust-item" href={m.url} target="_blank" rel="noreferrer">
            <span><strong>{m.source}</strong>: “{m.quote}”</span>
            <span className="trust-muted">{m.date}</span>
          </a>
        ))}
        <span className="trust-item">
          <span>Billing handled by <strong>Apple</strong> and <strong>Google Play</strong></span>
        </span>
        <span className="trust-item">
          <span>Made by <strong>Veltrex Solutions</strong>, Carmel, Indiana</span>
        </span>
      </div>
    </section>
  );
}

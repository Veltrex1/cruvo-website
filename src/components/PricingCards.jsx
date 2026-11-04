import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { storeUrl } from './storeLinks';

// Set ANNUAL_PRO to a real store price (for example { price: '$79.99', perMonth: '$6.67' }) once an annual
// plan exists in App Store Connect and the Play Console. While it is null the monthly/annual toggle stays hidden.
const ANNUAL_PRO = null;
const MONTHLY_PRO = 9.99;

const tiers = [
  {
    id: 'rider',
    name: "Rider",
    storeName: "Cruvo Basic",
    who: "Free forever for your whole crew",
    price: "$0",
    subtitle: "forever",
    desc: "Everything you need to ride or drive together. Turn-by-turn navigation on fast, direct routes.",
    features: ["Create & join group rides and drives", "Live location sharing with your crew", "Turn-by-turn navigation", "Garage for 1 bike or car", "Community access"],
    cta: "Get Cruvo free",
    note: "Free forever. No credit card required.",
    popular: false,
  },
  {
    id: 'captain',
    name: "Captain",
    storeName: "Cruvo Pro",
    who: "For ride leaders who want the full ride",
    price: `$${MONTHLY_PRO}`,
    subtitle: "/month",
    anchor: `About ${Math.round((MONTHLY_PRO / 30) * 100)}¢ a day for every scenic route, ride stat, and season reward.`,
    desc: "Everything in Rider, plus navigation that picks the scenic, curvy way instead of the fastest one.",
    features: ["Everything in Rider", "Scenic & curvy routing", "Unlimited bikes and cars in your garage", "Ride analytics & insights", "Season rewards & coins", "Priority support"],
    cta: "Start 30-day free trial",
    note: "Start free. 30-day trial, then $9.99/month. Cancel anytime in your app store.",
    popular: true,
  },
];

export default function PricingCards({ headingLevel = 'h2' }) {
  const [billing, setBilling] = useState('monthly');
  const Heading = headingLevel;
  const annual = ANNUAL_PRO && billing === 'annual';

  return (
    <section id="pricing" className="pricing-section">
      <style>{`
        .pricing-section { background: var(--snowdrift); color: var(--onyx); padding: 5rem 2rem; min-height: auto; }
        .pricing-grid { display: flex; flex-wrap: wrap; gap: 2rem; justify-content: center; width: 100%; max-width: 1200px; }
        .pricing-card {
          width: 340px;
          max-width: 100%;
          background: #fff;
          padding: 2rem 1.5rem;
          border-radius: 24px;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .pricing-who { color: #667085; font-size: 0.85rem; font-weight: 600; margin: 0 0 0.75rem; }
        .pricing-store-name { font-size: 0.75rem; font-weight: 700; color: #98a2b3; text-transform: uppercase; letter-spacing: 0.06em; margin-left: 8px; }
        .pricing-anchor { margin: -0.75rem 0 1.25rem; font-size: 0.85rem; color: var(--deep-teal); font-weight: 600; line-height: 1.45; }
        .pricing-cta {
          margin-top: 1.5rem;
          padding: 0.85rem 1.5rem;
          width: 100%;
          display: flex;
          justify-content: center;
          text-decoration: none;
        }
        .pricing-note { margin: 0.75rem 0 0; text-align: center; font-size: 0.8rem; color: #667085; line-height: 1.45; }
        .billing-toggle { display: inline-flex; padding: 4px; border-radius: 999px; background: #fff; border: 1px solid rgba(0,0,0,0.08); margin-top: 1.5rem; }
        .billing-toggle button { border: 0; background: transparent; padding: 8px 18px; border-radius: 999px; font: inherit; font-weight: 700; cursor: pointer; color: #667085; }
        .billing-toggle button[aria-pressed="true"] { background: var(--onyx); color: #fff; }
        @media (max-width: 600px) {
          .pricing-section { padding: 4rem 1rem; }
          .pricing-heading { font-size: 2.2rem !important; }
          .pricing-card { width: 100%; }
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '3.5rem' }}
      >
        <p style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', marginBottom: '0.5rem', fontWeight: 600 }}>Simple pricing</p>
        <Heading className="pricing-heading" style={{ fontSize: '3rem', color: 'var(--onyx)' }}>Choose your ride.</Heading>
        <p style={{ marginTop: '0.75rem', color: '#4b5563', maxWidth: 560, marginInline: 'auto', lineHeight: 1.6 }}>
          Your crew rides free. Upgrade if you lead the ride and want the scenic way there.
        </p>
        {ANNUAL_PRO && (
          <div className="billing-toggle" role="group" aria-label="Billing period">
            <button type="button" aria-pressed={billing === 'monthly'} onClick={() => setBilling('monthly')}>Monthly</button>
            <button type="button" aria-pressed={billing === 'annual'} onClick={() => setBilling('annual')}>
              Annual, save {Math.round((1 - parseFloat(ANNUAL_PRO.price.slice(1)) / (MONTHLY_PRO * 12)) * 100)}%
            </button>
          </div>
        )}
      </motion.div>

      <div className="pricing-grid">
        {tiers.map((tier, i) => {
          const price = tier.popular && annual ? ANNUAL_PRO.price : tier.price;
          const subtitle = tier.popular && annual ? '/year' : tier.subtitle;
          return (
            <motion.div
              key={tier.id}
              className="pricing-card"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, type: "spring", bounce: 0.4 }}
              style={{
                border: tier.popular ? '3px solid var(--coral-red)' : '1px solid rgba(0,0,0,0.05)',
                boxShadow: tier.popular ? 'var(--shadow-glow)' : 'var(--shadow-md)',
                zIndex: tier.popular ? 2 : 1,
              }}
            >
              {tier.popular && (
                <div style={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', background: 'var(--coral-red)', color: 'white', padding: '6px 20px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px', whiteSpace: 'nowrap' }}>
                  FOR RIDE LEADERS
                </div>
              )}

              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: tier.popular ? 'var(--coral-red)' : 'var(--onyx)' }}>
                {tier.name}<span className="pricing-store-name">{tier.storeName}</span>
              </h3>
              <p className="pricing-who">{tier.who}</p>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem', minHeight: '40px', lineHeight: 1.5 }}>{tier.desc}</p>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--font-axiforma)', color: tier.popular ? 'var(--coral-red)' : 'var(--onyx)' }}>{price}</span>
                <span style={{ color: '#888', fontWeight: 500, fontSize: '0.9rem' }}>{subtitle}</span>
              </div>
              {tier.anchor && !annual && <p className="pricing-anchor">{tier.anchor}</p>}
              {tier.popular && annual && <p className="pricing-anchor">That is {ANNUAL_PRO.perMonth} a month, billed once a year.</p>}

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
                {tier.features.map((f, j) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '0.8rem', color: '#555', fontSize: '0.9rem' }}>
                    <Check size={18} color={tier.popular ? 'var(--coral-red)' : 'var(--deep-teal)'} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                    <span style={{ fontWeight: j === 0 ? 700 : 400, color: j === 0 ? 'var(--onyx)' : '#555', lineHeight: 1.4 }}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={storeUrl()}
                className={`pricing-cta ${tier.popular ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  background: tier.popular ? 'var(--coral-red)' : 'transparent',
                  borderColor: tier.popular ? 'transparent' : '#ddd',
                  color: tier.popular ? '#fff' : 'var(--onyx)',
                }}
              >
                {tier.cta}
              </a>
              <p className="pricing-note">{tier.popular && annual ? 'Start free. 30-day trial, then billed yearly. Cancel anytime in your app store.' : tier.note}</p>
            </motion.div>
          );
        })}
      </div>
      <p style={{ marginTop: '2rem', textAlign: 'center', color: '#555', fontSize: '0.95rem' }}>
        Subscriptions are billed through the App Store or Google Play. Questions?{' '}
        <a href="/support" style={{ color: 'var(--onyx)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}>Get help from Cruvo support</a>.
      </p>
    </section>
  );
}

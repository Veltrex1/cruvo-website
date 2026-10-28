import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const tiers = [
  { 
    name: "Basic", 
    price: "$0", 
    subtitle: "forever", 
    desc: "Everything you need to ride with your crew.", 
    features: ["Create & join rides", "Live location sharing", "Basic navigation", "Garage for 1 bike", "Community access"], 
    popular: false 
  },
  { 
    name: "Pro", 
    price: "$9.99", 
    subtitle: "/month", 
    desc: "The complete Cruvo experience. 30-day free trial included.", 
    features: ["Everything in Basic", "Scenic & curvy routes", "Unlimited bikes in Garage", "Ride analytics & insights", "Season rewards & coins", "Priority support"], 
    popular: true 
  }
];

export default function PricingCards() {
  return (
    <section id="pricing" style={{ background: 'var(--snowdrift)', color: 'var(--onyx)', padding: '4rem 2rem', minHeight: 'auto' }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h4 style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', marginBottom: '0.5rem', fontWeight: 600 }}>SIMPLE PRICING</h4>
        <h2 style={{ fontSize: '3rem', color: 'var(--onyx)' }}>Choose your ride.</h2>
      </motion.div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', width: '100%', maxWidth: '1200px' }}>
        {tiers.map((tier, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15, type: "spring", bounce: 0.4 }}
            whileHover={{ y: -15, scale: 1.02 }}
            style={{
              width: '320px',
              background: '#fff',
              padding: '2rem 1.5rem',
              borderRadius: '24px',
              border: tier.popular ? '3px solid var(--coral-red)' : '1px solid rgba(0,0,0,0.05)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: tier.popular ? 'var(--shadow-glow)' : 'var(--shadow-md)',
              zIndex: tier.popular ? 2 : 1
            }}
          >
            {tier.popular && (
              <div style={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', background: 'var(--coral-red)', color: 'white', padding: '6px 20px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px' }}>
                MOST POPULAR
              </div>
            )}
            
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: tier.popular ? 'var(--coral-red)' : 'var(--onyx)' }}>{tier.name}</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem', minHeight: '40px' }}>{tier.desc}</p>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--font-axiforma)', color: tier.popular ? 'var(--coral-red)' : 'var(--onyx)' }}>{tier.price}</span>
              <span style={{ color: '#888', fontWeight: 500, fontSize: '0.9rem' }}>{tier.subtitle}</span>
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
              {tier.features.map((f, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '0.8rem', color: '#555', fontSize: '0.9rem' }}>
                  <Check size={18} color={tier.popular ? 'var(--coral-red)' : 'var(--deep-teal)'} style={{ flexShrink: 0, marginTop: '2px' }} /> 
                  <span style={{ fontWeight: j === 0 ? 700 : 400, color: j === 0 ? 'var(--onyx)' : '#555', lineHeight: 1.4 }}>{f}</span>
                </li>
              ))}
            </ul>
            
            <button 
              className={tier.popular ? "btn-primary" : "btn-secondary"} 
              style={{ 
                marginTop: '1.5rem', 
                padding: '0.8rem 1.5rem',
                width: '100%', 
                justifyContent: 'center',
                background: tier.popular ? 'var(--coral-red)' : 'transparent',
                borderColor: tier.popular ? 'transparent' : '#ddd',
                color: tier.popular ? '#fff' : 'var(--onyx)'
              }}
            >
              {tier.popular ? "Get Cruvo Pro" : "Get Started"}
            </button>
          </motion.div>
        ))}
      </div>
      <p style={{ marginTop: '2rem', textAlign: 'center', color: '#555', fontSize: '0.95rem' }}>
        Questions about subscriptions or billing?{' '}
        <a href="/support" style={{ color: 'var(--onyx)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}>Get help from Cruvo support</a>.
      </p>
    </section>
  );
}

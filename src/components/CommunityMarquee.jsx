import React from 'react';
import { motion } from 'framer-motion';

const profiles = [
  { name: "Maya", status: "Planning a ride", color: "var(--coral-red)" },
  { name: "Rahul", status: "Top 5% BPI", color: "var(--deep-teal)" },
  { name: "Elena", status: "Joined your crew", color: "var(--onyx)" },
  { name: "Alex", status: "Completed 500 miles", color: "var(--mirage)" },
  { name: "Sam", status: "Upgraded Exhaust", color: "var(--coral-red)" },
];

export default function CommunityMarquee() {
  return (
    <section id="crew" style={{ background: 'var(--snowdrift)', color: 'var(--onyx)', overflow: 'hidden', minHeight: '60vh' }}>
      <h2 className="section-title">Your Crew is Quiet?</h2>
      <p className="section-subtitle">Host a ride, share a build, or invite riders to get things going.</p>
      
      <div style={{ position: 'relative', width: '100%', display: 'flex', overflow: 'hidden', padding: '2rem 0' }}>
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          style={{ display: 'flex', gap: '2rem', paddingLeft: '2rem' }}
        >
          {/* Double the list for infinite scroll effect */}
          {[...profiles, ...profiles].map((p, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05, y: -10 }}
              style={{
                width: '250px',
                padding: '1.5rem',
                background: '#fff',
                borderRadius: '20px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                cursor: 'pointer'
              }}
            >
              <div style={{ width: '60px', height: '60px', borderRadius: '30px', background: p.color, opacity: 0.8 }} />
              <div>
                <h4 style={{ fontSize: '1.2rem', margin: 0 }}>{p.name}</h4>
                <p style={{ fontSize: '0.9rem', color: '#666', margin: 0, marginTop: '4px' }}>{p.status}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

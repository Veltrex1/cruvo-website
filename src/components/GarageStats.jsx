import React from 'react';
import { motion } from 'framer-motion';

export default function GarageStats() {
  return (
    <section id="garage" style={{ background: 'var(--mirage)', color: 'var(--snowdrift)' }}>
      <h2 className="section-title">Your Machines. Your Data.</h2>
      <p className="section-subtitle">Track your Bike Performance Index (BPI) and stay on top of maintenance.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1000px', padding: '2rem' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass"
          style={{ padding: '2rem', borderRadius: '24px', textAlign: 'center' }}
        >
          <h3 style={{ fontSize: '1.2rem', color: '#aaa', marginBottom: '1rem' }}>SEASON LEVEL</h3>
          <div style={{ fontSize: '4rem', fontWeight: 800, fontFamily: 'var(--font-axiforma)' }}>01</div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginTop: '1rem', overflow: 'hidden' }}>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '60%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ height: '100%', background: 'var(--deep-teal)' }}
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass"
          style={{ padding: '2rem', borderRadius: '24px', textAlign: 'center' }}
        >
          <h3 style={{ fontSize: '1.2rem', color: '#aaa', marginBottom: '1rem' }}>BPI SCORE</h3>
          <div style={{ fontSize: '4rem', fontWeight: 800, fontFamily: 'var(--font-axiforma)', color: 'var(--coral-red)' }}>86</div>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#ccc' }}>Top 15% in your engine class.</p>
        </motion.div>

      </div>
    </section>
  );
}

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Map, Navigation, Users } from 'lucide-react';

export default function AppSimulator() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, -5]);

  return (
    <section id="features" ref={containerRef} style={{ background: 'var(--snowdrift)', color: 'var(--onyx)', overflow: 'hidden' }}>
      <h2 className="section-title">Feel the Ride</h2>
      <p className="section-subtitle">Live turn-by-turn navigation, regroup check-ins, and group tracking.</p>
      
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'center', height: '60vh', width: '100%' }}>
        
        {/* Mock UI Card 1 - Map */}
        <motion.div 
          style={{ 
            y: y1, 
            width: '300px', 
            height: '500px', 
            borderRadius: '24px', 
            background: 'var(--onyx)', 
            padding: '1rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', marginBottom: '1rem' }}>
            <span style={{ fontWeight: 600 }}>13min <span style={{ color: '#999', fontSize: '0.8rem' }}>(2.7 mi)</span></span>
            <Map size={20} color="var(--deep-teal)" />
          </div>
          {/* Fake Map Line */}
          <div style={{ width: '100%', height: '300px', background: 'var(--mirage)', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', stroke: 'var(--coral-red)', strokeWidth: 3, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
              <motion.path 
                d="M10 80 L30 80 L30 50 L60 50 L60 20 L90 20"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Mock UI Card 2 - Group */}
        <motion.div 
          className="glass-light"
          style={{ 
            y: y2, 
            rotate,
            width: '320px', 
            height: '400px', 
            borderRadius: '24px', 
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            zIndex: 10
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Users size={24} color="var(--coral-red)" />
            <h3 style={{ fontSize: '1.2rem' }}>Spontaneous Sunday</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem', background: '#fff', borderRadius: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '20px', background: 'var(--harp)' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ height: '12px', width: '60%', background: 'var(--harp)', borderRadius: '6px', marginBottom: '4px' }} />
                  <div style={{ height: '8px', width: '40%', background: 'var(--snowdrift)', borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
          <button style={{ marginTop: 'auto', background: 'var(--deep-teal)', color: '#fff', border: 'none', padding: '1rem', borderRadius: '12px', fontWeight: 600 }}>
            Join Live Ride
          </button>
        </motion.div>

      </div>
    </section>
  );
}

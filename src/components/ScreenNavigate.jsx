import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function ScreenNavigate() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Top Turn-by-Turn Card */}
      <div style={{ position: 'absolute', top: '1.5rem', left: '1rem', right: '1rem', background: 'var(--deep-teal)', borderRadius: '16px', padding: '1rem', color: '#fff', display: 'flex', gap: '1rem', alignItems: 'center', zIndex: 10, boxShadow: 'var(--shadow-md)' }}>
         <ArrowUpRight size={32} strokeWidth={3} />
         <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>0.8 mi</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Stay on NH48</div>
         </div>
      </div>

      {/* Map Background */}
      <div style={{ flex: 1, background: '#E3F2FD', position: 'relative', overflow: 'hidden' }}>
        {/* Fake Map Route */}
        <svg viewBox="0 0 100 100" style={{ width: '150%', height: '150%', position: 'absolute', top: '-25%', left: '-25%' }}>
          <path d="M50,80 Q30,50 50,30 T80,10" fill="none" stroke="var(--coral-red)" strokeWidth="3" />
        </svg>
        {/* User Marker */}
        <div style={{ position: 'absolute', top: '70%', left: '48%', width: '16px', height: '16px', background: 'var(--deep-teal)', borderRadius: '50%', border: '3px solid #fff', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }} />
      </div>

      {/* Bottom HUD */}
      <div style={{ padding: '1.5rem', background: '#fff', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', boxShadow: '0 -10px 20px rgba(0,0,0,0.05)', zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', padding: '0 0.5rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-axiforma)', lineHeight: 1 }}>68</div>
            <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600 }}>mph</div>
          </div>
          <div style={{ width: '1px', background: '#eee' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-axiforma)', lineHeight: 1 }}>5.2</div>
            <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600 }}>mi left</div>
          </div>
          <div style={{ width: '1px', background: '#eee' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-axiforma)', lineHeight: 1 }}>26</div>
            <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600 }}>min</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button style={{ flex: 1, padding: '1rem', background: 'var(--coral-red)', color: '#fff', borderRadius: '12px', border: 'none', fontWeight: 700 }}>SOS</button>
          <button style={{ flex: 1.5, padding: '1rem', background: 'var(--deep-teal)', color: '#fff', borderRadius: '12px', border: 'none', fontWeight: 700 }}>Check-in</button>
          <button style={{ flex: 1.5, padding: '1rem', background: '#f5f5f5', color: 'var(--onyx)', borderRadius: '12px', border: 'none', fontWeight: 700 }}>End Ride</button>
        </div>
      </div>

    </div>
  );
}

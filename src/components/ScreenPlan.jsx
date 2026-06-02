import React from 'react';
import { MapPin, Users, Share } from 'lucide-react';

export default function ScreenPlan() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Top Header */}
      <div style={{ padding: '3rem 1.5rem 1rem 1.5rem', background: '#fff', zIndex: 10 }}>
         <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Sunrise Canyon Run</h2>
         <p style={{ fontSize: '0.85rem', color: '#888' }}>May 24, 7:30 AM</p>
         <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--onyx)', borderBottom: '2px solid var(--coral-red)', paddingBottom: '0.5rem', marginBottom: '-0.5rem' }}>Details</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#888' }}>Route</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#888' }}>Crew</span>
         </div>
      </div>

      {/* Map Background */}
      <div style={{ flex: 1, background: '#E3F2FD', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '30%', width: '12px', height: '12px', background: 'var(--coral-red)', borderRadius: '50%', border: '2px solid #fff' }} />
        <div style={{ position: 'absolute', top: '50%', left: '70%', width: '12px', height: '12px', background: 'var(--deep-teal)', borderRadius: '50%', border: '2px solid #fff' }} />
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
          <path d="M30,20 Q60,40 70,50" fill="none" stroke="var(--deep-teal)" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      </div>

      {/* Bottom Crew Card */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', background: '#fff', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '1.5rem', boxShadow: '0 -10px 20px rgba(0,0,0,0.05)', zIndex: 10 }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#555' }}>Crew (12)</span>
         </div>
         
         {/* User list */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '18px', background: 'var(--onyx)' }} />
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Alex (You)</div>
                    <div style={{ fontSize: '0.7rem', color: '#888' }}>Ride Captain</div>
                  </div>
               </div>
               <span style={{ fontSize: '0.8rem', color: 'var(--deep-teal)', fontWeight: 600, background: 'rgba(0,95,86,0.1)', padding: '4px 10px', borderRadius: '10px' }}>Going</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '18px', background: 'var(--coral-red)' }} />
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Maya</div>
               </div>
               <span style={{ fontSize: '0.8rem', color: 'var(--deep-teal)', fontWeight: 600, background: 'rgba(0,95,86,0.1)', padding: '4px 10px', borderRadius: '10px' }}>Going</span>
            </div>
         </div>
         
         <button style={{ width: '100%', padding: '1rem', background: '#f5f5f5', color: 'var(--onyx)', borderRadius: '12px', border: 'none', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
            Invite riders
         </button>
         <button style={{ width: '100%', padding: '1rem', background: 'var(--coral-red)', color: '#fff', borderRadius: '12px', border: 'none', fontWeight: 700 }}>
            Ride details
         </button>
      </div>

    </div>
  );
}

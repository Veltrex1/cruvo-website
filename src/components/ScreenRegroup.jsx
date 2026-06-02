import React from 'react';
import { Check } from 'lucide-react';

export default function ScreenRegroup() {
  return (
    <div style={{ width: '100%', height: '100%', background: 'var(--onyx)', display: 'flex', flexDirection: 'column', position: 'relative', color: '#fff' }}>
      
      {/* Time Header */}
      <div style={{ padding: '4rem 1.5rem 2rem 1.5rem', textAlign: 'center' }}>
         <div style={{ fontSize: '4rem', fontWeight: 800, fontFamily: 'var(--font-axiforma)', lineHeight: 1, marginBottom: '0.5rem' }}>9:41</div>
         <div style={{ fontSize: '0.9rem', color: '#888' }}>Monday, May 24</div>
      </div>

      {/* Regroup Status Card */}
      <div style={{ margin: '0 1.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
         <div style={{ width: '40px', height: '40px', borderRadius: '20px', background: 'var(--coral-red)', flexShrink: 0, border: '2px solid var(--onyx)' }} />
         <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.2rem' }}>Regroup in 0.6 mi</div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>Rangers break</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--coral-red)', marginTop: '0.5rem' }}>Alex is waiting for the group</div>
         </div>
      </div>

      {/* Checklist */}
      <div style={{ padding: '2rem 1.5rem', flex: 1 }}>
         <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1.5rem', color: '#fff' }}>Rangers break</h4>
         
         <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                 <div style={{ width: '20px', height: '20px', borderRadius: '10px', background: 'var(--deep-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={12} color="#fff" strokeWidth={3} />
                 </div>
                 <span style={{ fontSize: '0.9rem' }}>Alex checked in</span>
               </div>
               <span style={{ fontSize: '0.8rem', color: '#888' }}>9:58 AM</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                 <div style={{ width: '20px', height: '20px', borderRadius: '10px', background: 'var(--deep-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={12} color="#fff" strokeWidth={3} />
                 </div>
                 <span style={{ fontSize: '0.9rem' }}>Maya checked in</span>
               </div>
               <span style={{ fontSize: '0.8rem', color: '#888' }}>10:01 AM</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                 <div style={{ width: '20px', height: '20px', borderRadius: '10px', border: '2px solid rgba(255,255,255,0.2)' }} />
                 <span style={{ fontSize: '0.9rem', color: '#888' }}>Dev is arriving</span>
               </div>
               <span style={{ fontSize: '0.8rem', color: 'var(--coral-red)' }}>2 min</span>
            </div>
         </div>
      </div>

    </div>
  );
}

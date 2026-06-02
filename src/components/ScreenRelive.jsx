import React from 'react';

export default function ScreenRelive() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Header Image Fake */}
      <div style={{ width: '100%', height: '200px', background: 'var(--mirage)', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: '1rem', left: '1.5rem', color: '#fff' }}>
           <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Mountain Loop Run</h2>
           <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>May 24, 7:30 AM</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
         <div style={{ background: 'var(--snowdrift)', padding: '1rem', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Top Speed</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>112 <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#888' }}>mph</span></div>
         </div>
         <div style={{ background: 'var(--snowdrift)', padding: '1rem', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Avg Speed</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>64 <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#888' }}>mph</span></div>
         </div>
         <div style={{ background: 'var(--snowdrift)', padding: '1rem', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Total Time</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>3h 34m</div>
         </div>
         <div style={{ background: 'var(--snowdrift)', padding: '1rem', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Distance</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>120 <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#888' }}>mi</span></div>
         </div>
      </div>

      {/* Highlights */}
      <div style={{ padding: '0 1.5rem 1.5rem 1.5rem' }}>
         <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1rem' }}>Highlights</h4>
         <div style={{ display: 'flex', gap: '0.5rem', overflow: 'hidden' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: 'var(--mirage)' }} />
            <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: 'var(--harp)' }} />
            <div style={{ width: '80px', height: '80px', borderRadius: '12px', background: 'var(--coral-red)', opacity: 0.8 }} />
         </div>
      </div>

    </div>
  );
}

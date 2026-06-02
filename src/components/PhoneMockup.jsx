import React from 'react';

export default function PhoneMockup({ children, style }) {
  return (
    <div className="phone-mockup-container" style={style}>
      <div className="phone-notch">
        <div style={{ position: 'absolute', top: '10px', right: '25px', width: '8px', height: '8px', borderRadius: '50%', background: '#111', boxShadow: 'inset 0 0 2px rgba(255,255,255,0.2)' }} />
      </div>
      <div className="phone-content">
        {children}
      </div>
    </div>
  );
}

import { useState } from 'react';

export default function FooterCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const scriptURL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;
    if (!scriptURL) {
      console.warn("VITE_GOOGLE_APPS_SCRIPT_URL is not defined in .env. Simulating success.");
      setTimeout(() => setStatus('success'), 1000);
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append('Email', email);

      // We use no-cors to avoid CORS preflight errors with Google Apps Script
      await fetch(scriptURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString(),
        mode: 'no-cors'
      });
      
      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <footer style={{ background: '#ffffff', color: 'var(--onyx)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(0,0,0,0.05)' }}>

      <style>{`
        .waitlist-container {
          padding: 4rem 2rem;
          display: flex;
          justify-content: center;
        }
        .waitlist-card {
          position: relative;
          background: linear-gradient(135deg, #0F2A2B 0%, #0A1E1F 100%);
          color: #fff;
          border-radius: 36px;
          padding: 2rem 3rem;
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 4rem;
          width: 100%;
          max-width: 1400px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.15);
        }
        .waitlist-heading {
          font-size: 3rem;
          font-weight: 800;
          letter-spacing: -1px;
          line-height: 1.1;
          margin: 0;
          font-family: var(--font-axiforma);
        }
        .waitlist-form {
          margin-top: 28px;
          display: flex;
          gap: 8px;
          max-width: 480px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          padding: 6px;
        }
        .waitlist-input {
          flex: 1;
          background: transparent;
          border: 0;
          outline: 0;
          color: #fff;
          font-family: inherit;
          font-size: 0.95rem;
          padding: 0 16px;
        }
        .waitlist-btn {
          padding: 12px 22px;
          font-size: 0.95rem;
          background: var(--coral-red);
          color: #fff;
          border: none;
          border-radius: 999px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
        }
        .perks-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .perk-item {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          padding: 12px 16px 12px 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          backdrop-filter: blur(4px);
        }
        .footer-brand {
          flex: 1 1 300px;
        }
        .footer-bottom {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 2rem;
        }
        @media (max-width: 768px) {
          .waitlist-container {
            padding: 2rem 1rem;
          }
          .waitlist-card {
            padding: 2rem 1.5rem;
            gap: 2rem;
          }
          .waitlist-heading {
            font-size: 2.2rem;
          }
          .waitlist-form {
            flex-direction: column;
            background: transparent;
            border: none;
            padding: 0;
          }
          .waitlist-input {
            background: rgba(255,255,255,0.08);
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 999px;
            padding: 16px 20px;
          }
          .waitlist-btn {
            width: 100%;
            padding: 16px 22px;
          }
          .perk-item {
            border-radius: 20px;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 2rem;
          }
          .footer-brand {
            flex: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      {/* Dark Theme Waitlist CTA */}
      <div id="waitlist" className="waitlist-container">
        <div className="waitlist-card">
          {/* Background ride lines */}
          <svg viewBox="0 0 1280 600" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }}>
            <defs>
              <linearGradient id="ctaLines" x1="0" x2="1">
                <stop offset="0" stopColor="var(--coral-red)" />
                <stop offset="1" stopColor="var(--coral-red)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M -50 480 Q 200 400 400 420 T 800 380 T 1300 320" stroke="url(#ctaLines)" strokeWidth="2" fill="none" />
            <path d="M -50 520 Q 200 460 420 480 T 800 440 T 1300 380" stroke="url(#ctaLines)" strokeWidth="2" fill="none" />
            <path d="M -50 560 Q 200 520 400 540 T 800 500 T 1300 440" stroke="url(#ctaLines)" strokeWidth="2" fill="none" />
          </svg>

          {/* Coral glow */}
          <div style={{
            position: 'absolute',
            width: '500px', height: '500px', right: '-120px', top: '-120px',
            background: "radial-gradient(circle, rgba(229,78,87,0.45), transparent 70%)",
            borderRadius: '50%', filter: 'blur(80px)'
          }} />

          <div style={{ position: "relative", zIndex: 2, flex: '1 1 450px' }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: '10px', marginBottom: '18px',
              padding: "6px 12px", borderRadius: '999px',
              background: "rgba(229,78,87,0.16)", color: "#FFB3B8",
              fontSize: '0.75rem', fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase"
            }}>
              <span style={{ background: "var(--coral-red)", width: '8px', height: '8px', borderRadius: '50%' }} />
              Be the first to ride
            </div>
            <h2 className="waitlist-heading">
              Join the waitlist.<br />
              <span style={{ color: "var(--coral-red)" }}>Get early access.</span>
            </h2>
            <p style={{ marginTop: '20px', fontSize: '1.1rem', color: "rgba(255,255,255,0.7)", maxWidth: '480px', lineHeight: 1.6 }}>
              Cruvo is launching soon. Sign up now and be the first to ride the future of group rides with founding-member perks locked in.
            </p>

            {status === 'success' ? (
              <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(104, 198, 112, 0.1)', border: '1px solid rgba(104, 198, 112, 0.2)', borderRadius: '12px', color: '#68C670', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <span style={{ fontWeight: 600 }}>You're on the list! We'll be in touch soon.</span>
              </div>
            ) : (
              <form className="waitlist-form" onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  required 
                  className="waitlist-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                />
                <button type="submit" className="waitlist-btn" disabled={status === 'loading'} style={{ opacity: status === 'loading' ? 0.7 : 1 }}>
                  {status === 'loading' ? 'Joining...' : 'Join waitlist →'}
                </button>
              </form>
            )}
            
            {status === 'error' && (
              <div style={{ color: 'var(--coral-red)', fontSize: '0.9rem', marginTop: '10px' }}>
                Something went wrong. Please try again.
              </div>
            )}

            {/* Trust */}
            <div style={{ marginTop: '18px', display: "flex", alignItems: "center", gap: '12px' }}>
              <div style={{ display: "flex" }}>
                {["#E54E57", "#FAA04F", "#68C670", "#275D56", "#7A5AE0"].map(c => (
                  <div key={c} style={{
                    width: '26px', height: '26px', borderRadius: '50%', background: c,
                    border: "2px solid #0F2A2B", marginLeft: '-6px'
                  }} />
                ))}
              </div>
              <div style={{ fontSize: '0.85rem', color: "rgba(255,255,255,0.7)" }}>
                <span style={{ color: "#fff", fontWeight: 700 }}>3,408+ riders</span> are waiting. Join them.
              </div>
            </div>
          </div>

          {/* Right: perks list */}
          <div style={{ position: "relative", zIndex: 2, flex: '1 1 350px' }}>
            <ul className="perks-list">
              {[
                ["Early access", "Ride the app months before launch"],
                ["Launch updates", "Behind-the-scenes from the team"],
                ["Exclusive rewards", "Founding-rider badge & coins"],
                ["Help shape Cruvo", "Direct line to product"],
              ].map(([t, s]) => (
                <li key={t} className="perk-item">
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: "var(--coral-red)", color: "#fff",
                    display: "grid", placeItems: "center", flexShrink: 0,
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M 4 12 L 10 18 L 20 6" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{t}</div>
                    <div style={{ fontSize: '0.85rem', color: "rgba(255,255,255,0.6)" }}>{s}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div style={{ padding: '2rem 2rem 4rem 2rem' }}>
        <div className="footer-bottom">

          <div className="footer-brand">
            <div style={{
              backgroundColor: 'var(--coral-red)',
              WebkitMaskImage: 'url("/logos/Fullstack - Onyx.svg")',
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              width: '130px',
              height: '28px',
              marginBottom: '1rem',
              WebkitMaskPosition: 'center',
            }} title="Cruvo Logo" className="footer-logo-mask" />
            <p style={{ color: '#666', fontSize: '0.95rem', maxWidth: '250px', lineHeight: 1.6 }}>
              The ultimate toolkit and community for the modern rider.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--onyx)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Product</h4>
              <a href="#features" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Features</a>
              <a href="#how" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>How it works</a>
              <a href="#pricing" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Pricing</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--onyx)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>Legal</h4>
              <a href="/privacy-policy" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Privacy Policy</a>
              <a href="/terms" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Terms and Conditions</a>
              <a href="/eula" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>Terms of Use (EULA)</a>
            </div>
          </div>

        </div>

        <div style={{ maxWidth: '1400px', margin: '2rem auto 0 auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: '#999', fontSize: '0.85rem' }}>© {new Date().getFullYear()} Cruvo. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="button" aria-label="Instagram coming soon" title="Instagram coming soon" style={{ width: '36px', height: '36px', borderRadius: '18px', background: 'var(--snowdrift)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', cursor: 'default', border: '1px solid rgba(0,0,0,0.05)', transition: 'color 0.2s' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </button>
            <a href="https://x.com/Cruvo18963" target="_blank" rel="noreferrer" aria-label="Cruvo on X" style={{ width: '36px', height: '36px', borderRadius: '18px', background: 'var(--snowdrift)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', cursor: 'pointer', border: '1px solid rgba(0,0,0,0.05)', transition: 'color 0.2s', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--coral-red)'} onMouseLeave={e => e.currentTarget.style.color = '#666'}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l16 16M4 20L20 4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

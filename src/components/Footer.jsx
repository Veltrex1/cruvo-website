export default function Footer() {
  return (
    <footer style={{ background: 'var(--mirage)', color: '#fff', padding: '4rem 2rem', width: '100%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-axiforma)', fontWeight: 800, fontSize: '2rem', marginBottom: '1rem' }}>Cruvo</h2>
          <p style={{ color: '#999', maxWidth: '300px' }}>The app that cares about your bike as much as you do.</p>
        </div>
        <div style={{ display: 'flex', gap: '4rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <h4 style={{ marginBottom: '1rem' }}>Product</h4>
            <a href="#" style={{ color: '#999', textDecoration: 'none' }}>Download</a>
            <a href="#" style={{ color: '#999', textDecoration: 'none' }}>Features</a>
            <a href="#" style={{ color: '#999', textDecoration: 'none' }}>Pricing</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <h4 style={{ marginBottom: '1rem' }}>Company</h4>
            <a href="#" style={{ color: '#999', textDecoration: 'none' }}>About</a>
            <a href="/support" style={{ color: '#999', textDecoration: 'none' }}>Support</a>
            <a href="/privacy-policy" style={{ color: '#999', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/terms" style={{ color: '#999', textDecoration: 'none' }}>Terms and Conditions</a>
            <a href="/eula" style={{ color: '#999', textDecoration: 'none' }}>Terms of Use (EULA)</a>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '4rem auto 0', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
        © {new Date().getFullYear()} Cruvo. All Rights Reserved.
      </div>
    </footer>
  );
}


import { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import FeaturesGrid from './components/FeaturesGrid';
import AppShowcase from './components/AppShowcase';
import MapDemo from './components/MapDemo';
import PricingCards from './components/PricingCards';
import FooterCTA from './components/FooterCTA';
import Preloader from './components/Preloader';
import LegalPage from './components/LegalPage';
import SupportPage from './components/SupportPage';
import { eula, privacyPolicy, termsAndConditions } from './data/legalPolicies';
import './App.css';

const KNOWN_ROUTES = ['/', '/privacy-policy', '/terms', '/eula', '/support'];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  const legalPolicy = currentPath === '/privacy-policy'
    ? privacyPolicy
    : currentPath === '/terms'
      ? termsAndConditions
      : currentPath === '/eula'
        ? eula
        : null;

  useEffect(() => {
    if (!KNOWN_ROUTES.includes(currentPath)) {
      window.location.replace('/');
    }
  }, [currentPath]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Transition navbar styles when scrolled past 20px
    if (latest > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  if (legalPolicy) {
    return <LegalPage policy={legalPolicy} />;
  }

  if (currentPath === '/support') {
    return <SupportPage />;
  }

  return (
    <div className="app-container">
      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s', overflow: isLoading ? 'hidden' : 'visible', height: isLoading ? '100vh' : 'auto' }}>

        {/* Global Scroll Progress Bar */}
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'var(--coral-red)',
            transformOrigin: '0%',
            scaleX: scrollYProgress,
            zIndex: 1000,
            opacity: isLoading ? 0 : 1
          }}
        />

        {/* Navigation - Floating Island style from HTML reference */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: isScrolled ? "10px 24px" : "18px 24px",
          transition: "padding .25s ease",
          display: "flex", justifyContent: "center",
          pointerEvents: "none",
        }}>
          <div className="navbar-inner"
            style={{
            pointerEvents: isScrolled ? "auto" : "none",
            opacity: isScrolled ? 1 : 0,
            transform: isScrolled ? "translateY(0)" : "translateY(-20px)",
            width: "100%",
            maxWidth: "1400px",
            alignItems: "center",
            padding: isScrolled ? "10px 14px 10px 22px" : "12px 14px 12px 22px",
            borderRadius: 999,
            background: isScrolled ? "rgba(20,20,20,0.78)" : "rgba(20,20,20,0.5)",
            border: "1px solid " + (isScrolled ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"),
            backdropFilter: "blur(16px) saturate(160%)",
            WebkitBackdropFilter: "blur(16px) saturate(160%)",
            boxShadow: isScrolled ? "0 4px 12px rgba(0,0,0,0.5)" : "0 1px 0 rgba(255,255,255,.1) inset",
            transition: "all .25s ease",
          }}>
            <a href="#top" className="nav-logo" style={{ display: 'flex', alignItems: 'center' }}>
              {/* Using CSS Mask to perfectly colorize the official Fullstack SVG to Coral Red */}
              <div style={{
                backgroundColor: 'var(--coral-red)',
                WebkitMaskImage: 'url("/logos/Fullstack - Onyx.svg")',
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                width: '130px',
                height: '28px'
              }} title="Cruvo Logo" />
            </a>

            <ul className="desktop-nav-links" style={{
              listStyle: "none", margin: 0, padding: 0,
              justifyContent: "center", gap: 30,
            }}>
              {[
                { label: "Features", href: "#features" },
                { label: "How it works", href: "#how" },
                { label: "Pricing", href: "#pricing" }
              ].map(i => (
                <li key={i.label}>
                  <a href={i.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(i.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      fontSize: 14, fontWeight: 500, color: "#fff",
                      transition: "color .15s ease",
                      textDecoration: "none"
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = "var(--coral-red)"}
                    onMouseLeave={e => e.currentTarget.style.color = "#fff"}>
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              {/* Hamburger Button (Mobile Only) */}
              <button 
                className="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {isMobileMenuOpen ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'fixed', top: '70px', left: '1rem', right: '1rem',
                background: 'rgba(20,20,20,0.95)', backdropFilter: 'blur(16px)',
                borderRadius: '24px', padding: '2rem', zIndex: 999,
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center'
              }}
            >
              {[
                { label: "Features", href: "#features" },
                { label: "How it works", href: "#how" },
                { label: "Pricing", href: "#pricing" }
              ].map(i => (
                <a key={i.label} href={i.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    document.querySelector(i.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff', textDecoration: 'none' }}
                >
                  {i.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Layers */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          <Hero />
          <FeaturesGrid />
          <AppShowcase />
          <MapDemo />
          <PricingCards />
          <FooterCTA />
        </div>
      </div>
    </div>
  );
}

export default App;

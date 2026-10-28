import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PhoneMockup from './PhoneMockup';
import AppStoreBadgeLink from './AppStoreBadgeLink';
import GooglePlayBadgeLink from './GooglePlayBadgeLink';
import { HeroRating } from './TrustStrip';

export default function Hero() {
  const heroRef = useRef(null);

  // Track scroll position within the hero section for parallax effects
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <section id="hero" ref={heroRef} style={{
      minHeight: '100vh',
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)', // Break out of container to go full-bleed
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      padding: 0,
      background: '#050505'
      // Removed overflow: hidden here so phones aren't clipped!
    }}>

      {/* Background Container - Handles the overflow for the parallax image */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
        {/* Full-bleed Scenic Background Image with Parallax */}
        <motion.div style={{
          position: 'absolute',
          top: '-10%',
          left: 0,
          width: '100%',
          height: '120%', // Extra height for parallax travel
          backgroundImage: 'url("/sunset_bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          y: backgroundY, // Parallax movement
        }} />
      </div>

      {/* Dark Cinematic Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 100%), linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 20%)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      <style>{`
        .hero-content-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem 4rem 2rem;
          z-index: 10;
          position: relative;
        }
        .hero-left-content {
          flex: 1;
          padding-right: 4rem;
        }
        .hero-heading {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          color: #fff;
          text-shadow: 0 4px 20px rgba(0,0,0,0.5);
          line-height: 1.1;
        }
        .hero-eyebrow {
          display: inline-block;
          margin: 0 0 1rem 0;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(229,78,87,0.16);
          color: #FFB3B8;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .hero-garage-line {
          font-size: 1rem;
          color: #fff;
          max-width: 440px;
          line-height: 1.5;
          margin: 0 0 1.5rem 0;
          padding-left: 12px;
          border-left: 3px solid var(--coral-red);
        }
        .hero-cta-note {
          font-size: 0.9rem;
          color: #aaa;
          margin: 0 0 0.75rem 0;
        }
        .hero-secondary-link {
          color: #fff;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: underline;
          text-underline-offset: 4px;
          padding: 10px 4px;
        }
        .hero-secondary-link:hover {
          color: var(--coral-red);
        }
        .hero-buttons {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 4rem;
        }
        .store-badge-link {
          display: inline-flex;
          align-items: center;
          line-height: 0;
          transition: transform 0.2s ease, filter 0.2s ease;
        }
        .store-badge-link:hover {
          transform: translateY(-2px);
          filter: drop-shadow(0 12px 28px rgba(0,0,0,0.35));
        }
        .app-store-badge {
          display: block;
          width: 180px;
          height: auto;
        }
        .google-play-badge {
          display: block;
          width: 202px;
          height: auto;
        }
        @media (max-width: 1024px) {
          .hero-content-wrapper {
            flex-direction: column;
            justify-content: flex-start;
            padding-top: 4rem !important;
            margin-top: 0vh !important;
            text-align: center;
          }
          .hero-left-content {
            padding-right: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-heading {
            font-size: 2.2rem !important;
            margin-bottom: 0.8rem !important;
          }
          .hero-eyebrow {
            font-size: 0.65rem;
            letter-spacing: 0.5px;
            padding: 5px 10px;
          }
          .hero-garage-line {
            font-size: 0.9rem;
            max-width: 340px;
            border-left: none;
            padding-left: 0;
            margin-bottom: 1rem;
          }
          .hero-cta-note {
            font-size: 0.8rem;
            max-width: 320px;
          }
          .hero-desc {
            font-size: 0.95rem !important;
            margin-bottom: 1.5rem !important;
            max-width: 320px;
            margin-left: auto;
            margin-right: auto;
          }
          .hero-buttons {
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.75rem;
          }
          .app-store-badge {
            width: 145px;
          }
          .google-play-badge {
            width: 163px;
          }
          .hero-buttons button {
            padding: 0.8rem 1.2rem !important;
            font-size: 0.85rem !important;
            white-space: nowrap;
          }
          .hero-right-content {
            margin-top: 10rem !important;
            transform: scale(0.75);
          }
        }
      `}</style>

      {/* Content Container (Centered 1400px max width) */}
      <motion.div className="hero-content-wrapper" style={{
        y: textY,
        opacity: opacity
      }}>

        {/* Left Content */}
        <div className="hero-left-content">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-eyebrow"
          >
            Built for group rides and club rideouts
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero-heading"
          >
            Ride together.<br />
            Stay together.<br />
            <span style={{
              color: 'var(--coral-red)',
              textShadow: '0 0 40px rgba(255, 74, 74, 0.4)'
            }}>Remember</span><br />
            the ride.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-desc"
            style={{ fontSize: '1.2rem', color: '#ccc', marginBottom: '1rem', maxWidth: '440px', lineHeight: 1.6 }}
          >
            <span style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              backgroundColor: 'var(--coral-red)',
              WebkitMaskImage: 'url("/logos/Fullstack - Onyx.svg")',
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              width: '100px',
              height: '22px',
              marginRight: '4px',
              marginTop: '-4px', // subtle optical alignment adjustment
              filter: 'drop-shadow(0 0 15px rgba(255, 74, 74, 0.8))'
            }} title="Cruvo" />
            is your all-in-one car and motorcycle app for group rides and drives, live navigation, crew updates, and the community that rides with you.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hero-garage-line"
          >
            One garage for your cars and your bikes. Use it for the motorcycle rideout or the car club drive.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="hero-cta-note"
          >
            Free to download on iPhone and Android. Create your first group ride and invite your crew.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-buttons"
          >
            <AppStoreBadgeLink
              className="store-badge-link"
              imageClassName="app-store-badge"
            />
            <GooglePlayBadgeLink
              className="store-badge-link"
              imageClassName="google-play-badge"
            />
            <a
              href="/pricing"
              className="hero-secondary-link"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See what's free vs. Pro →
            </a>
            {/* <button className="btn-secondary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
              <Play size={20} /> Watch Video
            </button> */}
          </motion.div>

          <HeroRating />


          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ display: 'flex', gap: '2rem', alignItems: 'center', color: '#fff' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <div style={{ display: 'flex', gap: '2px', color: 'var(--coral-red)' }}>
                <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#aaa' }}>4.9 from 1.2K+ riders</span>
            </div>
            <div style={{ height: '40px', width: '1px', background: 'rgba(255,255,255,0.2)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>100K+ km ridden</span>
              <span style={{ fontSize: '0.85rem', color: '#aaa' }}>by our community</span>
            </div>
          </motion.div> */}
        </div>

        {/* Right Content - Phone Mockups with Sleek Dark Placeholders */}
        <div className="hero-right-content" style={{ flex: 1, position: 'relative', height: '700px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          {/* Phone 1 (Back) */}
          <motion.div
            initial={{ opacity: 0, x: 100, y: 50, rotate: 10 }}
            animate={{
              opacity: 1,
              x: 80,
              y: -40,
              rotate: 5
            }}
            transition={{
              duration: 1, delay: 0.5, type: "spring", bounce: 0.4
            }}
            style={{ position: 'absolute', zIndex: 1 }}
          >
            {/* Scaled down to 0.7 */}
            <PhoneMockup style={{ transform: 'scale(0.7)', boxShadow: '0 30px 60px rgba(0,0,0,0.6)' }}>
              {/* Sleek Dark Placeholder */}
              {/* <div style={{ width: '100%', height: '100%', background: '#111', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '30px', background: 'rgba(255,255,255,0.05)', marginBottom: '1.5rem' }} />
                <div style={{ width: '80%', height: '12px', borderRadius: '6px', background: 'rgba(255,255,255,0.1)', marginBottom: '0.8rem' }} />
                <div style={{ width: '60%', height: '12px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', marginBottom: '2rem' }} />
                <p style={{ fontWeight: 600, color: '#666', fontSize: '1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Secondary UI</p>
              </div> */}
              <img
                src="/Start.png"
                alt="Cruvo app start screen for planning a group ride"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover', // or 'contain'
                  position: 'absolute',
                  inset: 0
                }}
              />
            </PhoneMockup>
          </motion.div>

          {/* Phone 2 (Front) */}
          <motion.div
            initial={{ opacity: 0, x: 50, y: 100, rotate: -5 }}
            animate={{
              opacity: 1,
              x: -60,
              y: 40,
              rotate: -2
            }}
            transition={{
              duration: 1, delay: 0.3, type: "spring", bounce: 0.4
            }}
            style={{ position: 'absolute', zIndex: 2 }}
          >
            {/* Scaled down to 0.75 */}
            <PhoneMockup style={{ transform: 'scale(0.75)', boxShadow: '0 40px 80px rgba(0,0,0,0.8)' }}>
              {/* Sleek Dark Placeholder */}
              {/* <div style={{ width: '100%', height: '100%', background: '#1a1a1a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', border: '1px solid rgba(255,74,74,0.1)' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '40px', background: 'var(--coral-red)', opacity: 0.1, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '15px', background: 'var(--coral-red)' }} />
                </div>
                <div style={{ width: '90%', height: '14px', borderRadius: '7px', background: 'rgba(255,255,255,0.1)', marginBottom: '1rem' }} />
                <div style={{ width: '70%', height: '14px', borderRadius: '7px', background: 'rgba(255,255,255,0.05)', marginBottom: '3rem' }} />
                <p style={{ fontWeight: 600, color: 'var(--coral-red)', fontSize: '1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Primary UI</p>
              </div> */}
              <img
                src="/Welcome.png"
                alt="Cruvo app welcome screen showing group ride setup"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover', // or 'contain'
                  position: 'absolute',
                  inset: 0
                }}
              />
            </PhoneMockup>
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div style={{ opacity: indicatorOpacity, zIndex: 10, position: 'absolute', bottom: '50px', left: '50%', transform: 'translateX(-50%)' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            color: '#fff',
          }}
        >
          <span style={{ fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.7 }}>Scroll</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

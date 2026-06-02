import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Star } from 'lucide-react';
import PhoneMockup from './PhoneMockup';

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
        .hero-buttons {
          display: flex;
          gap: 1rem;
          align-items: center;
          margin-bottom: 4rem;
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
          .hero-desc {
            font-size: 0.95rem !important;
            margin-bottom: 1.5rem !important;
            max-width: 320px;
            margin-left: auto;
            margin-right: auto;
          }
          .hero-buttons {
            flex-wrap: nowrap;
            justify-content: center;
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
            style={{ fontSize: '1.2rem', color: '#ccc', marginBottom: '3rem', maxWidth: '420px', lineHeight: 1.6 }}
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
            is your all-in-one motorcycle app for group rides, live navigation, crew updates, and the community that rides with you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-buttons"
          >
            <button
              className="btn-primary"
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem', boxShadow: '0 10px 30px rgba(255, 74, 74, 0.3)' }}>
              Join Waitlist &gt;
            </button>
            {/* <button className="btn-secondary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
              <Play size={20} /> Watch Video
            </button> */}
          </motion.div>

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
                alt=""
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
                alt=""
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

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import PhoneMockup from './PhoneMockup';

const screens = [
  {
    title: "Plan the perfect ride",
    desc: "Map out your route, set checkpoints, and invite your crew in seconds. Everything is organized before you even kick up the stand.",
    placeholderLabel: "Replace with: Plan/Garage Screen (Portrait PNG)",
    highlight: "01",
    image: "/ride-setup.png"
  },
  {
    title: "Navigate with confidence",
    desc: "Turn-by-turn navigation tailored for riders. Find the curviest roads and avoid the boring highways.",
    placeholderLabel: "Replace with: Live Navigation Screen (Portrait PNG)",
    highlight: "02",
    image: "/nwc1.png"
  },
  {
    title: "Regroup & check-in",
    desc: "Never lose a rider. Real-time location sharing and automatic check-ins at regroup points keep the pack tight.",
    placeholderLabel: "Replace with: Regroup / Dark Theme Screen (Portrait PNG)",
    highlight: "03",
    image: "/regroup.png"
  },
  {
    title: "Relive the journey",
    desc: "Your routes, top speeds, and photos are saved automatically. Brag about your stats and share the memories.",
    placeholderLabel: "Replace with: Post-Ride Stats Screen (Portrait PNG)",
    highlight: "04",
    image: "/share.png"
  }
];

export default function AppShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  // Track the scroll progress through the 400vh tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map scroll progress 0-1 smoothly to index 0-3
    const newIndex = Math.min(screens.length - 1, Math.floor(latest * screens.length));
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  useEffect(() => {
    if (window.innerWidth <= 1024) {
      const el = document.getElementById(`showcase-tab-${activeIndex}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeIndex]);

  return (
    // The container is 400vh tall to allow scrolling space. 
    // We explicitly use display: block to override the App.css flexbox which was centering the sticky child!
    <section ref={containerRef} id="how" style={{ background: 'var(--snowdrift)', position: 'relative', height: `${screens.length * 100}vh`, padding: 0, display: 'block' }}>

      <style>{`
        .app-showcase-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4rem;
          padding: 0 2rem;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }
        .app-showcase-left {
          flex: 1;
          padding-right: 2rem;
        }
        .app-showcase-right {
          flex: 1;
          display: flex;
          justify-content: center;
        }
        .tabs-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .tab-item {
          padding: 1.2rem 1.5rem;
          border-radius: 20px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          }
          .tab-title {
            font-size: 1.3rem;
          }
          .tab-desc {
            font-size: 0.95rem;
          }
          .showcase-h2 {
            font-size: 3rem;
          }
          @media (max-width: 1024px) {
            .app-showcase-wrapper {
              flex-direction: column;
              justify-content: flex-start;
              gap: 1rem;
              padding-top: 1rem;
              padding-bottom: 1rem;
              height: 100vh;
            }
            .app-showcase-left {
              padding-right: 0;
              width: 100%;
            }
            .tabs-container {
              flex-direction: row;
              overflow-x: auto;
              scroll-snap-type: x mandatory;
              padding-bottom: 0.5rem;
              gap: 1rem;
            }
            .tab-item {
              min-width: 80vw;
              scroll-snap-align: center;
              padding: 0.8rem 1rem !important;
            }
            .tab-title {
              font-size: 1rem !important;
            }
            .tab-desc {
              font-size: 0.8rem !important;
              line-height: 1.3 !important;
            }
            .showcase-h2 {
              font-size: 1.8rem !important;
            }
            .app-showcase-right {
              transform: scale(0.7);
              transform-origin: top center;
            }
          }
          @media (max-width: 768px) {
            .app-showcase-right {
              transform: scale(0.6);
            }
          }
      `}</style>

      {/* Sticky Container locks perfectly to viewport. Added paddingTop to clear the fixed navbar. */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: '80px' }}>

        <div className="app-showcase-wrapper">

          {/* Left Side: Compact Interactive Tabs UI */}
          <div className="app-showcase-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ marginBottom: '2rem' }}
            >
              <h4 style={{ color: 'var(--coral-red)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', marginBottom: '0.5rem', fontWeight: 800 }}>Seamless Experience</h4>
              <h2 className="showcase-h2" style={{ color: 'var(--onyx)', lineHeight: 1.1 }}>Designed for the ride.</h2>
            </motion.div>

            <div className="tabs-container">
              {screens.map((screen, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={index}
                    id={`showcase-tab-${index}`}
                    className="tab-item"
                    style={{
                      background: isActive ? '#fff' : 'transparent',
                      border: isActive ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
                      boxShadow: isActive ? '0 20px 40px rgba(0,0,0,0.05)' : 'none',
                    }}
                    onClick={() => {
                      // Allow manual click overriding (optional interaction)
                      // A full implementation would scroll the window to the correct section height
                      window.scrollTo({
                        top: containerRef.current.offsetTop + (index * window.innerHeight),
                        behavior: 'smooth'
                      });
                    }}
                  >
                    {/* Active Indicator Line */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '4px', background: 'var(--coral-red)', borderRadius: '0 4px 4px 0' }}
                      />
                    )}

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', opacity: isActive ? 1 : 0.4, transition: 'opacity 0.3s ease' }}>
                      <span style={{ color: 'var(--coral-red)', fontWeight: 800, fontSize: '1rem', marginTop: '3px' }}>{screen.highlight}</span>
                      <div>
                        <h3 className="tab-title" style={{ color: 'var(--onyx)', marginBottom: '0.3rem' }}>{screen.title}</h3>
                        <p className="tab-desc" style={{ color: '#666', lineHeight: 1.5, margin: 0 }}>{screen.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Phone with Cross-fading Screens */}
          <div className="app-showcase-right">
            <PhoneMockup style={{ transform: 'scale(0.9)', boxShadow: '0 30px 60px rgba(0,0,0,0.1)', transformOrigin: 'center center' }}>
              <div style={{ width: '100%', height: '100%', background: '#fff', position: 'relative', overflow: 'hidden' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  >
                    <img
                      src={screens[activeIndex].image}
                      alt={screens[activeIndex].title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover' // ensures no stretching, fills the phone screen
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </PhoneMockup>
          </div>

        </div>
      </div>
    </section>
  );
}

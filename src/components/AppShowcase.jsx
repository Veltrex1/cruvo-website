import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import PhoneMockup from './PhoneMockup';

const screens = [
  {
    title: "Plan a rideout",
    desc: "Map out your route, set checkpoints, and invite your crew in seconds. Everything is organized before you kick up the stand or start the engine.",
    highlight: "01",
    image: "/ride-setup.png",
    alt: "Cruvo ride setup screen for planning a group rideout with checkpoints",
  },
  {
    title: "Turn-by-turn navigation",
    desc: "Live turn-by-turn navigation tailored for riders and drivers. Find the curviest roads and skip the boring highways.",
    highlight: "02",
    image: "/nwc1.png",
    alt: "Cruvo turn-by-turn navigation screen on a curvy road",
  },
  {
    title: "Regroup & check-in",
    desc: "Never lose anyone. Real-time location sharing and check-ins at regroup points keep the pack tight.",
    highlight: "03",
    image: "/regroup.png",
    alt: "Cruvo regroup screen showing the crew heading to a meeting point",
  },
  {
    title: "Relive the journey",
    desc: "Your routes, top speeds, and photos are saved automatically. Share the stats and the memories.",
    highlight: "04",
    image: "/share.png",
    alt: "Cruvo post-ride summary with route, stats and photos",
  },
];

const AUTO_ADVANCE_MS = 5000;

export default function AppShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef(null);
  const tabRefs = useRef([]);
  const inView = useInView(sectionRef, { amount: 0.4 });
  const reduceMotion = useReducedMotion();

  // Gently cycle through the steps while the section is on screen, until the visitor picks one.
  useEffect(() => {
    if (!inView || paused || reduceMotion) return undefined;
    const id = window.setTimeout(() => setActiveIndex((i) => (i + 1) % screens.length), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [activeIndex, inView, paused, reduceMotion]);

  const select = (index) => {
    setPaused(true);
    setActiveIndex(index);
  };

  const onKeyDown = (event) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = (activeIndex + keys[event.key] + screens.length) % screens.length;
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section ref={sectionRef} id="how" className="showcase-section">
      <style>{`
        .showcase-section {
          background: var(--snowdrift);
          min-height: 0;
          padding: 6rem 2rem;
        }
        .app-showcase-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 4rem;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        .app-showcase-left { flex: 1; min-width: 0; }
        .app-showcase-right {
          flex: 0 0 auto;
          height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .showcase-phone { transform: scale(0.9); }
        .tabs-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .tab-item {
          position: relative;
          width: 100%;
          text-align: left;
          font: inherit;
          padding: 1.2rem 1.5rem;
          border-radius: 20px;
          border: 1px solid transparent;
          background: transparent;
          cursor: pointer;
          overflow: hidden;
          transition: background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .tab-item[aria-selected="true"] {
          background: #fff;
          border-color: rgba(0,0,0,0.05);
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        }
        .tab-item:focus-visible { outline: 2px solid var(--coral-red); outline-offset: 2px; }
        .tab-body { display: flex; align-items: flex-start; gap: 1rem; opacity: 0.45; transition: opacity 0.3s ease; }
        .tab-item[aria-selected="true"] .tab-body, .tab-item:hover .tab-body { opacity: 1; }
        .tab-title { display: block; font-size: 1.3rem; font-weight: 700; color: var(--onyx); margin: 0 0 0.3rem; }
        .tab-desc { display: block; font-size: 0.95rem; color: #666; line-height: 1.5; margin: 0; }
        .showcase-h2 { font-size: 3rem; color: var(--onyx); line-height: 1.1; }
        @media (max-width: 900px) {
          .showcase-section { padding: 4rem 1rem; }
          .app-showcase-wrapper { flex-direction: column; gap: 1rem; }
          .app-showcase-left { width: 100%; }
          .showcase-h2 { font-size: 2rem; }
          .tab-item { padding: 0.9rem 1rem; }
          .tab-title { font-size: 1.05rem; }
          .tab-desc { font-size: 0.85rem; }
          .app-showcase-right { height: 470px; }
          .showcase-phone { transform: scale(0.7); }
        }
      `}</style>

      <div className="app-showcase-wrapper">
        <div className="app-showcase-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '2rem' }}
          >
            <h4 style={{ color: 'var(--coral-red)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', marginBottom: '0.5rem', fontWeight: 800 }}>How it works</h4>
            <h2 className="showcase-h2">From plan to regroup in four steps.</h2>
          </motion.div>

          <div className="tabs-container" role="tablist" aria-label="How Cruvo works" aria-orientation="vertical" onKeyDown={onKeyDown}>
            {screens.map((screen, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={screen.highlight}
                  ref={(el) => { tabRefs.current[index] = el; }}
                  type="button"
                  role="tab"
                  id={`showcase-tab-${index}`}
                  aria-selected={isActive}
                  aria-controls="showcase-panel"
                  tabIndex={isActive ? 0 : -1}
                  className="tab-item"
                  onClick={() => select(index)}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeTabIndicator"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '4px', background: 'var(--coral-red)', borderRadius: '0 4px 4px 0' }}
                    />
                  )}
                  <span className="tab-body">
                    <span style={{ color: 'var(--coral-red)', fontWeight: 800, fontSize: '1rem', marginTop: '3px' }}>{screen.highlight}</span>
                    <span>
                      <span className="tab-title">{screen.title}</span>
                      <span className="tab-desc">{screen.desc}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="app-showcase-right" id="showcase-panel" role="tabpanel" aria-labelledby={`showcase-tab-${activeIndex}`}>
          <div className="showcase-phone">
            <PhoneMockup style={{ boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}>
              <div style={{ width: '100%', height: '100%', background: '#fff', position: 'relative', overflow: 'hidden' }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIndex}
                    src={screens[activeIndex].image}
                    alt={screens[activeIndex].alt}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </AnimatePresence>
              </div>
            </PhoneMockup>
          </div>
        </div>
      </div>
    </section>
  );
}

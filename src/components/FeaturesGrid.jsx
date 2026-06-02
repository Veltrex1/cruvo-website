import React from 'react';
import { motion } from 'framer-motion';

// --- Reusable Layout Components ---
function SectionHeader({ eyebrow, title, sub, align = "center" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      style={{ textAlign: align, maxWidth: align === "center" ? 720 : "none", margin: align === "center" ? "0 auto" : 0 }}
    >
      <div style={{
        display: align === "center" ? "inline-flex" : "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: "1.5rem",
      }}>
        <span style={{ height: 1, width: 30, background: "var(--coral-red)" }} />
        <span style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--coral-red)" }}>{eyebrow}</span>
        <span style={{ height: 1, width: 30, background: "var(--coral-red)" }} />
      </div>
      <h2 style={{ fontSize: "4.5rem", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.0, color: "var(--onyx)" }}>
        {title}
      </h2>
      {sub && (
        <p style={{
          marginTop: "1.5rem",
          fontSize: "1.1rem",
          color: "#667085",
          maxWidth: 620,
          marginLeft: align === "center" ? "auto" : 0,
          marginRight: align === "center" ? "auto" : 0,
          lineHeight: 1.6
        }}>{sub}</p>
      )}
    </motion.div>
  );
}

function TrueBentoCard({ delay, tag, title, text, imgSrc, span2, accent }) {
  const isDark = accent === "dark" || accent === "onyx";
  
  let bg = "#ffffff";
  if (accent === "dark") bg = "linear-gradient(135deg, #0F2A2B 0%, #0A2122 100%)";
  else if (accent === "onyx") bg = "linear-gradient(135deg, #101828 0%, #080C14 100%)";
  else if (accent === "coral") bg = "linear-gradient(160deg, #FFF6F6 0%, #FFEDEE 100%)";
  else if (accent === "teal") bg = "linear-gradient(160deg, #EEF6F3 0%, #DCEBE6 100%)";
  else if (accent === "amber") bg = "linear-gradient(160deg, #FFFDF5 0%, #FFF5DB 100%)";
  else if (accent === "slate") bg = "linear-gradient(160deg, #F8F9FA 0%, #F1F3F5 100%)";

  return (
    <motion.div
      className={`bento-card ${span2 ? 'span-2' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
      whileHover="hover"
      style={{
        background: bg,
        color: isDark ? "#fff" : "var(--onyx)",
        borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"
      }}
    >
      <div className="card-content">
        <span style={{
          fontSize: 10.5, fontWeight: 800,
          letterSpacing: ".12em", textTransform: "uppercase",
          color: "var(--coral-red)",
          display: "block", marginBottom: 8
        }}>{tag}</span>
        <h3 style={{ fontSize: span2 ? 26 : 20, fontWeight: 700, margin: "0 0 8px 0", letterSpacing: "-0.02em" }}>{title}</h3>
        <p style={{ fontSize: 14, opacity: 0.7, margin: 0, lineHeight: 1.5 }}>{text}</p>
      </div>

      <motion.div
        className="minor-visual"
        variants={{
          hover: { scale: 1.05, y: -8, transition: { duration: 0.3 } }
        }}
      >
        <img src={imgSrc} alt={title} />
      </motion.div>
    </motion.div>
  );
}

// --- Main Grid Component ---
export default function FeaturesGrid() {
  return (
    <section id="features" style={{ background: 'var(--snowdrift)', padding: '8rem 2rem', position: 'relative' }}>

      <SectionHeader
        eyebrow="Everything a rider needs"
        title={<>One app.<br /><span style={{ color: "var(--coral-red)" }}>Every mile.</span></>}
        sub="Plan, track, and share your rides all in one place. Built specifically for riders who care about the journey."
      />

      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 220px;
          gap: 1.5rem;
          max-width: 1200px;
          margin: 4rem auto 0 auto;
        }

        .bento-card {
          border-radius: 24px;
          padding: 2rem;
          position: relative;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
          overflow: hidden;
        }

        .bento-card.span-2 {
          grid-column: span 2;
        }

        .card-content {
          position: relative;
          z-index: 2;
          padding-right: 120px; /* Prevents text from overlapping the minor visual on the right */
        }

        .bento-card.span-2 .card-content {
          padding-right: 220px; /* Extra padding for the wider image in span-2 cards */
        }

        /* Floating Minor Visuals */
        .minor-visual {
          position: absolute;
          bottom: 1.5rem;
          right: 1.5rem;
          width: 120px;
          height: 120px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0,0,0,0.12);
          background: #fff;
          z-index: 1;
        }

        .span-2 .minor-visual {
          width: 220px;
          height: 140px;
          bottom: 1.5rem;
          right: 1.5rem;
        }

        .minor-visual img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        @media (max-width: 900px) {
          .bento-grid { 
            grid-template-columns: 1fr; 
            grid-auto-rows: minmax(200px, auto);
          }
          .bento-card.span-2 { grid-column: span 1; }
          .span-2 .minor-visual { width: 140px; height: 100px; }
          .card-content p { max-width: 100% !important; margin-bottom: 80px; }
        }
      `}</style>

      <div className="bento-grid">

        {/* 1 - Scenic Rides (Span 2) */}
        <TrueBentoCard 
          accent="dark" span2={true} delay={0.1}
          tag="SCENIC RIDES" title="Curated Scenic Routes"
          text="Customize your journey by seamlessly adding stunning scenic locations along your route. Because the ride is just as important as the destination."
          imgSrc="/sunset_bg.png" 
        />

        {/* 2 - Group Rides (Span 1) */}
        <TrueBentoCard 
          accent="coral" delay={0.2}
          tag="GROUP RIDES" title="Group Rides"
          text="Plan, create and join rides instantly."
          imgSrc="/gp1.png" 
        />

        {/* 3 - Live Navigation (Span 1) */}
        <TrueBentoCard 
          accent="teal" delay={0.3}
          tag="NAVIGATION" title="Live Navigation"
          text="Turn-by-turn routing built specifically to find curviest roads."
          imgSrc="/live-navigation.png" 
        />

        {/* 4 - Community (Span 1) */}
        <TrueBentoCard 
          accent="slate" delay={0.4}
          tag="COMMUNITY" title="Community"
          text="Share routes and stunning photos with fellow riders."
          imgSrc="/Welcome1.png" 
        />

        {/* 5 - Season Rewards (Span 1) */}
        <TrueBentoCard 
          accent="amber" delay={0.5}
          tag="REWARDS" title="Season Rewards"
          text="Earn XP for every mile and climb leaderboards."
          imgSrc="/ride-summary.png" 
        />

        {/* 6 - Safety First (Span 1) */}
        <TrueBentoCard 
          accent="coral" delay={0.6}
          tag="SAFETY" title="Safety First"
          text="Crash detection and SOS alerts keep you protected."
          imgSrc="/sos2.png" 
        />

        {/* 7 - Your Garage (Span 2) */}
        <TrueBentoCard 
          accent="onyx" span2={true} delay={0.7}
          tag="GARAGE" title="Your Garage"
          text="Track maintenance and perfectly monitor your Bike Performance Index to keep your ride in top shape."
          imgSrc="/Start1.png"
        />

      </div>
    </section>
  );
}

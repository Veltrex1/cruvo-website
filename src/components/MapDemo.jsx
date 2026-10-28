import React, { useState, useEffect, useMemo } from 'react';

const RIDERS = [
  { id: "alex", name: "Alex", role: "Ride captain", color: "#E54E57", t: 1.00, eta: 0, chip: "Lead" },
  { id: "maya", name: "Maya", role: "Photographer", color: "#3B82F6", t: 0.78, eta: 4, chip: "+ 28 mi" },
  { id: "dev", name: "Dev", role: "Mechanic", color: "#FAA04F", t: 0.62, eta: 7, chip: "Support car" },
  { id: "priya", name: "Priya", role: "Sweep", color: "#EC4899", t: 0.45, eta: 12, chip: "Tail" },
  { id: "rio", name: "Rio", role: "Rookie", color: "#7A5AE0", t: 0.28, eta: 17, chip: "Catching up" },
];

const REGROUP_POINTS = [
  { id: "rg1", t: 0.30, label: "Rangers break", time: "10:24 AM" },
  { id: "rg2", t: 0.60, label: "Morning fuel", time: "11:05 AM" },
  { id: "rg3", t: 0.90, label: "Summit overlook", time: "12:12 PM" },
];

// High-fidelity SVG coordinate path that perfectly fits inside the safe area to prevent clipping
const ROUTE_COORDS = [
  [193, 461], [211, 450], [229, 432], [254, 407], [276, 389],
  [301, 374], [330, 367], [362, 366], [395, 369], [431, 366],
  [459, 353], [485, 331], [506, 306], [528, 284], [553, 270],
  [582, 263], [614, 259], [650, 248], [683, 230], [715, 205],
  [747, 176], [776, 158]
];

// Exact interpolation for route distance
function getPlayedCoords(coords, t) {
  if (t <= 0) return [coords[0]];
  if (t >= 1) return coords;

  let totalDist = 0;
  let dists = [0];
  for (let i = 1; i < coords.length; i++) {
    const dx = coords[i][0] - coords[i - 1][0];
    const dy = coords[i][1] - coords[i - 1][1];
    const d = Math.sqrt(dx * dx + dy * dy);
    totalDist += d;
    dists.push(totalDist);
  }

  const targetDist = totalDist * t;
  const played = [];
  for (let i = 1; i < coords.length; i++) {
    played.push(coords[i - 1]);
    if (dists[i] >= targetDist) {
      const segmentLen = dists[i] - dists[i - 1];
      if (segmentLen === 0) {
        played.push(coords[i]);
        break;
      }
      const segmentT = (targetDist - dists[i - 1]) / segmentLen;
      const x = coords[i - 1][0] + (coords[i][0] - coords[i - 1][0]) * segmentT;
      const y = coords[i - 1][1] + (coords[i][1] - coords[i - 1][1]) * segmentT;
      played.push([x, y]);
      break;
    }
  }
  return played;
}

function polylineToSVG(coords) {
  return "M " + coords.map(p => `${p[0]},${p[1]}`).join(" L ");
}

function Mini({ big, unit, label }) {
  return (
    <div style={{ background: "var(--snowdrift)", borderRadius: 10, padding: "8px 10px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
        <span style={{ fontSize: 16, fontWeight: 800, fontFamily: 'var(--font-axiforma)', color: 'var(--onyx)' }}>{big}</span>
        <span style={{ fontSize: 10, color: "#666", fontWeight: 700 }}>{unit}</span>
      </div>
      <div style={{ fontSize: 10, color: "#666", fontWeight: 500 }}>{label}</div>
    </div>
  );
}

export default function MapDemo() {
  const [active, setActive] = useState("maya");
  const [layers, setLayers] = useState({ route: true, riders: true, regroups: true });
  const [playT, setPlayT] = useState(0.55);

  useEffect(() => {
    let id;
    const tick = () => {
      setPlayT(t => {
        const next = t + 0.001;
        if (next >= 1) { return 0; }
        return next;
      });
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  const activeRider = RIDERS.find(r => r.id === active);

  // Generate the active portion of the route synchronously with playT
  const playedRouteCoords = useMemo(() => getPlayedCoords(ROUTE_COORDS, playT), [playT]);
  const playedRoutePath = useMemo(() => polylineToSVG(playedRouteCoords), [playedRouteCoords]);
  const fullRoutePath = useMemo(() => polylineToSVG(ROUTE_COORDS), []);

  return (
    <section id="map-demo" className="map-demo-section" style={{
      background: "linear-gradient(135deg, #0F2A2B 0%, #0A1E1F 100%)",
      color: "#fff",
      paddingTop: "6rem",
      paddingBottom: "6rem",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* subtle ambient blobs */}
      <div style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(80px)', width: 700, height: 700, left: -200, top: -200, background: "radial-gradient(circle, rgba(229,78,87,.25), transparent 70%)", opacity: .4 }} />
      <div style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(80px)', width: 600, height: 600, right: -200, bottom: -200, background: "radial-gradient(circle, rgba(104,198,112,.15), transparent 70%)", opacity: .4 }} />

      <div style={{ maxWidth: '1700px', width: '100%', margin: '0 auto', padding: '0 2rem', position: "relative" }}>

        {/* Header Title Section */}
        <div style={{ display: "flex", flexWrap: 'wrap', gap: "2rem", alignItems: "center", justifyContent: "space-between", marginBottom: "4rem" }}>
          <div style={{ flex: '1 1 500px' }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ background: "var(--coral-red)", width: 8, height: 8, borderRadius: '50%' }} />
              <span style={{ color: "var(--coral-red)", textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 800 }}>Live on the move</span>
            </div>
            <h2 style={{
              fontSize: "3rem",
              fontWeight: 800,
              fontFamily: 'var(--font-axiforma)',
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#fff",
              margin: 0
            }}>The map<br />that <span style={{ color: "var(--coral-red)" }}>rides with you.</span></h2>
          </div>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: '1.1rem', maxWidth: '500px', lineHeight: 1.6, flex: '1 1 400px', margin: 0, textAlign: 'left' }}>
            See every rider and driver in your group in real time. Drop regroups, run playback, share your live location, all without flicking between four other apps.
          </p>
        </div>

        <style>{`
          .map-demo-container {
            display: grid;
            grid-template-columns: minmax(0, 1fr) 340px;
            gap: 2rem;
            background: rgba(255,255,255,.03);
            border: 1px solid rgba(255,255,255,.05);
            border-radius: 24px;
            padding: 1.5rem;
          }
          @media (max-width: 1024px) {
            .map-demo-section {
              padding-top: 4rem !important;
              padding-bottom: 4rem !important;
            }
            .map-demo-section h2 {
              font-size: 2.2rem !important;
            }
            .map-demo-container {
              grid-template-columns: minmax(0, 1fr);
              padding: 0.75rem;
            }
            .map-panel {
              min-height: 380px !important;
            }
            .map-layer-toggles {
              display: none !important;
            }
          }
        `}</style>
        
        {/* Demo surface */}
        <div className="map-demo-container">
          {/* Custom SVG Map Panel */}
          <div className="map-panel" style={{
            position: "relative",
            borderRadius: 18,
            background: "#E8F0ED", // Beautiful light theme background
            overflow: "hidden",
            minHeight: "500px",
            boxShadow: "0 30px 60px -20px rgba(0,0,0,.5)",
          }}>
            <svg viewBox="0 0 960 600" preserveAspectRatio="xMidYMid slice"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>

              {/* Soft topographic base map elements */}
              <defs>
                <pattern id="gridLight" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#D1E0DA" strokeWidth=".8" opacity="0.6" />
                </pattern>
                <linearGradient id="water" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#C4DEEA" />
                  <stop offset="100%" stopColor="#A8CDE0" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#gridLight)" />

              {/* Fake Topography to make it look like a real map */}
              <g opacity="0.7">
                {/* Lake/Water */}
                <path d="M -50 650 Q 200 550 400 650 Z" fill="url(#water)" />
                <path d="M 600 -50 Q 800 150 1000 -50 Z" fill="url(#water)" />
                <ellipse cx="280" cy="180" rx="140" ry="60" fill="url(#water)" />
                <ellipse cx="250" cy="170" rx="100" ry="40" fill="#B3D8E8" />
              </g>

              <g fill="#DCE9E3" opacity="0.6">
                {/* Forests / elevation blobs */}
                <path d="M 400 200 Q 500 100 600 250 Q 700 350 550 400 Q 450 350 400 200 Z" />
                <path d="M 700 500 Q 850 400 950 550 Q 800 650 700 500 Z" />
              </g>

              {/* The "Real" Road that exactly matches the line */}
              {/* Outer stroke for border */}
              <path d={fullRoutePath} stroke="#C4D1CB" strokeWidth="20" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {/* Inner stroke for asphalt/white line */}
              <path d={fullRoutePath} stroke="#ffffff" strokeWidth="16" fill="none" strokeLinecap="round" strokeLinejoin="round" />

              {/* Additional intersecting background roads to make it look like a real street map */}
              <g stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 485 331 L 400 280 L 350 150" strokeWidth="10" opacity="0.8" />
                <path d="M 683 230 L 780 280 L 900 250" strokeWidth="8" opacity="0.8" />
                <path d="M 301 374 L 200 300 L 50 320" strokeWidth="6" opacity="0.8" />
              </g>

              {/* Route Lines */}
              {layers.route && (
                <>
                  {/* Faint projected full route */}
                  <path d={fullRoutePath} stroke="#E54E57" strokeOpacity=".25" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="8 8" />

                  {/* Flawless math-synced played route WITHOUT linecap so it stops exactly on the dot */}
                  <path d={playedRoutePath} stroke="#E54E57" strokeWidth="6" fill="none" strokeLinejoin="round" />
                </>
              )}

              {/* Start / end markers */}
              <g transform={`translate(${ROUTE_COORDS[0][0]},${ROUTE_COORDS[0][1]})`}>
                <circle r="12" fill="#fff" stroke="#275D56" strokeWidth="3" />
                <circle r="5" fill="#275D56" />
              </g>
              <g transform={`translate(${ROUTE_COORDS[ROUTE_COORDS.length - 1][0]},${ROUTE_COORDS[ROUTE_COORDS.length - 1][1]})`}>
                <circle r="15" fill="#101828" />
                <path d="M -4 -6 L -4 8 M -4 -6 L 6 -3 L -2 0 L 6 3 Z" fill="#fff" stroke="#fff" strokeWidth="1.5" />
              </g>

              {/* Regroup pins */}
              {layers.regroups && REGROUP_POINTS.map(rg => {
                const posArr = getPlayedCoords(ROUTE_COORDS, rg.t);
                const pos = posArr[posArr.length - 1];
                return (
                  <g key={rg.id} transform={`translate(${pos[0]},${pos[1]})`}>
                    <circle r="22" fill="#275D56" opacity=".15" />
                    <circle r="14" fill="#275D56" />
                    <circle r="14" fill="none" stroke="#fff" strokeWidth="2" />
                    <path d="M -4 -2 L -1 1 L 4 -4" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                );
              })}

              {/* Rider markers */}
              {layers.riders && RIDERS.map(r => {
                // Make riders move smoothly along the track based on playback animation
                const realT = r.t * playT;
                const posArr = getPlayedCoords(ROUTE_COORDS, realT);
                const pos = posArr[posArr.length - 1];
                const isActive = r.id === active;

                return (
                  <g key={r.id} transform={`translate(${pos[0]},${pos[1]})`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setActive(r.id)}>
                    {isActive && <circle r="28" fill={r.color} opacity=".22" />}
                    <circle r={isActive ? 18 : 13} fill={r.color} stroke="#fff" strokeWidth="3" style={{ transition: "all 0.25s" }} />
                    {isActive && <text y="5" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">{r.name[0]}</text>}
                  </g>
                );
              })}
            </svg>

            {/* Floating: turn instruction */}
            <div style={{
              position: "absolute", top: 16, left: 16,
              background: "var(--onyx)", color: "#fff",
              padding: "10px 16px", borderRadius: 14,
              display: "flex", gap: 10, alignItems: "center",
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4">
                <path d="M9 21 V 11 L 5 11 L 12 4 L 19 11 L 15 11 V 21" />
              </svg>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1 }}>0.8 mi</div>
                <div style={{ fontSize: '0.8rem', opacity: .7, marginTop: 2 }}>Stay on US-129</div>
              </div>
            </div>

            {/* Layer toggles */}
            <div className="map-layer-toggles" style={{
              position: "absolute", top: 16, right: 16,
              background: "rgba(255,255,255,.94)",
              borderRadius: 12, padding: 6,
              display: "flex", gap: 6,
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            }}>
              {Object.entries({ route: "Route", riders: "Riders", regroups: "Regroups" }).map(([k, label]) => (
                <button key={k}
                  onClick={() => setLayers(l => ({ ...l, [k]: !l[k] }))}
                  style={{
                    appearance: "none", border: 0,
                    background: layers[k] ? "var(--deep-teal)" : "transparent",
                    color: layers[k] ? "#fff" : "#666",
                    padding: "6px 12px",
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    borderRadius: 8,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    transition: "all .15s",
                  }}>
                  {label}
                </button>
              ))}
            </div>

            {/* Playback bar */}
            <div style={{
              position: "absolute", bottom: 16, left: 16, right: 16,
              background: "rgba(255,255,255,.94)",
              backdropFilter: "blur(6px)",
              borderRadius: 16,
              padding: "14px 18px",
              display: "flex", alignItems: "center", gap: 14,
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            }}>
              {/* Playback toggle button removed */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: "#666", marginBottom: 4, display: "flex", justifyContent: "flex-end" }}>
                  <span style={{ color: 'var(--onyx)' }}>{(playT * 120).toFixed(1)} mi / 120 mi</span>
                </div>
                <input type="range" min="0" max="1" step="0.001" value={playT}
                  onChange={(e) => { setPlayT(parseFloat(e.target.value)); }}
                  style={{ width: "100%", accentColor: "var(--coral-red)" }} />
              </div>
            </div>
          </div>

          {/* Side panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", color: "var(--onyx)" }}>
            <div style={{
              background: "#fff",
              borderRadius: 18,
              padding: '16px',
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: "#999", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12 }}>
                Active rider
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%', background: activeRider.color, flexShrink: 0,
                  display: "grid", placeItems: "center", color: "#fff", fontWeight: 800, fontSize: '1.2rem'
                }}>
                  {activeRider.name[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{activeRider.name}</div>
                  <div style={{ fontSize: '0.9rem', color: "#666", fontWeight: 500 }}>{activeRider.role}</div>
                </div>
              </div>
              <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                <Mini big={(activeRider.t * 120).toFixed(0)} unit="mi" label="ridden" />
                <Mini big={Math.round(45 + activeRider.t * 25)} unit="mph" label="now" />
                <Mini big={activeRider.eta} unit="min" label="behind" />
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: 18, padding: '16px', flex: 1 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: "#999", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>
                Roster · {RIDERS.length}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {RIDERS.map(r => (
                  <button key={r.id}
                    onClick={() => setActive(r.id)}
                    style={{
                      appearance: "none", border: 0,
                      background: r.id === active ? "rgba(0, 95, 86, 0.08)" : "transparent",
                      padding: "8px 10px", borderRadius: 12,
                      display: "flex", alignItems: "center", gap: 12,
                      fontFamily: "inherit", cursor: "pointer",
                      transition: "background .15s",
                      color: "var(--onyx)",
                    }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: r.color, flexShrink: 0 }} />
                    <div style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>{r.name}</div>
                      <div style={{ fontSize: '0.85rem', color: "#666", fontWeight: 500 }}>{r.chip}</div>
                    </div>
                    <div style={{ background: r.eta < 5 ? "#68C670" : "#FAA04F", width: 8, height: 8, borderRadius: '50%' }} />
                  </button>
                ))}
              </div>
            </div>

            <div style={{
              background: "var(--coral-red)", color: "#fff", borderRadius: 18, padding: '16px',
              display: "flex", alignItems: "center", gap: 14
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: "rgba(255,255,255,.18)",
                display: "grid", placeItems: "center", flexShrink: 0,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4"><path d="M12 5 V 19 M 5 12 H 19" /></svg>
              </div>
              <div style={{ flex: 1, fontSize: 13 }}>
                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>Drop a regroup</div>
                <div style={{ opacity: .8, fontSize: '0.85rem', fontWeight: 500 }}>One tap. Everyone knows.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

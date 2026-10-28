import { useCallback, useLayoutEffect, useEffect, useRef } from 'react';
import { Coffee, CornerUpLeft, CornerUpRight, MapPin, Mountain, Pause, Play, RotateCcw, Waves } from 'lucide-react';
import MapArt from './MapArt';
import { RIDERS, RIDER_COUNT, getRegroup, pathUpTo, pointAt, riderProgress, statusSpoken } from './rideDemo';

const VIEWBOX = {
  desktop: { x: 0, y: 80, w: 1200, h: 600, k: 1, route: { casing: 11, line: 5 } },
  tablet: { x: 20, y: 80, w: 900, h: 600, k: 1.35, route: { casing: 10, line: 4.5 } },
  mobile: { x: 60, y: 60, w: 680, h: 680, k: 2, route: { casing: 9, line: 4 } },
};

const REGROUP_ICONS = { cafe: Coffee, overlook: Mountain, lakeside: Waves };
const TURN_ICONS = { left: CornerUpLeft, right: CornerUpRight, pin: MapPin };

const percent = (v) => `${(v * 100).toFixed(3)}%`;

export default function RideDemoMap({ layout, selected, onSelect, regroupId, nav, playback, onTogglePlay, progressRef, subscribe }) {
  const vb = VIEWBOX[layout];
  const markerRefs = useRef({});
  const travelRef = useRef(null);
  const regroup = getRegroup(regroupId);

  const place = useCallback(
    (f) => {
      const p = pointAt(f);
      return { left: percent((p.x - vb.x) / vb.w), top: percent((p.y - vb.y) / vb.h) };
    },
    [vb],
  );

  // Write positions straight to the DOM so playback does not re-render React every frame.
  const apply = useCallback(
    (s) => {
      for (const rider of RIDERS) {
        const el = markerRefs.current[rider.id];
        if (!el) continue;
        const pos = place(riderProgress(rider.id, s));
        el.style.left = pos.left;
        el.style.top = pos.top;
      }
      travelRef.current?.setAttribute('d', pathUpTo(riderProgress('alex', s)));
    },
    [place],
  );

  useLayoutEffect(() => {
    apply(progressRef.current);
  });
  useEffect(() => subscribe(apply), [subscribe, apply]);

  const TurnIcon = TURN_ICONS[nav.icon] ?? CornerUpRight;
  const RegroupIcon = REGROUP_ICONS[regroup.id] ?? MapPin;
  const regroupPos = place(regroup.f);
  const playLabel = playback === 'playing' ? 'Pause demo' : playback === 'finished' ? 'Replay demo' : 'Play demo';
  const PlayIcon = playback === 'playing' ? Pause : playback === 'finished' ? RotateCcw : Play;

  return (
    <div className={`lr-map lr-map--${layout}`} style={{ aspectRatio: `${vb.w} / ${vb.h}` }}>
      <svg
        className="lr-map-svg"
        viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Illustrative map of a group ride. Alex is two minutes ahead of you and Maya is three minutes behind, all heading to a demo regroup point."
      >
        <MapArt layout={layout} k={vb.k} route={vb.route} />
        <path ref={travelRef} d={pathUpTo(riderProgress('alex', 0))} fill="none" stroke="#E54E57" strokeWidth={vb.route.line} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </svg>

      <div className="lr-nav-card" role="group" aria-label="Next turn">
        <TurnIcon size={22} strokeWidth={2.4} aria-hidden="true" />
        <div>
          <div className="lr-nav-text">{nav.text}</div>
          <div className="lr-nav-distance">{nav.distance}</div>
        </div>
      </div>

      <div className="lr-regroup" style={regroupPos} role="img" aria-label={`Demo regroup point: ${regroup.name}`}>
        <span className="lr-regroup-pin"><RegroupIcon size={18} strokeWidth={2.2} aria-hidden="true" /></span>
        <span className="lr-regroup-label">Regroup · {regroup.name}</span>
      </div>

      {RIDERS.map((rider) => {
        // Starting position only; the layout effect above moves markers to the live position before paint.
        const pos = place(riderProgress(rider.id, 0));
        const isSelected = selected === rider.id;
        return (
          <button
            key={rider.id}
            ref={(el) => { markerRefs.current[rider.id] = el; }}
            type="button"
            className={`lr-marker${rider.isYou ? ' is-you' : ''}${isSelected ? ' is-selected' : ''}`}
            style={pos}
            aria-pressed={isSelected}
            aria-label={statusSpoken(rider.id)}
            onClick={() => onSelect(rider.id)}
          >
            <span className="lr-marker-dot" aria-hidden="true">{rider.initial}</span>
            <span className="lr-marker-label" aria-hidden="true">{rider.name}</span>
          </button>
        );
      })}

      <button type="button" className="lr-play" onClick={onTogglePlay}>
        <PlayIcon size={16} strokeWidth={2.4} aria-hidden="true" />
        <span>{playLabel} · {RIDER_COUNT} riders</span>
      </button>
      <span className="lr-illustrative">Illustrative map</span>
    </div>
  );
}

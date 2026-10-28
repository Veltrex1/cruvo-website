import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { CornerUpLeft, CornerUpRight, MapPin, Pause, Play, RotateCcw } from 'lucide-react';
import FRAMES from './rideFrames.json';
import { project } from './geo';
import { RIDERS, RIDER_COUNT, ROUTE_COORDS, coordsUpTo, getRegroup, pointAt, riderProgress, statusSpoken } from './rideDemo';

const TURN_ICONS = { left: CornerUpLeft, right: CornerUpRight, pin: MapPin };
const ROUTE_STYLE = {
  desktop: { casing: 9, line: 5 },
  tablet: { casing: 8, line: 4.5 },
  mobile: { casing: 6, line: 3.5 },
};

const pct = (v) => `${(v * 100).toFixed(3)}%`;
const toPath = (pts) => 'M ' + pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' L ');

export default function RideDemoMap({ layout, s, selected, onSelect, regroupId, nav, playback, onTogglePlay, sRef, subscribe, fading }) {
  const frame = FRAMES[layout];
  const route = ROUTE_STYLE[layout];
  const markerRefs = useRef({});
  const travelRef = useRef(null);
  const [imageFailed, setImageFailed] = useState(false);
  const regroup = getRegroup(regroupId);

  const fullPath = useMemo(() => toPath(ROUTE_COORDS.map((c) => project(c, frame))), [frame]);
  const place = useCallback((f) => {
    const p = project(pointAt(f), frame);
    return { left: pct(p.x / frame.width), top: pct(p.y / frame.height) };
  }, [frame]);

  // Write positions straight to the DOM so the animation does not re-render React every frame.
  const apply = useCallback((value) => {
    for (const rider of RIDERS) {
      const el = markerRefs.current[rider.id];
      if (!el) continue;
      const pos = place(riderProgress(rider.id, value, regroupId));
      el.style.left = pos.left;
      el.style.top = pos.top;
    }
    travelRef.current?.setAttribute('d', toPath(coordsUpTo(riderProgress('alex', value, regroupId)).map((c) => project(c, frame))));
  }, [place, frame, regroupId]);

  useLayoutEffect(() => {
    apply(sRef.current);
  });
  useEffect(() => subscribe(apply), [subscribe, apply]);

  const TurnIcon = TURN_ICONS[nav.icon] ?? CornerUpRight;
  const playLabel = playback === 'playing' ? 'Pause demo' : playback === 'finished' ? 'Replay demo' : 'Play demo';
  const PlayIcon = playback === 'playing' ? Pause : playback === 'finished' ? RotateCcw : Play;
  const src = (scale) => `/ride-map/${layout}@${scale}x.webp`;

  return (
    <div className={`lr-map lr-map--${layout}${fading ? ' is-fading' : ''}`} style={{ aspectRatio: `${frame.width} / ${frame.height}` }}>
      {!imageFailed && (
        <img
          className="lr-map-img"
          src={src(1)}
          srcSet={`${src(1)} 1x, ${src(2)} 2x`}
          width={frame.width}
          height={frame.height}
          alt=""
          decoding="async"
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      )}

      <svg
        className="lr-map-svg"
        viewBox={`0 0 ${frame.width} ${frame.height}`}
        role="img"
        aria-label={`Map of a demo group ride from Beanblossom through Nashville, Indiana into Brown County State Park. Alex is ahead of you, Maya is behind, and the regroup point is ${regroup.name}.`}
      >
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={fullPath} stroke="#B9B4A3" strokeOpacity=".55" strokeWidth={route.casing + 2} />
          <path d={fullPath} stroke="#FFFFFF" strokeWidth={route.casing} />
          <path d={fullPath} stroke="#E54E57" strokeOpacity=".28" strokeWidth={route.line} />
          <path ref={travelRef} className="lr-travelled" stroke="#E54E57" strokeWidth={route.line} />
        </g>
      </svg>

      <div className="lr-nav-card" role="group" aria-label="Next turn">
        <TurnIcon size={22} strokeWidth={2.4} aria-hidden="true" />
        <div>
          <div className="lr-nav-text">{nav.text}</div>
          <div className="lr-nav-distance">{nav.distance}</div>
        </div>
      </div>

      {/* State road shield on the SR 135 stretch (the base map only draws US-route shields here). */}
      <span className="lr-shield" style={place(0.47)} aria-hidden="true">135</span>

      <div className="lr-regroup" style={place(regroup.f)} role="img" aria-label={`Demo regroup point: ${regroup.name}`}>
        <span className="lr-regroup-pin"><MapPin size={18} strokeWidth={2.4} aria-hidden="true" /></span>
        <span className="lr-regroup-label">Regroup · {regroup.name}</span>
      </div>

      {RIDERS.map((rider) => {
        const isSelected = selected === rider.id;
        return (
          <button
            key={rider.id}
            ref={(el) => { markerRefs.current[rider.id] = el; }}
            type="button"
            className={`lr-marker${rider.isYou ? ' is-you' : ''}${isSelected ? ' is-selected' : ''}`}
            // Starting position only; the layout effect above moves markers to the live position before paint.
            style={place(rider.start)}
            aria-pressed={isSelected}
            aria-label={statusSpoken(rider.id, s, regroupId)}
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

      <p className="lr-attribution">
        Illustrative ride · Map data{' '}
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap contributors</a>,{' '}
        <a href="https://openmaptiles.org/" target="_blank" rel="noreferrer">OpenMapTiles</a>,{' '}
        <a href="https://openfreemap.org/" target="_blank" rel="noreferrer">OpenFreeMap</a> · Terrain: AWS Terrain Tiles, USGS
      </p>
    </div>
  );
}

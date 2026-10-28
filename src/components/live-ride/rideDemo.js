// Single source of truth for the "Live on the move" demo: riders, route, regroup spots,
// navigation hints and the state machine. Pure functions only, so it runs under node:test.

export const ROUTE_MINUTES = 25; // illustrative: how long the whole route takes
export const ROUTE_MILES = 12;
export const RIDER_COUNT = 3;

// Map coordinate space (shared by roads, route, markers, regroup points).
const CONTROL_POINTS = [
  [109, 655], [166, 625], [232, 612], [289, 575], [320, 515], [368, 462], [434, 442], [494, 418],
  [531, 366], [579, 322], [635, 303], [674, 268], [692, 214], [683, 160], [709, 118],
];

function sampleCurve(points, samplesPerSegment = 20) {
  const pts = [points[0], ...points, points[points.length - 1]];
  const out = [];
  for (let i = 1; i < pts.length - 2; i++) {
    const [p0, p1, p2, p3] = [pts[i - 1], pts[i], pts[i + 1], pts[i + 2]];
    for (let s = 0; s < samplesPerSegment; s++) {
      const t = s / samplesPerSegment;
      const t2 = t * t;
      const t3 = t2 * t;
      const at = (k) =>
        0.5 * (2 * p1[k] + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3);
      out.push({ x: at(0), y: at(1) });
    }
  }
  const last = points[points.length - 1];
  out.push({ x: last[0], y: last[1] });
  return out;
}

export const ROUTE = sampleCurve(CONTROL_POINTS);

const cumulative = [0];
for (let i = 1; i < ROUTE.length; i++) {
  cumulative.push(cumulative[i - 1] + Math.hypot(ROUTE[i].x - ROUTE[i - 1].x, ROUTE[i].y - ROUTE[i - 1].y));
}
export const ROUTE_LENGTH = cumulative[cumulative.length - 1];

const clamp01 = (n) => Math.min(1, Math.max(0, n));

function indexAt(distance) {
  let lo = 0;
  let hi = cumulative.length - 1;
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1;
    if (cumulative[mid] <= distance) lo = mid;
    else hi = mid;
  }
  return lo;
}

/** Point on the route at fraction f (0 = start, 1 = end). */
export function pointAt(f) {
  const d = clamp01(f) * ROUTE_LENGTH;
  const i = indexAt(d);
  const a = ROUTE[i];
  const b = ROUTE[Math.min(i + 1, ROUTE.length - 1)];
  const seg = cumulative[Math.min(i + 1, cumulative.length - 1)] - cumulative[i];
  const t = seg === 0 ? 0 : (d - cumulative[i]) / seg;
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

const fmt = (n) => Math.round(n * 10) / 10;

/** SVG path data for the whole route. */
export const ROUTE_PATH = 'M ' + ROUTE.map((p) => `${fmt(p.x)},${fmt(p.y)}`).join(' L ');

/** SVG path data for the part of the route from the start up to fraction f. */
export function pathUpTo(f) {
  const d = clamp01(f) * ROUTE_LENGTH;
  const i = indexAt(d);
  const end = pointAt(f);
  const pts = ROUTE.slice(0, i + 1).map((p) => `${fmt(p.x)},${fmt(p.y)}`);
  pts.push(`${fmt(end.x)},${fmt(end.y)}`);
  return 'M ' + pts.join(' L ');
}

export const RIDERS = [
  { id: 'alex', name: 'Alex', initial: 'A', start: 0.62 },
  { id: 'you', name: 'You', initial: 'Y', start: 0.54, isYou: true },
  { id: 'maya', name: 'Maya', initial: 'M', start: 0.42 },
];

export const REGROUP_SPOTS = [
  { id: 'overlook', name: 'Ridge Overlook', context: 'Viewpoint with room to park', f: 0.76 },
  { id: 'cafe', name: 'Millstone Café', context: 'Coffee and a short break', f: 0.88 },
  { id: 'lakeside', name: 'Lakeside Picnic Area', context: 'Open lot by the water', f: 0.97 },
];
export const DEFAULT_REGROUP_ID = 'cafe';

export const getRider = (id) => RIDERS.find((r) => r.id === id);
export const getRegroup = (id) => REGROUP_SPOTS.find((s) => s.id === id) ?? REGROUP_SPOTS[1];

const rider = (id) => getRider(id);

/** Whole minutes between two riders, from the gap in their route positions. */
export function gapMinutes(aheadId, behindId) {
  return Math.round((rider(aheadId).start - rider(behindId).start) * ROUTE_MINUTES);
}

/** Status line for the crew list, relative to the viewer ("You"). */
export function statusFor(id) {
  if (id === 'you') return 'On route';
  if (rider(id).start > rider('you').start) return `Up ahead · ${gapMinutes(id, 'you')} min`;
  return `Behind you · ${gapMinutes('you', id)} min`;
}

/** Spoken version of the status, for accessible names. */
export function statusSpoken(id) {
  if (id === 'you') return 'you, on route';
  const minutes = id === 'alex' ? gapMinutes('alex', 'you') : gapMinutes('you', id);
  const unit = minutes === 1 ? 'minute' : 'minutes';
  return `${rider(id).name}, ${rider(id).start > rider('you').start ? 'up ahead' : 'behind you'} ${minutes} ${unit}`;
}

/** Route fraction a rider has reached when the group has moved `s` along the route. */
export const riderProgress = (id, s) => clamp01(rider(id).start + s);

/** How far the group travels before the leader reaches the regroup spot. */
export function maxProgress(regroupId) {
  return Math.max(0, getRegroup(regroupId).f - rider('alex').start);
}

const TURNS = [
  { at: 0.3, text: 'Left onto Quarry Road', icon: 'left' },
  { at: 0.607, text: 'Right onto Ridge Road', icon: 'right' },
  { at: 0.78, text: 'Left onto Mill Road', icon: 'left' },
];

/** Next instruction for the viewer at route fraction f, heading to the given regroup spot. */
export function nextInstruction(f, regroupId) {
  const spot = getRegroup(regroupId);
  const turn = TURNS.find((t) => t.at > f + 1e-9 && t.at < spot.f);
  const target = turn ?? { at: spot.f, text: `Arrive at ${spot.name}`, icon: 'pin' };
  const miles = Math.max(0, (target.at - f) * ROUTE_MILES);
  return {
    text: target.text,
    icon: target.icon,
    distance: miles < 0.1 ? 'Ahead' : `In ${fmt(miles).toFixed(1)} mi`,
  };
}

export const initialRideState = {
  selected: 'you',
  regroupId: DEFAULT_REGROUP_ID,
  playback: 'paused', // 'paused' | 'playing' | 'finished'
  chooserOpen: false,
  resetKey: 0, // bumps whenever playback position must return to the start
  announcement: '',
};

export function rideReducer(state, action) {
  switch (action.type) {
    case 'select':
      return RIDERS.some((r) => r.id === action.id) ? { ...state, selected: action.id } : state;
    case 'openChooser':
      return { ...state, chooserOpen: true, playback: state.playback === 'playing' ? 'paused' : state.playback };
    case 'closeChooser':
      return state.chooserOpen ? { ...state, chooserOpen: false } : state;
    case 'chooseRegroup': {
      if (!REGROUP_SPOTS.some((s) => s.id === action.id)) return state;
      if (action.id === state.regroupId) return { ...state, chooserOpen: false };
      return {
        ...state,
        regroupId: action.id,
        chooserOpen: false,
        playback: 'paused',
        resetKey: state.resetKey + 1,
        announcement: `Demo regroup updated for all ${RIDER_COUNT} riders.`,
      };
    }
    case 'play':
      if (state.playback === 'playing') return state;
      return {
        ...state,
        chooserOpen: false,
        playback: 'playing',
        resetKey: state.playback === 'finished' ? state.resetKey + 1 : state.resetKey,
      };
    case 'pause':
      return state.playback === 'playing' ? { ...state, playback: 'paused' } : state;
    case 'finish':
      return state.playback === 'playing' ? { ...state, playback: 'finished' } : state;
    case 'clearAnnouncement':
      return state.announcement ? { ...state, announcement: '' } : state;
    default:
      return state;
  }
}

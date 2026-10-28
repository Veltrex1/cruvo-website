// Single source of truth for the "Live on the move" demo: a real route (OpenStreetMap data, saved
// by scripts/ride-map/fetch-route.mjs), three riders, regroup spots, turn steps and the run timeline.
// Pure functions only, so it runs under node:test.
import ROUTE_DATA from './rideRoute.json' with { type: 'json' };
import { distance } from './geo.js';

export const RIDER_COUNT = 3;
export const ROUTE_COORDS = ROUTE_DATA.coordinates;
export const ROUTE_MILES = ROUTE_DATA.distanceMeters / 1609.344;
export const ROUTE_MINUTES = ROUTE_DATA.durationSeconds / 60;

const cumulative = [0];
for (let i = 1; i < ROUTE_COORDS.length; i++) cumulative.push(cumulative[i - 1] + distance(ROUTE_COORDS[i - 1], ROUTE_COORDS[i]));
const LENGTH = cumulative[cumulative.length - 1];

const clamp01 = (n) => Math.min(1, Math.max(0, n));
const minutesToF = (m) => m / ROUTE_MINUTES;

function indexAt(d) {
  let lo = 0;
  let hi = cumulative.length - 1;
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1;
    if (cumulative[mid] <= d) lo = mid;
    else hi = mid;
  }
  return lo;
}

/** [lon, lat] at route fraction f (0 = start, 1 = end). */
export function pointAt(f) {
  const d = clamp01(f) * LENGTH;
  const i = indexAt(d);
  const a = ROUTE_COORDS[i];
  const b = ROUTE_COORDS[Math.min(i + 1, ROUTE_COORDS.length - 1)];
  const seg = cumulative[Math.min(i + 1, cumulative.length - 1)] - cumulative[i];
  const t = seg === 0 ? 0 : (d - cumulative[i]) / seg;
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

/** Route points from the start up to fraction f. */
export function coordsUpTo(f) {
  const d = clamp01(f) * LENGTH;
  const i = indexAt(d);
  return [...ROUTE_COORDS.slice(0, i + 1), pointAt(f)];
}

// Riders at the start of every run: Maya at the back, You 3 min ahead of her, Alex 2 min ahead of you.
export const RIDERS = [
  { id: 'alex', name: 'Alex', initial: 'A', start: 0.02 + minutesToF(5) },
  { id: 'you', name: 'You', initial: 'Y', start: 0.02 + minutesToF(3), isYou: true },
  { id: 'maya', name: 'Maya', initial: 'M', start: 0.02 },
];

export const REGROUP_SPOTS = ROUTE_DATA.places;
export const DEFAULT_REGROUP_ID = 'north-lookout';
export const getRider = (id) => RIDERS.find((r) => r.id === id);
export const getRegroup = (id) => REGROUP_SPOTS.find((s) => s.id === id) ?? REGROUP_SPOTS.find((s) => s.id === DEFAULT_REGROUP_ID);

/** Where a rider is after the group has travelled `s` (route fraction): they stop and wait at the regroup spot. */
export function riderProgress(id, s, regroupId) {
  return Math.min(getRider(id).start + Math.max(0, s), getRegroup(regroupId).f);
}

export const hasArrived = (id, s, regroupId) => riderProgress(id, s, regroupId) >= getRegroup(regroupId).f - 1e-9;

/** Travel needed until the last rider reaches the regroup spot. */
export function runLength(regroupId) {
  return getRegroup(regroupId).f - Math.min(...RIDERS.map((r) => r.start));
}

/** Status line for the crew list, always relative to "You" and derived from the same positions the map shows. */
export function statusFor(id, s, regroupId) {
  if (hasArrived(id, s, regroupId)) return 'At the regroup point';
  if (id === 'you') return 'On route';
  const gap = (riderProgress(id, s, regroupId) - riderProgress('you', s, regroupId)) * ROUTE_MINUTES;
  const minutes = Math.round(Math.abs(gap));
  if (minutes < 1) return gap > 0 ? 'Just ahead' : 'Just behind';
  return gap > 0 ? `Up ahead · ${minutes} min` : `Behind you · ${minutes} min`;
}

/** Spoken version of the status for a rider's accessible name. */
export function statusSpoken(id, s, regroupId) {
  const name = id === 'you' ? 'You' : getRider(id).name;
  return `${name}, ${statusFor(id, s, regroupId).replace(' · ', ', ').replace(/(\d+) min/, (_, n) => `${n} minute${n === '1' ? '' : 's'}`).toLowerCase()}`;
}

function formatDistance(miles) {
  if (miles < 0.19) return `In ${Math.max(100, Math.round((miles * 5280) / 100) * 100)} ft`;
  return `In ${miles.toFixed(1)} mi`;
}

/** Next instruction for the viewer at route fraction f, heading to the regroup spot. */
export function nextInstruction(f, regroupId) {
  const spot = getRegroup(regroupId);
  if (f >= spot.f - 1e-9) return { text: `You're at ${spot.name}`, distance: 'Waiting for the crew', icon: 'pin' };
  const step = ROUTE_DATA.steps.find((st) => st.f > f + 1e-6 && st.f < spot.f - 1e-6);
  const target = step ?? { f: spot.f, text: `Arrive at ${spot.name}`, icon: 'pin' };
  return { text: target.text, icon: target.icon, distance: formatDistance((target.f - f) * ROUTE_MILES) };
}

// ---------- state ----------

export const initialRideState = {
  selected: 'you',
  regroupId: DEFAULT_REGROUP_ID,
  playback: 'playing', // 'playing' | 'paused' | 'finished'
  userPaused: false, // a manual pause sticks until the visitor presses play
  resumeAfterChooser: false,
  chooserOpen: false,
  resetKey: 0, // bumps whenever the run must start over
  announcement: '',
};

export function rideReducer(state, action) {
  switch (action.type) {
    case 'select':
      return RIDERS.some((r) => r.id === action.id) ? { ...state, selected: action.id } : state;
    case 'openChooser':
      return { ...state, chooserOpen: true, resumeAfterChooser: state.playback === 'playing', playback: state.playback === 'playing' ? 'paused' : state.playback };
    case 'closeChooser':
      if (!state.chooserOpen) return state;
      return { ...state, chooserOpen: false, resumeAfterChooser: false, playback: state.resumeAfterChooser ? 'playing' : state.playback };
    case 'chooseRegroup': {
      if (!REGROUP_SPOTS.some((s) => s.id === action.id)) return state;
      if (action.id === state.regroupId) return rideReducer(state, { type: 'closeChooser' });
      return {
        ...state,
        regroupId: action.id,
        chooserOpen: false,
        resumeAfterChooser: false,
        playback: state.userPaused ? 'paused' : 'playing',
        resetKey: state.resetKey + 1,
        announcement: `Demo regroup updated for all ${RIDER_COUNT} riders.`,
      };
    }
    case 'play':
      if (state.playback === 'playing') return state;
      return { ...state, chooserOpen: false, userPaused: false, playback: 'playing', resetKey: state.playback === 'finished' ? state.resetKey + 1 : state.resetKey };
    case 'pause':
      return state.playback === 'playing' ? { ...state, playback: 'paused', userPaused: true } : state;
    case 'stopForMotion': // reduced motion: never start on its own
      return state.playback === 'playing' && !state.userPaused && state.resetKey === 0 ? { ...state, playback: 'paused' } : state;
    case 'finish':
      return state.playback === 'playing' ? { ...state, playback: 'finished' } : state;
    case 'clearAnnouncement':
      return state.announcement ? { ...state, announcement: '' } : state;
    default:
      return state;
  }
}

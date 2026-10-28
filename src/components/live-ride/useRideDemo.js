import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { RIDERS, initialRideState, nextInstruction, rideReducer, riderProgress, runLength, statusFor } from './rideDemo';

const SPEED = 0.045; // route fraction per second (about 20 s per run)
const HOLD_MS = 2600; // pause with everyone at the regroup spot
const FADE_MS = 450;
const REDUCED_STEPS = 6;
const REDUCED_STEP_MS = 1200;

const queries = { desktop: '(min-width: 1100px)', tablet: '(min-width: 768px)' };

function currentLayout() {
  if (typeof window === 'undefined' || !window.matchMedia) return 'desktop';
  if (window.matchMedia(queries.desktop).matches) return 'desktop';
  if (window.matchMedia(queries.tablet).matches) return 'tablet';
  return 'mobile';
}

/** 'desktop' | 'tablet' | 'mobile', following the section's breakpoints. */
export function useLayout() {
  const [layout, setLayout] = useState(currentLayout);
  useEffect(() => {
    const lists = Object.values(queries).map((q) => window.matchMedia(q));
    const update = () => setLayout(currentLayout());
    lists.forEach((l) => l.addEventListener('change', update));
    return () => lists.forEach((l) => l.removeEventListener('change', update));
  }, []);
  return layout;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const list = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(list.matches);
    list.addEventListener('change', update);
    return () => list.removeEventListener('change', update);
  }, []);
  return reduced;
}

/**
 * Owns the demo. The run position `s` lives in a ref and is pushed to subscribers (the map writes
 * marker positions straight to the DOM), so React does not re-render every frame. The navigation
 * hint and the crew statuses change only a few times per run and are React state.
 */
export function useRideDemo(sectionRef) {
  const [state, dispatch] = useReducer(rideReducer, initialRideState);
  const reducedMotion = usePrefersReducedMotion();
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => typeof document === 'undefined' || !document.hidden);
  const [fading, setFading] = useState(false);
  const sRef = useRef(0);
  const listeners = useRef(new Set());
  const [snapshot, setSnapshot] = useState({ s: 0, key: '', run: '0:' + initialRideState.regroupId });

  const regroupId = state.regroupId;
  const run = `${state.resetKey}:${regroupId}`;

  const emit = useCallback(
    (s) => {
      sRef.current = s;
      listeners.current.forEach((fn) => fn(s));
      // Re-render only when something the visitor reads would change (turn hint or a status line).
      const nav = nextInstruction(riderProgress('you', s, regroupId), regroupId);
      const key = [nav.text, nav.distance, ...RIDERS.map((r) => statusFor(r.id, s, regroupId))].join('|');
      setSnapshot((prev) => (prev.key === key && prev.run === run ? prev : { s, key, run }));
    },
    [regroupId, run],
  );

  const subscribe = useCallback((fn) => {
    listeners.current.add(fn);
    return () => listeners.current.delete(fn);
  }, []);

  // Reduced motion: never start on its own.
  useEffect(() => {
    if (reducedMotion) dispatch({ type: 'stopForMotion' });
  }, [reducedMotion]);

  // Back to the start whenever the regroup spot changes or a replay starts. The displayed snapshot
  // is tagged with the run it belongs to, so a stale one reads as position 0 without a state update here.
  useEffect(() => {
    sRef.current = 0;
    listeners.current.forEach((fn) => fn(0));
  }, [state.resetKey, regroupId]);

  // Only animate while the section is on screen and the tab is visible.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionRef]);

  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const running = state.playback === 'playing' && inView && pageVisible;

  // Playback loop.
  useEffect(() => {
    if (!running) return undefined;
    const end = runLength(regroupId);
    const timers = [];

    if (reducedMotion) {
      // Discrete scenes instead of motion; stops at the end and offers Replay.
      const per = end / REDUCED_STEPS;
      let step = Math.round(sRef.current / per);
      const id = setInterval(() => {
        step += 1;
        const s = Math.min(end, step * per);
        emit(s);
        if (s >= end) {
          clearInterval(id);
          dispatch({ type: 'finish' });
        }
      }, REDUCED_STEP_MS);
      return () => clearInterval(id);
    }

    let frame = 0;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const s = Math.min(end, sRef.current + SPEED * dt);
      emit(s);
      if (s >= end) {
        // Everyone is at the regroup spot: hold, fade, start again.
        timers.push(setTimeout(() => {
          setFading(true);
          timers.push(setTimeout(() => {
            emit(0);
            setFading(false);
            last = performance.now();
            frame = requestAnimationFrame(tick);
          }, FADE_MS));
        }, HOLD_MS));
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
      setFading(false);
    };
  }, [running, reducedMotion, regroupId, emit]);

  // Let the polite announcement be read, then clear it so it can be announced again.
  useEffect(() => {
    if (!state.announcement) return undefined;
    const id = setTimeout(() => dispatch({ type: 'clearAnnouncement' }), 4000);
    return () => clearTimeout(id);
  }, [state.announcement]);

  const shown = snapshot.run === run ? snapshot.s : 0;
  const nav = nextInstruction(riderProgress('you', shown, regroupId), regroupId);
  return { state, dispatch, s: shown, nav, sRef, subscribe, reducedMotion, fading };
}

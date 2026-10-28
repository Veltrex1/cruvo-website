import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { initialRideState, maxProgress, nextInstruction, rideReducer, riderProgress } from './rideDemo';

const SPEED = 0.03; // route fraction per second
const REDUCED_STEPS = 6;
const REDUCED_STEP_MS = 1100;

const queries = {
  desktop: '(min-width: 1100px)',
  tablet: '(min-width: 768px)',
};

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
 * Owns the demo state. Playback position lives in a ref and is pushed to subscribers
 * (the map writes marker positions straight to the DOM), so React does not re-render per frame.
 * Only the navigation hint, which changes a few times per second at most, is React state.
 */
export function useRideDemo() {
  const [state, dispatch] = useReducer(rideReducer, initialRideState);
  const reducedMotion = usePrefersReducedMotion();
  const progressRef = useRef(0);
  const listeners = useRef(new Set());
  const lastNavKey = useRef('');
  const [nav, setNav] = useState(() => nextInstruction(riderProgress('you', 0), initialRideState.regroupId));

  const emit = useCallback(
    (s) => {
      progressRef.current = s;
      listeners.current.forEach((fn) => fn(s));
      const next = nextInstruction(riderProgress('you', s), state.regroupId);
      const key = `${next.text}|${next.distance}`;
      if (key !== lastNavKey.current) {
        lastNavKey.current = key;
        setNav(next);
      }
    },
    [state.regroupId],
  );

  const subscribe = useCallback((fn) => {
    listeners.current.add(fn);
    return () => listeners.current.delete(fn);
  }, []);

  // Back to the starting scene whenever the regroup spot changes or a replay starts.
  useEffect(() => {
    emit(0);
  }, [state.resetKey, emit]);

  // Playback.
  useEffect(() => {
    if (state.playback !== 'playing') return undefined;
    const limit = maxProgress(state.regroupId);

    if (reducedMotion) {
      // No tweening: jump between a few discrete scenes.
      const per = limit / REDUCED_STEPS;
      let step = Math.round(progressRef.current / per);
      const id = setInterval(() => {
        step += 1;
        const s = Math.min(limit, step * per);
        emit(s);
        if (s >= limit) {
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
      const s = Math.min(limit, progressRef.current + SPEED * dt);
      emit(s);
      if (s >= limit) {
        dispatch({ type: 'finish' });
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [state.playback, state.regroupId, reducedMotion, emit]);

  // Pause (never resume) when the tab is hidden.
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) dispatch({ type: 'pause' });
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Let the polite announcement be read, then clear it so it can be announced again.
  useEffect(() => {
    if (!state.announcement) return undefined;
    const id = setTimeout(() => dispatch({ type: 'clearAnnouncement' }), 4000);
    return () => clearTimeout(id);
  }, [state.announcement]);

  return { state, dispatch, nav, progressRef, subscribe, reducedMotion };
}

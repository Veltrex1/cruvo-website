import test from 'node:test';
import assert from 'node:assert/strict';
import {
  RIDERS, REGROUP_SPOTS, ROUTE_COORDS, ROUTE_MILES, ROUTE_MINUTES, DEFAULT_REGROUP_ID, pointAt, coordsUpTo, riderProgress, hasArrived,
  runLength, statusFor, statusSpoken, nextInstruction, rideReducer, initialRideState, getRegroup,
} from '../src/components/live-ride/rideDemo.js';
import { project, distance } from '../src/components/live-ride/geo.js';
import FRAMES from '../src/components/live-ride/rideFrames.json' with { type: 'json' };

const R = DEFAULT_REGROUP_ID;

test('the real route is the saved Brown County ride', () => {
  assert.ok(ROUTE_COORDS.length > 100);
  assert.ok(ROUTE_MILES > 7 && ROUTE_MILES < 10, `${ROUTE_MILES} mi`);
  assert.ok(ROUTE_MINUTES > 12 && ROUTE_MINUTES < 20);
});

test('three riders in a consistent order with 2 and 3 minute gaps', () => {
  assert.deepEqual(RIDERS.map((r) => r.name), ['Alex', 'You', 'Maya']);
  assert.equal(statusFor('alex', 0, R), 'Up ahead · 2 min');
  assert.equal(statusFor('you', 0, R), 'On route');
  assert.equal(statusFor('maya', 0, R), 'Behind you · 3 min');
  assert.equal(statusSpoken('maya', 0, R), 'Maya, behind you, 3 minutes');
});

test('every regroup spot is on the route and ahead of the leader at the start', () => {
  for (const spot of REGROUP_SPOTS) {
    assert.ok(spot.f > RIDERS[0].start, spot.name);
    const p = pointAt(spot.f);
    assert.ok(distance(p, spot.at) < 150, `${spot.name} is on the route`);
  }
});

test('riders stop at the regroup spot and the run ends when the last one arrives', () => {
  const end = runLength(R);
  assert.equal(hasArrived('alex', end, R), true);
  assert.equal(hasArrived('maya', end - 0.01, R), false);
  assert.equal(hasArrived('maya', end, R), true);
  assert.equal(riderProgress('alex', end + 1, R), getRegroup(R).f, 'nobody rides past the regroup spot');
  assert.equal(statusFor('alex', end, R), 'At the regroup point');
  // Alex waits, so the gap to him shrinks as You catch up.
  const waiting = getRegroup(R).f - RIDERS[0].start + 0.05;
  assert.match(statusFor('alex', waiting, R), /At the regroup point/);
  assert.match(statusFor('you', waiting, R), /On route/);
});

test('route positions are continuous, and the travelled path ends at the leader', () => {
  let prev = pointAt(0);
  for (let i = 1; i <= 300; i++) {
    const p = pointAt(i / 300);
    assert.ok(distance(prev, p) < 200, 'no jumps');
    prev = p;
  }
  const f = riderProgress('alex', 0.1, R);
  assert.deepEqual(coordsUpTo(f).at(-1), pointAt(f));
});

test('turn instructions come from the real route and move on as the viewer passes them', () => {
  const start = nextInstruction(riderProgress('you', 0, R), R);
  assert.equal(start.text, 'Turn left onto SR 46');
  assert.match(start.distance, /^In \d+\.\d mi$/);
  const later = nextInstruction(0.7, R);
  assert.equal(later.text, 'Turn right into Brown County State Park');
  const near = nextInstruction(0.995, R);
  assert.match(near.text, /^Arrive at North Lookout/);
  assert.match(near.distance, /ft$/);
  assert.equal(nextInstruction(1, R).text, "You're at North Lookout");
  const nashville = nextInstruction(0.5, 'nashville');
  assert.equal(nashville.text, 'Arrive at Downtown Nashville', 'turns past the regroup spot are not shown');
});

test('frames project the route inside the image and clear of the desktop crew card', () => {
  for (const [name, frame] of Object.entries(FRAMES)) {
    for (const c of ROUTE_COORDS) {
      const { x, y } = project(c, frame);
      assert.ok(x > 0 && x < frame.width && y > 0 && y < frame.height, `${name}: route inside the image`);
    }
  }
  const d = FRAMES.desktop;
  const maxX = Math.max(...ROUTE_COORDS.map((c) => project(c, d).x));
  assert.ok(maxX < d.width - 360, 'desktop route stays left of the crew card');
});

test('autoplay by default; a manual pause sticks; replay starts over', () => {
  assert.equal(initialRideState.playback, 'playing');
  let s = rideReducer(initialRideState, { type: 'pause' });
  assert.equal(s.playback, 'paused');
  assert.equal(s.userPaused, true);
  s = rideReducer(s, { type: 'play' });
  assert.equal(s.playback, 'playing');
  assert.equal(s.userPaused, false);
  s = rideReducer(s, { type: 'finish' });
  assert.equal(s.playback, 'finished');
  const replay = rideReducer(s, { type: 'play' });
  assert.equal(replay.resetKey, s.resetKey + 1);
});

test('reduced motion: the demo does not start on its own', () => {
  assert.equal(rideReducer(initialRideState, { type: 'stopForMotion' }).playback, 'paused');
});

test('chooser pauses, resumes on close, and a new spot restarts the run', () => {
  let s = rideReducer(initialRideState, { type: 'openChooser' });
  assert.equal(s.playback, 'paused');
  assert.equal(rideReducer(s, { type: 'closeChooser' }).playback, 'playing', 'closing resumes');
  s = rideReducer(s, { type: 'chooseRegroup', id: 'nashville' });
  assert.equal(s.regroupId, 'nashville');
  assert.equal(s.playback, 'playing');
  assert.equal(s.resetKey, 1);
  assert.equal(s.announcement, 'Demo regroup updated for all 3 riders.');
  const paused = rideReducer(rideReducer(initialRideState, { type: 'pause' }), { type: 'openChooser' });
  assert.equal(rideReducer(paused, { type: 'closeChooser' }).playback, 'paused', 'a manual pause is kept');
  assert.equal(rideReducer(paused, { type: 'chooseRegroup', id: 'nashville' }).playback, 'paused');
});

test('selection only changes the selected rider', () => {
  const s = rideReducer(initialRideState, { type: 'select', id: 'alex' });
  assert.equal(s.selected, 'alex');
  assert.equal(rideReducer(s, { type: 'select', id: 'nobody' }), s);
});

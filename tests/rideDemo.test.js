import test from 'node:test';
import assert from 'node:assert/strict';
import {
  RIDERS, REGROUP_SPOTS, ROUTE_LENGTH, pointAt, pathUpTo, statusFor, statusSpoken, gapMinutes, riderProgress,
  maxProgress, nextInstruction, rideReducer, initialRideState, getRegroup,
} from '../src/components/live-ride/rideDemo.js';

test('the demo has exactly three riders in a consistent order', () => {
  assert.deepEqual(RIDERS.map((r) => r.name), ['Alex', 'You', 'Maya']);
  assert.ok(RIDERS[0].start > RIDERS[1].start && RIDERS[1].start > RIDERS[2].start);
});

test('statuses come from the same positions the map uses', () => {
  assert.equal(gapMinutes('alex', 'you'), 2);
  assert.equal(gapMinutes('you', 'maya'), 3);
  assert.equal(statusFor('alex'), 'Up ahead · 2 min');
  assert.equal(statusFor('you'), 'On route');
  assert.equal(statusFor('maya'), 'Behind you · 3 min');
  assert.equal(statusSpoken('maya'), 'Maya, behind you 3 minutes');
});

test('route positions are continuous and ordered', () => {
  const a = pointAt(0);
  const b = pointAt(1);
  assert.ok(ROUTE_LENGTH > 500);
  assert.notDeepEqual(a, b);
  let prev = pointAt(0);
  let travelled = 0;
  for (let i = 1; i <= 200; i++) {
    const p = pointAt(i / 200);
    travelled += Math.hypot(p.x - prev.x, p.y - prev.y);
    assert.ok(Math.hypot(p.x - prev.x, p.y - prev.y) < ROUTE_LENGTH / 100, 'no jumps along the route');
    prev = p;
  }
  assert.ok(Math.abs(travelled - ROUTE_LENGTH) < ROUTE_LENGTH * 0.01);
  assert.ok(pathUpTo(0.5).startsWith('M '));
});

test('every regroup spot is ahead of the leader and reachable', () => {
  for (const spot of REGROUP_SPOTS) {
    assert.ok(maxProgress(spot.id) > 0, spot.name);
    assert.ok(riderProgress('alex', maxProgress(spot.id)) <= spot.f + 1e-9);
  }
});

test('default scene shows a believable next turn', () => {
  const ins = nextInstruction(RIDERS[1].start, 'cafe');
  assert.equal(ins.text, 'Right onto Ridge Road');
  assert.equal(ins.distance, 'In 0.8 mi');
});

test('instruction moves on as the viewer passes a turn and ends at the regroup spot', () => {
  assert.equal(nextInstruction(0.62, 'cafe').text, 'Left onto Mill Road');
  const near = nextInstruction(0.87, 'cafe');
  assert.equal(near.text, 'Arrive at Millstone Café');
});

test('selection changes only the selected rider', () => {
  const s = rideReducer(initialRideState, { type: 'select', id: 'alex' });
  assert.equal(s.selected, 'alex');
  assert.equal(rideReducer(s, { type: 'select', id: 'nobody' }), s);
  assert.equal(rideReducer(s, { type: 'select', id: 'you' }).selected, 'you');
});

test('choosing a regroup spot updates it, resets playback and announces it', () => {
  let s = rideReducer(initialRideState, { type: 'play' });
  s = rideReducer(s, { type: 'openChooser' });
  assert.equal(s.playback, 'paused', 'opening the chooser pauses the demo');
  s = rideReducer(s, { type: 'chooseRegroup', id: 'lakeside' });
  assert.equal(s.regroupId, 'lakeside');
  assert.equal(s.chooserOpen, false);
  assert.equal(s.resetKey, initialRideState.resetKey + 1);
  assert.equal(s.announcement, 'Demo regroup updated for all 3 riders.');
  assert.equal(getRegroup(s.regroupId).name, 'Lakeside Picnic Area');
  const same = rideReducer(s, { type: 'chooseRegroup', id: 'lakeside' });
  assert.equal(same.resetKey, s.resetKey, 'picking the same spot does not reset');
});

test('playback: play, pause, finish, replay; no automatic resume', () => {
  let s = rideReducer(initialRideState, { type: 'play' });
  assert.equal(s.playback, 'playing');
  s = rideReducer(s, { type: 'pause' });
  assert.equal(s.playback, 'paused');
  s = rideReducer(s, { type: 'finish' });
  assert.equal(s.playback, 'paused', 'finish only applies while playing');
  s = rideReducer(s, { type: 'play' });
  s = rideReducer(s, { type: 'finish' });
  assert.equal(s.playback, 'finished');
  const replay = rideReducer(s, { type: 'play' });
  assert.equal(replay.playback, 'playing');
  assert.equal(replay.resetKey, s.resetKey + 1, 'replay starts from the beginning');
});

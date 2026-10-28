// One-off: fetch the demo ride from the public OSRM router and save it as static data.
// Run with: node scripts/ride-map/fetch-route.mjs
// Visitors never call the router; the site reads src/components/live-ride/rideRoute.json.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'src/components/live-ride/rideRoute.json');

// Beanblossom, south on SR 135 through Nashville, east on SR 46, into Brown County State Park.
const START = [-86.24916, 39.26698]; // Beanblossom (OpenStreetMap place)
const END = [-86.2262, 39.1861]; // North Lookout, Brown County State Park (OpenStreetMap place)

// Regroup spots, all real places on the route (names from OpenStreetMap data).
const PLACES = [
  { id: 'nashville', name: 'Downtown Nashville', context: 'Main Street, just off SR 135', at: [-86.246955, 39.207228] },
  { id: 'park-entrance', name: 'Brown County State Park entrance', context: 'Off SR 46, east of Nashville', at: [-86.216699, 39.197328] },
  { id: 'north-lookout', name: 'North Lookout', context: 'Inside Brown County State Park', at: END },
];

const url = `https://router.project-osrm.org/route/v1/driving/${START.join(',')};${END.join(',')}?overview=full&geometries=geojson&steps=true`;
const res = await fetch(url, { headers: { 'User-Agent': 'cruvo-website demo route fetch' } });
if (!res.ok) throw new Error(`OSRM ${res.status}`);
const data = await res.json();
const route = data.routes[0];
const coords = route.geometry.coordinates.map(([lon, lat]) => [+lon.toFixed(5), +lat.toFixed(5)]);

// Distances along the route (metres).
const R = 6371008.8;
const rad = (d) => (d * Math.PI) / 180;
const hav = ([lon1, lat1], [lon2, lat2]) => {
  const a = Math.sin(rad(lat2 - lat1) / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lon2 - lon1) / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
};
const cum = [0];
for (let i = 1; i < coords.length; i++) cum.push(cum[i - 1] + hav(coords[i - 1], coords[i]));
const total = cum[cum.length - 1];

// Fraction along the route of the closest point to `p`.
function fractionOf(p) {
  let best = { d: Infinity, f: 0 };
  for (let i = 1; i < coords.length; i++) {
    const [a, b] = [coords[i - 1], coords[i]];
    const kx = Math.cos(rad(p[1]));
    const ax = a[0] * kx, ay = a[1], bx = b[0] * kx, by = b[1], px = p[0] * kx, py = p[1];
    const len2 = (bx - ax) ** 2 + (by - ay) ** 2 || 1e-12;
    const t = Math.max(0, Math.min(1, ((px - ax) * (bx - ax) + (py - ay) * (by - ay)) / len2));
    const q = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    const d = hav(p, q);
    if (d < best.d) best = { d, f: (cum[i - 1] + (cum[i] - cum[i - 1]) * t) / total };
  }
  return best;
}

// Turn steps a rider would hear. Unnamed or name-change steps are skipped or given plain wording.
const words = { left: 'left', right: 'right', 'slight left': 'slight left', 'slight right': 'slight right', straight: 'straight' };
const steps = [];
for (const leg of route.legs) {
  for (const s of leg.steps) {
    const m = s.maneuver;
    if (m.type === 'depart' || m.type === 'arrive' || m.type === 'new name') continue;
    const road = s.ref ? s.ref.split(';')[0].trim() : s.name;
    let text;
    if (m.type === 'fork') text = `Keep ${m.modifier.includes('left') ? 'left' : 'right'}${road ? ` on ${road}` : ''}`;
    else if (!road) text = `Turn ${words[m.modifier] ?? m.modifier} into Brown County State Park`;
    else text = `Turn ${words[m.modifier] ?? m.modifier} onto ${road}`;
    const { f } = fractionOf(m.location);
    if (f < 0.02) continue; // the turn out of the start point
    steps.push({ f: +f.toFixed(4), text, icon: m.modifier?.includes('left') ? 'left' : 'right' });
  }
}

const places = PLACES.map((p) => {
  const { f, d } = fractionOf(p.at);
  if (d > 150) throw new Error(`${p.name} is ${d.toFixed(0)} m from the route`);
  return { ...p, f: +f.toFixed(4) };
});

const out = {
  source: 'OpenStreetMap contributors, routed with OSRM (router.project-osrm.org)',
  fetched: new Date().toISOString().slice(0, 10),
  distanceMeters: Math.round(total),
  durationSeconds: Math.round(route.duration),
  coordinates: coords,
  steps,
  places,
};
fs.writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n');
console.log(`saved ${coords.length} points, ${(total / 1609.344).toFixed(1)} mi, ${(route.duration / 60).toFixed(1)} min, ${steps.length} steps`);
steps.forEach((s) => console.log('  ', s.f, s.text));
places.forEach((p) => console.log('  place', p.f, p.name));

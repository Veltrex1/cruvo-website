// Renders the real-map backdrop for the "Live on the move" section into static images.
// Run with: node scripts/ride-map/render.mjs   (needs Playwright's Chromium; set PLAYWRIGHT_PATH if it is installed globally)
//
// Map data: OpenStreetMap contributors via OpenFreeMap (OpenMapTiles schema). Terrain: AWS Terrain Tiles (Mapzen, USGS).
// The output is committed, so the live site never requests map tiles.
import { createRequire } from 'node:module';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { rideStyle } from './style.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(DIR, '../..');
const OUT = path.join(ROOT, 'public/ride-map');
const FRAMES_OUT = path.join(ROOT, 'src/components/live-ride/rideFrames.json');
const VENDOR = path.join(DIR, 'vendor');
const DEM_URL = 'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png';
const DOWNLOADS = {
  'maplibre-gl.js': 'https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.js',
  'maplibre-gl.css': 'https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.css',
  'maplibre-contour.js': 'https://cdn.jsdelivr.net/npm/maplibre-contour@0.1.0/dist/index.min.js',
  'liberty.json': 'https://tiles.openfreemap.org/styles/liberty',
};

// Web Mercator with MapLibre's 512 px tiles.
const TILE = 512;
const mx = (lon) => (lon + 180) / 360;
const my = (lat) => { const s = Math.sin((lat * Math.PI) / 180); return 0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI); };
const unx = (x) => x * 360 - 180;
const uny = (y) => (360 / Math.PI) * Math.atan(Math.exp((0.5 - y) * 2 * Math.PI)) - 90;

// CSS size of each map box, and where the route's bounding box sits inside it (fractions of the box).
// Desktop keeps the route left of the crew card; every framing keeps it clear of the corner controls.
const FRAMES = {
  desktop: { w: 1280, h: 640, box: { left: 0.30, right: 0.58, top: 0.14, bottom: 0.88 } },
  tablet: { w: 960, h: 640, box: { left: 0.33, right: 0.72, top: 0.17, bottom: 0.86 } },
  mobile: { w: 420, h: 520, box: { left: 0.26, right: 0.80, top: 0.26, bottom: 0.80 } },
};

// Towns are anchored on their right edge, a little west of the road, so the route never crosses them.
const LABELS = [
  { name: 'Nashville', kind: 'town', at: [-86.2560, 39.2085] },
  { name: 'Beanblossom', kind: 'town', at: [-86.2550, 39.2690] },
  { name: 'Brown County State Park', kind: 'park', at: [-86.1830, 39.1890] },
  { name: 'Yellowwood State Forest', kind: 'park', at: [-86.3260, 39.2200] },
];

const route = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/components/live-ride/rideRoute.json'), 'utf8')).coordinates;
const xs = route.map(([lon]) => mx(lon));
const ys = route.map(([, lat]) => my(lat));
const rb = { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) };

function framing({ w, h, box }) {
  const zx = Math.log2(((box.right - box.left) * w) / ((rb.x1 - rb.x0) * TILE));
  const zy = Math.log2(((box.bottom - box.top) * h) / ((rb.y1 - rb.y0) * TILE));
  const zoom = Math.min(zx, zy);
  const world = TILE * 2 ** zoom;
  const cx = (rb.x0 + rb.x1) / 2 + ((0.5 - (box.left + box.right) / 2) * w) / world;
  const cy = (rb.y0 + rb.y1) / 2 + ((0.5 - (box.top + box.bottom) / 2) * h) / world;
  return { width: w, height: h, zoom: +zoom.toFixed(6), center: [+unx(cx).toFixed(6), +uny(cy).toFixed(6)] };
}

async function download() {
  fs.mkdirSync(VENDOR, { recursive: true });
  for (const [name, url] of Object.entries(DOWNLOADS)) {
    const file = path.join(VENDOR, name);
    if (fs.existsSync(file)) continue;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${url}: ${res.status}`);
    fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  }
}

await download();
const liberty = JSON.parse(fs.readFileSync(path.join(VENDOR, 'liberty.json'), 'utf8'));
const style = rideStyle(liberty, { demUrl: DEM_URL, labels: LABELS });
const only = (process.env.FRAMES || Object.keys(FRAMES).join(',')).split(',');
const scales = [1, 2];

const server = http.createServer((q, s) => {
  const f = path.join(DIR, q.url.split('?')[0]);
  if (!f.startsWith(DIR) || !fs.existsSync(f)) { s.writeHead(404); return s.end(); }
  s.writeHead(200, { 'Content-Type': f.endsWith('.js') ? 'text/javascript' : f.endsWith('.css') ? 'text/css' : 'text/html' });
  fs.createReadStream(f).pipe(s);
});
await new Promise((resolve) => server.listen(0, resolve));
const port = server.address().port;
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const frames = fs.existsSync(FRAMES_OUT) ? JSON.parse(fs.readFileSync(FRAMES_OUT, 'utf8')) : {};
try {
  for (const name of only) {
    const fr = framing(FRAMES[name]);
    frames[name] = fr;
    for (const scale of scales) {
      const page = await browser.newPage({ viewport: { width: fr.width, height: fr.height } });
      const got = await page.goto(`http://localhost:${port}/page.html`).then(() =>
        page.evaluate((cfg) => window.renderMap(cfg), { style, demUrl: DEM_URL, center: fr.center, zoom: fr.zoom, pixelRatio: scale, contours: true, timeoutMs: 120000 }));
      const errors = await page.evaluate(() => window.__errors || []);
      if (got.how !== 'idle' || errors.length) throw new Error(`${name}@${scale}x did not finish cleanly: ${got.how} ${errors.slice(0, 3).join('; ')}`);
      const data = await page.evaluate(() => window.exportImage('image/webp', 0.82));
      const file = path.join(OUT, `${name}@${scale}x.webp`);
      fs.writeFileSync(file, Buffer.from(data.split(',')[1], 'base64'));
      console.log(`${name}@${scale}x  ${(fs.statSync(file).size / 1024).toFixed(0)} KB`);
      await page.close();
    }
  }
  fs.writeFileSync(FRAMES_OUT, JSON.stringify(frames, null, 2) + '\n');
} finally {
  await browser.close();
  server.close();
}

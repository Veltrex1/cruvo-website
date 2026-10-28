// Renders the 1200x630 social share cards (og:image / twitter:image) into public/og/.
// Run with: node scripts/og/render-og.mjs   (needs Playwright's Chromium; set PLAYWRIGHT_PATH if installed globally)
// Uses only existing brand material: the Cruvo logo, site colours, page copy, and the pre-rendered ride map.
import { createRequire } from 'node:module';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_PAGES } from '../../src/data/sitePages.js';
import { project } from '../../src/components/live-ride/geo.js';
import { RIDERS, ROUTE_COORDS, getRegroup, pointAt, DEFAULT_REGROUP_ID } from '../../src/components/live-ride/rideDemo.js';
import FRAMES from '../../src/components/live-ride/rideFrames.json' with { type: 'json' };

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const PUBLIC = path.join(ROOT, 'public');
const OUT = path.join(PUBLIC, 'og');

// Heading and supporting line for each card, taken from what each page already says.
const HEADINGS = {
  '/support': 'Cruvo Support',
  '/privacy-policy': 'Privacy Policy',
  '/terms': 'Terms and Conditions',
  '/eula': 'Terms of Use (EULA)',
  '/about': 'Built for the ride. Now for the drive too.',
  '/clubs': 'Run a club? Ride and drive together.',
};
export const CARDS = [
  {
    slug: 'home',
    heading: 'Ride together. Stay together. <em>Remember the ride.</em>',
    line: 'Your all-in-one motorcycle app for group rides, live navigation, crew updates, and the community that rides with you.',
  },
  ...SITE_PAGES.map((p) => ({ slug: p.path.slice(1), heading: HEADINGS[p.path], line: p.blurb })),
];

// The ride from the homepage demo, drawn over the same pre-rendered map (mobile framing).
const F = FRAMES.mobile;
const pt = (c) => project(c, F);
const ROUTE_PATH = 'M ' + ROUTE_COORDS.map((c) => { const p = pt(c); return `${p.x.toFixed(1)},${p.y.toFixed(1)}`; }).join(' L ');
const SCENE = 0.12; // a moment mid-ride
const riders = RIDERS.map((r) => ({ ...r, at: pt(pointAt(r.start + SCENE)) }));
const travelled = 'M ' + ROUTE_COORDS.filter((_, i, a) => i / (a.length - 1) <= RIDERS[0].start + SCENE).map((c) => { const p = pt(c); return `${p.x.toFixed(1)},${p.y.toFixed(1)}`; }).join(' L ');
const pin = pt(pointAt(getRegroup(DEFAULT_REGROUP_ID).f));
const MAP_SVG = `<svg viewBox="0 0 ${F.width} ${F.height}" preserveAspectRatio="none">
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="${ROUTE_PATH}" stroke="#fff" stroke-width="5"/>
    <path d="${ROUTE_PATH}" stroke="#E54E57" stroke-opacity=".3" stroke-width="2.6"/>
    <path d="${travelled}" stroke="#E54E57" stroke-width="2.6"/>
  </g>
  <circle cx="${pin.x}" cy="${pin.y}" r="8" fill="#B8414A" stroke="#fff" stroke-width="2"/>
  ${riders.map((r) => `<circle cx="${r.at.x}" cy="${r.at.y}" r="8" fill="${r.isYou ? '#E54E57' : '#1C2929'}" stroke="#fff" stroke-width="2"/>
  <text x="${r.at.x}" y="${r.at.y + 3}" text-anchor="middle" font-size="8.5" font-weight="700" fill="#fff">${r.initial}</text>`).join('')}
</svg>`;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const page = (card) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700;800&display=block">
<style>
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; overflow: hidden; background: #0C2222; font-family: Inter, system-ui, sans-serif; color: #F8F8F8; }
  .card { position: relative; display: grid; grid-template-columns: 1fr 470px; height: 100%; }
  .text { display: flex; flex-direction: column; justify-content: space-between; padding: 64px 40px 60px 72px; }
  .logo { width: 190px; height: 40px; background: #E54E57; -webkit-mask: url("/logos/Fullstack%20-%20Onyx.svg") left center / contain no-repeat; }
  h1 { font-size: ${card.heading.length > 40 ? 58 : 66}px; line-height: 1.04; letter-spacing: -0.035em; font-weight: 800; max-width: 640px; }
  h1 em { font-style: normal; color: #E54E57; }
  p { margin-top: 22px; font-size: 25px; line-height: 1.4; color: rgba(248,248,248,0.78); max-width: 600px; font-weight: 500; }
  .url { font-size: 22px; font-weight: 700; color: rgba(248,248,248,0.6); letter-spacing: 0.01em; }
  .map { position: relative; margin: 40px 40px 40px 0; border-radius: 26px; overflow: hidden; background: #E7E5DB; }
  /* The map image and the route overlay share one box, scaled and cropped together. */
  .map-inner { position: absolute; width: 132%; aspect-ratio: ${F.width} / ${F.height}; left: -14%; top: -24%; }
  .map-inner img, .map-inner svg { position: absolute; inset: 0; width: 100%; height: 100%; }
</style></head><body><div class="card">
  <div class="text">
    <div class="logo" role="img" aria-label="Cruvo"></div>
    <div><h1>${card.heading.includes('<em>') ? card.heading : esc(card.heading)}</h1><p>${esc(card.line)}</p></div>
    <div class="url">cruvo.co</div>
  </div>
  <div class="map"><div class="map-inner"><img src="/ride-map/mobile@2x.webp" alt="">${MAP_SVG}</div></div>
</div></body></html>`;

const server = http.createServer((q, s) => {
  const url = decodeURIComponent(q.url.split('?')[0]);
  const card = CARDS.find((c) => url === `/__card/${c.slug}`);
  if (card) { s.writeHead(200, { 'Content-Type': 'text/html' }); return s.end(page(card)); }
  const f = path.join(PUBLIC, url);
  if (!f.startsWith(PUBLIC) || !fs.existsSync(f)) { s.writeHead(404); return s.end(); }
  s.writeHead(200, { 'Content-Type': f.endsWith('.svg') ? 'image/svg+xml' : f.endsWith('.webp') ? 'image/webp' : 'application/octet-stream' });
  fs.createReadStream(f).pipe(s);
});

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  await new Promise((r) => server.listen(0, r));
  const port = server.address().port;
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  try {
    const tab = await browser.newPage({ viewport: { width: 1200, height: 630 } });
    for (const card of CARDS) {
      await tab.goto(`http://localhost:${port}/__card/${card.slug}`, { waitUntil: 'networkidle' });
      await tab.evaluate(() => document.fonts.ready);
      const file = path.join(OUT, `${card.slug}.png`);
      await tab.screenshot({ path: file, type: 'png' });
      console.log(`og/${card.slug}.png  ${(fs.statSync(file).size / 1024).toFixed(0)} KB`);
    }
  } finally {
    await browser.close();
    server.close();
  }
}

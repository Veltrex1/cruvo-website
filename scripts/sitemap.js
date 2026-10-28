import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';

export const SITE_ORIGIN = 'https://www.cruvo.co';

// Each public page and the source files whose changes alter what it shows.
const HOME_SOURCES = [
  'index.html',
  'src/App.jsx',
  'src/App.css',
  'src/components/Hero.jsx',
  'src/components/FeaturesGrid.jsx',
  'src/components/AppShowcase.jsx',
  'src/components/MapDemo.jsx',
  'src/components/PricingCards.jsx',
  'src/components/FooterCTA.jsx',
];
const LEGAL_SOURCES = ['src/components/LegalPage.jsx'];

export const PAGES = [
  { path: '/', sources: HOME_SOURCES },
  { path: '/support', sources: ['src/components/SupportPage.jsx'] },
  { path: '/privacy-policy', sources: [...LEGAL_SOURCES, 'src/data/legalPolicies.js'] },
  { path: '/terms', sources: [...LEGAL_SOURCES, 'src/data/legalPolicies.js'] },
  { path: '/eula', sources: [...LEGAL_SOURCES, 'src/data/legalPolicies.js'] },
];

function lastModified(file) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], { encoding: 'utf8' }).trim();
    if (out) return new Date(out);
  } catch {
    // not a git checkout; fall back to the file's mtime
  }
  try {
    return statSync(file).mtime;
  } catch {
    return null;
  }
}

export function pageLastmod(sources) {
  const dates = sources.map(lastModified).filter(Boolean);
  if (!dates.length) return null;
  return new Date(Math.max(...dates)).toISOString().slice(0, 10);
}

export function buildSitemap() {
  const urls = PAGES.map(({ path, sources }) => {
    const lastmod = pageLastmod(sources);
    return `  <url>\n    <loc>${SITE_ORIGIN}${path}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

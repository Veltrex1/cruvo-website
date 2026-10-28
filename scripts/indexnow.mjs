// Run after each deploy: node scripts/indexnow.mjs [url ...]
// With no arguments, submits every page in the sitemap.
import { PAGES, SITE_ORIGIN } from './sitemap.js';

const KEY = '6e7fa7d8f9ebcb0bd48ee1ab3e40d9dd';
const urls = process.argv.length > 2 ? process.argv.slice(2) : PAGES.map((p) => SITE_ORIGIN + p.path);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: new URL(SITE_ORIGIN).host,
    key: KEY,
    keyLocation: `${SITE_ORIGIN}/${KEY}.txt`,
    urlList: urls,
  }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} (${urls.length} URLs)`);
if (!res.ok) process.exit(1);

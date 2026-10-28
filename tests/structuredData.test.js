import test from 'node:test';
import assert from 'node:assert/strict';
import { SITE_PAGES } from '../src/data/sitePages.js';
import { homeStructuredData, pageStructuredData, jsonLdTag } from '../scripts/structured-data.js';

const byType = (data, type) => data['@graph'].find((n) => n['@type'] === type);
const page = (data) => data['@graph'].find((n) => n.headline);

test('home: Organization with profiles, WebSite, WebPage and the app', () => {
  const data = homeStructuredData({ title: 'Home title', description: 'Home description' });
  const org = byType(data, 'Organization');
  assert.ok(org.sameAs.includes('https://x.com/cruvoracing'));
  assert.ok(org.sameAs.includes('https://www.instagram.com/appcruvo/'));
  assert.ok(org.sameAs.some((u) => u.startsWith('https://apps.apple.com/')) && org.sameAs.some((u) => u.startsWith('https://play.google.com/')));
  assert.match(org.logo.url, /\.png$/);
  assert.ok(byType(data, 'WebSite'));
  assert.ok(byType(data, 'MobileApplication'));
  assert.equal(page(data).headline, 'Home title', 'headline equals the page title');
});

test('every inner page: its own WebPage with headline = title, url, breadcrumbs and a date', () => {
  for (const p of SITE_PAGES) {
    const data = pageStructuredData(p.path);
    const wp = page(data);
    assert.equal(wp.headline, p.seoTitle, p.path);
    assert.equal(wp.url, `https://www.cruvo.co${p.path}`);
    assert.ok(wp.dateModified, `${p.path} has dateModified`);
    assert.ok(byType(data, 'BreadcrumbList'));
  }
});

test('legal pages use the documents\' own dates', () => {
  const wp = page(pageStructuredData('/privacy-policy'));
  assert.equal(wp.datePublished, '2026-06-12');
  assert.equal(wp.dateModified, '2026-07-28');
});

test('the script tag cannot be broken out of', () => {
  const tag = jsonLdTag({ x: '</script><script>alert(1)</script>' });
  assert.equal(tag.match(/<\/script>/g).length, 1);
  assert.ok(JSON.parse(tag.slice(tag.indexOf('>') + 1, tag.lastIndexOf('<'))));
});

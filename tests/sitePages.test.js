import test from 'node:test';
import assert from 'node:assert/strict';
import { SITE_PAGES, getSitePage } from '../src/data/sitePages.js';

test('every page has a unique 30-60 character title', () => {
  for (const p of SITE_PAGES) assert.ok(p.seoTitle.length >= 30 && p.seoTitle.length <= 60, `${p.path}: ${p.seoTitle.length}`);
  assert.equal(new Set(SITE_PAGES.map((p) => p.seoTitle)).size, SITE_PAGES.length);
});

test('every page has a unique 110-160 character meta description', () => {
  for (const p of SITE_PAGES) assert.ok(p.description.length >= 110 && p.description.length <= 160, `${p.path}: ${p.description.length}`);
  assert.equal(new Set(SITE_PAGES.map((p) => p.description)).size, SITE_PAGES.length);
});

test('every page opens with a definition in the form "X is/are ..."', () => {
  for (const p of SITE_PAGES) {
    const first = p.definition.split(/(?<=\.)\s/)[0];
    assert.match(first, /^(The )?Cruvo[^.]* (is|are) /, `${p.path}: ${first}`);
  }
});

test('getSitePage finds pages by path', () => {
  assert.equal(getSitePage('/support').title, 'Support');
  assert.equal(getSitePage('/nope'), undefined);
});

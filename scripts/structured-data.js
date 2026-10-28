// Builds each page's JSON-LD (schema.org) from the same data the pages are made from:
// page titles and descriptions (src/data/sitePages.js), last-modified dates (scripts/sitemap.js),
// the legal documents' own dates, and the store and social links used on the site.
import { SITE_ORIGIN, SITE_PAGES } from '../src/data/sitePages.js';
import { privacyPolicy, termsAndConditions, eula } from '../src/data/legalPolicies.js';
import { PAGES as SITEMAP_PAGES, pageLastmod } from './sitemap.js';
import { COMPANY } from '../src/data/company.js';

const APP_STORE = 'https://apps.apple.com/us/app/cruvo/id6774693070';
const GOOGLE_PLAY = 'https://play.google.com/store/apps/details?id=com.veltrex1.cruvo';
const PROFILES = ['https://x.com/cruvoracing', 'https://www.instagram.com/appcruvo/', APP_STORE, GOOGLE_PLAY];

const ORG_ID = `${SITE_ORIGIN}/#organization`;
const SITE_ID = `${SITE_ORIGIN}/#website`;
const APP_ID = `${SITE_ORIGIN}/#app`;

const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Cruvo',
  url: `${SITE_ORIGIN}/`,
  logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/logo-512.png`, width: 512, height: 512 },
  sameAs: PROFILES,
  // "Operated by Veltrex Solutions LLC" (from the legal documents).
  parentOrganization: {
    '@type': 'Organization',
    name: COMPANY.name,
    email: COMPANY.email,
    telephone: COMPANY.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.street,
      addressLocality: COMPANY.city,
      addressRegion: COMPANY.region,
      postalCode: COMPANY.postalCode,
      addressCountry: COMPANY.countryCode,
    },
  },
  contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: COMPANY.email, telephone: COMPANY.phone, url: `${SITE_ORIGIN}/contact` },
};

const website = { '@type': 'WebSite', '@id': SITE_ID, name: 'Cruvo', url: `${SITE_ORIGIN}/`, publisher: { '@id': ORG_ID }, inLanguage: 'en' };

// Legal documents carry their own dates: "Effective Date: June 12, 2026 | Last Updated: July 28, 2026".
function legalDates(policy) {
  const m = policy.content.match(/Effective Date:\s*([A-Za-z]+ \d{1,2}, \d{4})\s*\|\s*Last Updated:\s*([A-Za-z]+ \d{1,2}, \d{4})/);
  const iso = (s) => new Date(`${s} UTC`).toISOString().slice(0, 10);
  return m ? { datePublished: iso(m[1]), dateModified: iso(m[2]) } : {};
}
const LEGAL = { '/privacy-policy': privacyPolicy, '/terms': termsAndConditions, '/eula': eula };
const PAGE_TYPES = { '/about': 'AboutPage', '/support': 'ContactPage', '/contact': 'ContactPage' };

function lastModified(path) {
  const entry = SITEMAP_PAGES.find((p) => p.path === path);
  return entry ? pageLastmod(entry.sources) : null;
}

function webPage({ path, title, description }) {
  const url = `${SITE_ORIGIN}${path}`;
  const dates = LEGAL[path] ? legalDates(LEGAL[path]) : { dateModified: lastModified(path) };
  return {
    '@type': PAGE_TYPES[path] ?? 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    headline: title, // equals the page's <title>
    description,
    mainEntityOfPage: url,
    isPartOf: { '@id': SITE_ID },
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
    ...Object.fromEntries(Object.entries(dates).filter(([, v]) => v)),
  };
}

const graph = (...nodes) => ({ '@context': 'https://schema.org', '@graph': nodes });

/** JSON-LD for the home page. `title` and `description` are read from the built index.html. */
export function homeStructuredData({ title, description }) {
  const page = webPage({ path: '/', title, description });
  page.about = { '@id': APP_ID };
  const app = {
    '@type': 'MobileApplication',
    '@id': APP_ID,
    name: 'Cruvo',
    url: `${SITE_ORIGIN}/`,
    description,
    operatingSystem: 'iOS, Android',
    applicationCategory: 'TravelApplication',
    installUrl: [APP_STORE, GOOGLE_PLAY],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Basic plan: free' },
    publisher: { '@id': ORG_ID },
  };
  return graph(organization, website, page, app);
}

/** JSON-LD for one inner page, from its entry in SITE_PAGES. */
export function pageStructuredData(path) {
  const p = SITE_PAGES.find((x) => x.path === path);
  const url = `${SITE_ORIGIN}${path}`;
  const breadcrumbs = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: p.title, item: url },
    ],
  };
  return graph(organization, website, { ...webPage({ path, title: p.seoTitle, description: p.description }), breadcrumb: breadcrumbs }, breadcrumbs);
}

/** A <script> tag safe to place in HTML (no "</script>" breakouts). */
export function jsonLdTag(data) {
  const json = JSON.stringify(data, null, 0).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}

export function injectJsonLd(html, data) {
  return html.replace('</head>', `    ${jsonLdTag(data)}\n  </head>`);
}

/** Reads the built page's <title> and meta description so the home JSON-LD always matches them. */
export function readHead(html) {
  const unescape = (s) => s.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
  return {
    title: unescape(html.match(/<title>([^<]*)<\/title>/)[1]),
    description: unescape(html.match(/<meta name="description" content="([^"]*)"/)[1]),
  };
}

import { SITE_ORIGIN, SITE_PAGES } from '../src/data/sitePages.js';

const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

// Plain, visible copy of the page's content and links; React replaces it on mount.
function pageBody(page) {
  const related = SITE_PAGES.filter((p) => p.path !== page.path)
    .map((p) => `<li><a href="${p.path}">${escape(p.title)}</a> ${escape(p.blurb)}</li>`)
    .join('');
  return `
    <div id="root">
      <main style="min-height:100vh;box-sizing:border-box;padding:24px 16px;background:#f8f8f8;color:#161618;font-family:system-ui,sans-serif;line-height:1.6">
        <nav aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">${escape(page.title)}</li></ol></nav>
        <h1>${escape(page.title)}</h1>
        <p>${escape(page.blurb)}</p>
        <aside aria-label="Related"><h2>Related</h2><ul>${related}</ul></aside>
      </main>
    </div>`;
}

// Turns the built index.html into one HTML file per page, with its own title, description, canonical and links.
export function prerenderPages(indexHtml) {
  return SITE_PAGES.map((page) => {
    const title = page.seoTitle;
    if (title.length < 30 || title.length > 60) {
      throw new Error(`Title for ${page.path} is ${title.length} characters; keep it between 30 and 60.`);
    }
    if (page.description.length < 110 || page.description.length > 160) {
      throw new Error(`Meta description for ${page.path} is ${page.description.length} characters; keep it between 110 and 160.`);
    }
    const html = indexHtml
      .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
      .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escape(page.description)}$2`)
      .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${SITE_ORIGIN}${page.path}$2`)
      .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escape(title)}$2`)
      .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escape(page.description)}$2`)
      .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${SITE_ORIGIN}${page.path}$2`)
      .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${SITE_ORIGIN}/og${page.path}.png$2`)
      .replace(/(<meta property="og:image:alt" content=")[^"]*(")/, `$1${escape(`Cruvo: ${page.title}`)}$2`)
      .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escape(title)}$2`)
      .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${escape(page.description)}$2`)
      .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${SITE_ORIGIN}/og${page.path}.png$2`)
      .replace(/<div id="root">[\s\S]*?<\/div>\s*(?=<script|<\/body>)/, `${pageBody(page).trim()}\n    `);
    return { fileName: `${page.path.slice(1)}/index.html`, html };
  });
}

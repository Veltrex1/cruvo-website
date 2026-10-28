import { SITE_ORIGIN, SITE_PAGES } from '../src/data/sitePages.js';

const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

// Visually hidden copy of what React renders for the page; React replaces it on mount.
function pageBody(page) {
  const related = SITE_PAGES.filter((p) => p.path !== page.path)
    .map((p) => `<li><a href="${p.path}">${escape(p.title)}</a> ${escape(p.blurb)}</li>`)
    .join('');
  return `
    <div id="root">
      <main style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">
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
    const title = `${page.title} | Cruvo`;
    const html = indexHtml
      .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
      .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escape(page.blurb)}$2`)
      .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${SITE_ORIGIN}${page.path}$2`)
      .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escape(title)}$2`)
      .replace(/<div id="root">[\s\S]*?<\/div>\s*(?=<script|<\/body>)/, `${pageBody(page).trim()}\n    `);
    return { fileName: `${page.path.slice(1)}/index.html`, html };
  });
}

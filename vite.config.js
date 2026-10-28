import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ROUTE_META, SITE_URL } from './src/data/routeMeta.js'
import { VISIBLE_FAQ_ITEMS } from './src/data/faq.js'

const escapeAttr = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function applyRouteMeta(html, route) {
  const meta = ROUTE_META[route]
  const url = SITE_URL + (route === '/' ? '/' : route)
  const title = escapeAttr(meta.title)
  const description = escapeAttr(meta.description)
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${description}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
}

function faqJsonLd() {
  if (!VISIBLE_FAQ_ITEMS.length) return ''
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: VISIBLE_FAQ_ITEMS.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`
}

// Distinct metadata per route (audit D5.1) + FAQ structured data (audit D5.5).
// Writes dist/<route>/index.html so crawlers that do not run JavaScript still see unique titles.
function routeMetaPlugin() {
  let outDir = 'dist'
  return {
    name: 'cruvo-route-meta',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    transformIndexHtml(html) {
      return applyRouteMeta(html, '/').replace('</head>', `    ${faqJsonLd()}\n  </head>`)
    },
    closeBundle() {
      const indexPath = path.join(outDir, 'index.html')
      if (!fs.existsSync(indexPath)) return
      const base = fs.readFileSync(indexPath, 'utf8')
      for (const route of Object.keys(ROUTE_META)) {
        if (route === '/') continue
        const dir = path.join(outDir, route)
        fs.mkdirSync(dir, { recursive: true })
        fs.writeFileSync(path.join(dir, 'index.html'), applyRouteMeta(base, route))
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), routeMetaPlugin()],
})

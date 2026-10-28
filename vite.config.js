import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { buildSitemap } from './scripts/sitemap.js'
import { prerenderPages } from './scripts/prerender.js'
import { homeStructuredData, injectJsonLd, readHead } from './scripts/structured-data.js'

// Emits sitemap.xml at build time, with lastmod taken from each page's source history.
const sitemap = () => ({
  name: 'sitemap',
  generateBundle() {
    this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap() })
  },
})

// Writes /support, /privacy-policy, /terms and /eula as real HTML files so their links and content are in the served HTML.
const prerender = () => ({
  name: 'prerender',
  enforce: 'post',
  generateBundle(_, bundle) {
    const index = bundle['index.html']
    if (!index) return
    for (const { fileName, html } of prerenderPages(String(index.source))) {
      this.emitFile({ type: 'asset', fileName, source: html })
    }
    // Home page JSON-LD, built from the home page's own title and description.
    index.source = injectJsonLd(String(index.source), homeStructuredData(readHead(String(index.source))))
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sitemap(), prerender()],
})

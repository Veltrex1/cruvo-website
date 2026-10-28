import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { buildSitemap } from './scripts/sitemap.js'

// Emits sitemap.xml at build time, with lastmod taken from each page's source history.
const sitemap = () => ({
  name: 'sitemap',
  generateBundle() {
    this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap() })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sitemap()],
})

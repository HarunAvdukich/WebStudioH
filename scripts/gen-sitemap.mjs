// Generates dist/sitemap.xml from the route list + data (runs after the SSG build).
import { writeFileSync, readdirSync } from 'node:fs'
import { projects } from '../src/data.js'

const BASE = 'https://webstudioh.ba'

const postSlugs = readdirSync('src/content/posts')
  .filter((f) => f.endsWith('.md'))
  .map((f) => f.replace(/\.md$/, ''))

const staticPaths = [
  '/', '/o-nama', '/usluge', '/radovi', '/cijene',
  '/savjeti', '/kontakt', '/politika-privatnosti',
]
const dynamicPaths = [
  ...projects.map((p) => `/radovi/${p.slug}`),
  ...postSlugs.map((s) => `/savjeti/${s}`),
]

const urls = [...staticPaths, ...dynamicPaths]
const today = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url><loc>${BASE}${u}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n')}
</urlset>
`

writeFileSync('dist/sitemap.xml', xml)
console.log(`[sitemap] wrote dist/sitemap.xml (${urls.length} URLs)`)

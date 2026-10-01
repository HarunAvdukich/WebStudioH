// Generates dist/sitemap.xml from the route list + data (runs after the SSG build).
// lastmod je datum zadnjeg commita koji je mijenjao izvor te stranice, ne datum
// gradnje: Google lastmod uzima u obzir samo kad je tačan.
import { writeFileSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { projects } from '../src/data.js'

const BASE = 'https://hunar.ba'

const postSlugs = readdirSync('src/content/posts')
  .filter((f) => f.endsWith('.md'))
  .map((f) => f.replace(/\.md$/, ''))

const POCETNA = ['src/components/pocetna', 'src/pocetna.js', 'src/pages/Home.jsx']
const STARE = ['src/data.js', 'src/components', 'src/index.css']
const stara = (stranica) => [`src/pages/${stranica}.jsx`, ...STARE]

// [adresa, izvori]
const urls = [
  ['/', POCETNA],
  ['/en', ['src/components/pocetna', 'src/pocetna.en.js', 'src/pages/HomeEn.jsx']],
  ['/o-nama', stara('AboutPage')],
  ['/usluge', stara('ServicesPage')],
  ['/radovi', stara('WorkPage')],
  ['/cijene', stara('PricingPage')],
  ['/savjeti', [...stara('BlogPage'), 'src/content/posts']],
  ['/kontakt', stara('ContactPage')],
  ['/politika-privatnosti', stara('PrivacyPage')],
  ...projects.map((p) => [`/radovi/${p.slug}`, stara('CaseStudyPage')]),
  ...postSlugs.map((s) => [`/savjeti/${s}`, [`src/content/posts/${s}.md`, ...stara('BlogPostPage')]]),
]

// Datum zadnjeg commita za izvore; bez gita (ili za fajl van gita) nema lastmod.
function lastmod(izvori) {
  try {
    return execFileSync('git', ['log', '-1', '--format=%cs', '--', ...izvori], { encoding: 'utf8' }).trim()
  } catch {
    return ''
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(([u, izvori]) => {
    const datum = lastmod(izvori)
    return `  <url><loc>${BASE}${u}</loc>${datum ? `<lastmod>${datum}</lastmod>` : ''}</url>`
  })
  .join('\n')}
</urlset>
`

writeFileSync('dist/sitemap.xml', xml)
console.log(`[sitemap] wrote dist/sitemap.xml (${urls.length} URLs)`)

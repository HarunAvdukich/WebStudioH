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
// Stranice u novom izgledu: stranica, njen tekst (bs ili en) i njeni dijelovi. Zajednički kod
// (zaglavlje, podnožje, src/lib, statistika) se ne broji: izmjena u njemu ne mijenja sadržaj
// stranice, a pomjerila bi datum svim stranicama odjednom, pa bi Google prestao vjerovati lastmod.
const nova = (stranica, tekst, dijelovi = []) => [`src/pages/${stranica}.jsx`, `src/stranice/${tekst}.js`, ...dijelovi]

// [adresa, izvori]
const urls = [
  ['/', POCETNA],
  ['/en', ['src/components/pocetna', 'src/pocetna.en.js', 'src/pages/HomeEn.jsx']],
  ['/o-nama', nova('ONama', 'o-hunaru', ['src/components/onama'])],
  ['/en/about', nova('ONama', 'o-hunaru.en', ['src/components/onama'])],
  ['/usluge', nova('Usluge', 'usluge', ['src/components/usluge', 'src/components/igre'])],
  ['/en/services', nova('Usluge', 'usluge.en', ['src/components/usluge', 'src/components/igre'])],
  ['/radovi', nova('Radovi', 'radovi', ['src/components/radovi'])],
  ['/en/work', nova('Radovi', 'radovi.en', ['src/components/radovi'])],
  ['/cijene', nova('Cijene', 'cijene', ['src/components/cijene'])],
  ['/en/pricing', nova('Cijene', 'cijene.en', ['src/components/cijene'])],
  ['/savjeti', ['src/pages/Savjeti.jsx', 'src/stranice/savjeti.js', 'src/components/savjeti', 'src/content/posts']],
  ['/kontakt', nova('Kontakt', 'kontakt', ['src/components/kontakt'])],
  ['/en/contact', nova('Kontakt', 'kontakt.en', ['src/components/kontakt'])],
  ['/politika-privatnosti', nova('Privatnost', 'privatnost', ['src/components/savjeti'])],
  ['/en/privacy', nova('Privatnost', 'privatnost.en', ['src/components/savjeti'])],
  ...projects.map((p) => [
    `/radovi/${p.slug}`,
    [`src/content/radovi/${p.slug}.md`, 'src/radovi.js', ...nova('Studija', 'radovi', ['src/components/radovi'])],
  ]),
  ...projects.map((p) => [
    `/en/work/${p.slug}`,
    [`src/content/radovi/${p.slug}.en.md`, 'src/radovi.js', ...nova('Studija', 'radovi.en', ['src/components/radovi'])],
  ]),
  ...postSlugs.map((s) => [`/savjeti/${s}`, [`src/content/posts/${s}.md`, 'src/pages/Clanak.jsx', 'src/posts.js', 'src/stranice/savjeti.js']]),
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

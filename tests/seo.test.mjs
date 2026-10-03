// SEO provjere nad izgrađenim sajtom. Pokreni poslije `npm run build`.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const DIST = 'dist'
const BASE = 'https://hunar.ba'

function htmlFiles(dir = DIST) {
  const out = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) {
      if (p !== join(DIST, 'admin')) out.push(...htmlFiles(p))
    } else if (name.endsWith('.html')) out.push(p)
  }
  return out
}

// dist/radovi/mrt.html -> /radovi/mrt, dist/index.html -> /
function adresa(file) {
  const r = '/' + relative(DIST, file).split(sep).join('/').replace(/\.html$/, '')
  return r === '/index' ? '/' : r
}

const pages = existsSync(DIST)
  ? htmlFiles().map((file) => ({ file, path: adresa(file), html: readFileSync(file, 'utf8') }))
  : []
const indeksirane = pages.filter((p) => p.path !== '/404')
const meta = (html, re) => (html.match(re) || [])[1]
const jsonLd = (html) =>
  [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]))

test('404.html postoji, ne indeksira se i nema canonical', () => {
  const p = pages.find((x) => x.path === '/404')
  assert.ok(p, 'dist/404.html nije izgrađen')
  assert.match(p.html, /<meta[^>]*name="robots"[^>]*content="noindex"/)
  assert.doesNotMatch(p.html, /rel="canonical"/)
})

test('netlify ne vraća početnu za nepostojeće adrese', () => {
  const toml = readFileSync('netlify.toml', 'utf8')
  assert.doesNotMatch(toml, /to\s*=\s*"\/index\.html"/)
  assert.match(toml, /from = "https:\/\/webstudioh\.netlify\.app\/\*"/)
})

for (const p of indeksirane) {
  test(`${p.path}: naslov, opis, canonical, jedan h1`, () => {
    const naslovi = [...p.html.matchAll(/<title[^>]*>([^<]*)<\/title>/g)].map((m) => m[1])
    assert.equal(naslovi.length, 1)
    assert.ok(naslovi[0].length >= 20 && naslovi[0].length <= 60, `naslov ${naslovi[0].length} znakova: ${naslovi[0]}`)
    const opis = meta(p.html, /<meta[^>]*name="description"[^>]*content="([^"]*)"/)
    assert.ok(opis && opis.length >= 50 && opis.length <= 160, `opis ${opis?.length} znakova`)
    assert.equal(meta(p.html, /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/), BASE + p.path)
    assert.doesNotMatch(p.html, /name="robots"[^>]*noindex/)
    assert.equal((p.html.match(/<h1[\s>]/g) || []).length, 1)
  })
}

test('naslovi stranica se ne ponavljaju', () => {
  const vidjeni = new Map()
  for (const p of indeksirane) {
    const t = meta(p.html, /<title[^>]*>([^<]*)<\/title>/)
    assert.ok(!vidjeni.has(t), `${p.path} i ${vidjeni.get(t)} imaju isti naslov`)
    vidjeni.set(t, p.path)
  }
})

test('JSON-LD je ispravan; firma na svakoj stranici, sajt na početnoj', () => {
  for (const p of pages) {
    const tipovi = jsonLd(p.html).map((d) => d['@type'])
    assert.ok(tipovi.includes('Organization'), `${p.path} nema Organization`)
  }
  const pocetna = jsonLd(pages.find((p) => p.path === '/').html)
  const sajt = pocetna.find((d) => d['@type'] === 'WebSite')
  assert.equal(sajt?.name, 'Hunar')
  assert.match(pocetna.find((d) => d['@type'] === 'Organization').telephone, /^\+387 /)
})

test('članci imaju BlogPosting, a studije i članci mrvice puta', () => {
  for (const p of pages.filter((x) => /^\/(savjeti|radovi)\/./.test(x.path))) {
    const tipovi = jsonLd(p.html).map((d) => d['@type'])
    assert.ok(tipovi.includes('BreadcrumbList'), `${p.path} nema BreadcrumbList`)
    if (p.path.startsWith('/savjeti/')) assert.ok(tipovi.includes('BlogPosting'), `${p.path} nema BlogPosting`)
  }
})

test('sitemap ima tačno sve stranice koje se indeksiraju', () => {
  const xml = readFileSync(join(DIST, 'sitemap.xml'), 'utf8')
  const uSitemapu = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).sort()
  assert.deepEqual(uSitemapu, indeksirane.map((p) => BASE + p.path).sort())
})

test('robots.txt pušta sve i pokazuje sitemap', () => {
  const robots = readFileSync(join(DIST, 'robots.txt'), 'utf8')
  assert.doesNotMatch(robots, /Disallow:\s*\/\s*$/m)
  assert.match(robots, /Sitemap: https:\/\/hunar\.ba\/sitemap\.xml/)
})

// Studije slučaja su glavni dokaz i glavni sadržaj za pretragu: duga priča, slike sa alt
// tekstom i dimenzijama (bez skakanja rasporeda), linkovi na usluge i kontakt.
const tekstTijela = (html) =>
  (html.split('<main>')[1] || '')
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length

for (const slug of ['mrt', 'smarttime']) {
  test(`/radovi/${slug}: duga priča, slike i linkovi`, () => {
    const p = pages.find((x) => x.path === `/radovi/${slug}`)
    assert.ok(p, `nema /radovi/${slug}`)
    const rijeci = tekstTijela(p.html)
    assert.ok(rijeci >= 800, `samo ${rijeci} riječi`)
    assert.match(p.html, /<h2[\s>]/)
    for (const [img] of p.html.matchAll(/<img\b[^>]*src="\/radovi\/[^"]+"[^>]*>/g)) {
      assert.match(img, /alt="[^"]{20,}"/, img)
      assert.match(img, /width="\d+"/, img)
      assert.match(img, /height="\d+"/, img)
      const src = img.match(/src="([^"]+)"/)[1]
      assert.ok(existsSync(join(DIST, src)), `${src} ne postoji`)
    }
    assert.match(p.html, /href="\/kontakt"/)
    assert.match(p.html, /href="\/usluge"/)
  })
}

// GEO: llms.txt je kratak vodič za AI asistente; svaki link mora voditi na stranicu koja postoji.
test('llms.txt postoji i vodi samo na stranice koje postoje', () => {
  const txt = readFileSync(join(DIST, 'llms.txt'), 'utf8')
  assert.match(txt, /^# Hunar/)
  const adrese = [...txt.matchAll(/https:\/\/hunar\.ba(\/[^\s)]*)/g)].map((m) => m[1].replace(/\/$/, '') || '/')
  assert.ok(adrese.length >= 8)
  const postoje = new Set(pages.map((p) => p.path))
  assert.deepEqual(adrese.filter((a) => !postoje.has(a)), [])
})

test('članci su sadržajni i vode na kontakt', () => {
  for (const p of pages.filter((x) => x.path.startsWith('/savjeti/'))) {
    const tekst = (p.html.split('<article')[1] || '').replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ')
    const rijeci = tekst.split(/\s+/).filter(Boolean).length
    assert.ok(rijeci >= 450, `${p.path}: samo ${rijeci} riječi`)
    assert.match(p.html, /href="\/kontakt"/, p.path)
  }
})

test('firma u JSON-LD vodi na Google profil, a Kontakt na recenziju', () => {
  const org = jsonLd(pages.find((p) => p.path === '/').html).find((d) => d['@type'] === 'Organization')
  assert.ok(org.sameAs.some((u) => /^https:\/\/www\.google\.com\/maps\?cid=\d+$/.test(u)), 'nema Google profila u sameAs')
  for (const path of ['/kontakt', '/en/contact']) {
    assert.match(pages.find((p) => p.path === path).html, /href="https:\/\/g\.page\/r\/[\w-]+\/review"/, path)
  }
})

test('firma ima usluge i oblasti u JSON-LD', () => {
  const org = jsonLd(pages.find((p) => p.path === '/').html).find((d) => d['@type'] === 'Organization')
  assert.ok(org.knowsAbout.length >= 5)
  const usluge = org.hasOfferCatalog.itemListElement.map((o) => o.itemOffered.url.replace('https://hunar.ba', ''))
  const postoje = new Set(pages.map((p) => p.path))
  assert.deepEqual(usluge.filter((u) => !postoje.has(u)), [])
})

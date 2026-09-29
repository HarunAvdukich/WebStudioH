// Provjere nad izgrađenim sajtom. Pokreni poslije `npm run build`.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist'

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

const pages = existsSync(DIST)
  ? htmlFiles().map((file) => {
      const html = readFileSync(file, 'utf8')
      // Tekst bez oznaka, da "40<span>+</span>" bude uhvaćen kao "40+".
      const text = html.replace(/<[^>]+>/g, '')
      return { file, html, text }
    })
  : []

test('dist postoji', () => {
  assert.ok(pages.length > 0, 'prvo pokreni npm run build')
})

const FORBIDDEN = [
  ['40+', 'izmišljena brojka iz predloška'],
  ['Prosj. PageSpeed', 'izmišljena brojka iz predloška'],
  ['cal.com', 'zakazivanje poziva nije podešeno'],
  ['Zakaži poziv', 'dugme bez podešenog zakazivanja'],
  ['href="#"', 'mrtav link'],
  ['MotoHub', 'trgovina još nije objavljena'],
  ['Rahmedin', 'nepotvrđena recenzija'],
  ['Mirza B.', 'nepotvrđena recenzija'],
  ['Eldar Z.', 'nepotvrđena recenzija'],
  ['—', 'duga crta'],
  ['–', 'srednja crta'],
  ['plausible', 'analitika bez naloga'],
  ['Ljeto 2026', 'zastarjela značka'],
  ['$129', 'cijena u dolarima'],
  ['+142%', 'izmišljena brojka iz predloška'],
  ['Online za 4 sedmice', 'izmišljena tvrdnja iz predloška'],
]

for (const [needle, why] of FORBIDDEN) {
  test(`nigdje "${needle}" (${why})`, () => {
    const hits = pages.filter((p) => p.html.includes(needle) || p.text.includes(needle))
    assert.deepEqual(hits.map((p) => p.file), [])
  })
}

test('svi unutrašnji linkovi vode na postojeći fajl', () => {
  const broken = []
  for (const { file, html } of pages) {
    for (const [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
      if (href.startsWith('//')) continue
      const clean = href.replace(/\/$/, '') || '/index'
      const candidates = [join(DIST, clean), join(DIST, `${clean}.html`), join(DIST, clean, 'index.html')]
      if (!candidates.some((c) => existsSync(c) && statSync(c).isFile())) broken.push(`${file}: ${href}`)
    }
  }
  assert.deepEqual(broken, [])
})

test('svaka og:image slika postoji', () => {
  const missing = []
  for (const { file, html } of pages) {
    for (const [, url] of html.matchAll(/<meta[^>]*property="og:image"[^>]*content="https:\/\/hunar\.ba(\/[^"]+)"/g)) {
      if (!existsSync(join(DIST, url))) missing.push(`${file}: ${url}`)
    }
  }
  assert.deepEqual(missing, [])
})

test('slika glavnog rada postoji', () => {
  assert.ok(existsSync(join(DIST, 'project-mrt.webp')))
})

test('nigdje cijena u dolarima', () => {
  assert.deepEqual(pages.filter((p) => /\$\s?\d/.test(p.text)).map((p) => p.file), [])
})

test('početna: novi naslov, WhatsApp dugme i ravni znak kao rezerva', () => {
  const html = readFileSync(join(DIST, 'index.html'), 'utf8')
  assert.match(html.replace(/<[^>]+>/g, ''), /Web stranice, trgovine i sistemi koji rade za vaš posao\./)
  assert.match(html, /href="https:\/\/wa\.me\/387603000751\?text=[^"]+"[^>]*>Pošalji upit/)
  assert.match(html, /class="hero-znak__ravni"/)
})

test('početna: četiri brojke sa izvorom i četiri grupe usluga', () => {
  const html = readFileSync(join(DIST, 'index.html'), 'utf8')
  assert.equal((html.match(/class="brojka__izvor"/g) || []).length, 4)
  for (const n of ['Stranice i trgovine', 'Sistemi i aplikacije', 'Integracije i AI', 'Održavanje i rast'])
    assert.ok(html.includes(n), n)
})

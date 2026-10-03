// Zajednički okvir: tekst, a poslije gradnje i markup u dist (dodaje se u kasnijim zadacima).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import * as okvir from '../src/okvir.js'

function strings(value, out = []) {
  if (typeof value === 'string') out.push(value)
  else if (Array.isArray(value)) value.forEach((v) => strings(v, out))
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => strings(v, out))
  return out
}
const tekst = strings(Object.fromEntries(Object.entries(okvir)))

test('tekst okvira nema dugu ni srednju crtu', () => {
  assert.deepEqual(tekst.filter((s) => /[—–]/.test(s)), [])
})

test('meni vodi samo na unutrašnje stranice', () => {
  assert.ok(okvir.meni.length >= 6)
  for (const m of okvir.meni) assert.match(m.put, /^\/[a-z-]+$/)
})

test('WhatsApp ima unaprijed upisanu poruku', () => {
  assert.match(okvir.whatsappLink, /^https:\/\/wa\.me\/387603000751\?text=/)
})

test('404 tekst je sa platna', () => {
  assert.equal(okvir.nePostoji.naslov, 'Ova stranica ne postoji.')
  assert.equal(okvir.nePostoji.podnaslov, 'Ali vaša može.')
})

test('naslov kartice postoji na oba jezika', () => {
  assert.ok(okvir.naslovKartice.bs.includes('Hunar'))
  assert.ok(okvir.naslovKartice.en.includes('Hunar'))
})

test('index.html vraća običnu stranicu ako se pokreti ne jave', () => {
  const html = readFileSync('index.html', 'utf8')
  assert.match(html, /dataset\.pokreti/)
  assert.match(html, /dataset\.kz/)
})

// ---------- poslije gradnje (npm run build) ----------
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
const stranice = existsSync(DIST)
  ? htmlFiles().map((file) => ({ put: relative(DIST, file).split(sep).join('/'), html: readFileSync(file, 'utf8') }))
  : []
const ostale = stranice.filter((s) => s.put !== 'index.html' && s.put !== 'en.html')

test('dist postoji za provjere okvira', () => {
  assert.ok(ostale.length > 5, 'prvo pokreni npm run build')
})

test('ostale stranice imaju novo zaglavlje sa menijem, a ne staro', () => {
  for (const s of ostale) {
    assert.match(s.html, /class="ok-zaglavlje/, s.put)
    assert.match(s.html, s.put.startsWith('en/') ? /href="\/en\/services"/ : /href="\/usluge"/, s.put)
    assert.doesNotMatch(s.html, /class="nav[ "]/, s.put)
  }
})

test('početna ima zaglavlje priče (računar) i zajednički okvir za tok (telefon)', () => {
  const pocetne = stranice.filter((x) => x.put === 'index.html' || x.put === 'en.html')
  assert.equal(pocetne.length, 2)
  for (const s of pocetne) {
    assert.match(s.html, /class="kz-zaglavlje/, s.put)
    assert.match(s.html, /class="page page--pocetna"/, s.put)
    assert.match(s.html, /class="ok-zaglavlje/, s.put)
    assert.match(s.html, /class="ok-podnozje/, s.put)
    assert.match(s.html, /class="ok-traka/, s.put)
    assert.doesNotMatch(s.html, /class="kz-podnozje/, s.put)
    // jedan naslov h1 na stranici
    assert.equal((s.html.match(/<h1[\s>]/g) || []).length, 1, s.put)
  }
})

test('ostale stranice imaju novo podnožje, bez starog podnožja i WhatsApp balona', () => {
  for (const s of ostale) {
    assert.match(s.html, /class="ok-podnozje/, s.put)
    assert.match(s.html, s.put.startsWith('en/') ? /href="\/en\/privacy"/ : /href="\/politika-privatnosti"/, s.put)
    assert.match(s.html, /href="tel:\+387603000751"/, s.put)
    assert.doesNotMatch(s.html, /class="footer[ "]/, s.put)
    assert.doesNotMatch(s.html, /wa-fab/, s.put)
  }
})

test('svaka stranica ima zavjesu za prelaz', () => {
  for (const s of stranice) assert.match(s.html, /class="ok-zavjesa"/, s.put)
})

test('ostale stranice imaju traku za telefon i dugme za vrh', () => {
  for (const s of ostale) {
    assert.match(s.html, /class="ok-traka/, s.put)
    assert.match(s.html, /class="ok-vrh/, s.put)
  }
})

test('404: tekst sa platna, put nazad i WhatsApp', () => {
  const s = stranice.find((x) => x.put === '404.html')
  assert.ok(s, 'nema dist/404.html')
  assert.match(s.html, /Ova stranica ne postoji\./)
  assert.match(s.html, /Ali vaša može\./)
  assert.match(s.html, /data-pokret="slozi"/)
  assert.match(s.html, /href="\/"/)
  assert.match(s.html, /wa\.me\/387603000751/)
})

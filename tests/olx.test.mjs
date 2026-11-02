// Stranica /olx: tekst po pravilima sajta i snimak koji ne kreće pri učitavanju.
// Dio testova čita dist, pa ide poslije `npm run build`.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import * as t from '../src/stranice/olx.js'

function strings(v, out = []) {
  if (typeof v === 'string') out.push(v)
  else if (Array.isArray(v)) v.forEach((x) => strings(x, out))
  else if (v && typeof v === 'object') Object.values(v).forEach((x) => strings(x, out))
  return out
}
const tekst = strings(t)

test('olx: bez dugih crta', () => {
  assert.deepEqual(tekst.filter((s) => /[—–]/.test(s)), [])
})

test('olx: glas studija, ne prvo lice jednine', () => {
  const ja = /\b(pravim|[Pp]išite mi|odgovaram|javljam|krećem|pitam|predložim|formiram|bih|kažem)\b/
  assert.deepEqual(tekst.filter((s) => ja.test(s)), [])
})

test('olx: svaka velika brojka u tekstu ima datum, i svaka brojka u brojkama', () => {
  for (const s of tekst.filter((x) => /\d[.,]\d{3}\b/.test(x))) assert.match(s, /2026/, s)
  for (const b of t.dobijate.brojke) assert.match(b.datum, /2026/, b.opis)
})

test('olx: bez cijena u KM osim cijene artikla sa snimka', () => {
  const km = tekst.filter((s) => /\bKM\b/.test(s))
  assert.deepEqual(km, [t.snimak.uvod])
})

test('olx: meta naslov i opis u granicama', () => {
  assert.ok(t.seo.naslov.length >= 20 && t.seo.naslov.length <= 60, `naslov ${t.seo.naslov.length}`)
  assert.ok(t.seo.opis.length >= 50 && t.seo.opis.length <= 160, `opis ${t.seo.opis.length}`)
})

test('olx: snimak i slika postoje u public', () => {
  assert.ok(existsSync(`public${t.snimak.video}`), t.snimak.video)
  assert.ok(existsSync(`public${t.snimak.slika.src}`), t.snimak.slika.src)
})

test('olx (dist): video ne kreće pri učitavanju, slika je lijena, stranica je u sitemapu', () => {
  const html = readFileSync('dist/olx.html', 'utf8')
  assert.doesNotMatch(html, /<video\b/, 'video se smije pojaviti tek na klik')
  const img = html.match(/<img\b[^>]*src="\/olx\/mrt-olx\.webp"[^>]*>/)
  assert.ok(img, 'nema slike snimka')
  assert.match(img[0], /loading="lazy"/)
  assert.match(img[0], /width="720"/)
  assert.match(html, /href="\/olx\/mrt-olx\.mp4"/, 'bez JavaScripta link vodi na snimak')
  assert.match(html, /<link[^>]*rel="canonical"[^>]*href="https:\/\/hunar\.ba\/olx"/)
  assert.match(readFileSync('dist/sitemap.xml', 'utf8'), /<loc>https:\/\/hunar\.ba\/olx<\/loc>/)
})

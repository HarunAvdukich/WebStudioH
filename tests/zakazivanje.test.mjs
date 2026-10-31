// Stranica /zakazivanje i demo /demo-berbernica: tekst po pravilima sajta, linkovi na demo bez
// zavjese (demo je statičan fajl) i stranica u sitemapu. Dio testova čita dist, pa ide poslije `npm run build`.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import * as t from '../src/stranice/zakazivanje.js'

function strings(v, out = []) {
  if (typeof v === 'string') out.push(v)
  else if (Array.isArray(v)) v.forEach((x) => strings(x, out))
  else if (v && typeof v === 'object') Object.values(v).forEach((x) => strings(x, out))
  return out
}
const tekst = strings(t)
const demo = readFileSync('public/demo-berbernica.html', 'utf8')

test('zakazivanje: bez dugih crta, ni na stranici ni u demu', () => {
  assert.deepEqual(tekst.filter((s) => /[—–]/.test(s)), [])
  assert.doesNotMatch(demo, /[—–]/)
})

test('zakazivanje: glas studija, ne prvo lice jednine', () => {
  const ja = /\b(pravim|[Pp]išite mi|odgovaram|javljam|krećem|pitam|predložim|formiram|bih|kažem|pošaljem)\b/
  assert.deepEqual(tekst.filter((s) => ja.test(s)), [])
})

test('zakazivanje: bez cijena u KM i bez PDV-a', () => {
  assert.deepEqual(tekst.filter((s) => /\bKM\b|PDV/.test(s)), [])
})

test('zakazivanje: meta naslov i opis u granicama', () => {
  assert.ok(t.seo.naslov.length >= 20 && t.seo.naslov.length <= 60, `naslov ${t.seo.naslov.length}`)
  assert.ok(t.seo.opis.length >= 50 && t.seo.opis.length <= 160, `opis ${t.seo.opis.length}`)
})

test('zakazivanje: demo postoji i otvara raspored na #raspored', () => {
  assert.ok(existsSync(`public${t.demo}.html`))
  assert.match(demo, /location\.hash === '#raspored'/)
})

test('zakazivanje (dist): linkovi na demo idu bez zavjese, stranica je u sitemapu', () => {
  const html = readFileSync('dist/zakazivanje.html', 'utf8')
  const linkovi = [...html.matchAll(/<a\b[^>]*href="\/demo-berbernica[^"]*"[^>]*>/g)].map((m) => m[0])
  assert.ok(linkovi.length >= 4, `samo ${linkovi.length} linkova na demo`)
  for (const a of linkovi) assert.match(a, /data-bez-zavjese/, a)
  assert.match(html, /<link[^>]*rel="canonical"[^>]*href="https:\/\/hunar\.ba\/zakazivanje"/)
  assert.match(readFileSync('dist/sitemap.xml', 'utf8'), /<loc>https:\/\/hunar\.ba\/zakazivanje<\/loc>/)
})

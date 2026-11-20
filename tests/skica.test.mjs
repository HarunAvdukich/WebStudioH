// Stranica /skica: besplatna skica (osnovna odmah iz šablona + forma za skicu po mjeri).
// Dio testova čita dist, pa ide poslije `npm run build`.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import * as t from '../src/stranice/skica.js'

function strings(v, out = []) {
  if (typeof v === 'string') out.push(v)
  else if (Array.isArray(v)) v.forEach((x) => strings(x, out))
  else if (v && typeof v === 'object') Object.values(v).forEach((x) => strings(x, out))
  return out
}
const tekst = strings(t)

test('skica: bez dugih crta', () => {
  assert.deepEqual(tekst.filter((s) => /[—–]/.test(s)), [])
})

test('skica: glas studija, ne prvo lice jednine', () => {
  const ja = /\b(pravim|[Pp]išite mi|odgovaram|javljam|krećem|pitam|predložim|formiram|bih|kažem|napravio sam)\b/
  assert.deepEqual(tekst.filter((s) => ja.test(s)), [])
})

test('skica: bez cijena', () => {
  assert.deepEqual(tekst.filter((s) => /\bKM\b|€|\d+\s?(maraka|eura)/.test(s)), [])
})

test('skica: meta naslov i opis u granicama', () => {
  assert.ok(t.seo.naslov.length >= 20 && t.seo.naslov.length <= 60, `naslov ${t.seo.naslov.length}`)
  assert.ok(t.seo.opis.length >= 50 && t.seo.opis.length <= 160, `opis ${t.seo.opis.length}`)
})

test('skica: šablon postoji i zna sve ponuđene vrste', () => {
  assert.ok(existsSync(`public${t.sablon}`), t.sablon)
  const sablon = readFileSync(`public${t.sablon}`, 'utf8')
  for (const v of t.odmah.vrste) assert.match(sablon, new RegExp(`data-vrsta="${v.v}"|\\b${v.v}\\b`), v.v)
})

test('skica (dist): forma za Netlify, okvir ne kreće pri učitavanju, sitemap i dugmad', () => {
  const html = readFileSync('dist/skica.html', 'utf8')
  assert.match(html, /<form[^>]*name="skica"[^>]*data-netlify="true"/, 'Netlify mora vidjeti formu "skica"')
  assert.match(html, /name="form-name" value="skica"/)
  assert.doesNotMatch(html, /<iframe\b/, 'skica se učita tek na klik')
  assert.match(html, /<form[^>]*action="\/demoskica\.html"[^>]*method="get"/, 'bez JavaScripta forma otvori šablon')
  assert.match(html, /<link[^>]*rel="canonical"[^>]*href="https:\/\/hunar\.ba\/skica"/)
  assert.match(readFileSync('dist/sitemap.xml', 'utf8'), /<loc>https:\/\/hunar\.ba\/skica<\/loc>/)
  assert.match(readFileSync('dist/index.html', 'utf8'), /href="\/skica"/, 'početna vodi na /skica')
})

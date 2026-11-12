// Skice sajtova za firme iz hladnih mailova (public/demoskica.html, scripts/demoskica.mjs).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { VRSTE, MAPA, slugOd, mail, link } from '../scripts/demoskica.mjs'

const html = readFileSync('public/demoskica.html', 'utf8')
const CRTE = /[–—]/

test('šablon se ne indeksira, broji posjete i nema dugih crta', () => {
  assert.match(html, /<meta name="robots" content="noindex">/)
  assert.match(html, /cloud\.umami\.is\/script\.js/)
  assert.doesNotMatch(html, CRTE)
  for (const v of VRSTE) assert.ok(html.includes(`    ${v}: {`), `vrsta ${v} nema predložak`)
})

test('šablon ne ubacuje podatke firme kao HTML', () => {
  assert.doesNotMatch(html, /innerHTML|insertAdjacentHTML|document\.write/)
})

test('/demoskica/<slug> vodi na šablon', () => {
  const toml = readFileSync('netlify.toml', 'utf8')
  assert.match(toml, /from = "\/demoskica\/\*"\s+to = "\/demoskica\.html"\s+status = 200/)
})

test('podaci svake skice su ispravni', () => {
  const fajlovi = readdirSync(MAPA).filter((f) => f.endsWith('.json'))
  assert.ok(fajlovi.length > 0)
  for (const f of fajlovi) {
    assert.match(f, /^[a-z0-9-]+\.json$/, f)
    const tekst = readFileSync(join(MAPA, f), 'utf8')
    assert.doesNotMatch(tekst, CRTE, f)
    const d = JSON.parse(tekst)
    assert.equal(typeof d.ime, 'string', f)
    assert.ok(VRSTE.includes(d.vrsta), `${f}: vrsta ${d.vrsta}`)
    if (d.boja) assert.match(d.boja, /^#[0-9a-f]{6}$/i, f)
  }
})

test('slug je čitljiv i bez naših slova', () => {
  assert.equal(slugOd('Frizerski salon Đurđa & Šejla'), 'frizerski-salon-djurdja-sejla')
  assert.equal(slugOd('  Ćevabdžinica Željo 2 '), 'cevabdzinica-zeljo-2')
})

test('mail ima link, završava pitanjem i ne traži poziv', () => {
  for (const vrsta of VRSTE) {
    const m = mail({ ime: 'Firma', vrsta }, 'firma', 'Zapažanje o firmi.')
    assert.match(m.predmet, /Firma/)
    assert.ok(m.tijelo.includes(link('firma')))
    assert.ok(m.tijelo.includes('Zapažanje o firmi.'))
    assert.doesNotMatch(m.tijelo, CRTE)
    assert.doesNotMatch(m.tijelo, /15 minuta|poziv|nazov/i)
    const pitanje = m.tijelo.split('\n\n').at(-2)
    assert.match(pitanje, /\?$/, vrsta)
  }
  assert.match(mail({ ime: 'F', vrsta: 'frizer' }, 'f', '', 'Drugo pitanje?').tijelo, /Drugo pitanje\?/)
})

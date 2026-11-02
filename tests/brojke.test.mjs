// P1: brojke sa trgovina se osvježe pri gradnji; ovdje se provjerava račun i da svaka ima datum i izvor.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import podaci from '../src/brojke-podaci.js'
import { brojka, datum, oblik, katalogMrt, oglasiMrt, satoviSmarttime } from '../src/brojke.js'
import { prihvatljiva, danas, ispisi } from '../scripts/brojke.mjs'

test('svaka brojka ima vrijednost, datum provjere i javni izvor', () => {
  for (const [k, v] of Object.entries(podaci)) {
    assert.ok(Number.isInteger(v.vrijednost) && v.vrijednost > 0, k)
    assert.match(v.datum, /^\d{4}-\d{2}-\d{2}$/, k)
    assert.match(v.izvor, /^https:\/\/(mrt\.ba|smarttime\.ba|olx\.ba)\//, k)
  }
})

test('datum na oba jezika', () => {
  assert.equal(datum('2026-10-03'), '3. 10. 2026')
  assert.equal(datum('2026-09-29', 'en'), '29 Sep 2026')
})

test('oblik riječi uz broj', () => {
  const r = ['artikal', 'artikla', 'artikala']
  assert.equal(oblik(1, r), 'artikal')
  assert.equal(oblik(21, r), 'artikal')
  assert.equal(oblik(3, r), 'artikla')
  assert.equal(oblik(262, ['kategoriji', 'kategorije', 'kategorija']), 'kategorije')
  assert.equal(oblik(12, r), 'artikala')
  assert.equal(oblik(7447, r), 'artikala')
  assert.equal(oblik(7443, r), 'artikla')
  assert.equal(oblik(3065, ['oglas', 'oglasa', 'oglasa']), 'oglasa')
  assert.equal(oblik(520, ['ručni sat', 'ručna sata', 'ručnih satova']), 'ručnih satova')
})

test('broj se piše prema jeziku', () => {
  const b = brojka('mrtArtikli')
  assert.equal(b.broj, b.vrijednost.toLocaleString('de-DE'))
  assert.equal(brojka('mrtArtikli', 'en').broj, b.vrijednost.toLocaleString('en-US'))
  assert.ok(katalogMrt('bs').imenica.includes(' u '))
  assert.equal(oglasiMrt('en').imenica, 'OLX listings')
  assert.equal(satoviSmarttime('en').satovi, 'wristwatches')
})

test('skripta ne prima brojku koja previše odstupa', () => {
  assert.ok(prihvatljiva(3065, 4453))
  assert.ok(!prihvatljiva(1000, 4453))
  assert.ok(!prihvatljiva(10000, 4453))
  assert.ok(!prihvatljiva(0, 10))
  assert.ok(!prihvatljiva(undefined, 10))
  assert.ok(!prihvatljiva(12.5, 10))
})

test('datum provjere je po sarajevskom vremenu', () => {
  assert.equal(danas(new Date('2026-10-02T23:30:00Z')), '2026-10-03')
})

test('skripta upisuje isti oblik fajla', async () => {
  const tekst = ispisi(podaci)
  assert.match(tekst, /^\/\/ Upisuje scripts\/brojke\.mjs/)
  for (const k of Object.keys(podaci)) assert.ok(tekst.includes(`  ${k}: { vrijednost: ${podaci[k].vrijednost}, datum: '${podaci[k].datum}'`), k)
})

// Račun malih animacija: bez DOM-a, provjerava se u Nodeu.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cl, lerp, eo, mijesaj, smjerZaglavlja, vidljivaTraka, procitano, vidljivVrh, magnet } from '../src/lib/pokreti/racun.js'

test('cl drži broj u granicama', () => {
  assert.equal(cl(-1), 0)
  assert.equal(cl(2), 1)
  assert.equal(cl(0.4), 0.4)
  assert.equal(cl(5, 0, 10), 5)
})

test('lerp i eo', () => {
  assert.equal(lerp(10, 20, 0.5), 15)
  assert.equal(eo(0), 0)
  assert.equal(eo(1), 1)
  assert.ok(eo(0.5) > 0.5)
})

test('mijesaj: na kraju je tekst složen, razmaci i tačka ostaju', () => {
  const t = 'Ali vaša može.'
  assert.equal(mijesaj(t, 1), t)
  const pola = mijesaj(t, 0.5, () => 0)
  assert.equal(pola.length, t.length)
  assert.equal(pola.slice(0, 7), t.slice(0, 7))
  assert.equal(pola[3], ' ')
  assert.ok(pola.endsWith('.'))
  assert.notEqual(pola, t)
})

test('zaglavlje: na vrhu se vidi, dolje se skloni, gore se vrati', () => {
  assert.equal(smjerZaglavlja(0, 40), 'vidi')
  assert.equal(smjerZaglavlja(300, 340), 'skrij')
  assert.equal(smjerZaglavlja(340, 300), 'vidi')
  assert.equal(smjerZaglavlja(300, 303), null)
})

test('traka na telefonu: poslije prvog ekrana, ne pri dnu, ne dok se skrola dolje', () => {
  const o = { ekran: 800, visina: 5000 }
  assert.equal(vidljivaTraka({ ...o, y: 100, smjer: 'vidi' }), false)
  assert.equal(vidljivaTraka({ ...o, y: 1200, smjer: 'vidi' }), true)
  assert.equal(vidljivaTraka({ ...o, y: 1200, smjer: 'skrij' }), false)
  assert.equal(vidljivaTraka({ ...o, y: 4100, smjer: 'vidi' }), false)
})

test('procitano i dugme za vrh', () => {
  assert.equal(procitano(0, 5000, 800), 0)
  assert.equal(procitano(4200, 5000, 800), 1)
  assert.equal(procitano(2100, 5000, 800), 0.5)
  assert.equal(procitano(100, 500, 800), 0)
  assert.equal(vidljivVrh(1300, 3000, 800), true)
  assert.equal(vidljivVrh(1300, 2000, 800), false)
  assert.equal(vidljivVrh(500, 5000, 800), false)
})

test('magnet: daleko miruje, blizu se privuče', () => {
  assert.deepEqual(magnet(200, 0), { x: 0, y: 0 })
  assert.deepEqual(magnet(100, 50), { x: 30, y: 15 })
})

import { paljenje, formatBroj, nagib, napredakSkrola } from '../src/lib/pokreti/racun.js'

test('paljenje: ispod ekrana 0, pri vrhu 1, između raste', () => {
  assert.equal(paljenje(900, 800), 0)
  assert.equal(paljenje(100, 800), 1)
  const p = paljenje(500, 800)
  assert.ok(p > 0 && p < 1)
  assert.ok(paljenje(400, 800) > p)
})

test('formatBroj: bosanski tačka, engleski zarez', () => {
  assert.equal(formatBroj(4453, 'bs'), '4.453')
  assert.equal(formatBroj(4453, 'en'), '4,453')
  assert.equal(formatBroj(52, 'bs'), '52')
  assert.equal(formatBroj(7460.4, 'bs'), '7.460')
})

test('nagib: sredina ravna, uglovi do granice', () => {
  assert.deepEqual(nagib(50, 50, 100, 100), { rx: 0, ry: 0 })
  assert.deepEqual(nagib(100, 0, 100, 100, 6), { rx: 6, ry: 6 })
  assert.deepEqual(nagib(0, 100, 100, 100, 6), { rx: -6, ry: -6 })
})

test('napredakSkrola: zakačena scena od 0 do 1', () => {
  assert.equal(napredakSkrola({ top: 100, height: 3000 }, 800), 0)
  assert.equal(napredakSkrola({ top: -2200, height: 3000 }, 800), 1)
  assert.equal(napredakSkrola({ top: -1100, height: 3000 }, 800), 0.5)
  assert.equal(napredakSkrola({ top: -50, height: 500 }, 800), 0)
})

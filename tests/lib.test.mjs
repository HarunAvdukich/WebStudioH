import { test } from 'node:test'
import assert from 'node:assert/strict'
import { odluci } from '../src/lib/mogucnosti.js'
import { korakZaNapredak } from '../src/lib/pricaKorak.js'

const pun = { webgl: true, deviceMemory: 8, saveData: false, smanjenPokret: false }

test('pun uređaj dobija 3D, video i zaustavljanje', () => {
  assert.deepEqual(odluci(pun), { tri: true, video: true, pin: true, razlog: null })
})
test('smanjen pokret: bez 3D, bez videa, bez zaustavljanja', () => {
  assert.deepEqual(odluci({ ...pun, smanjenPokret: true }), { tri: false, video: false, pin: false, razlog: 'smanjen-pokret' })
})
test('bez WebGL-a: slika umjesto 3D, video i zaustavljanje ostaju', () => {
  assert.deepEqual(odluci({ ...pun, webgl: false }), { tri: false, video: true, pin: true, razlog: 'nema-webgl' })
})
test('Save-Data: bez 3D i bez videa', () => {
  assert.deepEqual(odluci({ ...pun, saveData: true }), { tri: false, video: false, pin: true, razlog: 'save-data' })
})
test('2 GB memorije ili manje: slika umjesto 3D', () => {
  assert.deepEqual(odluci({ ...pun, deviceMemory: 2 }), { tri: false, video: true, pin: true, razlog: 'malo-memorije' })
})
test('nepoznata memorija se ne računa kao mala', () => {
  assert.equal(odluci({ ...pun, deviceMemory: undefined }).tri, true)
})
test('napredak skrola u korak', () => {
  assert.equal(korakZaNapredak(0, 4), 0)
  assert.equal(korakZaNapredak(0.26, 4), 1)
  assert.equal(korakZaNapredak(0.99, 4), 3)
  assert.equal(korakZaNapredak(1, 4), 3)
  assert.equal(korakZaNapredak(-0.1, 3), 0)
})

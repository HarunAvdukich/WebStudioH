// Naslov kartice kad posjetilac pređe na drugu karticu preglednika.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pratiNaslovKartice } from '../src/lib/naslovKartice.js'

function laziDokument(title) {
  const slusaci = new Set()
  return {
    title,
    hidden: false,
    addEventListener: (_, f) => slusaci.add(f),
    removeEventListener: (_, f) => slusaci.delete(f),
    okini() { slusaci.forEach((f) => f()) },
  }
}

test('naslov se promijeni kad se ode i vrati kad se dođe', () => {
  const d = laziDokument('Usluge · Hunar')
  const ugasi = pratiNaslovKartice(d, 'Vratite se')
  d.hidden = true; d.okini()
  assert.equal(d.title, 'Vratite se')
  d.hidden = false; d.okini()
  assert.equal(d.title, 'Usluge · Hunar')
  d.hidden = true; d.okini()
  ugasi()
  assert.equal(d.title, 'Usluge · Hunar')
})

import { test } from 'node:test'
import assert from 'node:assert/strict'

// Lažni prozor: bilježi slušače, da test može "pomjeriti miš".
const slusaci = new Map()
globalThis.window = {
  scrollY: 0,
  addEventListener: (d, fn) => slusaci.set(d, fn),
  removeEventListener: (d) => slusaci.delete(d),
}
const { poslijeInterakcije } = await import('../src/lib/interakcija.js')

test('3D čeka prvu interakciju, pa se pali jednom; otkazani ne', () => {
  let a = 0
  let b = 0
  poslijeInterakcije(() => a++)
  const otkazi = poslijeInterakcije(() => b++)
  assert.equal(a, 0)
  assert.ok(slusaci.has('pointermove') && slusaci.has('scroll') && slusaci.has('touchstart'))
  otkazi()
  slusaci.get('pointermove')()
  assert.equal(a, 1)
  assert.equal(b, 0)
  assert.equal(slusaci.size, 0, 'slušači se skidaju poslije prve interakcije')
  // Poslije prve interakcije sve se pali odmah.
  let c = 0
  poslijeInterakcije(() => c++)
  assert.equal(c, 1)
})

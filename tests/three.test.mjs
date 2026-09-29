import { test } from 'node:test'
import assert from 'node:assert/strict'
import { Box3, Vector3 } from 'three'
import { KUKA, kukaDimenzije } from '../src/brand/kuka.js'
import { znakGeometrija } from '../src/three/znak3d.js'

test('dimenzije kuke su iste kao u hunar_logo.py', () => {
  const d = kukaDimenzije(KUKA)
  assert.equal(d.W, 426)
  assert.equal(d.H, 308)
  assert.ok(Math.abs(d.yVrh - 96.0) < 0.1, String(d.yVrh))
})

test('3D znak ima proporciju logotipa i zadanu veličinu', () => {
  const geo = znakGeometrija({ dubina: 40, zaobljenje: 0, velicina: 2 })
  geo.computeBoundingBox()
  const v = geo.boundingBox.getSize(new Vector3())
  assert.ok(Math.abs(v.x - 2) < 0.01, `sirina ${v.x}`)
  assert.ok(Math.abs(v.y - (2 * 308) / 426) < 0.01, `visina ${v.y}`)
  const c = geo.boundingBox.getCenter(new Vector3())
  assert.ok(c.length() < 0.01, 'centriran')
})

test('3D znak: dvije kuke, svaka zatvorena i bez rupa', () => {
  const geo = znakGeometrija({ dubina: 40, zaobljenje: 0, velicina: 2 })
  // Box3 nad pozicijama mora biti isti kao boundingBox (nema zalutalih tačaka)
  const b = new Box3().setFromBufferAttribute(geo.attributes.position)
  geo.computeBoundingBox()
  assert.ok(b.equals(geo.boundingBox))
  assert.ok(geo.attributes.position.count > 500, 'luk ima dovoljno segmenata')
})

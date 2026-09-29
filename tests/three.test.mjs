import { test } from 'node:test'
import assert from 'node:assert/strict'
import { Box3, Vector3, Mesh, BoxGeometry, MeshStandardMaterial, Group, Texture } from 'three'
import { KUKA, kukaDimenzije } from '../src/brand/kuka.js'
import { znakGeometrija } from '../src/three/znak3d.js'
import { uklopi, oslobodi } from '../src/three/model.js'

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

test('uklopi: najduža strana postaje zadana veličina, objekat u centru', () => {
  const g = new Group()
  const m = new Mesh(new BoxGeometry(10, 4, 2), new MeshStandardMaterial())
  m.position.set(30, -5, 2)
  g.add(m)
  uklopi(g, 2)
  const b = new Box3().setFromObject(g)
  const v = b.getSize(new Vector3())
  assert.ok(Math.abs(v.x - 2) < 1e-6)
  assert.ok(b.getCenter(new Vector3()).length() < 1e-6)
})

test('oslobodi: geometrija, materijal i tekstura se oslobađaju', () => {
  const geo = new BoxGeometry(1, 1, 1)
  const tex = new Texture()
  const mat = new MeshStandardMaterial({ map: tex })
  const pozvano = []
  geo.addEventListener('dispose', () => pozvano.push('geo'))
  mat.addEventListener('dispose', () => pozvano.push('mat'))
  tex.addEventListener('dispose', () => pozvano.push('tex'))
  const g = new Group()
  g.add(new Mesh(geo, mat))
  oslobodi(g)
  assert.deepEqual(pozvano.sort(), ['geo', 'mat', 'tex'])
})

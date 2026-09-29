import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { stories, projects, serviceGroups, homeStats } from '../src/data.js'

const TIPOVI = new Set(['3d', 'ekran', 'video', 'gravura'])
const fajl = (id, ime) => new URL(`../public/price/${id}/${ime}`, import.meta.url)
const slugovi = new Set(projects.map((p) => p.slug))

test('priče: mrt, smarttime, urez, tim redom', () => {
  assert.deepEqual(stories.map((s) => s.id), ['mrt', 'smarttime', 'urez'])
})
test('svaka priča vodi na postojeći projekat', () => {
  for (const s of stories) assert.ok(slugovi.has(s.projekat), s.id)
})
test('najviše četiri koraka, prvi je 3d, samo dozvoljeni tipovi', () => {
  for (const s of stories) {
    assert.ok(s.koraci.length >= 2 && s.koraci.length <= 4, s.id)
    assert.equal(s.koraci[0].tip, '3d', s.id)
    for (const k of s.koraci) assert.ok(TIPOVI.has(k.tip), `${s.id}: ${k.tip}`)
  }
})
test('svaki fajl priče postoji', () => {
  const nema = []
  for (const s of stories) {
    for (const ime of [s.model.glb, s.model.poster]) if (!existsSync(fajl(s.id, ime))) nema.push(`${s.id}/${ime}`)
    for (const k of s.koraci) {
      const imena = k.tip === 'ekran' ? [k.slika] : k.tip === 'video' ? [`${k.video}-1080.mp4`, `${k.video}-720.mp4`, k.poster] : []
      for (const ime of imena) if (!existsSync(fajl(s.id, ime))) nema.push(`${s.id}/${ime}`)
    }
  }
  assert.deepEqual(nema, [])
})
test('snimak ekrana ima alt i izvor, video ima alt', () => {
  for (const s of stories)
    for (const k of s.koraci) {
      if (k.tip === 'ekran') assert.ok(k.alt && k.izvor, `${s.id}: ${k.slika}`)
      if (k.tip === 'video') assert.ok(k.alt, `${s.id}: ${k.video}`)
    }
})
test('urez nosi oznaku "u izradi", ostali ne', () => {
  assert.deepEqual(stories.map((s) => s.oznaka), [null, null, 'u izradi'])
})
test('gravura ima površinu sa tri broja za položaj i rotaciju', () => {
  for (const s of stories)
    for (const k of s.koraci.filter((k) => k.tip === 'gravura')) {
      assert.equal(k.povrsina.polozaj.length, 3)
      assert.equal(k.povrsina.rotacija.length, 3)
      assert.equal(k.povrsina.velicina.length, 2)
    }
})
test('usluge: četiri grupe, svaka sa primjerom koji vodi na postojeći rad', () => {
  assert.equal(serviceGroups.length, 4)
  for (const g of serviceGroups) {
    assert.ok(g.primjeri.length >= 1, g.id)
    for (const p of g.primjeri) assert.ok(slugovi.has(p.href.replace('/radovi/', '')), p.href)
  }
})
test('svaka brojka na početnoj ima izvor', () => {
  assert.equal(homeStats.length, 4)
  for (const s of homeStats) assert.ok(s.izvor, s.label)
})

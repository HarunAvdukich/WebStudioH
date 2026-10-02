// Provjere zajedničkih podataka (src/data.js) i radova (src/stranice/radovi.js).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import * as data from '../src/data.js'
import * as radovi from '../src/stranice/radovi.js'
import * as radoviEn from '../src/stranice/radovi.en.js'

function strings(value, path = '', out = []) {
  if (typeof value === 'string') out.push([path, value])
  else if (Array.isArray(value)) value.forEach((v, i) => strings(v, `${path}[${i}]`, out))
  else if (value && typeof value === 'object')
    for (const [k, v] of Object.entries(value)) strings(v, `${path}.${k}`, out)
  return out
}

const texts = strings({ data, radovi: { ...radovi }, radoviEn: { ...radoviEn } })

test('radovi: mrt, smarttime, urez, tim redom, isto na oba jezika i u podacima', () => {
  const slugovi = ['mrt', 'smarttime', 'urez']
  assert.deepEqual(data.projects.map((p) => p.slug), slugovi)
  assert.deepEqual(radovi.radovi.map((r) => r.slug), slugovi)
  assert.deepEqual(radoviEn.radovi.map((r) => r.slug), slugovi)
})

test('UPTOS se ne pominje nigdje u sadržaju', () => {
  assert.deepEqual(texts.filter(([, s]) => /uptos/i.test(s)).map(([p]) => p), [])
})

test('urez nema link ni sliku dok ne proradi', () => {
  const urez = data.projects.find((p) => p.slug === 'urez')
  assert.equal(urez.url, undefined)
  assert.equal(urez.image, undefined)
  for (const t of [radovi, radoviEn]) {
    const r = t.radovi.find((x) => x.slug === 'urez')
    assert.equal(r.url, undefined)
    assert.equal(r.slika, undefined)
    assert.equal(r.brojke, undefined)
  }
})

test('nijedan tekst nema dugu ni srednju crtu', () => {
  assert.deepEqual(texts.filter(([, s]) => /[—–]/.test(s)).map(([p]) => p), [])
})

test('nigdje cijena u dolarima', () => {
  assert.deepEqual(texts.filter(([, s]) => /\$\s?\d/.test(s)).map(([p]) => p), [])
})

test('nema linka za zakazivanje poziva', () => {
  assert.equal(data.contact.booking, undefined)
})

test('riječi klijenta su samo od radova koji postoje i potpisane su nazivom firme', () => {
  for (const r of radovi.radovi.filter((x) => x.citat)) {
    assert.equal(r.citat.ko, r.ime)
    assert.ok(r.citat.tekst.length > 40)
  }
})

test('datum se piše bez Intl', () => {
  assert.equal(data.formatDate('2026-06-18'), '18. juni 2026.')
})

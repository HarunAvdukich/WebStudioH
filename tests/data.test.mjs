// Provjere sadržaja direktno iz src/data.js.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import * as data from '../src/data.js'

function strings(value, path = '', out = []) {
  if (typeof value === 'string') out.push([path, value])
  else if (Array.isArray(value)) value.forEach((v, i) => strings(v, `${path}[${i}]`, out))
  else if (value && typeof value === 'object')
    for (const [k, v] of Object.entries(value)) strings(v, `${path}.${k}`, out)
  return out
}

const texts = strings(
  Object.fromEntries(Object.entries(data).filter(([, v]) => typeof v !== 'function')),
)

test('radovi: mrt, smarttime, urez, uptos, tim redom', () => {
  assert.deepEqual(data.projects.map((p) => p.slug), ['mrt', 'smarttime', 'urez', 'uptos'])
})

test('urez nema link ni sliku dok ne proradi', () => {
  const urez = data.projects.find((p) => p.slug === 'urez')
  assert.equal(urez.url, undefined)
  assert.equal(urez.image, undefined)
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

test('onlyApproved propušta samo potvrđene recenzije', () => {
  const list = [{ name: 'A', approved: true }, { name: 'B', approved: false }, { name: 'C' }]
  assert.deepEqual(data.onlyApproved(list).map((t) => t.name), ['A'])
})

test('objavljene recenzije su samo potvrđene', () => {
  assert.ok(data.testimonials.every((t) => typeof t.approved === 'boolean'))
  assert.ok(data.publishedTestimonials.every((t) => t.approved === true))
})

test('brojke odgovaraju izmjerenim 27. 9. 2026.', () => {
  assert.deepEqual(data.homeStats.map((s) => s.num + s.sfx), ['7.400+', '4.300+', '50 ms'])
  assert.deepEqual(data.aboutStats.map((s) => s.num + s.sfx), ['7.400+', '4.300+', '50 ms', '98'])
})

test('usluge: web trgovine prve, bh. tržište druge, ukupno šest', () => {
  assert.deepEqual(
    data.services.slice(0, 2).map((s) => s.t),
    ['WooCommerce web trgovine', 'Povezivanje sa bh. tržištem'],
  )
  assert.equal(data.services.length, 6)
})

test('sve cijene su po dogovoru', () => {
  assert.ok(data.pricing.every((p) => p.price === 'Po dogovoru'))
})

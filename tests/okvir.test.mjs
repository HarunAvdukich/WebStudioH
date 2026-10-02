// Zajednički okvir: tekst, a poslije gradnje i markup u dist (dodaje se u kasnijim zadacima).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import * as okvir from '../src/okvir.js'

function strings(value, out = []) {
  if (typeof value === 'string') out.push(value)
  else if (Array.isArray(value)) value.forEach((v) => strings(v, out))
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => strings(v, out))
  return out
}
const tekst = strings(Object.fromEntries(Object.entries(okvir)))

test('tekst okvira nema dugu ni srednju crtu', () => {
  assert.deepEqual(tekst.filter((s) => /[—–]/.test(s)), [])
})

test('meni vodi samo na unutrašnje stranice', () => {
  assert.ok(okvir.meni.length >= 6)
  for (const m of okvir.meni) assert.match(m.put, /^\/[a-z-]+$/)
})

test('WhatsApp ima unaprijed upisanu poruku', () => {
  assert.match(okvir.whatsappLink, /^https:\/\/wa\.me\/387603000751\?text=/)
})

test('404 tekst je sa platna', () => {
  assert.equal(okvir.nePostoji.naslov, 'Ova stranica ne postoji.')
  assert.equal(okvir.nePostoji.podnaslov, 'Ali vaša može.')
})

test('naslov kartice postoji na oba jezika', () => {
  assert.ok(okvir.naslovKartice.bs.includes('Hunar'))
  assert.ok(okvir.naslovKartice.en.includes('Hunar'))
})

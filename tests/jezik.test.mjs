// Jezik stranice i prelaz na istu stranicu na drugom jeziku; engleski okvir istog oblika.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { PAROVI, jezikPuta, drugaVerzija } from '../src/lib/jezik.js'
import * as bs from '../src/okvir.js'
import * as en from '../src/okvir.en.js'

function kljucevi(o, prefiks = '') {
  return Object.entries(o).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v) ? kljucevi(v, `${prefiks}${k}.`) : [`${prefiks}${k}`],
  )
}

test('jezik se čita iz adrese', () => {
  assert.equal(jezikPuta('/'), 'bs')
  assert.equal(jezikPuta('/usluge'), 'bs')
  assert.equal(jezikPuta('/en'), 'en')
  assert.equal(jezikPuta('/en/'), 'en')
  assert.equal(jezikPuta('/en/services'), 'en')
  assert.equal(jezikPuta('/enigma'), 'bs')
})

test('druga verzija: par ako postoji, inače početna drugog jezika', () => {
  assert.equal(drugaVerzija('/usluge'), '/en/services')
  assert.equal(drugaVerzija('/en/pricing'), '/cijene')
  assert.equal(drugaVerzija('/en/contact/'), '/kontakt')
  assert.equal(drugaVerzija('/'), '/en')
  assert.equal(drugaVerzija('/en'), '/')
  assert.equal(drugaVerzija('/radovi'), '/en')
})

test('parovi idu sa bosanske na englesku adresu', () => {
  for (const [b, e] of Object.entries(PAROVI)) {
    assert.equal(jezikPuta(b), 'bs', b)
    assert.equal(jezikPuta(e), 'en', e)
  }
})

test('engleski okvir ima iste ključeve kao bosanski', () => {
  assert.deepEqual(kljucevi(en.okvir).sort(), kljucevi(bs.okvir).sort())
  assert.deepEqual(Object.keys(en.naslovKartice).sort(), Object.keys(bs.naslovKartice).sort())
})

test('engleski meni vodi samo na engleske stranice', () => {
  assert.ok(en.meni.length >= 3)
  for (const m of en.meni) assert.equal(jezikPuta(m.put), 'en', m.put)
  assert.match(en.whatsappLink, /^https:\/\/wa\.me\/387603000751\?text=Hi/)
})

test('engleski okvir nema dugih crta', () => {
  const tekst = JSON.stringify(en)
  assert.doesNotMatch(tekst, /[—–]/)
})

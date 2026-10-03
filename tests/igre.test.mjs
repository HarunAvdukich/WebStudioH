// Logika igara i vodiča (bez DOM-a): preporuka vodiča, poruka za WhatsApp, OLX igra, termini.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { preporukaVodica, porukaVodica, novaCijena, novaZaliha, ZAUZETO, slobodan } from '../src/lib/igre.js'
import { vodic as vodicBs } from '../src/stranice/usluge.js'
import { vodic as vodicEn } from '../src/stranice/usluge.en.js'
import { popuni } from '../src/lib/whatsapp.js'

test('vodič: usluge i termini vode na rezervacije, proizvodi i OLX na trgovinu sa vezom', () => {
  assert.equal(preporukaVodica('usluge', 'da'), 'termini')
  assert.equal(preporukaVodica('usluge', 'ne'), 'stranica')
  assert.equal(preporukaVodica('proizvode', 'da'), 'olx')
  assert.equal(preporukaVodica('proizvode', 'ne'), 'shop')
})

test('vodič: svaka preporuka postoji u tekstu, na oba jezika', () => {
  for (const v of [vodicBs, vodicEn]) {
    for (const k of ['termini', 'stranica', 'olx', 'shop']) assert.ok(v.preporuke[k]?.ime, k)
  }
})

test('vodič: poruka nosi odgovore i preporuku', () => {
  const p = porukaVodica(vodicBs, 'proizvode', 'da')
  assert.equal(p, 'Zdravo! Prodajem proizvode, prodajem i na OLX-u ili uzimam robu od dobavljača. Vodič na hunar.ba mi je predložio: web shop sa OLX vezom. Možemo li se čuti?')
  assert.match(porukaVodica(vodicEn, 'usluge', 'da'), /^Hi! I sell services, I book appointments with customers\. The guide on hunar\.ba suggested: online booking\./)
})

test('OLX igra: cijena ne pada ispod 9, zaliha ne ide ispod nule', () => {
  assert.equal(novaCijena(459, -10), 449)
  assert.equal(novaCijena(12, -10), 9)
  assert.equal(novaZaliha(3, 1), 4)
  assert.equal(novaZaliha(0, -1), 0)
})

test('termini: zauzeti se ne mogu izabrati', () => {
  for (const i of ZAUZETO) assert.equal(slobodan(i), false)
  assert.equal(slobodan(1), true)
})

test('popuni: zamijeni samo poznate oznake', () => {
  assert.equal(popuni('Zdravo, {x} i {y}.', { x: 'web shop' }), 'Zdravo, web shop i {y}.')
})

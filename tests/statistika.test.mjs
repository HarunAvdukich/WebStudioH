// Statistika bez kolačića (Umami): događaji iz linkova, gašenje van hunar.ba i Politika privatnosti.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { dogadjajZaLink, pokreniStatistiku, UMAMI_ID, DOMEN } from '../src/lib/statistika.js'
import * as privatnost from '../src/stranice/privatnost.js'
import * as privatnostEn from '../src/stranice/privatnost.en.js'

test('WhatsApp link daje događaj sa uslugom iz poruke', () => {
  const bs = 'https://wa.me/387603000751?text=' + encodeURIComponent('Zdravo, zanima me web shop. Možemo li se čuti?')
  assert.deepEqual(dogadjajZaLink(bs), { ime: 'WhatsApp', podaci: { usluga: 'web shop' } })
  const en = 'https://wa.me/387603000751?text=' + encodeURIComponent('Hi, I am interested in an online store. Can we talk?')
  assert.deepEqual(dogadjajZaLink(en), { ime: 'WhatsApp', podaci: { usluga: 'an online store' } })
  assert.deepEqual(dogadjajZaLink('https://wa.me/387603000751?text=Zdravo'), { ime: 'WhatsApp', podaci: undefined })
})

test('poziv i mail su događaji, ostali linkovi nisu', () => {
  assert.deepEqual(dogadjajZaLink('tel:+387603000751'), { ime: 'Poziv' })
  assert.deepEqual(dogadjajZaLink('mailto:info@hunar.ba'), { ime: 'Mail' })
  assert.equal(dogadjajZaLink('/usluge'), null)
  assert.equal(dogadjajZaLink('https://mrt.ba'), null)
})

test('statistika radi samo na hunar.ba i samo sa ID-jem sajta', () => {
  assert.equal(DOMEN, 'hunar.ba')
  // u testu nema preglednika ni ID-ja, pa se ništa ne učitava
  assert.equal(pokreniStatistiku({ id: '' }), false)
  assert.equal(pokreniStatistiku({ id: 'x' }), false)
  if (UMAMI_ID) assert.match(UMAMI_ID, /^[0-9a-f-]{36}$/)
})

test('Politika privatnosti opisuje statistiku i kaže da nema kolačića', () => {
  for (const t of [privatnost, privatnostEn]) {
    const tekst = JSON.stringify(t.dijelovi)
    assert.match(tekst, /Umami/)
    assert.match(tekst, /(kolačić|cookies)/)
    assert.ok(t.dijelovi.some((d) => /Statistika posjeta|Visit statistics/.test(d.naslov)))
  }
})

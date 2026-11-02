// P3: status uživo trgovina. Račun bez mreže: lažni fetch i fiksni sat.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { SAJTOVI, provjeri, provjeriSajt, prije, stanjeSajta } from '../src/lib/status.js'

test('provjeravaju se samo naše trgovine', () => {
  assert.deepEqual(SAJTOVI.map((s) => s.ime), ['mrt.ba', 'smarttime.ba'])
})

test('sajt radi uz 2xx i 3xx, ne radi uz 5xx ili grešku mreže', async () => {
  const sa = (status) => async () => ({ status })
  assert.equal((await provjeriSajt(SAJTOVI[0], sa(200))).radi, true)
  assert.equal((await provjeriSajt(SAJTOVI[0], sa(301))).radi, true)
  assert.equal((await provjeriSajt(SAJTOVI[0], sa(503))).radi, false)
  const pad = await provjeriSajt(SAJTOVI[0], async () => {
    throw new Error('mreža')
  })
  assert.deepEqual(pad, { ime: 'mrt.ba', radi: false, ms: null })
})

test('odgovor ima vrijeme provjere i sve sajtove', async () => {
  const r = await provjeri(SAJTOVI, async () => ({ status: 200 }), () => new Date('2026-10-03T10:00:00Z'))
  assert.equal(r.provjereno, '2026-10-03T10:00:00.000Z')
  assert.equal(r.sajtovi.length, 2)
})

test('koliko je prošlo od provjere, na oba jezika', () => {
  const t = Date.parse('2026-10-03T10:00:00Z')
  assert.equal(prije('2026-10-03T10:00:00Z', t + 20000), 'provjereno upravo')
  assert.equal(prije('2026-10-03T10:00:00Z', t + 4 * 60000), 'provjereno prije 4 min')
  assert.equal(prije('2026-10-03T10:00:00Z', t + 4 * 60000, 'en'), 'checked 4 min ago')
})

test('star ili nepotpun odgovor se ne pokazuje', () => {
  const t = Date.parse('2026-10-03T10:00:00Z')
  const odgovor = { provjereno: '2026-10-03T10:00:00Z', sajtovi: [{ ime: 'mrt.ba', radi: true }] }
  assert.equal(stanjeSajta(odgovor, 'mrt.ba', t + 60000).radi, true)
  assert.equal(stanjeSajta(odgovor, 'mrt.ba', t + 2 * 3600000), null)
  assert.equal(stanjeSajta(odgovor, 'smarttime.ba', t), null)
  assert.equal(stanjeSajta(null, 'mrt.ba', t), null)
})

test('Netlify funkcija postoji na /api/status i CDN je čuva pet minuta', () => {
  const f = 'netlify/functions/status.mjs'
  assert.ok(existsSync(f))
  const kod = readFileSync(f, 'utf8')
  assert.match(kod, /path: '\/api\/status'/)
  assert.match(kod, /s-maxage=300/)
})

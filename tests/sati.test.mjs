// Funkcija /api/sati: ko smije upisati, ko šta smije pročitati. Store je lažan, u memoriji.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { napraviObradu } from '../netlify/functions/sati.mjs'

const otisak = (k) => createHash('sha256').update(k).digest('hex')
const KLJUC = { upis: 'upis-test-kljuc', vlasnik: 'vlasnik-test-kljuc', klijent: 'klijent-test-kljuc' }
const OTISCI = { upis: otisak(KLJUC.upis), vlasnik: otisak(KLJUC.vlasnik), klijent: otisak(KLJUC.klijent) }

const SAZETAK = {
  projekat: 'Motorremont',
  azurirano: '2026-10-17T14:00:00+02:00',
  vlasnik: {
    mjeseci: [{ kljuc: '2026-10', naziv: 'oktobar 2026', radno: 3600, claude: 3000, dana: 1, poruka: 4, dani: [] }],
  },
  klijent: { mjeseci: [{ kljuc: '2026-10', naziv: 'oktobar 2026', radno: 3600, dana: 1, dani: [] }] },
}

function lazniStore() {
  const podaci = new Map()
  return {
    async get(k, { type } = {}) {
      return podaci.has(k) ? (type === 'json' ? JSON.parse(podaci.get(k)) : podaci.get(k)) : null
    },
    async setJSON(k, v) {
      podaci.set(k, JSON.stringify(v))
    },
  }
}

function zahtjev(metoda, kljuc, tijelo) {
  const headers = {}
  if (kljuc) headers.authorization = `Bearer ${kljuc}`
  return new Request('https://hunar.ba/api/sati', {
    method: metoda,
    headers,
    body: tijelo === undefined ? undefined : typeof tijelo === 'string' ? tijelo : JSON.stringify(tijelo),
  })
}

const nova = () => {
  const store = lazniStore()
  return napraviObradu(() => store, OTISCI)
}

test('bez ključa i sa pogrešnim ključem: 401', async () => {
  const obrada = nova()
  assert.equal((await obrada(zahtjev('GET'))).status, 401)
  assert.equal((await obrada(zahtjev('GET', 'pogresan'))).status, 401)
  assert.equal((await obrada(zahtjev('POST', 'pogresan', SAZETAK))).status, 401)
})

test('čitanje prije prvog upisa: 404', async () => {
  assert.equal((await nova()(zahtjev('GET', KLJUC.vlasnik))).status, 404)
})

test('samo ključ za upis smije upisati', async () => {
  const obrada = nova()
  assert.equal((await obrada(zahtjev('POST', KLJUC.vlasnik, SAZETAK))).status, 401)
  assert.equal((await obrada(zahtjev('POST', KLJUC.klijent, SAZETAK))).status, 401)
  assert.equal((await obrada(zahtjev('POST', KLJUC.upis, SAZETAK))).status, 204)
})

test('ključ za upis ne smije čitati', async () => {
  const obrada = nova()
  await obrada(zahtjev('POST', KLJUC.upis, SAZETAK))
  assert.equal((await obrada(zahtjev('GET', KLJUC.upis))).status, 401)
})

test('vlasnik dobije svoj pogled, klijent svoj i nijednu Claude brojku', async () => {
  const obrada = nova()
  await obrada(zahtjev('POST', KLJUC.upis, SAZETAK))

  const v = await obrada(zahtjev('GET', KLJUC.vlasnik))
  assert.equal(v.status, 200)
  const vlasnik = await v.json()
  assert.equal(vlasnik.uloga, 'vlasnik')
  assert.equal(vlasnik.mjeseci[0].claude, 3000)
  assert.equal(vlasnik.azurirano, SAZETAK.azurirano)

  const k = await obrada(zahtjev('GET', KLJUC.klijent))
  const tekst = await k.text()
  assert.equal(JSON.parse(tekst).uloga, 'klijent')
  assert.doesNotMatch(tekst, /claude|poruka/i)
  assert.equal(k.headers.get('cache-control'), 'no-store')
})

test('neispravno tijelo: 400; preveliko: 413', async () => {
  const obrada = nova()
  assert.equal((await obrada(zahtjev('POST', KLJUC.upis, 'nije json'))).status, 400)
  assert.equal((await obrada(zahtjev('POST', KLJUC.upis, { vlasnik: { mjeseci: [] } }))).status, 400)
  const veliko = { ...SAZETAK, visak: 'x'.repeat(600 * 1024) }
  assert.equal((await obrada(zahtjev('POST', KLJUC.upis, veliko))).status, 413)
})

test('ostale metode: 405', async () => {
  assert.equal((await nova()(zahtjev('PUT', KLJUC.upis, SAZETAK))).status, 405)
})

// Funkcija ponuda: ko smije postaviti ponudu i šta kupac dobije na linku. Store je lažan, u memoriji.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { napraviObradu, config } from '../netlify/functions/ponuda.mjs'

const KLJUC = 'upis-test-kljuc'
const OTISAK = createHash('sha256').update(KLJUC).digest('hex')
const ID = 'h-2026-001-test1234'
const PDF = Buffer.from('%PDF-1.7\nprobni pdf').toString('base64')
const HTML = '<!doctype html><title>Ponuda</title><h1>Ponuda</h1>'

function lazniStore() {
  const podaci = new Map()
  return {
    async get(k, { type } = {}) {
      if (!podaci.has(k)) return null
      const v = podaci.get(k)
      if (type === 'arrayBuffer') return typeof v === 'string' ? new TextEncoder().encode(v).buffer : v
      return typeof v === 'string' ? v : new TextDecoder().decode(v)
    },
    async set(k, v) {
      podaci.set(k, v)
    },
  }
}

const nova = () => {
  const store = lazniStore()
  return napraviObradu(() => store, OTISAK)
}

const upis = (kljuc, tijelo) =>
  new Request('https://hunar.ba/api/ponuda', {
    method: 'POST',
    headers: kljuc ? { authorization: `Bearer ${kljuc}` } : {},
    body: typeof tijelo === 'string' ? tijelo : JSON.stringify(tijelo),
  })
const citaj = (put) => new Request('https://hunar.ba' + put)
const skriveno = (r) => {
  assert.equal(r.headers.get('x-robots-tag'), 'noindex, nofollow')
  assert.equal(r.headers.get('cache-control'), 'no-store')
}

test('putanje funkcije', () => {
  assert.deepEqual(config.path, ['/ponuda/*', '/api/ponuda'])
})

test('upis bez ključa ili sa pogrešnim ključem: 401', async () => {
  const o = nova()
  assert.equal((await o(upis(null, { id: ID, html: HTML, pdf: PDF }))).status, 401)
  assert.equal((await o(upis('pogresan', { id: ID, html: HTML, pdf: PDF }))).status, 401)
})

test('loš oblik, loš id i ono što nije PDF: 400', async () => {
  const o = nova()
  assert.equal((await o(upis(KLJUC, 'nije json'))).status, 400)
  assert.equal((await o(upis(KLJUC, { id: ID, html: HTML }))).status, 400)
  assert.equal((await o(upis(KLJUC, { id: 'H-2026-001', html: HTML, pdf: PDF }))).status, 400)
  assert.equal((await o(upis(KLJUC, { id: '../etc/x', html: HTML, pdf: PDF }))).status, 400)
  assert.equal((await o(upis(KLJUC, { id: ID, html: HTML, pdf: Buffer.from('nije pdf').toString('base64') }))).status, 400)
})

test('preveliko tijelo: 413', async () => {
  const o = nova()
  const r = await o(upis(KLJUC, { id: ID, html: 'x'.repeat(5 * 1024 * 1024 + 1), pdf: PDF }))
  assert.equal(r.status, 413)
})

test('druge metode: 405', async () => {
  const o = nova()
  assert.equal((await o(new Request('https://hunar.ba/api/ponuda'))).status, 405)
  assert.equal((await o(new Request('https://hunar.ba/ponuda/' + ID, { method: 'DELETE' }))).status, 405)
})

test('postavljena ponuda: HTML i PDF na linku, skriveno od pretrage', async () => {
  const o = nova()
  const r = await o(upis(KLJUC, { id: ID, html: HTML, pdf: PDF }))
  assert.equal(r.status, 201)
  assert.deepEqual(await r.json(), { link: `https://hunar.ba/ponuda/${ID}` })

  const strana = await o(citaj('/ponuda/' + ID))
  assert.equal(strana.status, 200)
  assert.match(strana.headers.get('content-type'), /^text\/html/)
  skriveno(strana)
  assert.equal(await strana.text(), HTML)

  const pdf = await o(citaj(`/ponuda/${ID}.pdf`))
  assert.equal(pdf.status, 200)
  assert.equal(pdf.headers.get('content-type'), 'application/pdf')
  assert.equal(pdf.headers.get('content-disposition'), 'inline; filename="Ponuda-H-2026-001-Hunar.pdf"')
  skriveno(pdf)
  assert.equal(Buffer.from(await pdf.arrayBuffer()).subarray(0, 5).toString(), '%PDF-')
})

test('ponuda koje nema i loš id: 404, isto skriveno', async () => {
  const o = nova()
  for (const put of ['/ponuda/h-2026-999-nemaovoga', '/ponuda/h-2026-999-nemaovoga.pdf', '/ponuda/KRATKO', '/ponuda/', '/ponuda/a/b']) {
    const r = await o(citaj(put))
    assert.equal(r.status, 404, put)
    skriveno(r)
  }
})

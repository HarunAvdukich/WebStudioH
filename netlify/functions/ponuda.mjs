// Ponude na hunar.ba/ponuda/<id>. Vlasnikov računar postavi web verziju i PDF ponude, a kupac
// ih otvori linkom. Repo je javan, zato je ovdje samo SHA-256 otisak ključa za upis; ponude
// (cijene, imena klijenata) su u Netlify Blobs, nikad u gitu. Google ih ne indeksira.
import { getStore } from '@netlify/blobs'
import { createHash, timingSafeEqual } from 'node:crypto'

const OTISAK_UPISA = '3f2114d08599a46eb0324ee06829d22765108e13058caf8342ff808ca57d9568'
const NAJVISE_BAJTOVA = 5 * 1024 * 1024
const ISPRAVAN_ID = /^[a-z0-9-]{8,80}$/

const SKRIVENO = { 'x-robots-tag': 'noindex, nofollow', 'cache-control': 'no-store', 'referrer-policy': 'no-referrer' }

const json = (status, tijelo) =>
  new Response(JSON.stringify(tijelo), { status, headers: { ...SKRIVENO, 'content-type': 'application/json; charset=utf-8' } })

const NEMA = `<!doctype html><html lang="bs"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>Ponuda nije pronađena | Hunar</title><link rel="icon" type="image/svg+xml" href="/favicon.svg"><style>body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;box-sizing:border-box;background:#0F241D;color:#F4F4F2;font:17px/1.5 system-ui,sans-serif}h1{font-size:26px;margin:0 0 8px}p{margin:0;color:#CFE3D9}a{color:#6FD3AE}</style></head><body><main><h1>Ponuda nije pronađena</h1><p>Provjerite link ili nam se javite preko <a href="https://hunar.ba/kontakt">hunar.ba</a>.</p></main></body></html>`

const nema = () => new Response(NEMA, { status: 404, headers: { ...SKRIVENO, 'content-type': 'text/html; charset=utf-8' } })

function smijeUpis(req, otisak) {
  const kljuc = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '').trim()
  if (!kljuc) return false
  return timingSafeEqual(createHash('sha256').update(kljuc).digest(), Buffer.from(otisak, 'hex'))
}

// "h-2026-001-x7k2m9qa" -> "Ponuda-H-2026-001-Hunar.pdf"
const imePdfa = (id) => `Ponuda-${id.split('-').slice(0, 3).join('-').toUpperCase()}-Hunar.pdf`

async function postavi(req, dajStore, otisak) {
  if (!smijeUpis(req, otisak)) return json(401, { greska: 'kljuc' })
  const tekst = await req.text()
  if (Buffer.byteLength(tekst) > NAJVISE_BAJTOVA) return json(413, { greska: 'preveliko' })
  let p
  try {
    p = JSON.parse(tekst)
  } catch {
    return json(400, { greska: 'json' })
  }
  if (!ISPRAVAN_ID.test(p?.id || '') || typeof p.html !== 'string' || !p.html || typeof p.pdf !== 'string') {
    return json(400, { greska: 'oblik' })
  }
  const pdf = Buffer.from(p.pdf, 'base64')
  if (pdf.subarray(0, 5).toString() !== '%PDF-') return json(400, { greska: 'pdf' })
  const store = dajStore()
  await store.set(`${p.id}.html`, p.html)
  await store.set(`${p.id}.pdf`, pdf.buffer.slice(pdf.byteOffset, pdf.byteOffset + pdf.byteLength))
  return json(201, { link: `https://hunar.ba/ponuda/${p.id}` })
}

export function napraviObradu(dajStore, otisak) {
  return async (req) => {
    const put = new URL(req.url).pathname
    if (put === '/api/ponuda') return req.method === 'POST' ? postavi(req, dajStore, otisak) : json(405, { greska: 'metoda' })
    if (req.method !== 'GET') return json(405, { greska: 'metoda' })
    const m = put.match(/^\/ponuda\/([^/]+?)(\.pdf)?$/)
    if (!m || !ISPRAVAN_ID.test(m[1])) return nema()
    const store = dajStore()
    if (m[2]) {
      const pdf = await store.get(`${m[1]}.pdf`, { type: 'arrayBuffer' })
      if (!pdf) return nema()
      return new Response(pdf, {
        headers: { ...SKRIVENO, 'content-type': 'application/pdf', 'content-disposition': `inline; filename="${imePdfa(m[1])}"` },
      })
    }
    const html = await store.get(`${m[1]}.html`)
    if (!html) return nema()
    return new Response(html, { headers: { ...SKRIVENO, 'content-type': 'text/html; charset=utf-8' } })
  }
}

export default napraviObradu(() => getStore('ponude'), OTISAK_UPISA)

export const config = { path: ['/ponuda/*', '/api/ponuda'] }

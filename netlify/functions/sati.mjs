// Evidencija sati (hunar.ba/sati). Vlasnikov računar šalje sažetak po danima, a stranica ga
// čita uz ključ iz linka. Repo je javan, zato su ovdje samo SHA-256 otisci ključeva; sami
// ključevi su na računaru i u linkovima. Podaci su u Netlify Blobs, nikad u gitu.
import { getStore } from '@netlify/blobs'
import { createHash, timingSafeEqual } from 'node:crypto'

const OTISCI = {
  upis: 'dc0b7e929c8c23c9b94060805f083119dfb8eb360574b0e7401841f342800230',
  vlasnik: '6b2a796747f78cc7f358b96e4e648b795343f6ea0d6e38e4aaf0787ee159b326',
  klijent: '8ab08d92b893c2109dcd5d73c6f4fdff7ba5abdbe4f1bc5403aa9ca4e67167a6',
}

const KLJUC_U_STOREU = 'motorremont'
const NAJVISE_BAJTOVA = 512 * 1024

const odgovor = (status, tijelo) =>
  new Response(tijelo === undefined ? null : JSON.stringify(tijelo), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })

function uloga(req, otisci) {
  const kljuc = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '').trim()
  if (!kljuc) return null
  const dobijeni = createHash('sha256').update(kljuc).digest()
  for (const [ime, hex] of Object.entries(otisci)) {
    if (timingSafeEqual(dobijeni, Buffer.from(hex, 'hex'))) return ime
  }
  return null
}

const ispravanPogled = (p) => p && Array.isArray(p.mjeseci)

export function napraviObradu(dajStore, otisci) {
  return async (req) => {
    if (req.method !== 'GET' && req.method !== 'POST') return odgovor(405, { greska: 'metoda' })
    const ko = uloga(req, otisci)

    if (req.method === 'POST') {
      if (ko !== 'upis') return odgovor(401, { greska: 'kljuc' })
      const tekst = await req.text()
      if (Buffer.byteLength(tekst) > NAJVISE_BAJTOVA) return odgovor(413, { greska: 'preveliko' })
      let sazetak
      try {
        sazetak = JSON.parse(tekst)
      } catch {
        return odgovor(400, { greska: 'json' })
      }
      if (!ispravanPogled(sazetak?.vlasnik) || !ispravanPogled(sazetak?.klijent)) {
        return odgovor(400, { greska: 'oblik' })
      }
      await dajStore().setJSON(KLJUC_U_STOREU, sazetak)
      return odgovor(204)
    }

    if (ko !== 'vlasnik' && ko !== 'klijent') return odgovor(401, { greska: 'kljuc' })
    const sazetak = await dajStore().get(KLJUC_U_STOREU, { type: 'json' })
    if (!sazetak) return odgovor(404, { greska: 'prazno' })
    // Svaka uloga dobije samo svoj pogled; klijentov nema Claude brojki ni u odgovoru.
    return odgovor(200, {
      projekat: sazetak.projekat,
      azurirano: sazetak.azurirano,
      uloga: ko,
      mjeseci: sazetak[ko].mjeseci,
    })
  }
}

export default napraviObradu(() => getStore('sati'), OTISCI)

export const config = { path: '/api/sati' }

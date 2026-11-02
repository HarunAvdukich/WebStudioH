// P3: status uživo trgovina koje smo napravili. Netlify funkcija (netlify/functions/status.mjs)
// provjeri sajtove, a CDN čuva odgovor pet minuta, pa se svaki sajt provjeri najviše jednom u
// pet minuta. Stranica pokaže "radi" i koliko je prošlo od provjere. Račun je ovdje, bez mreže
// i DOM-a, da ga provjeri test.

export const SAJTOVI = [
  { ime: 'mrt.ba', url: 'https://mrt.ba/' },
  { ime: 'smarttime.ba', url: 'https://smarttime.ba/' },
]

// Jedan sajt: radi ako odgovori sa 2xx ili 3xx za najviše 8 sekundi.
export async function provjeriSajt(sajt, dohvati = fetch, sat = () => Date.now()) {
  const t0 = sat()
  try {
    const r = await dohvati(sajt.url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(8000), headers: { 'User-Agent': 'HunarStatus/1.0 (+https://hunar.ba)' } })
    return { ime: sajt.ime, radi: r.status >= 200 && r.status < 400, ms: Math.round(sat() - t0) }
  } catch {
    return { ime: sajt.ime, radi: false, ms: null }
  }
}

export async function provjeri(sajtovi = SAJTOVI, dohvati = fetch, sad = () => new Date()) {
  const rezultati = await Promise.all(sajtovi.map((s) => provjeriSajt(s, dohvati)))
  return { provjereno: sad().toISOString(), sajtovi: rezultati }
}

// "provjereno prije 4 min" / "checked 4 min ago"; ispod minute "upravo" / "just now".
export function prije(iso, sada, jezik = 'bs') {
  const min = Math.max(0, Math.floor((sada - new Date(iso).getTime()) / 60000))
  if (jezik === 'en') return min < 1 ? 'checked just now' : `checked ${min} min ago`
  return min < 1 ? 'provjereno upravo' : `provjereno prije ${min} min`
}

// Status jednog sajta iz odgovora funkcije; null ako ga nema ili je odgovor star (više od sat).
export function stanjeSajta(odgovor, ime, sada) {
  const s = odgovor?.sajtovi?.find((x) => x.ime === ime)
  if (!s || !odgovor.provjereno) return null
  if (sada - new Date(odgovor.provjereno).getTime() > 3600000) return null
  return s
}

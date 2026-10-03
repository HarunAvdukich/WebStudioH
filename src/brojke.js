// Brojke sa trgovina koje smo napravili (P1). Vrijednosti i datume upisuje scripts/brojke.mjs
// u brojke-podaci.js; tekst stranica ih uzima odavde, pa ista brojka svuda stoji ista i sa
// svojim datumom provjere.
import podaci from './brojke-podaci.js'
import { formatBroj } from './lib/pokreti/racun.js'

const MJESECI_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// "29. 9. 2026" ili "29 Sep 2026".
export function datum(iso, jezik = 'bs') {
  const [g, m, d] = iso.split('-').map(Number)
  return jezik === 'en' ? `${d} ${MJESECI_EN[m - 1]} ${g}` : `${d}. ${m}. ${g}`
}

// Oblik riječi uz broj: 1 artikal, 2 artikla, 5 artikala; 11 do 14 idu kao 5.
export function oblik(n, [jedan, dva, pet]) {
  const zadnje2 = n % 100
  if (zadnje2 >= 11 && zadnje2 <= 14) return pet
  const zadnja = n % 10
  if (zadnja === 1) return jedan
  if (zadnja >= 2 && zadnja <= 4) return dva
  return pet
}

// Brojka spremna za tekst: vrijednost, ispisan broj i datum provjere na jeziku stranice.
export function brojka(kljuc, jezik = 'bs') {
  const b = podaci[kljuc]
  return { vrijednost: b.vrijednost, broj: formatBroj(b.vrijednost, jezik), datum: datum(b.datum, jezik), izvor: b.izvor }
}

export const KLJUCEVI = Object.keys(podaci)

// Dijelovi rečenica koji se ponavljaju na više stranica, sa pravim oblikom riječi.
export function katalogMrt(jezik = 'bs') {
  const a = brojka('mrtArtikli', jezik)
  const k = brojka('mrtKategorije', jezik)
  if (jezik === 'en') return { a, k, imenica: `products in ${k.broj} categories` }
  return { a, k, imenica: `${oblik(a.vrijednost, ['artikal', 'artikla', 'artikala'])} u ${k.broj} ${oblik(k.vrijednost, ['kategoriji', 'kategorije', 'kategorija'])}` }
}

export function oglasiMrt(jezik = 'bs') {
  const o = brojka('mrtOlx', jezik)
  return { o, imenica: jezik === 'en' ? 'OLX listings' : `OLX ${oblik(o.vrijednost, ['oglas', 'oglasa', 'oglasa'])}` }
}

export function satoviSmarttime(jezik = 'bs') {
  const a = brojka('smarttimeArtikli', jezik)
  const s = brojka('smarttimeSatovi', jezik)
  if (jezik === 'en') return { a, s, artikli: 'products', satovi: 'wristwatches' }
  return {
    a,
    s,
    artikli: oblik(a.vrijednost, ['artikal', 'artikla', 'artikala']),
    satovi: oblik(s.vrijednost, ['ručni sat', 'ručna sata', 'ručnih satova']),
  }
}

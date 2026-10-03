// Jezik stranice prema adresi i ista stranica na drugom jeziku. Engleski je pod /en.
// Stranica bez engleske verzije vodi na englesku početnu, i obratno.

// Ključ je bosanska adresa, vrijednost engleska.
export const PAROVI = {
  '/': '/en',
  '/usluge': '/en/services',
  '/cijene': '/en/pricing',
  '/kontakt': '/en/contact',
  '/radovi': '/en/work',
  '/radovi/mrt': '/en/work/mrt',
  '/radovi/smarttime': '/en/work/smarttime',
  '/radovi/urez': '/en/work/urez',
  '/o-nama': '/en/about',
  '/politika-privatnosti': '/en/privacy',
}

const OBRNUTO = Object.fromEntries(Object.entries(PAROVI).map(([b, e]) => [e, b]))
const bezKose = (put) => (put.length > 1 ? put.replace(/\/+$/, '') : put)

export const jezikPuta = (put) => {
  const p = bezKose(put)
  return p === '/en' || p.startsWith('/en/') ? 'en' : 'bs'
}

export function drugaVerzija(put) {
  const p = bezKose(put)
  if (jezikPuta(p) === 'en') return OBRNUTO[p] || '/'
  return PAROVI[p] || '/en'
}

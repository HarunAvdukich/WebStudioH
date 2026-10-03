// Film na početnoj za telefon: stranica zastane dok se predmet (sat, kosilica) sklopi, a
// ispod se smjenjuju kartice. Napredak p od 0 do 1. Bez DOM-a, da ga provjeri test.
import { cl } from '../pokreti/racun.js'

// Predmet je sklopljen na 85 % filma; ostatak stoji sklopljen uz zadnju karticu.
const SKLOPLJENO = 0.85
const POCETAK = 0.04

export function stanjeFilma(p, kartica) {
  const f = cl(p / SKLOPLJENO)
  const korak = (1 - POCETAK - 0.04) / kartica
  const karta = p < POCETAK ? -1 : Math.min(kartica - 1, Math.floor((p - POCETAK) / korak))
  return {
    // položaj u nizu kadrova, od 0 (rastavljeno) do 1 (sklopljeno)
    f,
    posto: Math.round(f * 100),
    karta,
    // poziv "Listajte dalje" stoji dok film traje
    poziv: p > 0.01 && p < 0.97,
  }
}

// Kadrovi za telefon: svaki drugi, plus zadnji (sklopljen predmet). Isto sklapanje, pola
// podataka; platno ih pretapa dva po dva pa nema skokova.
export function kadroviFilma(broj, korak = 2) {
  const lista = []
  for (let i = 1; i <= broj; i += korak) lista.push(i)
  if (lista[lista.length - 1] !== broj) lista.push(broj)
  return lista
}

// Koji kadrovi se crtaju za položaj f: donji, gornji i koliko se gornji vidi.
export function pretapanje(f, broj) {
  const v = cl(f) * (broj - 1)
  const i = Math.floor(v)
  return { i, j: Math.min(broj - 1, i + 1), udio: v - i }
}

// Logika malih igara na Uslugama (OLX veza, zakazivanje termina) i vodiča "koja stepenica
// vam treba". Bez DOM-a, da je provjeri test.
import { popuni } from './whatsapp.js'

// Vodič: prvo pitanje (usluge ili proizvodi) i drugo (da ili ne) daju preporuku.
export function preporukaVodica(prvo, drugo) {
  if (prvo === 'usluge') return drugo === 'da' ? 'termini' : 'stranica'
  return drugo === 'da' ? 'olx' : 'shop'
}

// Poruka za WhatsApp sa odgovorima i preporukom, na jeziku teksta vodiča.
export function porukaVodica(t, prvo, drugo) {
  const prviOdgovor = t.prvo.odgovori.find((o) => o.id === prvo)
  const drugiOdgovor = t[prvo].odgovori.find((o) => o.id === drugo)
  const odgovori = `${prviOdgovor.uPoruci}, ${drugiOdgovor.uPoruci}`
  return popuni(t.poruka, {
    odgovori: odgovori[0].toUpperCase() + odgovori.slice(1),
    preporuka: t.preporuke[preporukaVodica(prvo, drugo)].ime,
  })
}

// OLX igra: cijena ne pada ispod 9, zaliha ne ide ispod nule.
export const novaCijena = (cijena, promjena) => Math.max(9, cijena + promjena)
export const novaZaliha = (zaliha, promjena) => Math.max(0, zaliha + promjena)

// Termini: mreža je 4 sata × 5 dana (red po red); ovi su već zauzeti.
export const ZAUZETO = new Set([0, 3, 6, 12, 17])
export const slobodan = (i) => !ZAUZETO.has(i)

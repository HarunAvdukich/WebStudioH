// Tekst zajedničkog okvira ostalih stranica: zaglavlje, meni, podnožje, traka na telefonu,
// dugme za vrh i 404. Meni i WhatsApp poruka su isti kao na početnoj (pocetna.js).
// Glas studija (mi), kupcu "Vi". Bez dugih crta.
import { meni, whatsappLink, ui, podnozje } from './pocetna.js'

export { meni, whatsappLink }

export const okvir = {
  dugme: ui.dugme,
  dugmeKratko: ui.dugmeKratko,
  glavniMeni: ui.glavniMeni,
  otvoriMeni: ui.otvoriMeni,
  zatvoriMeni: ui.zatvoriMeni,
  meniTelefon: ui.meniTelefon,
  podnozjeMeni: ui.podnozjeMeni,
  privatnost: ui.privatnost,
  kontakt: ui.kontakt,
  podnozje,
  logo: 'Hunar, početna',
  znakTekst: 'vještina · umijeće · hunar · ',
  kopiraj: 'Kopiraj',
  kopirano: 'Kopirano ✓',
  kopiranoDugo: 'Broj je kopiran. Zalijepite ga u Viber ili poruku.',
  nazadNaVrh: 'Nazad na vrh',
  traka: { pisite: 'Pišite nam', licno: 'odgovaramo lično', pozovite: 'Pozovite' },
}

export const naslovKartice = {
  bs: 'Vratite se kad stignete · Hunar',
  en: 'Come back when you can · Hunar',
}

export const nePostoji = {
  seo: 'Stranica nije pronađena',
  naslov: 'Ova stranica ne postoji.',
  podnaslov: 'Ali vaša može.',
  nazad: 'Nazad na početnu',
  pisite: 'Pišite nam',
}

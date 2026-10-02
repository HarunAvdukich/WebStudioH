// English text of the shared frame (header, menu, footer, phone bar, back to top).
// Same shape as okvir.js. The menu lists only pages that exist in English; the rest
// get English when they get the new design.
import { contact } from './data.js'
import { whatsappLink, podnozje } from './pocetna.en.js'

export { whatsappLink }

export const meni = [
  { naziv: 'Services', put: '/en/services' },
  { naziv: 'Work', put: '/en/work' },
  { naziv: 'Pricing', put: '/en/pricing' },
  { naziv: 'About', put: '/en/about' },
  { naziv: 'Contact', put: '/en/contact' },
]

export const okvir = {
  dugme: 'Message us on WhatsApp',
  dugmeKratko: 'Message us',
  glavniMeni: 'Main menu',
  otvoriMeni: 'Open menu',
  zatvoriMeni: 'Close menu',
  meniTelefon: 'Menu',
  podnozjeMeni: 'Footer',
  privatnost: { naziv: 'Privacy policy (in Bosnian)', put: '/politika-privatnosti' },
  kontakt: { whatsapp: 'WhatsApp', veznik: 'and', telefon: 'phone' },
  podnozje,
  logo: 'Hunar, home',
  pocetna: '/en',
  jezik: { oznaka: 'BS', naziv: 'Bosanski', kod: 'bs' },
  telefon: '+387 60 3000 751',
  email: contact.email,
  znakTekst: 'skill · craft · hunar · ',
  kopiraj: 'Copy',
  kopirano: 'Copied ✓',
  kopiranoDugo: 'Number copied. Paste it into WhatsApp or Viber.',
  nazadNaVrh: 'Back to top',
  traka: { pisite: 'Message us', licno: 'we answer personally', pozovite: 'Call' },
}

export const naslovKartice = {
  bs: 'Vratite se kad stignete · Hunar',
  en: 'Come back when you can · Hunar',
}

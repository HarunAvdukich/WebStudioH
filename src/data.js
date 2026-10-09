// Zajednički podaci firme: kontakt, spisak radova (za sitemap i provjere) i format datuma.
// Tekst stranica je u src/pocetna.js, src/okvir.js i src/stranice/*.js; brojke i riječi
// klijenata su u src/stranice/radovi.js, svaka brojka sa datumom.

export const contact = {
  email: 'info@hunar.ba',
  phoneDisplay: '060 3000 751',
  phoneHref: 'tel:+387603000751',
  whatsapp: 'https://wa.me/387603000751',
}

// Google profil firme (Business Profile): stranica na Mapama i link za recenziju.
// cid je iz linka za recenziju; Google ih daje u profilu, pod "Zatražite recenzije".
export const google = {
  profil: 'https://www.google.com/maps?cid=15998770561478667953',
  recenzija: 'https://g.page/r/CbGu6X8PDQfeECE/review',
}

// Profili firme na drugim mjestima (sameAs u JSON-LD): po njima Google i AI asistenti znaju da
// je Hunar firma, a ne samo riječ. Samo profili firme Hunar; lični profili vlasnika ne idu ovdje
// (PRODUCT.md: bez imena vlasnika).
export const profili = [google.profil]

// Datum otvaranja, isti kao na Google profilu (odluka vlasnika 9. 10. 2026).
export const osnovano = '2026-06-01'

// Radovi koji imaju svoju stranicu (/radovi/<slug>). urez.ba je u izradi: bez linka i slike.
export const projects = [
  { slug: 'mrt', name: 'mrt.ba', url: 'https://mrt.ba', image: '/project-mrt.webp' },
  { slug: 'smarttime', name: 'SmartTime', url: 'https://smarttime.ba', image: '/project-smarttime.webp' },
  { slug: 'urez', name: 'urez.ba' },
]

const MJESECI = ['januar', 'februar', 'mart', 'april', 'maj', 'juni', 'juli', 'august', 'septembar', 'oktobar', 'novembar', 'decembar']

// Datum bez Intl, da server i preglednik ispišu isto: "18. juni 2026."
export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d}. ${MJESECI[m - 1]} ${y}.`
}

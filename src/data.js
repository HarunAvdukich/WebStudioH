// Zajednički podaci firme: kontakt, spisak radova (za sitemap i provjere) i format datuma.
// Tekst stranica je u src/pocetna.js, src/okvir.js i src/stranice/*.js; brojke i riječi
// klijenata su u src/stranice/radovi.js, svaka brojka sa datumom.

export const contact = {
  email: 'info@hunar.ba',
  phoneDisplay: '060 3000 751',
  phoneHref: 'tel:+387603000751',
  whatsapp: 'https://wa.me/387603000751',
}

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

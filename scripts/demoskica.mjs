// Nova skica sajta za firmu iz hladnog maila: upiše public/demoskica-podaci/<slug>.json
// i ispiše link (hunar.ba/demoskica/<slug>) i tekst maila za tu firmu.
//
//   node scripts/demoskica.mjs "Salon Lana" --grad Tuzla --vrsta ljepota --tel "061 123 456" \
//     --adresa "Ulica 1" --instagram salonlana --zapazanje "Vidjeli smo da termine primate preko Instagrama."
//   node scripts/demoskica.mjs --mail salon-lana       (samo ponovo ispiše mail za postojeću skicu)
//
// Vrste: frizer, ljepota, stomatolog, restoran, radnja, usluge.
// Zapažanje je jedna rečenica o baš toj firmi (svaki mail se piše za firmu, ne šalje se šablon kakav jeste).
// --pitanje zamijeni završno pitanje (npr. kad zapažanje već kaže kako primaju termine).
// Mail namjerno nema poziv na razgovor ni "15 minuta": završava otvorenim pitanjem.
// Podaci firme idu u javni repo, pa upisuj samo ono što je javno (ime, grad, adresa, javni telefon).
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

export const VRSTE = ['frizer', 'ljepota', 'stomatolog', 'restoran', 'radnja', 'usluge']
export const MAPA = 'public/demoskica-podaci'
const POLJA = ['grad', 'vrsta', 'tel', 'adresa', 'instagram', 'oznaka', 'naslov', 'uvod', 'boja']

export function slugOd(ime) {
  return ime.toLowerCase()
    .replace(/đ/g, 'dj').normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48)
}

export const link = (slug) => `https://hunar.ba/demoskica/${slug}`

const KORIST = {
  frizer: 'Na skici klijenti vide usluge i cijene i sami zakažu slobodan termin, i dok Vi radite i ne stižete odgovarati na poruke.',
  ljepota: 'Na skici klijentice vide tretmane i cijene i same zakažu slobodan termin, i dok Vi radite i ne stižete odgovarati na poruke.',
  stomatolog: 'Na skici pacijenti vide usluge i okvirne cijene i sami zatraže termin pregleda, bez čekanja da se neko javi na telefon.',
  restoran: 'Na skici gosti vide meni i cijene i rezervišu sto u par klikova.',
  radnja: 'Na skici kupci vide izdvojene artikle sa cijenama i pošalju narudžbu jednom porukom.',
  usluge: 'Na skici kupci vide šta radite i pošalju upit sa opisom posla, a Vi im javite cijenu i termin.'
}
const PITANJE = {
  frizer: 'Kako danas najčešće primate termine: telefonom, porukama ili preko Instagrama?',
  ljepota: 'Kako danas najčešće primate termine: telefonom, porukama ili preko Instagrama?',
  stomatolog: 'Kako pacijenti danas najčešće zakazuju kod Vas?',
  restoran: 'Kako gosti danas najčešće rezervišu kod Vas?',
  radnja: 'Odakle Vam danas dolazi najviše narudžbi?',
  usluge: 'Kako Vas kupci danas najčešće pronađu?'
}

export function mail(f, slug, zapazanje = '', pitanje = '') {
  const tijelo = [
    'Poštovani,',
    `napravili smo skicu sajta za ${f.ime}, da vidite kako bi mogao izgledati:\n${link(slug)}`,
    [zapazanje.trim(), KORIST[f.vrsta]].filter(Boolean).join(' '),
    'Skica je besplatna i ne obavezuje Vas ni na šta. Tekst, boje, usluge i cijene mijenjamo po Vašoj želji, a slike dodajemo Vaše.',
    pitanje.trim() || PITANJE[f.vrsta],
    'Lijep pozdrav,\nHunar\nhunar.ba · +387 60 300 0751'
  ]
  return { predmet: `Skica sajta za ${f.ime}`, tijelo: tijelo.join('\n\n') }
}

const tekst = (x) => (typeof x === 'string' ? x : '')

function argumenti(argv) {
  const a = { _: [] }
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const k = argv[i].slice(2)
      a[k] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true
    } else a._.push(argv[i])
  }
  return a
}

function ispisi(f, slug, zapazanje, pitanje) {
  const m = mail(f, slug, zapazanje, pitanje)
  console.log(`\nLink: ${link(slug)}\nProba lokalno: /demoskica.html?f=${slug}\n`)
  console.log(`Predmet: ${m.predmet}\n\n${m.tijelo}\n`)
}

function glavno() {
  const a = argumenti(process.argv.slice(2))
  if (a.mail) {
    const slug = String(a.mail)
    const put = join(MAPA, `${slug}.json`)
    if (!existsSync(put)) { console.error(`Nema ${put}`); process.exit(1) }
    ispisi(JSON.parse(readFileSync(put, 'utf8')), slug, tekst(a.zapazanje), tekst(a.pitanje))
    return
  }
  const ime = a._[0]
  if (!ime || !VRSTE.includes(a.vrsta)) {
    console.error('Upotreba: node scripts/demoskica.mjs "Ime firme" --grad Grad --vrsta ' + VRSTE.join('|') +
      ' [--tel] [--adresa] [--instagram] [--oznaka] [--boja #rrggbb] [--zapazanje "..."] [--pitanje "...?"] [--slug] [--prepisi]')
    process.exit(1)
  }
  const slug = typeof a.slug === 'string' ? a.slug : slugOd(ime)
  const f = { ime }
  for (const k of POLJA) if (typeof a[k] === 'string') f[k] = a[k]
  mkdirSync(MAPA, { recursive: true })
  const put = join(MAPA, `${slug}.json`)
  if (existsSync(put) && !a.prepisi) { console.error(`${put} već postoji (dodaj --prepisi)`); process.exit(1) }
  writeFileSync(put, JSON.stringify(f, null, 2) + '\n')
  console.log(`Upisano: ${put}`)
  ispisi(f, slug, tekst(a.zapazanje), tekst(a.pitanje))
  console.log('Skica je živa tek kad se objavi (commit, PR, "objavi").')
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) glavno()

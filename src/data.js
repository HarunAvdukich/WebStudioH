// Sadržaj stranice (bosanski). Brojke imaju izvor u komentaru; prije objave se mjere ponovo.

export const services = [
  {
    n: '01',
    t: 'WooCommerce web trgovine',
    d: 'Trgovine sa katalogom, filterima i korpom koje rade na telefonu. Pouzeće i uplata na račun, a kartice uz ugovor sa procesorom plaćanja.',
    delay: 0,
  },
  {
    n: '02',
    t: 'Povezivanje sa bh. tržištem',
    d: 'Artikli se sami objavljuju na OLX-u, katalog ide u feed za Ananas, a cijene i zalihe se preuzimaju od dobavljača. Po potrebi i B2B portal za veleprodaju.',
    delay: 70,
  },
  {
    n: '03',
    t: 'Održavanje, hosting i nadzor',
    d: 'Ažuriranja, sigurnosne kopije, keš i nadzor maila i narudžbi, da trgovina radi i kad niko ne gleda.',
    delay: 140,
  },
  {
    n: '04',
    t: 'SEO i brzina',
    d: 'Tehnički SEO, opisi kategorija i podešavanje brzine, da vas kupci nađu na Googleu i ne odustanu dok se stranica učitava.',
    delay: 0,
  },
  {
    n: '05',
    t: 'AI alati',
    d: 'Urednik u administraciji kojem kažete šta da promijeni i opisi proizvoda pisani za vaš katalog.',
    delay: 70,
  },
  {
    n: '06',
    t: 'Prezentacijske stranice',
    d: 'Stranice za firme i udruženja, na WordPressu ili po mjeri, koje sami uređujete.',
    delay: 140,
  },
]

export const process = [
  {
    n: '01',
    t: 'Otkrivanje',
    d: 'Upoznajemo vaše poslovanje, ciljeve i publiku, zatim mapiramo idealnu strukturu vaše stranice.',
    delay: 0,
  },
  {
    n: '02',
    t: 'Dizajn',
    d: 'Kreiramo interfejs u skladu s brendom, a vaše povratne informacije oblikuju svaki ekran.',
    delay: 90,
  },
  {
    n: '03',
    t: 'Izrada',
    d: 'Razvijamo brzu, responzivnu i SEO spremnu stranicu s čistim, skalabilnim kodom.',
    delay: 180,
  },
  {
    n: '04',
    t: 'Lansiranje',
    d: 'Testiramo, optimiziramo i puštamo u rad, a zatim ostajemo uz vas dok rastete.',
    delay: 270,
  },
]

export const whyUs = [
  {
    n: '01',
    t: 'Čist, promišljen dizajn',
    d: 'Svaki element zaslužuje svoje mjesto. Bez nereda, bez šablona, samo jasnoća koja odmah gradi povjerenje.',
    delay: 0,
  },
  {
    n: '02',
    t: 'Performanse po standardu',
    d: 'Keš, optimizirane slike i čist kod. Početna mrt.ba odgovara za 52 ms.',
    delay: 80,
  },
  {
    n: '03',
    t: 'Jasna komunikacija',
    d: 'Jedna kontakt osoba, iskreni rokovi i nula žargona, od početka do lansiranja i nakon toga.',
    delay: 160,
  },
  {
    n: '04',
    t: 'Građeno da osvaja klijente',
    d: 'Svaka stranica je građena oko konverzije, tako da više vaših posjetilaca postaje stvarni upiti.',
    delay: 240,
  },
]

// Izvor: mrt.ba produkcija (wp post list, mrolx_listings) i Lighthouse 12 na računaru,
// medijan tri mjerenja, 27. 9. 2026: 7.460 artikala, 4.373 aktivna OLX oglasa,
// odziv servera 52 ms, mrt.ba 87, SmartTime 89; webstudioh 98 (jedno mjerenje).
export const homeStats = [
  { num: '7.400', sfx: '+', label: 'Artikala na mrt.ba' },
  { num: '4.300', sfx: '+', label: 'OLX oglasa, sinhronizovano' },
  { num: '52', sfx: ' ms', label: 'Odziv servera, mrt.ba' },
]

export const aboutStats = [
  ...homeStats,
  { num: '98', sfx: '', label: 'PageSpeed ove stranice, računar' },
]

// Dokaz koji se ne ponavlja sa heroja. Izvor: Lighthouse (medijan tri mjerenja) i
// smarttime.ba Store API, 27. 9. 2026.
export const proofStats = [
  { label: 'PageSpeed mrt.ba, računar', value: '87' },
  { label: 'PageSpeed SmartTime, računar', value: '89' },
  { label: 'Brendova na SmartTime', value: '15+' },
  { label: 'Modela na SmartTime', value: '500+' },
]

// Isti artikal na mrt.ba i na OLX-u. Oglas je objavio OLX dodatak trgovine, bez
// ručnog unosa. Snimljeno 27. 9. 2026; slike i porijeklo u public/proof-*.webp.
export const syncProof = {
  product: 'Samohodna kosilica Stiga Combi 53 SQ',
  price: '799 KM',
  date: '27. 9. 2026.',
  shop: { image: '/proof-mrt-artikal.webp', source: 'mrt.ba', code: 'Šifra MRT003420' },
  olx: { image: '/proof-olx.webp', source: 'OLX', code: 'Oglas 79608162' },
}

export const projects = [
  {
    slug: 'mrt',
    name: 'mrt.ba',
    tag: 'Alati i oprema · WooCommerce',
    url: 'https://mrt.ba',
    image: '/project-mrt.webp',
    variant: 'shop',
    summary: 'Web trgovina alata, mašina i opreme sa 7.400+ artikala, povezana sa OLX-om.',
    overview:
      'mrt.ba je trgovina alata, mašina, vrtne i poljoprivredne opreme. Izgradili smo WooCommerce trgovinu koja preuzima katalog od više dobavljača, sama objavljuje artikle na OLX-u i ima feed za Ananas. Veleprodajni kupci imaju svoj B2B portal, a vlasnik sadržaj mijenja preko AI urednika u administraciji.',
    highlights: [
      '7.400+ artikala u 278 kategorija',
      'Automatska sinhronizacija sa OLX-om, 4.300+ aktivnih oglasa',
      'Uvoz kataloga od više dobavljača',
      'B2B portal za veleprodaju',
      'Feed za Ananas',
      'AI urednik u administraciji',
      'Odziv servera 52 ms, PageSpeed 87 na računaru',
    ],
  },
  {
    slug: 'smarttime',
    name: 'SmartTime',
    tag: 'E-trgovina · WooCommerce',
    url: 'https://smarttime.ba',
    image: '/project-smarttime.webp',
    variant: 'shop',
    summary: 'Web trgovina satova s prodajom, graviranjem i servisom.',
    overview:
      'SmartTime je online trgovina satova za bh. tržište. Izgradili smo brzu WooCommerce trgovinu s preglednim katalogom, filterima i sigurnom naplatom, te posebnim stranicama za usluge graviranja i popravke, a sve se jednostavno uređuje samostalno.',
    // Izvor: smarttime.ba, 27. 9. 2026: 17 brendova na početnoj, 527 artikala (Store API X-WP-Total).
    highlights: [
      '15+ brendova · 500+ modela',
      'Graviranje i servis satova',
      'Sigurna WooCommerce naplata',
      'PageSpeed 89 na računaru',
    ],
  },
  {
    slug: 'urez',
    name: 'urez.ba',
    tag: 'Vlastita trgovina · u izradi',
    variant: 'shop',
    summary: 'Trgovina personalizovanih graviranih proizvoda.',
    overview:
      'urez.ba je naša vlastita trgovina personalizovanih graviranih proizvoda, trenutno u izradi.',
    highlights: [
      'Personalizovani gravirani proizvodi',
      'Vlastita trgovina WebStudioH',
      'Uskoro online',
    ],
  },
  {
    slug: 'uptos',
    name: 'UPTOS Breza',
    tag: 'Udruženje · Web stranica',
    url: 'https://uptos.netlify.app',
    image: '/project-uptos.webp',
    variant: 'portfolio',
    summary: 'Web stranica udruženja pedagoga tjelesnog odgoja i sporta.',
    overview:
      'UPTOS Breza je Udruženje pedagoga tjelesnog odgoja i sporta. Napravili smo modernu, preglednu web stranicu koja predstavlja rad udruženja, najavljuje takmičenja, škole skijanja i događaje, uz galeriju i kontakt formu.',
    highlights: [
      'Prezentacija udruženja',
      'Događaji i takmičenja',
      'Galerija i novosti',
      'Kontakt forma',
    ],
  },
]

export const pricing = [
  {
    name: 'Web trgovina',
    blurb: 'Za prodavnice koje žele prodavati online, ozbiljno i bez komplikacija.',
    priceLabel: 'Cijena',
    price: 'Po dogovoru',
    features: [
      'Kompletna WooCommerce trgovina',
      'Katalog, filteri i korpa',
      'Pouzeće i uplata na račun',
      '30 dana podrške nakon lansiranja',
    ],
    cta: 'Zatraži ponudu',
    featured: true,
    badge: 'Preporučeno',
  },
  {
    name: 'Trgovina + bh. integracije',
    blurb: 'Za prodavnice koje prodaju i na OLX-u i rade sa više dobavljača.',
    priceLabel: 'Cijena',
    price: 'Po dogovoru',
    features: [
      'Sve iz paketa Web trgovina, plus:',
      'Automatska sinhronizacija sa OLX-om',
      'Feed za Ananas',
      'Uvoz kataloga od dobavljača',
      'B2B portal za veleprodaju, po potrebi',
    ],
    cta: 'Zatraži ponudu',
    featured: false,
  },
  {
    name: 'Prezentacijska stranica',
    blurb: 'Za firme i udruženja kojima treba uredna i brza stranica.',
    priceLabel: 'Cijena',
    price: 'Po dogovoru',
    features: [
      'Do 5 stranica',
      'Responzivan dizajn, mobilno prvo',
      'Kontakt forma',
      'Osnovni SEO',
    ],
    cta: 'Započni projekat',
    featured: false,
  },
]

export const maintenance = {
  eyebrow: 'Poslije lansiranja',
  title: 'Mjesečno održavanje, po dogovoru.',
  items: [
    'Ažuriranja WordPressa i dodataka',
    'Redovne sigurnosne kopije',
    'Keš i praćenje brzine',
    'Nadzor maila i narudžbi',
    'Manje izmjene sadržaja',
    'Pomoć kad nešto zapne',
  ],
}

export const valueProps = [
  'WooCommerce',
  'OLX sinhronizacija',
  'Uvoz od dobavljača',
  'Mobilno prvo',
  'Održavanje',
]

export const contact = {
  email: 'info@webstudioh.ba',
  phoneDisplay: '060 3000 751',
  phoneHref: 'tel:+387603000751',
  whatsapp: 'https://wa.me/387603000751',
  whatsappText: 'Zdravo! Zanima me izrada web trgovine.',
}

export const navLinks = [
  { label: 'O nama', to: '/o-nama' },
  { label: 'Usluge', to: '/usluge' },
  { label: 'Radovi', to: '/radovi' },
  { label: 'Cijene', to: '/cijene' },
  { label: 'Savjeti', to: '/savjeti' },
  { label: 'Kontakt', to: '/kontakt' },
]

// Recenzija ide ovdje tek kad je klijent potvrdi: tačno potvrđen tekst i ime,
// sa `approved: true`. Oblik: { quote, name, role, initials, project, approved }.
// Potvrđene 27. 9. 2026. (javio vlasnik WebStudioH); potpis je naziv firme dok
// klijent ne kaže drugačije.
export const testimonials = [
  {
    quote:
      'Trebala nam je trgovina koja može nositi hiljade artikala i sama ih držati ažurnim na OLX-u. Danas imamo preko 7.400 artikala, oglasi se sami ažuriraju, a sadržaj mijenjamo i sami iz administracije.',
    name: 'mrt.ba',
    role: 'Trgovina alata i opreme',
    initials: 'MR',
    project: 'mrt',
    approved: true,
  },
  {
    quote:
      'Web trgovina izgleda profesionalno, a kupci na telefonu lako pronađu i naruče sat. Uz katalog od preko 500 modela imamo i posebne stranice za graviranje i servis.',
    name: 'SmartTime',
    role: 'Trgovina satova',
    initials: 'ST',
    project: 'smarttime',
    approved: true,
  },
  {
    quote:
      'Dobili smo modernu i preglednu stranicu koja predstavlja rad udruženja, takmičenja i škole skijanja na jednom mjestu. Komunikacija tokom izrade je bila jednostavna.',
    name: 'UPTOS Breza',
    role: 'Udruženje pedagoga',
    initials: 'UB',
    project: 'uptos',
    approved: true,
  },
]

export function onlyApproved(list) {
  return list.filter((t) => t.approved === true)
}

export const publishedTestimonials = onlyApproved(testimonials)

export const values = [
  {
    n: '01',
    t: 'Kvalitet bez kompromisa',
    d: 'Svaki projekt tretiramo kao vlastiti, do posljednjeg detalja i bez prečica.',
  },
  {
    n: '02',
    t: 'Transparentnost',
    d: 'Jasne ponude, iskreni rokovi i redovne informacije o napretku, bez iznenađenja.',
  },
  {
    n: '03',
    t: 'Partnerstvo',
    d: 'Ne isporučimo pa nestanemo. Ostajemo uz vas i nakon lansiranja, dok rastete.',
  },
  {
    n: '04',
    t: 'Rezultati',
    d: 'Lijep dizajn je tek početak; pravi cilj su upiti, prodaja i rast vašeg poslovanja.',
  },
]

export const faqServices = [
  {
    q: 'Koliko traje izrada web stranice?',
    a: 'Većina projekata je gotova za 3 do 6 sedmica, zavisno od obima i broja stranica. Tačan rok dogovaramo nakon uvodnog razgovora.',
  },
  {
    q: 'Možete li povezati trgovinu sa OLX-om?',
    a: 'Da. Artikli se sami objavljuju na OLX-u, bez ručnog unosa. Na mrt.ba tako radi preko 4.300 oglasa.',
  },
  {
    q: 'Mogu li sam ažurirati sadržaj?',
    a: 'Da. Gradimo na WordPress-u pa lako mijenjate tekst, slike i objave, bez programera. Uz predaju dobijate i kratku obuku.',
  },
  {
    q: 'Radite li i redizajn postojećih stranica?',
    a: 'Naravno. Često preuzimamo zastarjele sajtove i pretvaramo ih u brze, moderne stranice koje bolje konvertuju.',
  },
  {
    q: 'Da li je stranica prilagođena mobitelu?',
    a: 'Svaka stranica je mobilno orijentisana i testirana na svim veličinama ekrana, od telefona do velikih monitora.',
  },
  {
    q: 'Nudite li hosting i domenu?',
    a: 'Da. Možemo preuzeti domenu, hosting i poslovni email, tako da sve radi bez brige s vaše strane.',
  },
]

export const faqPricing = [
  {
    q: 'Zašto nema fiksnih cijena?',
    a: 'Svaki projekt je različit. Cijenu formiramo prema obimu, funkcionalnostima i ciljevima, uvijek transparentno i bez skrivenih troškova.',
  },
  {
    q: 'Kako izgleda plaćanje?',
    a: 'Uobičajeno je avans na početku i ostatak pri lansiranju. Za veće projekte dogovaramo plaćanje po fazama.',
  },
  {
    q: 'Šta ako mi treba izmjena nakon lansiranja?',
    a: 'Manje izmjene su uključene u period podrške; za veće nadogradnje nudimo pristupačne mjesečne planove održavanja.',
  },
  {
    q: 'Da li dobijam vlasništvo nad stranicom?',
    a: 'Da. Stranica i svi materijali su u potpunosti vaši nakon završetka projekta.',
  },
]

const MJESECI = [
  'januar', 'februar', 'mart', 'april', 'maj', 'juni',
  'juli', 'august', 'septembar', 'oktobar', 'novembar', 'decembar',
]

// Deterministic date format (no Intl) so SSR and client output match exactly.
export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d}. ${MJESECI[m - 1]} ${y}.`
}

// Blog posts live as markdown in src/content/posts/, loaded via src/posts.js.

export const includes = [
  'Prilagođen dizajn po mjeri',
  'Responzivan na svim uređajima',
  'Osnovna SEO priprema',
  'SSL certifikat i sigurnost',
  'Obuka za samostalno korištenje',
  '30 dana podrške nakon lansiranja',
]

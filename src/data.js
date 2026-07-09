// Sadržaj (na bosanskom) — preuzet iz Claude Design predloška (Direction A).

export const services = [
  {
    n: '01',
    t: 'Prilagođeni dizajn web stranica',
    d: 'Web stranice po mjeri, fokusirane na konverziju, dizajnirane oko vašeg brenda i klijenata koje želite privući.',
    delay: 0,
  },
  {
    n: '02',
    t: 'WordPress razvoj',
    d: 'Fleksibilne WordPress stranice, jednostavne za upravljanje, koje možete sami ažurirati — bez programera.',
    delay: 70,
  },
  {
    n: '03',
    t: 'WooCommerce web trgovine',
    d: 'Brze i sigurne online trgovine koje prekrasno prikazuju proizvode i pretvaraju posjetioce u kupce.',
    delay: 140,
  },
  {
    n: '04',
    t: 'SEO i optimizacija brzine',
    d: 'Tehnički SEO i podešavanje performansi kako biste bili viši u pretrazi, brže se učitavali i zadržali posjetioce.',
    delay: 0,
  },
  {
    n: '05',
    t: 'Održavanje web stranica',
    d: 'Redovna ažuriranja, sigurnosne kopije i podrška koji vašu stranicu čuvaju sigurnom, aktuelnom i stabilnom.',
    delay: 70,
  },
  {
    n: '06',
    t: 'Hosting i postavljanje domene',
    d: 'Preuzimamo domene, hosting i email tako da sve jednostavno radi — od dana lansiranja nadalje.',
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
    d: 'Kreiramo premium interfejs u skladu s brendom — vaše povratne informacije oblikuju svaki ekran.',
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
    d: 'Testiramo, optimiziramo i puštamo u rad — te ostajemo uz vas kako rastete.',
    delay: 270,
  },
]

export const whyUs = [
  {
    n: '01',
    t: 'Čist, promišljen dizajn',
    d: 'Svaki element zaslužuje svoje mjesto. Bez nereda, bez šablona — samo jasnoća koja odmah gradi povjerenje.',
    delay: 0,
  },
  {
    n: '02',
    t: 'Performanse po standardu',
    d: 'Optimiziran kod i resursi kako bi se vaše stranice brzo učitavale i vodile posjetioce ka akciji.',
    delay: 80,
  },
  {
    n: '03',
    t: 'Jasna komunikacija',
    d: 'Jedna kontakt osoba, iskreni rokovi i nula žargona — od početka do lansiranja i nakon toga.',
    delay: 160,
  },
  {
    n: '04',
    t: 'Građeno da osvaja klijente',
    d: 'Svaka stranica je građena oko konverzije, tako da više vaših posjetilaca postaje stvarni upiti.',
    delay: 240,
  },
]

export const projects = [
  {
    slug: 'smarttime',
    name: 'SmartTime',
    tag: 'E-trgovina · WooCommerce',
    url: 'https://smarttime.ba',
    image: '/project-smarttime.webp',
    variant: 'shop',
    summary: 'Web trgovina satova s prodajom, graviranjem i servisom.',
    overview:
      'SmartTime je online trgovina satova za bh. tržište. Izgradili smo brzu WooCommerce trgovinu s preglednim katalogom, filterima i sigurnom naplatom, te posebnim stranicama za usluge graviranja i popravke — sve jednostavno za samostalno upravljanje.',
    highlights: [
      '16 brendova · 500+ modela',
      'Graviranje i servis satova',
      'Sigurna WooCommerce naplata',
      'Mobilno-orijentisan dizajn',
    ],
  },
  {
    slug: 'motohub',
    name: 'MotoHub',
    tag: 'Moto oprema · WooCommerce',
    // url: (sajt još nije objavljen)
    variant: 'shop',
    summary: 'Online trgovina moto opreme, dijelova i dodataka.',
    overview:
      'MotoHub je web trgovina specijalizovana za moto opremu i dijelove. Postavili smo WooCommerce trgovinu s jasnim kategorijama, filterima i sigurnom naplatom, spremnu za rast asortimana i sezonske akcije.',
    highlights: [
      'Kompletna moto oprema',
      'WooCommerce katalog i naplata',
      'Filteri po kategorijama',
      'Spremno za rast asortimana',
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
    name: 'Osnovna web stranica',
    blurb: 'Za male firme kojima treba upečatljiva i kredibilna prisutnost.',
    priceLabel: 'Počevši od',
    price: 'Ponuda po mjeri',
    features: [
      'Do 5 prilagođenih stranica',
      'Responzivan, mobilno-orijentisan dizajn',
      'Osnovno SEO postavljanje',
      'Kontakt forma + postavljanje hostinga',
    ],
    cta: 'Započni projekat',
    featured: false,
  },
  {
    name: 'Poslovna web stranica',
    blurb: 'Za brendove u rastu kojima treba konverzija, rangiranje i skaliranje.',
    priceLabel: 'Počevši od',
    price: 'Ponuda po mjeri',
    features: [
      'Sve iz Osnovne, plus:',
      'Do 12 stranica + WordPress CMS',
      'Napredni SEO i optimizacija brzine',
      'Postavljanje bloga + prioritetna podrška',
    ],
    cta: 'Započni projekat',
    featured: false,
  },
  {
    name: 'Web trgovina',
    blurb: 'Za firme spremne da samouvjereno prodaju online.',
    priceLabel: 'Ponuda po mjeri',
    price: 'Razgovarajmo',
    features: [
      'Kompletna WooCommerce trgovina',
      'Sigurna naplata i plaćanja',
      'Alati za zalihe i dostavu',
      'Plan redovnog održavanja',
    ],
    cta: 'Zatraži ponudu',
    featured: true,
    badge: 'Najpopularnije',
  },
]

export const valueProps = [
  'Prilagođeni dizajn',
  'Brzo učitavanje',
  'SEO spremno',
  'Mobilno prvo',
  'Lako za upravljanje',
]

// TODO: zamijeni broj telefona pravim (WhatsApp + poziv koriste isto).
export const contact = {
  email: 'info@webstudioh.ba',
  phoneDisplay: '060 3000 751',
  phoneHref: 'tel:+387603000751',
  whatsapp: 'https://wa.me/387603000751',
  whatsappText: 'Zdravo! Zanima me izrada web stranice.',
  // TODO: zamijeni pravim Cal.com / Calendly linkom za zakazivanje poziva.
  booking: 'https://cal.com/webstudioh',
}

export const navLinks = [
  { label: 'O nama', to: '/o-nama' },
  { label: 'Usluge', to: '/usluge' },
  { label: 'Radovi', to: '/radovi' },
  { label: 'Cijene', to: '/cijene' },
  { label: 'Savjeti', to: '/savjeti' },
  { label: 'Kontakt', to: '/kontakt' },
]

export const testimonials = [
  {
    quote:
      'Naša web trgovina izgleda profesionalno i radi besprijekorno. Kupci lako pronađu i naruče satove — prodaja je vidljivo porasla.',
    name: 'Rahmedin I.',
    role: 'Vlasnik, SmartTime',
    initials: 'RI',
    project: 'smarttime',
  },
  {
    quote:
      'Brza, uredna i laka za korištenje trgovina. Konačno imamo online prodaju moto opreme na nivou kakav smo željeli.',
    name: 'Mirza B.',
    role: 'Vlasnik, MotoHub',
    initials: 'MB',
    project: 'motohub',
  },
  {
    quote:
      'Dobili smo modernu i preglednu stranicu koja odlično predstavlja naše udruženje. Komunikacija i podrška bili su odlični.',
    name: 'Eldar Z.',
    role: 'Predsjednik, UPTOS Breza',
    initials: 'EZ',
    project: 'uptos',
  },
]

export const values = [
  {
    n: '01',
    t: 'Kvalitet bez kompromisa',
    d: 'Svaki projekt tretiramo kao vlastiti — do posljednjeg detalja, bez prečica.',
  },
  {
    n: '02',
    t: 'Transparentnost',
    d: 'Jasne cijene, iskreni rokovi i redovne informacije o napretku — bez iznenađenja.',
  },
  {
    n: '03',
    t: 'Partnerstvo',
    d: 'Ne isporučimo pa nestanemo — ostajemo uz vas i nakon lansiranja, dok rastete.',
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
    a: 'Većina projekata je gotova za 3–6 sedmica, zavisno od obima i broja stranica. Tačan rok dogovaramo nakon uvodnog razgovora.',
  },
  {
    q: 'Mogu li sam ažurirati sadržaj?',
    a: 'Da. Gradimo na WordPress-u pa lako mijenjate tekst, slike i objave — bez programera. Uz predaju dobijate i kratku obuku.',
  },
  {
    q: 'Radite li i redizajn postojećih stranica?',
    a: 'Naravno. Često preuzimamo zastarjele sajtove i pretvaramo ih u brze, moderne stranice koje bolje konvertuju.',
  },
  {
    q: 'Da li je stranica prilagođena mobitelu?',
    a: 'Svaka stranica je mobilno-orijentisana i testirana na svim veličinama ekrana — od telefona do velikih monitora.',
  },
  {
    q: 'Nudite li hosting i domenu?',
    a: 'Da — možemo preuzeti domenu, hosting i poslovni email, tako da sve radi bez brige s vaše strane.',
  },
]

export const faqPricing = [
  {
    q: 'Zašto nema fiksnih cijena?',
    a: 'Svaki projekt je različit. Cijenu formiramo prema obimu, funkcionalnostima i ciljevima — uvijek transparentno i bez skrivenih troškova.',
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
    a: 'Da — stranica i svi materijali su u potpunosti vaši nakon završetka projekta.',
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

// Blog posts live as markdown in src/content/posts/ — loaded via src/posts.js.

export const includes = [
  'Prilagođen dizajn po mjeri',
  'Responzivan na svim uređajima',
  'Osnovna SEO priprema',
  'SSL certifikat i sigurnost',
  'Obuka za samostalno korištenje',
  '30 dana podrške nakon lansiranja',
]

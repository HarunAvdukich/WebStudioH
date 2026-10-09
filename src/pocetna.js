// Tekst i podaci nove početne ("Kroz znak"). Brojke imaju izvor i datum u tekstu;
// prije objave se mjere ponovo. Glas: studio (mi, Hunar), kupcu se obraća sa "Vi".
// Bez dugih crta. Engleska verzija je u pocetna.en.js, istog oblika.
import { contact } from './data.js'
import { pitanja as pitanjaCijene } from './stranice/cijene.js'
import { radovi as radoviStranice, studija } from './stranice/radovi.js'

// Isti tekst kao na Uslugama (vodič) i O Hunaru (iz jedne ruke, znak), da se ne razilazi.
export { vodic, stepenice } from './stranice/usluge.js'
export { ruka, znak } from './stranice/o-hunaru.js'

export const jezik = 'bs'
export const put = '/'

export const whatsappPoruka = 'Zdravo, imam firmu i zanima me web stranica. Možemo li se čuti?'
export const whatsappLink = `${contact.whatsapp}?text=${encodeURIComponent(whatsappPoruka)}`

export const meni = [
  { naziv: 'Usluge', put: '/usluge' },
  { naziv: 'Radovi', put: '/radovi' },
  { naziv: 'Cijene', put: '/cijene' },
  { naziv: 'O Hunaru', put: '/o-nama' },
  { naziv: 'Savjeti', put: '/savjeti' },
  { naziv: 'Kontakt', put: '/kontakt' },
]

// Prelaz na drugi jezik (zaglavlje i meni na telefonu).
export const drugiJezik = { oznaka: 'EN', naziv: 'English', jezik: 'en', put: '/en' }

// Stalni natpisi na stranici.
export const ui = {
  dugme: 'Pišite nam na WhatsApp',
  dugmeKratko: 'Pišite nam',
  prica: 'Hunar, web stranice i trgovine za firme u BiH',
  glavniMeni: 'Glavni meni',
  otvoriMeni: 'Otvori meni',
  zatvoriMeni: 'Zatvori meni',
  meniTelefon: 'Meni',
  podnozjeMeni: 'Podnožje',
  skrol: 'Skrolajte',
  sklopljeno: 'sklopljeno',
  izradio: 'Izradio',
  privatnost: { naziv: 'Politika privatnosti', put: '/politika-privatnosti' },
  kontakt: { whatsapp: 'WhatsApp', veznik: 'i', telefon: 'telefon' },
  telefon: contact.phoneDisplay,
  poglavlja: 'Poglavlja priče',
  uvecaj: 'Uvećaj',
}

export const seo = {
  naslov: 'Izrada web stranica i web trgovina u BiH · Hunar',
  // Počinje imenom, da Google i AI asistenti čitaju Hunar kao firmu (vidi o-hunaru.js).
  opis: 'Hunar je web studio iz BiH. Pravimo web stranice, web shopove i sisteme po mjeri, povezane sa OLX-om, Ananasom i dobavljačima, i održavamo ih.',
}

// Prvi ekran: "Radimo [riječ] za firme u BiH." Riječ se smjenjuje kroz osam usluga
// (odluka vlasnika od 2. 10. 2026), a desno ili ispod je živ primjer te usluge.
export const prvi = {
  primamo: 'Primamo nove projekte',
  // Ko dođe sa trgovine koju smo napravili (referrer ili ?od= u potpisu "Izradio Hunar").
  pozdrav: 'Sa {izvor}? Tu trgovinu smo mi napravili',
  izvori: { 'mrt.ba': '/radovi/mrt', 'smarttime.ba': '/radovi/smarttime' },
  radimo: 'Radimo',
  zaFirme: 'za firme u BiH.',
  poruka: 'Poruka:',
  zanima: 'Zanima me {usluga}',
  waPoruka: 'Zdravo, zanima me {usluga}. Možemo li se čuti?',
  kliknite: 'kliknite primjer',
  dodirnite: 'dodirnite primjer',
  primjer: 'Primjer usluge, ilustracija. Klik pokrene primjer ponovo.',
  pokazi: 'Pokaži: {usluga}',
  listajte: 'Listajte',
}

// Osam usluga: riječ u naslovu, ime, oblik za poruku i kratak opis za "Šta pravimo".
// Mobilne aplikacije i redizajn se nude, ali se ne predstavljaju kao urađen posao.
export const usluge = [
  { id: 'stranica', rijec: 'web stranice', ime: 'Web stranice', uPoruci: 'web stranica', opis: 'Da vas kupci nađu i shvate za pola minute.' },
  { id: 'shop', rijec: 'web shop', ime: 'Web shop', uPoruci: 'web shop', opis: 'Radnja koja je otvorena i kad ste vi zatvorili. Može i uz OLX.' },
  { id: 'aplikacija', rijec: 'mobilne aplikacije', ime: 'Mobilne aplikacije', uPoruci: 'mobilna aplikacija', opis: 'Vaša aplikacija na telefonima kupaca, sa obavijestima.' },
  { id: 'seo', rijec: 'SEO optimizaciju', ime: 'SEO optimizacija', uPoruci: 'SEO optimizacija', opis: 'Da vas nađu na Googleu kad traže ono što radite.' },
  { id: 'termini', rijec: 'online rezervacije', ime: 'Online rezervacije', uPoruci: 'online rezervacije', opis: 'Kupac sam rezerviše termin, i kad ste zatvoreni.' },
  { id: 'chatbot', rijec: 'AI chatbot', ime: 'AI chatbot', uPoruci: 'AI chatbot', opis: 'Asistent koji kupcima odgovara na stranici, i noću.' },
  { id: 'redizajn', rijec: 'redizajn stranica', ime: 'Redizajn stranica', uPoruci: 'redizajn stranice', opis: 'Imate staru stranicu? Napravimo je novom, brzom i jasnom.' },
  { id: 'odrzavanje', rijec: 'održavanje i hosting', ime: 'Održavanje i hosting', uPoruci: 'održavanje i hosting', opis: 'Stranica je gotova tek kad radi i sutra.' },
]

// Tekst unutar živih primjera (ilustracije, ne urađeni projekti). Dodir ili klik pokrene
// primjer ponovo; liste daju novu varijantu svaki put.
export const primjeri = {
  stranica: { oznaka: 'Web stranica', dugme: 'Pišite nam na WhatsApp' },
  shop: { oznaka: 'Web shop', korpa: 'Korpa', placanje: ['Pouzeće ✓', 'Uplata na račun ✓', 'OLX ✓'] },
  aplikacija: {
    oznaka: 'Mobilna aplikacija',
    obavijesti: [['Nova narudžba ✓', '2 artikla, dostava'], ['Termin sutra u 10:00', 'podsjetnik'], ['Paket je poslan ✓', 'stiže sutra']],
    uredjaji: ['iPhone ✓', 'Android ✓', 'Obavijesti ✓'],
  },
  seo: {
    oznaka: 'SEO, da vas nađu na Googleu',
    pretrage: [['frizer Sarajevo', 'frizerski salon'], ['auto servis Tuzla', 'auto servis'], ['pekara Mostar', 'pekara']],
    adresa: 'vasafirma.ba',
    firma: 'Vaša firma · {djelatnost}',
    dugmad: ['Pozovite', 'Upute', 'Rezervišite'],
  },
  termini: { oznaka: 'Online rezervacije', sati: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'], zauzeti: [1, 4], potvrda: 'Rezervisano ✓ utorak, {sat}' },
  chatbot: {
    oznaka: 'AI chatbot',
    razgovori: [
      ['Imate li kosilicu do 400 KM?', 'Imamo nekoliko. Evo jedne sa 46 cm i dostavom na adresu.'],
      ['Imate li dostavu?', 'Da, šaljemo na adresu u cijeloj BiH.'],
      ['Mogu li platiti pouzećem?', 'Možete. Plaćate kad paket stigne.'],
    ],
  },
  redizajn: { oznaka: 'Redizajn stranice', prije: 'Prije', poslije: 'Poslije', dugme: 'Pišite nam' },
  odrzavanje: {
    oznaka: 'Održavanje i hosting',
    redovi: [['Stranica', 'radi'], ['Sigurnosna kopija', 'danas'], ['Ažuriranja', 'uredno']],
    kopija: 'upravo',
  },
}

// Imena poglavlja; kad počinju, određuje POGLAVLJA u motor.js.
export const poglavlja = [
  { broj: '01', ime: 'Hunar' },
  { broj: '02', ime: 'U: šta dobijate' },
  { broj: '03', ime: 'Iz u u n' },
  { broj: '04', ime: 'N: kako radi' },
  { broj: '05', ime: 'Potpis' },
]

export const uNajava = {
  nad: 'U · šta dobijate',
  naslov: 'Sve što vaša firma treba na webu. Složeno kao sat.',
  opis: 'Svaki dio ovog sata je jedna usluga. Uzmite jedan dio ili cijeli sklop, a mi pazimo da sve radi zajedno.',
}

// y: položaj dijela na rastavljenom kadru (udio visine), strana: L lijevo, D desno,
// pomak: fino pomjeranje kartice u pikselima na visini kadra od 820 px.
export const sat = {
  kanal: 'U · šta dobijate · svaki dio je jedna usluga',
  kanalKratko: 'U · šta dobijate',
  kadrovi: '/kadrovi/sat/',
  broj: 124,
  alt: 'Sat Seiko 5 sa smarttime.ba se sklapa iz dijelova, ilustracija',
  // Osam usluga (R13, odluka vlasnika od 2. 10. 2026), isti spisak kao na prvom ekranu.
  oznake: [
    { y: 0.215, strana: 'L', pomak: 0, naslov: 'Web stranice', opis: 'Usluge, kontakt i mapa na jednom mjestu. Tekst mijenjate sami, bez programera.' },
    { y: 0.305, strana: 'D', pomak: -30, naslov: 'Web shop', opis: 'Kupac naruči sa telefona u par dodira. Oglasi na OLX-u se ažuriraju sami.' },
    { y: 0.4175, strana: 'L', pomak: 0, naslov: 'Mobilne aplikacije', opis: 'Vaša aplikacija za Android i iPhone, sa obavijestima kupcima.' },
    { y: 0.4175, strana: 'D', pomak: 34, naslov: 'SEO optimizacija', opis: 'Kupci vas nađu na Googleu, a stranica se otvori prije nego što odustanu.' },
    { y: 0.5675, strana: 'L', pomak: 10, naslov: 'Online rezervacije', opis: 'Kupac sam bira uslugu i termin, i kad ste zatvoreni.' },
    { y: 0.5675, strana: 'D', pomak: 40, naslov: 'AI chatbot', opis: 'Asistent koji kupcima odgovara na stranici, i noću.' },
    { y: 0.725, strana: 'L', pomak: 20, naslov: 'Redizajn stranica', opis: 'Staru stranicu pretvorimo u novu: brzu, jasnu i laku za izmjene.' },
    { y: 0.725, strana: 'D', pomak: 50, naslov: 'Održavanje i hosting', opis: 'Ažuriranja, kopije i nadzor. Vi prodajete, mi pazimo da sve radi.' },
  ],
  lista: {
    naslov: 'Sklapamo vašu firmu:',
    stavke: ['Web stranice', 'Web shop', 'Mobilne aplikacije', 'SEO optimizacija', 'Online rezervacije', 'AI chatbot', 'Redizajn stranica', 'Održavanje i hosting'],
  },
  kraj: {
    naslov: 'Radi kao sat.',
    opis: 'Stranica, trgovina, veze i održavanje iz istih ruku. Kad nešto zatreba, zovete jedan broj, a ne tri firme.',
    uz: 'smarttime.ba je trgovina satova koju smo napravili: 526 ručnih satova u katalogu (29. 9. 2026), narudžba sa telefona i termin za graviranje.',
  },
  // Poslije sklapanja sat pređe u pravu stranicu tog artikla na smarttime.ba.
  sajt: {
    naslov: 'Isti sat, uživo na smarttime.ba.',
    opis: 'Seiko 5 SNKE01K1, sa fotografijama iz radnje. Kupac ga pogleda na telefonu i naruči u par dodira.',
    izvor: 'Snimak ekrana sa telefona, smarttime.ba, 30. 9. 2026.',
    slika: '/kadrovi/smarttime-telefon.webp',
    alt: 'Stranica sata Seiko 5 SNKE01K1 na smarttime.ba, snimak ekrana sa telefona',
  },
}

export const prelaz = {
  nad: 'Iz u u n',
  naslov: 'Obećati je lako. Evo trgovine na kojoj sve ovo radi svaki dan.',
}

export const nNajava = {
  nad: 'N · stvarna trgovina, stvarni brojevi',
  naslov: 'Hiljade artikala na mrt.ba. OLX oglasi se objavljuju sami.',
  opis: 'Ovu Villager kosilicu smo uzeli iz njihovog kataloga i rastavili je. Svaki njen dio je jedan dio sistema koji smo napravili za mrt.ba.',
}

export const kosilica = {
  kanal: 'N · kako radi na mrt.ba · svaki dio je dio sistema',
  kanalKratko: 'N · kako radi na mrt.ba',
  kadrovi: '/kadrovi/kosilica/',
  broj: 124,
  alt: 'Kosilica Villager EAGLE 6111 V sa mrt.ba se sklapa iz dijelova, ilustracija',
  oznake: [
    { y: 0.13, strana: 'L', pomak: 0, naslov: 'Upravljanje', opis: 'Vlasnik sam mijenja sadržaj, uz AI urednika. Veleprodaja naručuje preko B2B portala.' },
    { y: 0.35, strana: 'L', pomak: 0, naslov: 'Korpa', opis: 'Kupac naruči sa telefona: pouzeće ili uplata na račun.' },
    { y: 0.5, strana: 'D', pomak: 0, naslov: 'Dobavljači', opis: 'Cijene i zalihe stižu same od više dobavljača, bez prepisivanja.' },
    { y: 0.64, strana: 'L', pomak: 0, naslov: 'Katalog', opis: '7.460 artikala u 278 kategorija, provjereno 29. 9. 2026.' },
    { y: 0.865, strana: 'L', pomak: 10, naslov: 'OLX i Ananas', opis: '4.453 OLX oglasa se sami objavljuju i ažuriraju, 29. 9. 2026. Katalog ide i na Ananas.' },
    { y: 0.865, strana: 'D', pomak: -20, naslov: 'Brzina', opis: 'Server odgovori za 52 ms, mjereno 27. 9. 2026. Kupac ne čeka.' },
  ],
  lista: {
    naslov: 'Sistem za mrt.ba:',
    stavke: ['Katalog', 'Korpa', 'Dobavljači', 'OLX i Ananas', 'Brzina', 'Upravljanje'],
  },
  kraj: {
    naslov: 'Sklopljeno. I prodaje.',
    opis: 'mrt.ba radi od 6. 9. 2026. Šta kažu oni:',
    citat: '„Oglasi se sami ažuriraju, a sadržaj mijenjamo i sami iz administracije.“',
    citatOd: 'mrt.ba, trgovina alata i opreme',
  },
  // Poslije sklapanja kosilica pređe u pravu stranicu tog artikla na mrt.ba.
  sajt: {
    naslov: 'Ista kosilica, uživo na mrt.ba.',
    opis: 'Kupac je nađe na telefonu, sa slikama, opisom i stanjem na lageru. Cijena i zaliha stižu same od dobavljača.',
    izvor: 'Snimak ekrana sa telefona, mrt.ba, 30. 9. 2026.',
    slika: '/kadrovi/mrt-telefon.webp',
    alt: 'Stranica kosilice Villager EAGLE 6111 V na mrt.ba, snimak ekrana sa telefona',
  },
}

// Potpis "Izradio Hunar" stoji u podnožju ovih trgovina; redovi vode na rad.
export const potpis = {
  tekst: 'Naš potpis stoji na dnu ovih trgovina. Sljedeći može stajati na vašoj.',
  radovi: [
    { naziv: 'mrt.ba', put: '/radovi/mrt', opis: 'Alati, kosilice i dijelovi. Katalog, korpa, OLX i Ananas.' },
    { naziv: 'smarttime.ba', put: '/radovi/smarttime', opis: 'Ručni satovi. Narudžbe i zakazivanje graviranja.' },
  ],
  vise: 'Pogledajte rad',
}

export const finale = {
  naslov: 'Vaša firma je sljedeća.',
  ili: 'ili nazovite',
  opis: 'Napišite nam šta prodajete i šta vam treba. Javljamo se lično, a ponudu dajemo u razgovoru.',
  ispod: 'Krenite od jednog dijela ili tražite cijeli sklop. Cijene su po dogovoru, prema onome što vam treba.',
  ponuda: [
    { naslov: 'Web stranice', opis: 'Firma koju kupci nađu i razumiju za pola minute. Tekst mijenjate sami.' },
    { naslov: 'Web shop', opis: 'Katalog, filteri i korpa na telefonu. Pouzeće, uplata na račun i OLX veza.' },
    { naslov: 'Mobilne aplikacije', opis: 'Aplikacija za Android i iPhone, za vaše kupce ili za vaš tim.' },
    { naslov: 'SEO optimizacija', opis: 'Brzina, naslovi i Google Search Console. Mjerimo i pokažemo sa datumom.' },
    { naslov: 'Online rezervacije', opis: 'Kupac sam bira uslugu i termin. Vi dobijete obavijest.' },
    { naslov: 'AI chatbot', opis: 'Asistent na stranici koji odgovara kupcima, i kad vi ne stignete.' },
    { naslov: 'Redizajn stranica', opis: 'Pošaljite link stare stranice, a mi kažemo šta bismo promijenili i zašto.' },
    { naslov: 'Održavanje i hosting', opis: 'Ažuriranja, kopije i nadzor. Isti studio koji je pravio i popravlja.' },
  ],
}

export const podnozje = {
  opis: 'Hunar je web studio iz Bosne i Hercegovine. Pravimo web stranice, trgovine i sisteme za firme u BiH; dizajn, kod, hosting i održavanje iz jedne ruke.',
  znacenje: 'hunar: vještina, umijeće',
}

// ---------- početna na telefonu (i bez JavaScripta): stranica teče, bez priče u slovu ----------

// Linija priče gore: šest poglavlja; ime se okrene, crtica se puni.
export const linija = ['Hunar', 'Šta pravimo', 'O nama', 'Ponuda', 'Radovi', 'Vaša firma']

export const sta = {
  nad: 'Šta pravimo',
  naslov: 'Sve što vaša firma treba na webu.',
  opis: 'Krenite od jednog dijela, a sljedeći dodajte kad posao poraste.',
  pitaj: { dugme: 'Pitajte za ovo', poruka: 'Zdravo, zanima me {usluga}. Možemo li se čuti?' },
}

// Film: stranica zastane dok se predmet sklopi, a ispod se smjenjuju kartice.
export const film = {
  listajte: 'Listajte dalje',
  sklopljeno: '{n}% sklopljeno',
  sat: {
    oznaka: 'Složeno kao sat',
    kartice: [
      { naslov: 'Dizajn po mjeri', opis: 'Izgled koji liči na vašu firmu, a ne na hiljadu drugih.' },
      { naslov: 'Stranica i trgovina', opis: 'Kupac nađe artikal na telefonu i naruči u par dodira.' },
      { naslov: 'Veze koje rade same', opis: 'OLX, Ananas i dobavljači. Navija se sam, kao automatik.' },
      { naslov: 'Sve iz jedne ruke', opis: 'Dizajn, kod, hosting i održavanje u istom studiju.' },
    ],
  },
  kosilica: {
    oznaka: 'Kako radi na mrt.ba',
    kartice: [
      { do: 7460, opis: 'artikala u 278 kategorija, provjereno 29. 9. 2026.' },
      { do: 4453, opis: 'OLX oglasa se sami objavljuju i ažuriraju, 29. 9. 2026.' },
      { do: 52, poslije: ' ms', opis: 'odziv servera, mjereno 27. 9. 2026.' },
      { naslov: 'Sklopljeno. I prodaje.', opis: 'mrt.ba radi od 6. 9. 2026.' },
    ],
  },
}

export const onama = { nad: 'O nama', znakNad: 'Hunar znači vještina' }

export const doPonude = {
  nad: 'Kako do ponude',
  naslov: 'Recite šta vam treba, a mi kažemo koliko košta.',
  koraci: [
    { naslov: 'Napišete šta prodajete i šta vam treba.', opis: 'WhatsApp, telefon ili mail.', poruka: 'Prodajem alate, imam oko 500 artikala i oglase na OLX-u.' },
    { naslov: 'Kratko razgovaramo.', opis: 'Pitamo samo ono što mijenja posao: broj artikala, OLX, dobavljači, termini.' },
    { naslov: 'Dobijete ponudu sa jasnim obimom.', dokument: 'Ponuda', pecat: 'jasan obim' },
    { naslov: 'Kad se dogovorimo, krećemo.', opis: 'Vi pratite kako napreduje.' },
  ],
  primjer: 'Primjer poruke',
}

export const reference = {
  nad: 'Radovi',
  naslov: 'Ne vjerujte nam na riječ.',
  opis: 'Ovo su trgovine koje smo napravili. Otvorite ih na telefonu i provjerite.',
  smarttime: {
    nad: 'SmartTime',
    naslov: 'Sat na telefonu, termin bez telefoniranja.',
    izvor: 'Snimak sa telefona, smarttime.ba, 30. 9. 2026.',
    uvecaj: 'Dodirnite za uvećanje',
  },
  galerija: {
    naslov: 'Naš potpis stoji na dnu ovih trgovina.',
    opis: 'Snimci sa telefona, mrt.ba i smarttime.ba, 29. 9. 2026.',
    snimci: radoviStranice.flatMap((r) => r.snimci || []),
    t: studija,
  },
}

export const vodicNad = { nad: 'Ne znate šta vam treba?', naslov: 'Dva pitanja, pa preporuka.' }

// Tri česta pitanja prije poziva; odgovori su isti kao na Cijenama.
export const pitanja = {
  nad: 'Česta pitanja',
  naslov: 'Prije nego što nam pišete.',
  lista: pitanjaCijene.lista.filter((x) => /traje|moja|mijenjati/.test(x.p)),
}

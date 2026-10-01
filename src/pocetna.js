// Tekst i podaci nove početne ("Kroz znak"). Brojke imaju izvor i datum u tekstu;
// prije objave se mjere ponovo. Glas: studio (mi, Hunar), kupcu se obraća sa "Vi".
// Bez dugih crta. Engleska verzija je u pocetna.en.js, istog oblika.
import { contact } from './data.js'

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
}

export const seo = {
  naslov: 'Izrada web stranica i web trgovina u BiH · Hunar',
  opis: 'Izrađujemo web stranice, web shopove i sisteme po mjeri, povezane sa OLX-om, Ananasom i dobavljačima. Dizajn, kod, hosting i održavanje na jednom mjestu.',
}

export const uvod = {
  nad: 'Hunar · vještina, umijeće',
  naslov: 'Web stranice i trgovine koje rade za vaš posao.',
  opis: 'Za firme u BiH pravimo sve na webu, od prve stranice do trgovine koja se sama drži ažurnom na OLX-u. Dizajn, kod, hosting i održavanje: sve kod nas.',
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
  oznake: [
    { y: 0.215, strana: 'L', pomak: 0, naslov: 'Google i brzina', opis: 'Kupci vas nađu na Googleu, a stranica se otvori prije nego što odustanu.' },
    { y: 0.305, strana: 'D', pomak: -30, naslov: 'Dizajn po mjeri', opis: 'Izgled koji liči na vašu firmu, a ne na hiljadu drugih.' },
    { y: 0.4175, strana: 'L', pomak: 0, naslov: 'Web stranica', opis: 'Usluge, kontakt i mapa na jednom mjestu. Tekst mijenjate sami, bez programera.' },
    { y: 0.4175, strana: 'D', pomak: 34, naslov: 'Web trgovina', opis: 'Kupac nađe artikal na telefonu i naruči u par dodira. Pouzeće ili uplata na račun.' },
    { y: 0.5675, strana: 'L', pomak: 10, naslov: 'Veze koje rade same', opis: 'OLX, feed za Ananas i zalihe od dobavljača. Kao automatik: navija se sam.' },
    { y: 0.5675, strana: 'D', pomak: 40, naslov: 'Sistemi po mjeri', opis: 'Zakazivanje termina, B2B portal za veleprodaju, aplikacija za vaš način rada.' },
    { y: 0.725, strana: 'L', pomak: 20, naslov: 'Hosting i održavanje', opis: 'Ažuriranja, kopije i nadzor. Vi prodajete, mi pazimo da sve radi.' },
    { y: 0.725, strana: 'D', pomak: 50, naslov: 'AI alati', opis: 'Kažete šta da se promijeni, urednik uradi. Opisi artikala za vaš katalog.' },
    { y: 0.905, strana: 'L', pomak: 10, naslov: 'Iz jedne ruke', opis: 'Dizajn, kod, hosting i održavanje u istom studiju. Jedan broj telefona.' },
  ],
  lista: {
    naslov: 'Sklapamo vašu firmu:',
    stavke: ['Dizajn po mjeri', 'Web stranica', 'Web trgovina', 'Veze: OLX, Ananas', 'Sistemi po mjeri', 'AI alati', 'Google i brzina', 'Hosting', 'Iz jedne ruke'],
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
  opis: 'Napišite nam šta prodajete i šta vam treba. Javljamo se lično, a ponudu dajemo u razgovoru.',
  ispod: 'Krenite od jednog dijela ili tražite cijeli sklop. Cijene su po dogovoru, prema onome što vam treba.',
  ponuda: [
    { naslov: 'Web stranica', opis: 'Firma koju kupci nađu i razumiju za pola minute. Tekst mijenjate sami.' },
    { naslov: 'Web trgovina', opis: 'Katalog, filteri i korpa na telefonu. Pouzeće i uplata na račun.' },
    { naslov: 'Veze', opis: 'OLX, Ananas i dobavljači rade sami. Manje kucanja, više vremena za kupce.' },
    { naslov: 'Sistemi', opis: 'Zakazivanje termina, B2B portal, aplikacija po vašoj mjeri.' },
    { naslov: 'AI alati', opis: 'Urednik kojem kažete šta da promijeni i opisi artikala za vaš katalog.' },
    { naslov: 'Google i brzina', opis: 'Tehnički SEO i brzina koju mjerimo i pokažemo sa datumom.' },
    { naslov: 'Hosting i održavanje', opis: 'Ažuriranja, kopije i nadzor. Vi prodajete, mi pazimo.' },
    { naslov: 'Iz jedne ruke', opis: 'Jedan studio, jedan broj. Isti koji je pravio i popravlja.' },
  ],
}

export const podnozje = {
  opis: 'Hunar pravi web stranice, trgovine i sisteme za firme u BiH. Dizajn, kod, hosting i održavanje iz jedne ruke.',
  znacenje: 'hunar: vještina, umijeće',
}

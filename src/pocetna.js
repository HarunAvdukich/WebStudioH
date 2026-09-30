// Tekst i podaci nove početne ("Kroz znak"). Brojke imaju izvor i datum u tekstu;
// prije objave se mjere ponovo. Glas: prvo lice (iza Hunara radi jedna osoba),
// kupcu se obraća sa "Vi". Bez dugih crta.
import { contact } from './data.js'

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

export const seo = {
  naslov: 'Hunar · Web stranice, trgovine i sistemi za firme u BiH',
  opis: 'Web stranice i trgovine povezane sa OLX-om, Ananasom i dobavljačima. Dizajn, kod, hosting i održavanje iz jedne ruke. Pišite mi na WhatsApp.',
}

export const uvod = {
  nad: 'Hunar · vještina, umijeće',
  naslov: 'Web stranice i trgovine koje rade za vaš posao.',
  opis: 'Za firme u BiH pravim sve na webu, od prve stranice do trgovine koja se sama drži ažurnom na OLX-u. Dizajn, kod, hosting i održavanje: sve kod mene.',
}

export const poglavlja = [
  { od: 0, broj: '01', ime: 'Hunar' },
  { od: 0.13, broj: '02', ime: 'U: šta dobijate' },
  { od: 0.47, broj: '03', ime: 'Iz u u n' },
  { od: 0.55, broj: '04', ime: 'N: kako radi' },
  { od: 0.82, broj: '05', ime: 'Potpis' },
  { od: 0.93, broj: '06', ime: 'Vaš red' },
]

export const uNajava = {
  nad: 'U · šta dobijate',
  naslov: 'Sve što vaša firma treba na webu. Složeno kao sat.',
  opis: 'Svaki dio je jedna usluga. Uzmite jedan ili cijeli sklop, a ja pazim da svi rade zajedno.',
}

// y: položaj dijela na rastavljenom kadru (udio visine), strana: L lijevo, D desno,
// pomak: fino pomjeranje kartice u pikselima na visini kadra od 820 px.
export const sat = {
  kanal: 'U · šta dobijate · svaki dio je jedna usluga',
  kanalKratko: 'U · šta dobijate',
  kadrovi: '/kadrovi/sat/',
  broj: 42,
  alt: 'Sat Seiko 5 sa smarttime.ba se sklapa iz dijelova, ilustracija',
  oznake: [
    { y: 0.215, strana: 'L', pomak: 0, naslov: 'Google i brzina', opis: 'Kupci vas nađu na Googleu, a stranica se otvori prije nego što odustanu.' },
    { y: 0.305, strana: 'D', pomak: -30, naslov: 'Dizajn po mjeri', opis: 'Izgled koji liči na vašu firmu, a ne na hiljadu drugih.' },
    { y: 0.4175, strana: 'L', pomak: 0, naslov: 'Web stranica', opis: 'Usluge, kontakt i mapa na jednom mjestu. Tekst mijenjate sami, bez programera.' },
    { y: 0.4175, strana: 'D', pomak: 34, naslov: 'Web trgovina', opis: 'Kupac nađe artikal na telefonu i naruči u par dodira. Pouzeće ili uplata na račun.' },
    { y: 0.5675, strana: 'L', pomak: 10, naslov: 'Veze koje rade same', opis: 'OLX, feed za Ananas i zalihe od dobavljača. Kao automatik: navija se sam.' },
    { y: 0.5675, strana: 'D', pomak: 40, naslov: 'Sistemi po mjeri', opis: 'Zakazivanje termina, B2B portal za veleprodaju, aplikacija za vaš način rada.' },
    { y: 0.725, strana: 'L', pomak: 20, naslov: 'Hosting i održavanje', opis: 'Ažuriranja, kopije i nadzor. Vi prodajete, ja pazim da sve radi.' },
    { y: 0.725, strana: 'D', pomak: 50, naslov: 'AI alati', opis: 'Kažete šta da se promijeni, urednik uradi. Opisi artikala za vaš katalog.' },
    { y: 0.905, strana: 'L', pomak: 10, naslov: 'Iz jedne ruke', opis: 'Dizajn, kod, hosting i održavanje kod istog čovjeka. Jedan broj telefona.' },
  ],
  lista: {
    naslov: 'Sklapam vašu firmu:',
    stavke: ['Dizajn po mjeri', 'Web stranica', 'Web trgovina', 'Veze: OLX, Ananas', 'Sistemi po mjeri', 'AI alati', 'Google i brzina', 'Hosting', 'Iz jedne ruke'],
  },
  kraj: {
    naslov: 'Sve sklopljeno. Sve radi zajedno.',
    opis: 'Jedan majstor od prve skice do održavanja. Nema prebacivanja s firme na firmu.',
    uz: 'Sat je Seiko 5 sa smarttime.ba, trgovine satova koju sam napravio. Tamo kupci naručuju i zakazuju graviranje.',
    izvor: 'Ilustracija (AI) po pravom artiklu.',
  },
}

export const prelaz = {
  nad: 'Iz u u n',
  naslov: 'Dosta obećanja. Evo kako radi kod stvarne trgovine.',
}

export const nNajava = {
  nad: 'N · kako radi kod klijenta',
  naslov: 'mrt.ba: hiljade artikala, a OLX se drži ažurnim sam.',
  opis: 'Kosilica Villager EAGLE 6111 V iz njihovog kataloga. Svaki njen dio je dio sistema koji sam napravio za mrt.ba.',
}

export const kosilica = {
  kanal: 'N · kako radi na mrt.ba · svaki dio je dio sistema',
  kanalKratko: 'N · kako radi na mrt.ba',
  kadrovi: '/kadrovi/kosilica/',
  broj: 42,
  alt: 'Kosilica Villager EAGLE 6111 V sa mrt.ba se sklapa iz dijelova, ilustracija',
  oznake: [
    { y: 0.13, strana: 'L', pomak: 0, naslov: 'Upravljanje', opis: 'Vlasnik sam mijenja sadržaj, uz AI urednika. Veleprodaja naručuje preko B2B portala.' },
    { y: 0.35, strana: 'L', pomak: 0, naslov: 'Korpa', opis: 'Kupac naruči sa telefona: pouzeće ili uplata na račun.' },
    { y: 0.5, strana: 'D', pomak: 0, naslov: 'Dobavljači', opis: 'Cijene i zalihe stižu same od više dobavljača, bez prepisivanja.' },
    { y: 0.64, strana: 'L', pomak: 0, naslov: 'Katalog', opis: '7.460 artikala u 278 kategorija, 29. 9. 2026.' },
    { y: 0.865, strana: 'L', pomak: 10, naslov: 'OLX i Ananas', opis: '4.453 OLX oglasa se sami objavljuju i ažuriraju, 29. 9. 2026. Katalog ide i na Ananas.' },
    { y: 0.865, strana: 'D', pomak: -20, naslov: 'Brzina', opis: 'Server odgovori za 52 ms, mjereno 27. 9. 2026. Kupac ne čeka.' },
  ],
  lista: {
    naslov: 'Sistem za mrt.ba:',
    stavke: ['Katalog', 'Korpa', 'Dobavljači', 'OLX i Ananas', 'Brzina', 'Upravljanje'],
  },
  kraj: {
    naslov: 'Sklopljeno za mrt.ba.',
    opis: 'Radi od 6. 9. 2026. Njihovim riječima:',
    citat: '„Oglasi se sami ažuriraju, a sadržaj mijenjamo i sami iz administracije.“',
    izvor: 'Ilustracija (AI) po pravoj fotografiji sa mrt.ba.',
  },
}

export const potpis = {
  tekst: 'Ovaj potpis stoji na dnu mrt.ba i smarttime.ba. Sljedeći može stajati na vašoj stranici.',
  primjeri: [
    { naziv: 'mrt.ba · podnožje', slika: '/potpis/mrt.png', alt: 'Podnožje mrt.ba sa potpisom Izradio Hunar', okvir: [22, 26, 128, 34] },
    { naziv: 'smarttime.ba · podnožje', slika: '/potpis/smarttime.png', alt: 'Podnožje smarttime.ba sa potpisom Izradio Hunar', okvir: [0, 12, 160, 42] },
  ],
}

export const finale = {
  naslov: 'Vaša firma je sljedeća.',
  opis: 'Napišite šta prodajete i šta vam treba. Odgovaram lično, a ponudu dajem u razgovoru.',
  ispod: 'Krenite od jednog dijela ili tražite cijeli sklop. Cijene su po dogovoru, prema onome što vam treba.',
  ponuda: [
    { naslov: 'Web stranica', opis: 'Firma koju kupci nađu i razumiju za pola minute. Tekst mijenjate sami.' },
    { naslov: 'Web trgovina', opis: 'Katalog, filteri i korpa na telefonu. Pouzeće i uplata na račun.' },
    { naslov: 'Veze', opis: 'OLX, Ananas i dobavljači rade sami. Manje kucanja, više vremena za kupce.' },
    { naslov: 'Sistemi', opis: 'Zakazivanje termina, B2B portal, aplikacija po vašoj mjeri.' },
    { naslov: 'AI alati', opis: 'Urednik kojem kažete šta da promijeni i opisi artikala za vaš katalog.' },
    { naslov: 'Google i brzina', opis: 'Tehnički SEO i brzina koju mjerim i pokažem sa datumom.' },
    { naslov: 'Hosting i održavanje', opis: 'Ažuriranja, kopije i nadzor. Vi prodajete, ja pazim.' },
    { naslov: 'Iz jedne ruke', opis: 'Jedan čovjek, jedan broj. Isti koji je pravio i popravlja.' },
  ],
}

export const podnozje = {
  opis: 'Hunar pravi web stranice, trgovine i sisteme za firme u BiH. Dizajn, kod, hosting i održavanje iz jedne ruke.',
  znacenje: 'hunar: vještina, umijeće',
}

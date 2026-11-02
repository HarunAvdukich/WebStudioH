// Tekst stranice Usluge (/usluge). Engleska verzija je usluge.en.js, istog oblika.
// Izvor je platno "Tekst sajta" (T-usluge), prebačeno u "mi". Osam usluga je odluka vlasnika
// od 2. 10. 2026: usluge bez urađenog primjera (mobilne aplikacije, redizajn) se nude, ali
// se ne predstavljaju kao urađen posao. Svaka brojka ima datum.

import { oglasiMrt } from '../brojke.js'

export const jezik = 'bs'

const olx = oglasiMrt('bs')
export const put = '/usluge'

export const seo = {
  naslov: 'Usluge · Web stranice, trgovine, OLX veze i sistemi · Hunar',
  opis: 'Web stranice, web shopovi sa OLX vezom, SEO, online rezervacije, AI chatbotovi, mobilne aplikacije i održavanje. Sve iz jedne ruke.',
}

export const vrh = {
  nad: 'Usluge',
  naslov: 'Od prve stranice do sistema koji radi sam.',
  smjena: {
    prije: 'Za firme u BiH radimo',
    rijeci: ['web stranice', 'web shopove', 'mobilne aplikacije', 'SEO optimizaciju', 'online rezervacije', 'AI chatbotove', 'redizajn stranica', 'održavanje i hosting'],
    poslije: '.',
  },
  uvod: 'Radnji koja tek hoće sajt treba nešto drugo nego firmi kojoj treba sistem. Zato usluge idu stepenicama: krenite od one koja vam treba danas, a sljedeću dodajte kad posao poraste.',
}

// "Pitajte za ovo": WhatsApp poruka sa imenom usluge.
export const pitaj = {
  dugme: 'Pitajte za ovo',
  poruka: 'Zdravo, zanima me {usluga}. Možemo li se čuti?',
}

export const stepenice = [
  {
    id: 'stranica',
    oznaka: 'Web stranica',
    ime: 'Web stranica i redizajn',
    naslov: 'Da vas kupci nađu i shvate za pola minute.',
    opis: 'Za firme, radnje i udruženja kojima treba uredna i brza stranica, ili nova umjesto stare.',
    stavke: [
      'Dizajn po mjeri vaše firme, ne iz šablona',
      'Usluge, kontakt, mapa i dugme za WhatsApp',
      'Brza na telefonu, gdje vas kupci najčešće gledaju',
      'Tekst i slike mijenjate sami',
      'Redizajn: pošaljite link stare stranice, a mi kažemo šta bismo promijenili i zašto',
    ],
    usluge: [
      { ime: 'Web stranice', uPoruci: 'web stranica' },
      { ime: 'Redizajn stranica', uPoruci: 'redizajn stranice' },
    ],
  },
  {
    id: 'shop',
    oznaka: 'Web shop',
    ime: 'Web shop',
    naslov: 'Radnja koja je otvorena i kad ste vi zatvorili.',
    opis: 'Za prodavnice koje hoće prodavati i preko interneta, ozbiljno i bez komplikacija.',
    stavke: [
      'Katalog sa kategorijama, filterima i pretragom',
      'Korpa koja radi na telefonu',
      'Pouzeće i uplata na račun, kartice uz ugovor sa procesorom plaćanja',
      'Stranice za dostavu, povrat i reklamacije',
      'OLX veza: oglasi se sami ažuriraju kad promijenite cijenu ili zalihu',
    ],
    uzivo: { tekst: 'Kako to izgleda uživo:', linkovi: [{ ime: 'mrt.ba', url: 'https://mrt.ba' }, { ime: 'smarttime.ba', url: 'https://smarttime.ba' }] },
    usluge: [{ ime: 'Web shop', uPoruci: 'web shop' }],
  },
  {
    id: 'seo',
    oznaka: 'SEO i veze',
    ime: 'SEO i veze sa bh. tržištem',
    naslov: 'Manje kucanja, više vremena za kupce.',
    opis: 'Da vas nađu na Googleu, a artikli sami stignu na OLX i Ananas. Veze pravljene baš za bh. tržište.',
    stavke: [
      'SEO optimizacija: brzina, naslovi i opisi, strukturirani podaci i Google Search Console',
      'Artikli se sami objavljuju i ažuriraju na OLX-u kad promijenite cijenu ili zalihu',
      'Katalog ide u feed za Ananas',
      'Cijene i zalihe se preuzimaju od dobavljača, bez prepisivanja',
      `Na mrt.ba tako radi ${olx.o.broj} ${olx.imenica} (provjereno ${olx.o.datum})`,
    ],
    usluge: [{ ime: 'SEO optimizacija', uPoruci: 'SEO optimizacija' }],
    igra: 'olx',
  },
  {
    id: 'sistemi',
    oznaka: 'Sistemi',
    ime: 'Sistemi i aplikacije',
    naslov: 'Kad vam treba više od trgovine.',
    opis: 'Za firme koje hoće da im web radi dio posla.',
    stavke: [
      'Online rezervacije: kupac sam bira uslugu i vrijeme (primjer: smarttime.ba)',
      'AI chatbot na stranici (primjer: asistent Kobi na mrt.ba)',
      'Mobilna aplikacija za Android i iPhone, za vaše kupce ili za vaš tim',
      'B2B portal za veleprodajne kupce (primjer: b2b.mrt.ba)',
    ],
    usluge: [
      { ime: 'Online rezervacije', uPoruci: 'online rezervacije' },
      { ime: 'AI chatbot', uPoruci: 'AI chatbot' },
      { ime: 'Mobilne aplikacije', uPoruci: 'mobilna aplikacija' },
    ],
    igra: 'termin',
  },
]

export const odrzavanje = {
  id: 'odrzavanje',
  oznaka: 'Održavanje',
  ime: 'Održavanje i hosting',
  nad: 'Uvijek uz stranicu',
  naslov: 'Stranica je gotova tek kad radi i sutra.',
  stavke: [
    'Hosting, domena i poslovni mail',
    'Ažuriranja i redovne sigurnosne kopije',
    'Nadzor maila i narudžbi',
    'Manje izmjene sadržaja',
    'Pomoć kad nešto zapne, od studija koji je stranicu i pravio',
  ],
  usluge: [{ ime: 'Održavanje i hosting', uPoruci: 'održavanje i hosting' }],
  mjerac: { vrijednost: 100, opis: 'Lighthouse, računar, početna hunar.ba', datum: 'mjereno 29. 9. 2026', izmjeri: 'https://hunar.ba/' },
}

// Scena "Sajt koji raste": jedan izmišljen sajt koji raste kroz stepenice. Ilustracija.
export const scena = {
  oznaka: 'Ilustracija: jedan sajt raste od obične stranice do sistema',
  stepenica: 'Stepenica',
  adresa: 'vasafirma.ba',
  dugme: 'Pišite nam na WhatsApp',
  pouzece: 'Pouzeće ✓  Uplata na račun ✓',
  cijenaPrije: '89 KM',
  cijenaPoslije: '79 KM',
  cijene: ['145 KM', '59 KM', '320 KM'],
  veze: [
    { ime: 'Google', prije: 'pretraga', poslije: 'naslovi i brzina ✓' },
    { ime: 'OLX', prije: 'oglasi', poslije: 'oglas ažuriran ✓' },
    { ime: 'Ananas', prije: 'feed', poslije: 'feed osvježen ✓' },
    { ime: 'Dobavljač', prije: 'cijene i zalihe', poslije: 'zalihe preuzete ✓' },
  ],
  b2b: 'B2B',
  termin: { naslov: 'Zakažite termin', potvrda: 'utorak, 10:00 ✓' },
  asistent: 'Asistent: Mogu li pomoći oko izbora?',
  aplikacija: 'Aplikacija',
  odrzavanje: 'Održavanje: hosting, kopije, nadzor i pomoć',
}

export const trake = [
  ['web stranice', 'web shop', 'mobilne aplikacije', 'SEO', 'online rezervacije', 'AI chatbot', 'redizajn', 'hosting i održavanje'],
  ['pouzeće', 'zaliha', 'dobavljač', 'OLX oglas', 'Ananas feed', 'termin', 'B2B', 'brzina na telefonu'],
]

export const igre = {
  olx: {
    nad: 'Probajte sami',
    naslov: 'Promijenite cijenu, a oglas se ažurira sam.',
    trgovina: 'Vaša trgovina',
    oglas: 'Oglas na OLX-u',
    artikal: 'Kosilica, 46 cm',
    cijena: 'Cijena',
    zaliha: 'Zaliha',
    valuta: 'KM',
    naStanju: 'Na stanju: {n}',
    nema: 'Nema na stanju',
    azurirano: 'ažurirano upravo',
    manje: 'Smanji',
    vise: 'Povećaj',
    napomena: `Ilustracija. Na mrt.ba ovako radi ${olx.o.broj} ${olx.imenica} (provjereno ${olx.o.datum}).`,
  },
  termin: {
    nad: 'Probajte sami',
    naslov: 'Kliknite slobodan termin.',
    usluga: 'Graviranje',
    dani: ['Pon', 'Uto', 'Sri', 'Čet', 'Pet'],
    daniPuni: ['ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak'],
    sati: ['09:00', '10:00', '11:00', '13:00'],
    zakazano: 'Termin zakazan ✓',
    zauzeto: 'zauzeto',
    napomena: 'Ilustracija. Ovako kupci zakazuju graviranje na smarttime.ba.',
  },
}

export const vodic = {
  nad: 'Vodič',
  naslov: 'Ne znate koja vam stepenica treba?',
  uvod: 'Dva pitanja, pa vam kažemo odakle da krenete.',
  prvo: {
    pitanje: 'Šta prodajete?',
    odgovori: [
      { id: 'usluge', tekst: 'Usluge (servis, saloni, majstori)', uPoruci: 'prodajem usluge' },
      { id: 'proizvode', tekst: 'Proizvode', uPoruci: 'prodajem proizvode' },
    ],
  },
  usluge: {
    pitanje: 'Zakazujete li termine sa kupcima?',
    odgovori: [
      { id: 'da', tekst: 'Da, svaki dan', uPoruci: 'zakazujem termine sa kupcima' },
      { id: 'ne', tekst: 'Ne', uPoruci: 'ne zakazujem termine' },
    ],
  },
  proizvode: {
    pitanje: 'Prodajete li i na OLX-u ili uzimate robu od dobavljača?',
    odgovori: [
      { id: 'da', tekst: 'Da', uPoruci: 'prodajem i na OLX-u ili uzimam robu od dobavljača' },
      { id: 'ne', tekst: 'Ne, samo u radnji', uPoruci: 'prodajem samo u radnji' },
    ],
  },
  preporuke: {
    termini: { stepenica: 4, ime: 'online rezervacije', opis: 'Kupac sam bira uslugu i vrijeme, i kad je radnja zatvorena. Kao na smarttime.ba.' },
    stranica: { stepenica: 1, ime: 'web stranica', opis: 'Da vas kupci nađu i shvate za pola minute. Rezervacije se dodaju kad zatreba.' },
    olx: { stepenica: 3, ime: 'web shop sa OLX vezom', opis: 'Trgovina koja sama drži OLX i zalihe ažurnim. Kao na mrt.ba.' },
    shop: { stepenica: 2, ime: 'web shop', opis: 'Krenite od trgovine, a veze dodajte kad posao poraste.' },
  },
  vama: 'Vama treba:',
  posalji: 'Pošaljite odgovore na WhatsApp',
  ponovo: 'Ispočetka',
  korak: 'Pitanje {n} od 2',
  poruka: 'Zdravo! {odgovori}. Vodič na hunar.ba mi je predložio: {preporuka}. Možemo li se čuti?',
}

export const poziv = {
  nad: 'Pišite nam',
  naslov: 'Opišite posao u dvije rečenice.',
  opis: 'A mi predložimo odakle da krenete. Odgovaramo lično.',
  dugme: 'Pišite nam na WhatsApp',
  ili: 'ili nazovite',
}

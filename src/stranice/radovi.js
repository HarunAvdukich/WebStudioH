// Tekst stranice Radovi (/radovi) i studija slučaja (/radovi/<slug>). Engleska verzija je
// radovi.en.js, istog oblika. Izvor je platno "Tekst sajta" (T-radovi, T-mrt, T-smarttime),
// prebačeno u "mi". Brojke su iz studija (src/content/radovi), svaka sa datumom.
// Duga priča studije je u src/content/radovi/<slug>.md.

import { katalogMrt, oglasiMrt, satoviSmarttime } from '../brojke.js'

export const jezik = 'bs'

// Brojke sa trgovina (P1): osvježe se pri gradnji, svaka sa datumom provjere.
const kat = katalogMrt('bs')
const olx = oglasiMrt('bs')
const st = satoviSmarttime('bs')
export const put = '/radovi'

export const seo = {
  naslov: 'Radovi · mrt.ba i SmartTime · Hunar',
  opis: 'Stvarne trgovine koje smo napravili, sa brojkama koje možete provjeriti: mrt.ba, trgovina alata sa OLX vezom, i SmartTime, trgovina satova.',
}

export const vrh = {
  nad: 'Radovi',
  naslov: 'Radovi koje možete otvoriti i provjeriti.',
  uvod: 'Ne pokazujemo skice, nego trgovine koje rade. Otvorite ih na telefonu, prošetajte kroz katalog, pogledajte korpu.',
}

export const kartica = {
  kursor: 'Pogledajte rad',
  kako: 'Kako je napravljeno',
  vise: 'Više o projektu',
  otvori: 'Otvori {ime}',
  listajte: 'Listajte',
}

export const radovi = [
  {
    slug: 'mrt',
    ime: 'mrt.ba',
    oznaka: 'Alati, mašine i oprema',
    opis: 'Katalog od više dobavljača, OLX koji se sam ažurira, feed za Ananas, B2B portal i asistent Kobi.',
    url: 'https://mrt.ba',
    seo: {
      naslov: 'mrt.ba: web trgovina alata povezana sa OLX-om · Hunar',
      opis: 'Kako smo napravili mrt.ba: trgovina alata sa hiljadama artikala, OLX oglasima koji se sami ažuriraju, uvozom od dobavljača, Ananas feedom i B2B portalom.',
    },
    naslov: 'mrt.ba: hiljade artikala, a OLX se drži ažurnim sam.',
    uvod: 'Motor Remont Trade prodaje alate, mašine, vrtnu i poljoprivrednu opremu. Trebala im je trgovina koja nosi hiljade artikala od više dobavljača i sama ih drži ažurnim na OLX-u, a da je vlasnik uređuje bez programera.',
    napravili: [
      'WooCommerce trgovinu sa temom pisanom samo za mrt.ba',
      'Uvoz kataloga, cijena i zaliha od više dobavljača',
      'OLX vezu: artikli se sami objavljuju i ažuriraju',
      'Feed za Ananas',
      'B2B portal za veleprodaju, b2b.mrt.ba',
      'AI urednika u administraciji i asistenta Kobi na stranici',
      'Hosting, keš i održavanje',
    ],
    brojke: [
      { do: kat.a.vrijednost, opis: kat.imenica, datum: `provjereno ${kat.a.datum}` },
      { do: olx.o.vrijednost, opis: `${olx.imenica} koji se sami ažuriraju`, datum: `provjereno ${olx.o.datum}` },
      { do: 52, poslije: ' ms', opis: 'odziv servera', datum: 'mjereno 27. 9. 2026' },
    ],
    mjerac: { vrijednost: 52, poslije: ' ms', udio: 0.9, opis: 'Odziv servera, mrt.ba (manje je bolje)', datum: 'mjereno 27. 9. 2026', izmjeri: 'https://mrt.ba/' },
    citat: {
      tekst: 'Trebala nam je trgovina koja može nositi hiljade artikala i sama ih držati ažurnim na OLX-u. Danas imamo preko 7.400 artikala, oglasi se sami ažuriraju, a sadržaj mijenjamo i sami iz administracije.',
      ko: 'mrt.ba',
    },
    slika: { src: '/project-mrt.webp', width: 1200, height: 769, alt: 'Početna stranica mrt.ba na računaru: katalog alata, mašina i opreme' },
    snimci: [
      { src: '/radovi/mrt-artikal.webp', width: 780, height: 1688, alt: 'Kosilica Stiga Combi 53 SQ na mrt.ba po cijeni od 799 KM, snimak ekrana telefona', opis: 'Artikal na mrt.ba' },
      { src: '/radovi/mrt-olx.webp', width: 780, height: 1688, alt: 'Ista kosilica Stiga Combi 53 SQ kao OLX oglas iz Brčkog, 799 KM, snimak ekrana telefona', opis: 'Isti artikal kao OLX oglas' },
    ],
    snimciNaslov: 'Isti artikal, ista cijena, na mrt.ba i na OLX-u.',
    snimciOpis: 'Isti artikal, ista cijena: kosilica Stiga Combi 53 SQ na mrt.ba i kao OLX oglas. Snimljeno na telefonu 29. 9. 2026.',
    igra: 'olx',
    poziv: { naslov: 'Prodajete i na OLX-u?', opis: 'Možemo i Vašu trgovinu povezati tako da oglasi rade sami.' },
  },
  {
    slug: 'smarttime',
    ime: 'SmartTime',
    oznaka: 'Satovi, graviranje i servis',
    opis: 'Kupci biraju sat na telefonu i sami zakazuju termin za graviranje ili popravku.',
    url: 'https://smarttime.ba',
    seo: {
      naslov: 'SmartTime: trgovina satova sa zakazivanjem termina · Hunar',
      opis: 'Kako smo napravili SmartTime: trgovina sa preko 500 satova, stranice za graviranje i servis i zakazivanje termina direktno na stranici, bez telefoniranja.',
    },
    naslov: 'SmartTime: sat na telefonu, termin bez telefoniranja.',
    uvod: 'SmartTime prodaje ručne satove i radi graviranje i servis. Trebala im je trgovina u kojoj kupac lako nađe sat na telefonu i sam zakaže termin.',
    napravili: [
      'WooCommerce trgovinu sa katalogom i filterima',
      'Zakazivanje termina za graviranje i popravku sata',
      'Posebne stranice za graviranje i servis',
      'Recenzije sa Googlea na početnoj',
      'Sigurnu naplatu i održavanje',
    ],
    brojke: [
      { do: st.a.vrijednost, opis: `${st.artikli}, od toga ${st.s.broj} ${st.satovi}`, datum: `provjereno ${st.a.datum}` },
      { do: 17, opis: 'brendova satova', datum: 'provjereno 1. 10. 2026' },
      { do: 35, opis: 'recenzija sa Googlea na početnoj', datum: 'provjereno 1. 10. 2026' },
    ],
    mjerac: { vrijednost: 89, poslije: '', udio: 0.89, opis: 'PageSpeed, računar, smarttime.ba', datum: 'Lighthouse, srednje od tri mjerenja, 27. 9. 2026', izmjeri: 'https://smarttime.ba/' },
    citat: {
      tekst: 'Web trgovina izgleda profesionalno, a kupci na telefonu lako pronađu i naruče sat. Uz katalog od preko 500 modela imamo i posebne stranice za graviranje i servis.',
      ko: 'SmartTime',
    },
    slika: { src: '/project-smarttime.webp', width: 1200, height: 769, alt: 'Početna stranica smarttime.ba na računaru: katalog ručnih satova' },
    snimci: [
      { src: '/radovi/smarttime-sat.webp', width: 780, height: 1688, alt: 'Sat Casio F-91W na smarttime.ba, stranica artikla na telefonu', opis: 'Stranica artikla' },
      { src: '/radovi/smarttime-termin.webp', width: 780, height: 1688, alt: 'Zakazivanje termina na smarttime.ba: izbor usluge, npr. zamjena baterije na satu', opis: 'Zakazivanje termina' },
    ],
    snimciNaslov: 'Sat i termin, oboje na telefonu.',
    snimciOpis: 'Stranica artikla i zakazivanje termina na smarttime.ba. Snimljeno na telefonu 29. 9. 2026.',
    igra: 'termin',
    poziv: { naslov: 'Radite i usluge, ne samo prodaju?', opis: 'Zakazivanje termina može raditi i kod Vas.' },
  },
  {
    slug: 'urez',
    ime: 'urez.ba',
    oznaka: 'Gravure po mjeri',
    opis: 'Naša trgovina personalizovanih gravura. U izradi, uskoro online.',
    uIzradi: 'U izradi',
    seo: {
      naslov: 'urez.ba: trgovina graviranih proizvoda, u izradi · Hunar',
      opis: 'urez.ba je vlastita trgovina studija Hunar za personalizovane gravirane proizvode, trenutno u izradi.',
    },
    naslov: 'urez.ba: naša trgovina gravura, u izradi.',
    uvod: 'urez.ba je naša vlastita trgovina personalizovanih graviranih proizvoda. Radimo je sada, a kad bude online, ovdje će stajati priča i brojke, kao kod ostalih radova.',
    napravili: ['Personalizovani gravirani proizvodi', 'Vlastita trgovina studija Hunar', 'Uskoro online'],
    poziv: { naslov: 'Sljedeća kartica može biti vaša firma.', opis: 'Napišite šta prodajete i šta vam treba. Odgovaramo lično.' },
  },
]

// Natpisi na stranici studije.
export const studija = {
  mrvice: { pocetna: 'Početna', radovi: 'Radovi' },
  napravili: 'Šta smo napravili',
  brojke: 'Brojke',
  klijent: 'Riječima klijenta',
  snimci: 'Snimci sa telefona',
  povucite: 'Povucite',
  lupa: 'Pređite mišem preko snimka',
  uvecaj: 'Uvećaj snimak',
  zatvori: 'Zatvori',
  probajte: 'Probajte sami',
  citanje: 'još {n} min',
  procitano: 'pročitano',
  svi: 'Svi radovi',
  otvori: 'Otvori {ime}',
  dugme: 'Pišite nam na WhatsApp',
  ili: 'ili nazovite',
  nad: 'Vaš posao',
}

export const poziv = {
  nad: 'Vaš rad',
  naslov: 'Sljedeća kartica može biti vaša firma.',
  opis: 'Napišite šta prodajete i šta vam treba. Odgovaramo lično.',
  dugme: 'Pišite nam na WhatsApp',
  ili: 'ili nazovite',
}

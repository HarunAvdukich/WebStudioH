// Tekst Politike privatnosti (/politika-privatnosti). Engleska verzija je privatnost.en.js,
// istog oblika. Dijelovi su naslov i stavke: paragraf (p) ili spisak (ul). {email} se
// zamijeni adresom.

export const jezik = 'bs'
export const put = '/politika-privatnosti'

export const seo = {
  naslov: 'Politika privatnosti · Hunar',
  opis: 'Kako Hunar prikuplja, koristi i štiti vaše lične podatke: obrazac, WhatsApp i mail, bez kolačića za praćenje.',
}

export const vrh = {
  nad: 'Pravno',
  naslov: 'Politika privatnosti',
  uvod: 'Kako prikupljamo, koristimo i štitimo vaše lične podatke.',
  azurirano: 'Posljednje ažuriranje: 2. 10. 2026.',
}

export const dijelovi = [
  {
    naslov: 'Ukratko',
    p: ['Vaša privatnost nam je važna. Ova politika objašnjava koje podatke prikupljamo putem stranice hunar.ba, u koju svrhu i koja su vaša prava. Voditelj obrade je Hunar.'],
  },
  {
    naslov: 'Koje podatke prikupljamo',
    ul: [
      'Podaci iz obrasca: ime, firma (nije obavezno), telefon ili mail, šta vam treba i sadržaj poruke koju pošaljete.',
      'Komunikacija: poruke koje razmijenimo putem maila, telefona ili WhatsAppa.',
    ],
  },
  {
    naslov: 'U koju svrhu koristimo podatke',
    ul: ['Da vam odgovorimo na upit i pripremimo ponudu.', 'Za komunikaciju tokom projekta i pružanje usluga.'],
  },
  {
    naslov: 'Pravni osnov',
    p: ['Podatke obrađujemo na osnovu vašeg pristanka (slanjem obrasca ili poruke) i legitimnog interesa za komunikaciju i pružanje traženih usluga.'],
  },
  {
    naslov: 'Dijeljenje s trećim stranama',
    p: ['Vaše podatke ne prodajemo. Obrazac prima i čuva naša hosting platforma Netlify (Netlify Forms), isključivo u gore navedene svrhe. Poruke na WhatsAppu idu preko usluge WhatsApp (Meta), prema njihovim pravilima.'],
  },
  {
    naslov: 'Kolačići',
    p: ['Ne koristimo kolačiće za praćenje ni oglašavanje. Zbog toga nema ni trake za pristanak na kolačiće.'],
  },
  {
    naslov: 'Koliko dugo čuvamo podatke',
    p: ['Podatke iz upita čuvamo onoliko koliko je potrebno da odgovorimo i vodimo eventualnu saradnju, a nakon toga ih brišemo ili anonimiziramo.'],
  },
  {
    naslov: 'Vaša prava',
    p: ['Imate pravo na pristup svojim podacima, ispravku, brisanje i povlačenje pristanka u bilo kojem trenutku. Za bilo koji zahtjev pišite nam na {email}.'],
  },
  {
    naslov: 'Izmjene ove politike',
    p: ['Politiku možemo povremeno ažurirati. Datum posljednje izmjene stoji na vrhu stranice.'],
  },
  {
    naslov: 'Kontakt',
    p: ['Za sva pitanja o privatnosti pišite nam na {email}.'],
  },
]

export const citanje = { citanje: 'još {n} min', procitano: 'pročitano' }

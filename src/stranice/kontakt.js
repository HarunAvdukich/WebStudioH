// Tekst stranice Kontakt (/kontakt). Engleska verzija je kontakt.en.js, istog oblika.
// Izvor je platno "Tekst sajta" (T-kontakt), prebačeno u "mi".

export const jezik = 'bs'
export const put = '/kontakt'

export const seo = {
  naslov: 'Kontakt · pišite na WhatsApp · Hunar',
  opis: 'Pišite na WhatsApp ili nazovite 060 3000 751. Napišite šta prodajete i šta vam treba, odgovaramo lično.',
}

// Veliki trenutak "Poruka koja se sama piše".
export const poruka = {
  nad: 'Kontakt',
  naslov: 'Pišite nam. Odgovaramo lično.',
  uvod: 'Najbrže je preko WhatsAppa. Izaberite šta vam treba, a poruka se napiše sama.',
  pitanje: { prije: 'Šta vam treba:', poslije: '?' },
  izbori: [
    { id: 'stranica', tekst: 'Web stranica', uPoruci: 'web stranica' },
    { id: 'shop', tekst: 'Web shop', uPoruci: 'web shop' },
    { id: 'olx', tekst: 'Veza sa OLX-om', uPoruci: 'veza sa OLX-om' },
    { id: 'aplikacija', tekst: 'Mobilna aplikacija', uPoruci: 'mobilna aplikacija' },
    { id: 'sistem', tekst: 'Sistem po mjeri', uPoruci: 'sistem po mjeri' },
    { id: 'ne-znam', tekst: 'Još ne znam', uPoruci: '' },
  ],
  tekst: 'Zdravo, imam firmu i zanima me {x}. Možemo li se čuti?',
  tekstNeZnam: 'Zdravo, imam firmu i još ne znam šta mi treba. Možemo li se čuti?',
  telefon: { ime: 'Hunar', status: 'odgovaramo lično' },
  posalji: 'Otvori WhatsApp sa ovom porukom',
  otvara: '✓✓ otvara se WhatsApp',
  polje: 'Poruka za WhatsApp',
}

export const kanali = {
  naslov: 'Ili nas nađite ovako',
  lista: [
    { ime: 'WhatsApp', vrijednost: '060 3000 751', vrsta: 'whatsapp' },
    { ime: 'Telefon', vrijednost: '060 3000 751', vrsta: 'telefon' },
    { ime: 'Mail', vrijednost: 'info@hunar.ba', vrsta: 'mail' },
  ],
  recenzija: { pitanje: 'Radili ste sa nama?', link: 'Ostavite recenziju na Googleu' },
}

export const obrazac = {
  nad: 'Obrazac',
  naslov: 'Ili nam napišite ovdje.',
  uvod: 'Napišite šta prodajete i šta vam treba. Odgovaramo lično.',
  polja: {
    ime: 'Ime',
    firma: 'Firma (nije obavezno)',
    kontakt: 'Telefon ili mail',
    treba: 'Šta vam treba',
    poruka: 'Poruka',
  },
  izbori: ['Web stranica', 'Web shop', 'Veza sa OLX-om', 'Mobilna aplikacija', 'Sistem', 'Još ne znam'],
  primjer: 'Npr. prodajem alate, imam oko 500 artikala i oglase na OLX-u.',
  dugme: 'Pošalji',
  saljem: 'Šaljem',
  ispod: 'Podatke koristimo samo da vam odgovorimo.',
  hvala: { naslov: 'Hvala! Poruka je stigla.', opis: 'Javljamo se lično.' },
  greska: 'Poruka nije otišla. Pokušajte ponovo ili pišite na WhatsApp 060 3000 751.',
  zamka: 'Ne popunjavati:',
}

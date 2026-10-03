// Tekst stranice Cijene (/cijene). Engleska verzija je cijene.en.js, istog oblika.
// Izvor je platno "Tekst sajta" (T-cijene), prebačeno u "mi". Cijene se ne objavljuju.

import { oglasiMrt } from '../brojke.js'

export const jezik = 'bs'

const olx = oglasiMrt('bs')
export const put = '/cijene'

export const seo = {
  naslov: 'Cijene · po dogovoru, prema vašem poslu · Hunar',
  opis: 'Cijena web stranice ili trgovine zavisi od toga šta vam treba. Evo kako nastaje ponuda i šta dobijate.',
}

export const vrh = {
  nad: 'Cijene',
  naslov: 'Cijena po dogovoru. Evo zašto i kako.',
  uvod: 'Radnji kojoj treba stranica i trgovini sa hiljadama artikala i OLX vezom ne treba isti posao, pa ni ista cijena. Umjesto cjenovnika koji ne odgovara nikome, ponudu pravimo za vaš posao.',
}

// Veliki trenutak "Razgovor": primjer, ne prepiska sa stvarnim klijentom.
export const razgovor = {
  nad: 'Kako nastaje ponuda',
  naslov: 'Od prve poruke do ponude, u četiri koraka.',
  koraci: [
    { naslov: 'Napišete šta prodajete i šta vam treba.', opis: 'WhatsApp, telefon ili mail, kako vam je lakše.' },
    { naslov: 'Kratko razgovaramo.', opis: 'Pitamo samo ono što mijenja posao: broj artikala, OLX, dobavljači, termini.' },
    { naslov: 'Dobijete ponudu sa jasnim obimom.', opis: 'Tačno piše šta dobijate.' },
    { naslov: 'Kad se dogovorimo, krećemo.', opis: 'Vi pratite kako napreduje.' },
  ],
  kontakt: { ime: 'Hunar', status: 'odgovaramo lično' },
  pise: 'piše',
  poruke: [
    { od: 'vi', korak: 0, tekst: 'Zdravo, imam firmu i zanima me web stranica. Možemo li se čuti?' },
    { od: 'mi', korak: 0, tekst: 'Zdravo! Šta prodajete i šta vam treba?' },
    { od: 'vi', korak: 1, tekst: 'Prodajem alate, imam oko 500 artikala i oglase na OLX-u.' },
    { od: 'mi', korak: 1, tekst: 'Uzimate li artikle od dobavljača? I treba li da se oglasi na OLX-u sami ažuriraju?' },
    { od: 'vi', korak: 1, tekst: 'Da, od dva dobavljača. I da, to bi nam mnogo pomoglo.' },
    { od: 'mi', korak: 2, dokument: { ime: 'Ponuda.pdf', opis: 'trgovina, OLX veza, uvoz od dobavljača' } },
    { od: 'vi', korak: 3, tekst: 'Dogovoreno.' },
    { od: 'mi', korak: 3, tekst: 'Krećemo. Šaljemo vam link da pratite kako napreduje.' },
  ],
  oznaka: 'Primjer razgovora. Nije prepiska sa stvarnim klijentom.',
}

export const narudzba = {
  nad: 'Šta možete naručiti',
  naslov: 'Sve po dogovoru, prema obimu.',
  okreni: 'Pogledajte šta dobijate',
  kartice: [
    { ime: 'Web stranica', opis: 'Za firme i udruženja kojima treba uredna i brza stranica: dizajn po mjeri, kontakt i mapa, osnovni SEO, tekst mijenjate sami. Može i redizajn postojeće.' },
    { ime: 'Web trgovina', opis: 'Za prodavnice koje hoće prodavati online: katalog, filteri i korpa, pouzeće i uplata na račun, podrška poslije pokretanja.' },
    { ime: 'Trgovina sa bh. vezama', opis: 'Sve iz web trgovine, plus OLX koji se sam ažurira, feed za Ananas i uvoz od dobavljača. Po potrebi i B2B portal.' },
    { ime: 'Sistem po mjeri', opis: 'Online rezervacije, AI chatbot, mobilna aplikacija ili B2B portal za vaš način rada.' },
  ],
}

export const odrzavanje = {
  nad: 'Održavanje',
  naslov: 'Mjesečno, po dogovoru.',
  opis: 'Ažuriranja, sigurnosne kopije, keš i praćenje brzine, nadzor maila i narudžbi, manje izmjene i pomoć kad nešto zapne.',
  mjerac: { vrijednost: 100, opis: 'Lighthouse, računar, početna hunar.ba', datum: 'mjereno 29. 9. 2026', izmjeri: 'https://hunar.ba/' },
}

export const pitanja = {
  nad: 'Česta pitanja',
  naslov: 'Šta nas najčešće pitaju.',
  lista: [
    { p: 'Zašto nema fiksnih cijena?', o: 'Jer svaki posao ima drugi obim. Cijenu formiramo prema onome što vam stvarno treba, bez skrivenih troškova.' },
    { p: 'Koliko traje izrada?', o: 'Rok stoji u ponudi i zavisi od obima. Jednostavna stranica je gotova brže od trgovine sa OLX vezom i uvozom od dobavljača.' },
    { p: 'Da li je stranica moja?', o: 'Da. Stranica i materijali su vaši.' },
    { p: 'Mogu li sam mijenjati sadržaj?', o: 'Da. Tekst, slike i artikle mijenjate sami, a uz predaju dobijete kratku obuku.' },
    { p: 'Radite li redizajn postojeće stranice?', o: 'Da. Pošaljite link, pa vam kažemo šta bismo promijenili i zašto.' },
    { p: 'Možete li povezati trgovinu sa OLX-om?', o: `Da. Na mrt.ba tako radi ${olx.o.broj} ${olx.imenica} (provjereno ${olx.o.datum}).` },
  ],
}

export const poziv = {
  nad: 'Ponuda',
  naslov: 'Recite šta vam treba, a mi vam kažemo koliko košta.',
  opis: 'Napišite šta prodajete i šta vam treba. Odgovaramo lično.',
  dugme: 'Pišite nam na WhatsApp',
  ili: 'ili nazovite',
}

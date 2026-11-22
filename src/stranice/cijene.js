// Tekst stranice Cijene (/cijene). Engleska verzija je cijene.en.js, istog oblika.
// Izvor je platno "Tekst sajta" (T-cijene), prebačeno u "mi". Početne cijene su
// iste kao u Black November reklamama (22. 11. 2026); ostalo je po dogovoru.

import { oglasiMrt } from '../brojke.js'

export const jezik = 'bs'

const olx = oglasiMrt('bs')
export const put = '/cijene'

export const seo = {
  naslov: 'Cijena izrade web stranice i web shopa · Hunar',
  opis: 'Web stranica od 399 KM, web shop od 899 KM, online zakazivanje od 499 KM. Gotova za 2 dana, uz besplatnu skicu unaprijed.',
}

export const vrh = {
  nad: 'Cijene',
  naslov: 'Cijena izrade web stranice i web shopa.',
  uvod: 'Web stranica od 399 KM, web shop od 899 KM i online zakazivanje od 499 KM. Kad pošaljete tekst i slike, stranicu dobijete gotovu za 2 dana. Za svaku postoji i jači paket Plus. Veće trgovine, OLX veza i sistemi po mjeri su po dogovoru.',
}

// Veliki trenutak "Razgovor": primjer, ne prepiska sa stvarnim klijentom.
export const razgovor = {
  nad: 'Kako nastaje ponuda',
  naslov: 'Od prve poruke do ponude, u četiri koraka.',
  koraci: [
    { naslov: 'Napišete šta prodajete i šta Vam treba.', opis: 'WhatsApp, telefon ili mail, kako Vam je lakše.' },
    { naslov: 'Kratko razgovaramo.', opis: 'Pitamo samo ono što mijenja posao: broj artikala, OLX, dobavljači, termini.' },
    { naslov: 'Dobijete ponudu sa jasnim obimom.', opis: 'Tačno piše šta dobijate.' },
    { naslov: 'Kad se dogovorimo, krećemo.', opis: 'Vi pratite kako napreduje.' },
  ],
  kontakt: { ime: 'Hunar', status: 'odgovaramo lično' },
  pise: 'piše',
  poruke: [
    { od: 'vi', korak: 0, tekst: 'Zdravo, imam firmu i zanima me web stranica. Možemo li se čuti?' },
    { od: 'mi', korak: 0, tekst: 'Zdravo! Šta prodajete i šta Vam treba?' },
    { od: 'vi', korak: 1, tekst: 'Prodajem alate, imam oko 500 artikala i oglase na OLX-u.' },
    { od: 'mi', korak: 1, tekst: 'Uzimate li artikle od dobavljača? I treba li da se oglasi na OLX-u sami ažuriraju?' },
    { od: 'vi', korak: 1, tekst: 'Da, od dva dobavljača. I da, to bi nam mnogo pomoglo.' },
    { od: 'mi', korak: 2, dokument: { ime: 'Ponuda.pdf', opis: 'trgovina, OLX veza, uvoz od dobavljača' } },
    { od: 'vi', korak: 3, tekst: 'Dogovoreno.' },
    { od: 'mi', korak: 3, tekst: 'Krećemo. Šaljemo Vam link da pratite kako napreduje.' },
  ],
  oznaka: 'Primjer razgovora. Nije prepiska sa stvarnim klijentom.',
}

export const narudzba = {
  nad: 'Šta možete naručiti',
  naslov: 'Jasne početne cijene, gotovo za 2 dana.',
  akcija: { oznaka: 'Black November', tekst: 'Cijene važe do 30. novembra 2026. Uz svaku narudžbu dobijete besplatnu skicu unaprijed, pa odlučite.' },
  bilo: 'bilo',
  rok: 'gotovo za 2 dana',
  okreni: 'Pogledajte šta dobijate',
  kartice: [
    { ime: 'Web stranica', paket: 'Osnovno', cijena: { od: 'od 399 KM', bilo: '669 KM' }, opis: 'Za firme i udruženja kojima treba uredna i brza stranica: dizajn po mjeri, za telefon i računar, kontakt, mapa i poruke na WhatsApp, osnovni SEO. Može i redizajn postojeće.' },
    { ime: 'Web shop', paket: 'Osnovno', cijena: { od: 'od 899 KM', bilo: '1.499 KM' }, opis: 'Za prodavnice koje hoće prodavati online: katalog, korpa, pouzeće i uplata na račun. Narudžbe stižu i kad ste zatvoreni.' },
    { ime: 'Online zakazivanje', paket: 'Osnovno', cijena: { od: 'od 499 KM', bilo: '829 KM' }, opis: 'Za salone, berbernice i ordinacije: klijenti sami zakazuju termin, 0 do 24, a Vi imate manje poziva.' },
    { ime: 'Trgovina sa bh. vezama', cijena: { od: 'po dogovoru' }, opis: 'Sve iz web shopa, plus OLX koji se sam ažurira, feed za Ananas i uvoz od dobavljača. Po potrebi i B2B portal.' },
    { ime: 'Sistem po mjeri', cijena: { od: 'po dogovoru' }, opis: 'AI chatbot, mobilna aplikacija ili B2B portal za Vaš način rada.' },
  ],
}

// Jači paket za svaku uslugu (odluka vlasnika 22. 11. 2026): osnovno se reklamira, Plus stoji pored.
export const plus = {
  nad: 'Paket Plus',
  naslov: 'Kad Vam treba više, tu je Plus.',
  uvod: 'Svaka usluga ima i jači paket. Dobijete sve iz osnovnog paketa, i dosta više uz to.',
  oznaka: 'Plus',
  sve: 'Sve iz osnovnog, i:',
  paketi: [
    { ime: 'Web stranica Plus', cijena: 'od 799 KM', stavke: ['više stranica, galerija i novosti', 'prevod na engleski ili njemački, za dijasporu i strane kupce', 'podešen Google profil, jači SEO i statistika posjeta', 'domen i hosting prvu godinu', '3 mjeseca održavanja'] },
    { ime: 'Web shop Plus', cijena: 'od 1.799 KM', stavke: ['OLX koji se sam ažurira i feed za Ananas', 'uvoz artikala od dobavljača', 'plaćanje karticom, kad imate ugovor sa bankom', 'artikle unosimo mi', 'kuponi i akcije', 'obavijest o narudžbi na Viber ili WhatsApp', 'domen i hosting prvu godinu, 3 mjeseca održavanja'] },
    { ime: 'Online zakazivanje Plus', cijena: 'od 999 KM', stavke: ['više radnika i stolica', 'podsjetnik klijentu dan ranije', 'akontacija i poklon-bonovi', 'statistika termina za vlasnika', 'web stranica salona uz zakazivanje'] },
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
    { p: 'Šta ulazi u cijenu od 399 KM?', o: 'Stranica po mjeri za telefon i računar, kontakt, mapa i poruke na WhatsApp, uz besplatnu skicu unaprijed. Ako Vam treba više, kažemo cijenu prije nego počnemo, bez skrivenih troškova.' },
    { p: 'Šta je paket Plus?', o: 'Jači paket za svaku uslugu: sve iz osnovnog, plus prevod, više stranica, OLX veza, podsjetnici, domen i hosting prvu godinu i 3 mjeseca održavanja, zavisno od usluge. Web stranica Plus je od 799 KM, web shop Plus od 1.799 KM, a zakazivanje Plus od 999 KM.' },
    { p: 'Koliko traje izrada?', o: 'Stranica, web shop ili zakazivanje dobijete gotove za 2 dana od kad pošaljete tekst i slike. Trgovina sa OLX vezom i uvozom od dobavljača traje duže, a rok stoji u ponudi.' },
    { p: 'Da li je stranica moja?', o: 'Da. Stranica i materijali su Vaši.' },
    { p: 'Mogu li sam mijenjati sadržaj?', o: 'Da. Tekst, slike i artikle mijenjate sami, a uz predaju dobijete kratku obuku.' },
    { p: 'Radite li redizajn postojeće stranice?', o: 'Da. Pošaljite link, pa Vam kažemo šta bismo promijenili i zašto.' },
    { p: 'Možete li povezati trgovinu sa OLX-om?', o: `Da. Na mrt.ba tako radi ${olx.o.broj} ${olx.imenica} (provjereno ${olx.o.datum}).` },
  ],
}

export const poziv = {
  nad: 'Ponuda',
  naslov: 'Recite šta Vam treba, a mi Vam kažemo koliko košta.',
  opis: 'Napišite šta prodajete i šta Vam treba. Odgovaramo lično.',
  dugme: 'Pišite nam na WhatsApp',
  ili: 'ili nazovite',
}

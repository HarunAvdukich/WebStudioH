// Tekst stranice O Hunaru (/o-nama). Engleska verzija je o-hunaru.en.js, istog oblika.
// Izvor je platno "Tekst sajta" (T-o-hunaru), prebačeno u "mi". Platno kaže "studio jednog
// čovjeka" i "jedan majstor"; PRODUCT.md zabranjuje broj ljudi, pa uvod to ne kaže.

export const jezik = 'bs'
export const put = '/o-nama'

export const seo = {
  naslov: 'O Hunaru · sve iz jedne ruke · Hunar',
  opis: 'Hunar znači vještina. Dizajn, kod, hosting i održavanje iz jedne ruke, za firme u BiH. Kad nas zovete, javlja se onaj ko je pravio vašu stranicu.',
}

export const vrh = {
  nad: 'O Hunaru',
  naslov: 'Hunar znači vještina.',
  uvod: 'Dizajn, kod, hosting i održavanje radimo sami, iz jedne ruke, pa nema prebacivanja između dizajnera, programera i hosting firme. Kad nas zovete, javlja se onaj ko je pravio vašu stranicu.',
  uvod2: 'Radimo za firme u BiH i govorimo jezikom posla: OLX, pouzeće, dobavljač, zaliha, termin. Ne prodajemo "digitalna rješenja", nego stranice i trgovine koje rade za vaš posao i skidaju vam ručni rad s leđa.',
}

// Veliki trenutak "Iz jedne ruke".
export const ruka = {
  obicno: { nad: 'Obično', naslov: 'Četiri firme, četiri broja telefona.' },
  kodNas: { nad: 'Kod nas', naslov: 'Jedan broj, od prve skice do održavanja.' },
  kartice: [
    { ime: 'Dizajner', opis: 'skica i izgled', ikona: 'dizajn' },
    { ime: 'Programer', opis: 'kod i trgovina', ikona: 'kod' },
    { ime: 'Hosting firma', opis: 'server i domena', ikona: 'server' },
    { ime: 'Održavanje', opis: 'kad nešto zapne', ikona: 'alat' },
  ],
  izmedju: ['prebacivanje', 'čekanje', 'novi broj'],
  jedna: {
    naslov: 'Sve iz jedne ruke.',
    opis: 'Kad nas zovete, javlja se onaj ko je pravio vašu stranicu.',
    stavke: ['Dizajn', 'Kod', 'Hosting', 'Održavanje'],
  },
}

export const znak = {
  nad: 'Znak',
  recenica: 'Znak su dva ista slova, u i n, spojena u petlju. Tako i radimo: spajamo vašu firmu sa kupcima, OLX-om, dobavljačima i terminima.',
}

export const kako = {
  nad: 'Kako radimo',
  naslov: 'Četiri pravila koja ne mijenjamo.',
  pravila: [
    { naslov: 'Dokaz ispred obećanja.', opis: 'Pokazujemo trgovine koje rade i brojke sa datumom.' },
    { naslov: 'Brzina se mjeri.', opis: 'Kad kažemo da je stranica brza, kažemo i na kojem uređaju i kada je mjereno.', mjerac: true },
    { naslov: 'Iskreno.', opis: 'Ne obećavamo ništa što vi ili vaši kupci ne možete provjeriti.' },
    { naslov: 'Kratak put.', opis: 'Pišete na WhatsApp, odgovaramo lično.' },
  ],
  mjerac: { vrijednost: 100, opis: 'Lighthouse, računar, početna hunar.ba', datum: 'mjereno 29. 9. 2026' },
}

export const trake = [
  ['dizajn', 'kod', 'hosting', 'održavanje', 'jedan broj', 'iz jedne ruke'],
  ['OLX', 'pouzeće', 'dobavljač', 'zaliha', 'termin', 'brzina na telefonu'],
]

export const poziv = {
  nad: 'Pišite nam',
  naslov: 'Imate posao koji zaslužuje dobru stranicu?',
  opis: 'Napišite šta prodajete i šta vam treba. Odgovaramo lično.',
  dugme: 'Pišite nam na WhatsApp',
  ili: 'ili nazovite',
}

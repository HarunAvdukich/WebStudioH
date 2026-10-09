// Tekst stranice O Hunaru (/o-nama). Engleska verzija je o-hunaru.en.js, istog oblika.
// Izvor je platno "Tekst sajta" (T-o-hunaru), prebačeno u "mi". Platno kaže "studio jednog
// čovjeka" i "jedan majstor"; PRODUCT.md zabranjuje broj ljudi, pa uvod to ne kaže.

import { contact } from '../data.js'

export const jezik = 'bs'
export const put = '/o-nama'

// Opis i uvod počinju sa "Hunar je web studio", da ga Google i AI asistenti čitaju kao firmu,
// a ne kao riječ (9. 10. 2026 je Googleov AI odgovor za "hunar.ba" rekao da takva firma ne postoji).
export const seo = {
  naslov: 'O Hunaru, web studiju iz BiH · Hunar',
  opis: 'Hunar je web studio iz Bosne i Hercegovine, ranije WebStudioH. Dizajn, kod, hosting i održavanje radimo iz jedne ruke, za firme u BiH.',
}

export const vrh = {
  nad: 'O Hunaru',
  naslov: 'Hunar znači vještina.',
  uvod: 'Hunar je web studio iz Bosne i Hercegovine. Dizajn, kod, hosting i održavanje radimo sami, iz jedne ruke, pa nema prebacivanja između dizajnera, programera i hosting firme. Kad nas zovete, javlja se onaj ko je pravio vašu stranicu.',
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

// Činjenice o firmi na jednom mjestu, za ljude i za pretraživače; iste su i u JSON-LD (JsonLd.jsx).
// Dio opisa je niz: tekst ili link ({ tekst, put } za stranicu sajta, { tekst, href } za ostalo).
export const ukratko = {
  nad: 'Ukratko',
  naslov: 'Hunar na jednom mjestu.',
  stavke: [
    { pojam: 'Ko smo', opis: ['Hunar (hunar.ba), web studio iz Bosne i Hercegovine. Ranije smo radili pod imenom WebStudioH.'] },
    {
      pojam: 'Šta radimo',
      opis: ['Web stranice, web trgovine i sisteme po mjeri: veze sa OLX-om, Ananasom i dobavljačima, zakazivanje termina, B2B portale, SEO, AI chatbot, hosting i održavanje.'],
    },
    { pojam: 'Za koga', opis: ['Firme i radnje iz cijele BiH, a na engleskom i firme van BiH.'] },
    { pojam: 'Od kada', opis: ['Od 1. 6. 2026.'] },
    {
      pojam: 'Radovi',
      opis: [
        { tekst: 'mrt.ba', put: '/radovi/mrt' },
        ', trgovina alata povezana sa OLX-om, i ',
        { tekst: 'SmartTime', put: '/radovi/smarttime' },
        ', trgovina satova sa zakazivanjem termina.',
      ],
    },
    {
      pojam: 'Kontakt',
      opis: [
        'WhatsApp i telefon ',
        { tekst: contact.phoneDisplay, href: contact.phoneHref },
        ', mail ',
        { tekst: contact.email, href: `mailto:${contact.email}` },
        '.',
      ],
    },
  ],
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

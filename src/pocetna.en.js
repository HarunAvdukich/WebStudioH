// English home page ("Through the mark"), same shape as pocetna.js. Written for
// companies outside Bosnia and Herzegovina: local terms (OLX, Ananas, cash on
// delivery) are explained. Numbers carry their date. No long dashes.
import { contact } from './data.js'
import { pitanja as pitanjaCijene } from './stranice/cijene.en.js'
import { katalogMrt, oglasiMrt, satoviSmarttime } from './brojke.js'
import { radovi as radoviStranice, studija } from './stranice/radovi.en.js'

// Same text as Services (guide) and About (one point of contact, the mark).
export { vodic, stepenice } from './stranice/usluge.en.js'
export { ruka, znak } from './stranice/o-hunaru.en.js'

// Store figures (P1): refreshed at build time, each with the date it was checked.
const kat = katalogMrt('en')
const olx = oglasiMrt('en')
const st = satoviSmarttime('en')

export const jezik = 'en'
export const put = '/en'

export const whatsappPoruka = 'Hi, I run a company and I am interested in a website. Can we talk?'
export const whatsappLink = `${contact.whatsapp}?text=${encodeURIComponent(whatsappPoruka)}`

// English pages that exist so far; the rest get English when they get the new design.
export const meni = [
  { naziv: 'Services', put: '/en/services' },
  { naziv: 'Work', put: '/en/work' },
  { naziv: 'Pricing', put: '/en/pricing' },
  { naziv: 'About', put: '/en/about' },
  { naziv: 'Contact', put: '/en/contact' },
]

export const drugiJezik = { oznaka: 'BS', naziv: 'Bosanski', jezik: 'bs', put: '/' }

export const ui = {
  dugme: 'Message us on WhatsApp',
  dugmeKratko: 'Message us',
  prica: 'Hunar, websites, online stores and custom systems',
  glavniMeni: 'Main menu',
  otvoriMeni: 'Open menu',
  zatvoriMeni: 'Close menu',
  meniTelefon: 'Menu',
  podnozjeMeni: 'Footer',
  skrol: 'Scroll',
  sklopljeno: 'assembled',
  izradio: 'Izradio',
  privatnost: { naziv: 'Privacy policy', put: '/en/privacy' },
  kontakt: { whatsapp: 'WhatsApp', veznik: 'and', telefon: 'phone' },
  telefon: '+387 60 3000 751',
  poglavlja: 'Story chapters',
  uvecaj: 'Zoom',
}

export const seo = {
  naslov: 'Web development studio in Bosnia and Herzegovina · Hunar',
  opis: 'A web studio from Bosnia and Herzegovina building fast websites, online stores and custom systems. Design, code, hosting and maintenance in one place.',
}

// First screen: "We build [word] for businesses like yours." The word cycles through
// eight services, with a live example of each next to it.
export const prvi = {
  primamo: 'Taking on new projects',
  pozdrav: 'Coming from {izvor}? We built that store',
  izvori: { 'mrt.ba': '/en/work/mrt', 'smarttime.ba': '/en/work/smarttime' },
  radimo: 'We build',
  zaFirme: 'for businesses like yours.',
  poruka: 'Message:',
  zanima: 'I am interested in {usluga}',
  waPoruka: 'Hi, I am interested in {usluga}. Can we talk?',
  kliknite: 'click the example',
  dodirnite: 'tap the example',
  primjer: 'Service example, illustration. Click to play it again.',
  pokazi: 'Show: {usluga}',
  listajte: 'Scroll',
}

// Mobile apps and redesigns are offered, but not presented as finished work.
export const usluge = [
  { id: 'stranica', rijec: 'websites', ime: 'Websites', uPoruci: 'a website', opis: 'So customers find you and understand you in half a minute.' },
  { id: 'shop', rijec: 'online stores', ime: 'Online stores', uPoruci: 'an online store', opis: 'A shop that stays open after you close. With marketplace sync if you need it.' },
  { id: 'aplikacija', rijec: 'mobile apps', ime: 'Mobile apps', uPoruci: 'a mobile app', opis: 'Your app on your customers’ phones, with notifications.' },
  { id: 'seo', rijec: 'SEO', ime: 'SEO', uPoruci: 'SEO', opis: 'So people find you on Google when they search for what you do.' },
  { id: 'termini', rijec: 'online booking', ime: 'Online booking', uPoruci: 'online booking', opis: 'Customers book their own appointment, even when you are closed.' },
  { id: 'chatbot', rijec: 'AI chatbots', ime: 'AI chatbots', uPoruci: 'an AI chatbot', opis: 'An assistant that answers customers on your site, even at night.' },
  { id: 'redizajn', rijec: 'redesigns', ime: 'Website redesigns', uPoruci: 'a website redesign', opis: 'Have an old site? We make it new, fast and clear.' },
  { id: 'odrzavanje', rijec: 'hosting and care', ime: 'Hosting and maintenance', uPoruci: 'hosting and maintenance', opis: 'A website is done only when it still works tomorrow.' },
]

export const primjeri = {
  stranica: { oznaka: 'Website', dugme: 'Message us on WhatsApp' },
  shop: { oznaka: 'Online store', korpa: 'Cart', placanje: ['Cash on delivery ✓', 'Bank transfer ✓', 'Marketplace ✓'] },
  aplikacija: {
    oznaka: 'Mobile app',
    obavijesti: [['New order ✓', '2 items, delivery'], ['Appointment tomorrow, 10:00', 'reminder'], ['Parcel shipped ✓', 'arrives tomorrow']],
    uredjaji: ['iPhone ✓', 'Android ✓', 'Notifications ✓'],
  },
  seo: {
    oznaka: 'SEO, so Google finds you',
    pretrage: [['hairdresser Sarajevo', 'hair salon'], ['car service Tuzla', 'car service'], ['bakery Mostar', 'bakery']],
    adresa: 'yourcompany.com',
    firma: 'Your company · {djelatnost}',
    dugmad: ['Call', 'Directions', 'Book'],
  },
  termini: { oznaka: 'Online booking', sati: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'], zauzeti: [1, 4], potvrda: 'Booked ✓ Tuesday, {sat}' },
  chatbot: {
    oznaka: 'AI chatbot',
    razgovori: [
      ['Do you have a mower under 200 EUR?', 'We have a few. Here is one with a 46 cm deck and home delivery.'],
      ['Do you deliver?', 'Yes, we ship to your address.'],
      ['Can I pay on delivery?', 'You can. You pay when the parcel arrives.'],
    ],
  },
  redizajn: { oznaka: 'Website redesign', prije: 'Before', poslije: 'After', dugme: 'Message us' },
  odrzavanje: {
    oznaka: 'Hosting and maintenance',
    redovi: [['Website', 'up'], ['Backup', 'today'], ['Updates', 'done']],
    kopija: 'just now',
  },
}

export const poglavlja = [
  { broj: '01', ime: 'Hunar' },
  { broj: '02', ime: 'U: what you get' },
  { broj: '03', ime: 'From u to n' },
  { broj: '04', ime: 'N: how it works' },
  { broj: '05', ime: 'Signature' },
]

export const uNajava = {
  nad: 'U · what you get',
  naslov: 'Everything your business needs online. Built like a watch.',
  opis: 'Each part of this watch is one service. Take a single part or the whole set, and we make sure it all works together.',
}

export const sat = {
  kanal: 'U · what you get · every part is one service',
  kanalKratko: 'U · what you get',
  kadrovi: '/kadrovi/sat/',
  broj: 124,
  alt: 'A Seiko 5 watch from smarttime.ba assembling from its parts, illustration',
  oznake: [
    { y: 0.215, strana: 'L', pomak: 0, naslov: 'Websites', opis: 'Services, contact and map in one place. You edit the text yourself, no developer needed.' },
    { y: 0.305, strana: 'D', pomak: -30, naslov: 'Online stores', opis: 'Customers order from their phone in a few taps. Marketplace listings update themselves.' },
    { y: 0.4175, strana: 'L', pomak: 0, naslov: 'Mobile apps', opis: 'Your own app for Android and iPhone, with notifications for your customers.' },
    { y: 0.4175, strana: 'D', pomak: 34, naslov: 'SEO', opis: 'Customers find you on Google, and the page opens before they give up.' },
    { y: 0.5675, strana: 'L', pomak: 10, naslov: 'Online booking', opis: 'Customers pick the service and the time themselves, even when you are closed.' },
    { y: 0.5675, strana: 'D', pomak: 40, naslov: 'AI chatbots', opis: 'An assistant that answers customers on your site, even at night.' },
    { y: 0.725, strana: 'L', pomak: 20, naslov: 'Website redesigns', opis: 'We turn an old site into a new one: fast, clear and easy to edit.' },
    { y: 0.725, strana: 'D', pomak: 50, naslov: 'Hosting and maintenance', opis: 'Updates, backups and monitoring. You run the business, we keep it all running.' },
  ],
  lista: {
    naslov: 'Building your business:',
    stavke: ['Websites', 'Online stores', 'Mobile apps', 'SEO', 'Online booking', 'AI chatbots', 'Redesigns', 'Hosting and maintenance'],
  },
  kraj: {
    naslov: 'Runs like clockwork.',
    opis: 'Website, store, integrations and maintenance from the same hands. When you need something, you call one number, not three companies.',
    uz: `smarttime.ba is a watch store we built in Bosnia: ${st.s.broj} ${st.satovi} in the catalogue (${st.s.datum}), ordering from a phone and engraving appointments.`,
  },
  sajt: {
    naslov: 'The same watch, live on smarttime.ba.',
    opis: 'The Seiko 5 SNKE01K1, with photos taken in the shop. Customers look it over on their phone and order in a few taps.',
    izvor: 'Phone screenshot, smarttime.ba, 30 Sep 2026.',
    slika: '/kadrovi/smarttime-telefon.webp',
    alt: 'The Seiko 5 SNKE01K1 product page on smarttime.ba, phone screenshot',
  },
}

export const prelaz = {
  nad: 'From u to n',
  naslov: 'Promises are easy. Here is a store where all of this runs every day.',
}

export const nNajava = {
  nad: 'N · a real store, real numbers',
  naslov: 'Thousands of products on mrt.ba. Marketplace listings publish themselves.',
  opis: 'mrt.ba sells tools and garden machines in Bosnia. We took this Villager mower from their catalogue and took it apart. Every part is one piece of the system we built for them.',
}

export const kosilica = {
  kanal: 'N · how it works on mrt.ba · every part is part of the system',
  kanalKratko: 'N · how it works on mrt.ba',
  kadrovi: '/kadrovi/kosilica/',
  broj: 124,
  alt: 'A Villager EAGLE 6111 V lawn mower from mrt.ba assembling from its parts, illustration',
  oznake: [
    { y: 0.13, strana: 'L', pomak: 0, naslov: 'Management', opis: 'The owner edits the content with an AI editor. Wholesale buyers order through a B2B portal.' },
    { y: 0.35, strana: 'L', pomak: 0, naslov: 'Cart', opis: 'Customers order from their phone and pay by bank transfer or cash on delivery.' },
    { y: 0.5, strana: 'D', pomak: 0, naslov: 'Suppliers', opis: 'Prices and stock arrive on their own from several suppliers. No retyping.' },
    { y: 0.64, strana: 'L', pomak: 0, naslov: 'Catalogue', opis: `${kat.a.broj} ${kat.imenica}, checked ${kat.a.datum}.` },
    { y: 0.865, strana: 'L', pomak: 10, naslov: 'OLX and Ananas', opis: `${olx.o.broj} listings on OLX, the biggest marketplace in Bosnia, publish and update themselves (${olx.o.datum}). The catalogue also feeds the Ananas marketplace.` },
    { y: 0.865, strana: 'D', pomak: -20, naslov: 'Speed', opis: 'The server responds in 52 ms, measured 27 Sep 2026. Nobody waits.' },
  ],
  lista: {
    naslov: 'The mrt.ba system:',
    stavke: ['Catalogue', 'Cart', 'Suppliers', 'OLX and Ananas', 'Speed', 'Management'],
  },
  kraj: {
    naslov: 'Assembled. And selling.',
    opis: 'mrt.ba has been live since 6 Sep 2026. In their words:',
    citat: '“Listings update themselves, and we edit the content ourselves in the admin panel.”',
    citatOd: 'mrt.ba, tools and equipment store (translated from Bosnian)',
  },
  sajt: {
    naslov: 'The same mower, live on mrt.ba.',
    opis: 'Customers find it on their phone, with photos, a description and stock status. Price and stock arrive on their own from the supplier.',
    izvor: 'Phone screenshot, mrt.ba, 30 Sep 2026.',
    slika: '/kadrovi/mrt-telefon.webp',
    alt: 'The Villager EAGLE 6111 V product page on mrt.ba, phone screenshot',
  },
}

export const potpis = {
  tekst: '"Izradio" is Bosnian for "made by". This signature sits at the bottom of these stores. The next one could be on yours.',
  radovi: [
    { naziv: 'mrt.ba', put: '/en/work/mrt', opis: 'Tools, mowers and parts. Catalogue, cart and marketplace sync.' },
    { naziv: 'smarttime.ba', put: '/en/work/smarttime', opis: 'Wristwatches. Orders and engraving appointments.' },
  ],
  vise: 'See the work',
}

export const finale = {
  naslov: 'Your company is next.',
  ili: 'or call',
  opis: 'Tell us what you sell and what you need. A real person replies, and we put an offer together after a short call.',
  ispod: 'Start with one part or ask for the whole set. Prices on request, based on what you need.',
  ponuda: [
    { naslov: 'Websites', opis: 'A company site customers find and understand in half a minute. You edit the text yourself.' },
    { naslov: 'Online stores', opis: 'Catalogue, filters and cart built for phones, with the payment methods your market uses.' },
    { naslov: 'Mobile apps', opis: 'An app for Android and iPhone, for your customers or for your team.' },
    { naslov: 'SEO', opis: 'Speed, titles and Google Search Console. We measure it and show you, with dates.' },
    { naslov: 'Online booking', opis: 'Customers pick the service and the time. You get a notification.' },
    { naslov: 'AI chatbots', opis: 'An assistant on your site that answers customers when you cannot.' },
    { naslov: 'Website redesigns', opis: 'Send us the link to your old site and we tell you what we would change and why.' },
    { naslov: 'Hosting and maintenance', opis: 'Updates, backups and monitoring. The studio that built it also fixes it.' },
  ],
}

export const podnozje = {
  opis: 'Hunar is a web studio from Bosnia and Herzegovina. Websites, online stores and custom systems, from design to hosting and maintenance.',
  znacenje: 'hunar: Bosnian for skill, craft',
}

// ---------- home page on phones (and without JavaScript): the page flows, no story in the letter ----------

export const linija = ['Hunar', 'What we build', 'About us', 'Getting a quote', 'Work', 'Your company']

export const sta = {
  nad: 'What we build',
  naslov: 'Everything your business needs online.',
  opis: 'Start with one part, and add the next one when your business grows.',
  pitaj: { dugme: 'Ask about this', poruka: 'Hi, I am interested in {usluga}. Can we talk?' },
}

export const film = {
  listajte: 'Keep scrolling',
  sklopljeno: '{n}% assembled',
  sat: {
    oznaka: 'Built like a watch',
    kartice: [
      { naslov: 'Custom design', opis: 'A look that fits your company, not a thousand others.' },
      { naslov: 'Website and store', opis: 'Customers find a product on their phone and order in a few taps.' },
      { naslov: 'Integrations that run themselves', opis: 'Marketplaces, feeds and suppliers. It winds itself, like an automatic watch.' },
      { naslov: 'One point of contact', opis: 'Design, code, hosting and maintenance in the same studio.' },
    ],
  },
  kosilica: {
    oznaka: 'How it works on mrt.ba',
    kartice: [
      { do: kat.a.vrijednost, opis: `${kat.imenica}, checked ${kat.a.datum}.` },
      { do: olx.o.vrijednost, opis: `listings on OLX, the biggest marketplace in Bosnia, publish and update themselves, ${olx.o.datum}.` },
      { do: 52, poslije: ' ms', opis: 'server response time, measured 27 Sep 2026.' },
      { naslov: 'Assembled. And selling.', opis: 'mrt.ba has been live since 6 Sep 2026.' },
    ],
  },
}

export const onama = { nad: 'About us', znakNad: 'Hunar means skill' }

export const doPonude = {
  nad: 'Getting a quote',
  naslov: 'Tell us what you need, and we tell you what it costs.',
  koraci: [
    { naslov: 'You write what you sell and what you need.', opis: 'WhatsApp, phone or email.', poruka: 'I sell tools, I have about 500 products and listings on a marketplace.' },
    { naslov: 'We have a short talk.', opis: 'We only ask what changes the job: number of products, marketplaces, suppliers, appointments.' },
    { naslov: 'You get a quote with a clear scope.', dokument: 'Quote', pecat: 'clear scope' },
    { naslov: 'Once we agree, we start.', opis: 'You can follow the progress.' },
  ],
  primjer: 'Example message',
}

export const reference = {
  nad: 'Work',
  naslov: 'Do not take our word for it.',
  opis: 'These are stores we built in Bosnia. Open them on your phone and check.',
  smarttime: {
    nad: 'SmartTime',
    naslov: 'A watch on the phone, an appointment without a call.',
    izvor: 'Phone screenshot, smarttime.ba, 30 Sep 2026.',
    uvecaj: 'Tap to zoom',
  },
  galerija: {
    naslov: 'Our signature sits at the bottom of these stores.',
    opis: 'Phone screenshots, mrt.ba and smarttime.ba, 29 Sep 2026.',
    snimci: radoviStranice.flatMap((r) => r.snimci || []),
    t: studija,
  },
}

export const vodicNad = { nad: 'Not sure what you need?', naslov: 'Two questions, then a recommendation.' }

export const pitanja = {
  nad: 'Questions',
  naslov: 'Before you message us.',
  lista: pitanjaCijene.lista.filter((x) => /long|mine|myself/.test(x.p)),
}

// English home page ("Through the mark"), same shape as pocetna.js. Written for
// companies outside Bosnia and Herzegovina: local terms (OLX, Ananas, cash on
// delivery) are explained. Numbers carry their date. No long dashes.
import { contact } from './data.js'

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
}

export const seo = {
  naslov: 'Web development studio in Bosnia and Herzegovina · Hunar',
  opis: 'A web studio from Bosnia and Herzegovina building fast websites, online stores and custom systems. Design, code, hosting and maintenance in one place.',
}

export const uvod = {
  nad: 'Hunar · Bosnian for skill, craft',
  naslov: 'Websites and online stores that do real work for your business.',
  opis: 'We are a web studio from Bosnia and Herzegovina. We design, build, host and maintain websites, online stores and custom systems for companies anywhere. One studio, from the first sketch to maintenance.',
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
    { y: 0.215, strana: 'L', pomak: 0, naslov: 'Google and speed', opis: 'Customers find you on Google, and the page opens before they give up.' },
    { y: 0.305, strana: 'D', pomak: -30, naslov: 'Custom design', opis: 'A look that fits your company, not a thousand others.' },
    { y: 0.4175, strana: 'L', pomak: 0, naslov: 'Website', opis: 'Services, contact and map in one place. You edit the text yourself, no developer needed.' },
    { y: 0.4175, strana: 'D', pomak: 34, naslov: 'Online store', opis: 'Customers find a product on their phone and order in a few taps, with the payment methods your market uses.' },
    { y: 0.5675, strana: 'L', pomak: 10, naslov: 'Integrations', opis: 'Marketplaces, product feeds and supplier stock, synced on their own. Like an automatic watch: it winds itself.' },
    { y: 0.5675, strana: 'D', pomak: 40, naslov: 'Custom systems', opis: 'Appointment booking, a B2B portal for wholesale, an app built around how you work.' },
    { y: 0.725, strana: 'L', pomak: 20, naslov: 'Hosting and maintenance', opis: 'Updates, backups and monitoring. You run the business, we keep it all running.' },
    { y: 0.725, strana: 'D', pomak: 50, naslov: 'AI tools', opis: 'Tell the editor what to change and it does it. Product descriptions for your catalogue.' },
    { y: 0.905, strana: 'L', pomak: 10, naslov: 'One point of contact', opis: 'Design, code, hosting and maintenance in the same studio. One phone number.' },
  ],
  lista: {
    naslov: 'Building your business:',
    stavke: ['Custom design', 'Website', 'Online store', 'Integrations', 'Custom systems', 'AI tools', 'Google and speed', 'Hosting', 'One point of contact'],
  },
  kraj: {
    naslov: 'Runs like clockwork.',
    opis: 'Website, store, integrations and maintenance from the same hands. When you need something, you call one number, not three companies.',
    uz: 'smarttime.ba is a watch store we built in Bosnia: 526 wristwatches in the catalogue (29 Sep 2026), ordering from a phone and engraving appointments.',
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
    { y: 0.64, strana: 'L', pomak: 0, naslov: 'Catalogue', opis: '7,460 products in 278 categories, checked 29 Sep 2026.' },
    { y: 0.865, strana: 'L', pomak: 10, naslov: 'OLX and Ananas', opis: '4,453 listings on OLX, the biggest marketplace in Bosnia, publish and update themselves (29 Sep 2026). The catalogue also feeds the Ananas marketplace.' },
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
    { naziv: 'mrt.ba', put: 'https://mrt.ba', opis: 'Tools, mowers and parts. Catalogue, cart and marketplace sync.' },
    { naziv: 'smarttime.ba', put: 'https://smarttime.ba', opis: 'Wristwatches. Orders and engraving appointments.' },
  ],
  vise: 'Visit the store',
}

export const finale = {
  naslov: 'Your company is next.',
  opis: 'Tell us what you sell and what you need. A real person replies, and we put an offer together after a short call.',
  ispod: 'Start with one part or ask for the whole set. Prices on request, based on what you need.',
  ponuda: [
    { naslov: 'Website', opis: 'A company site customers find and understand in half a minute. You edit the text yourself.' },
    { naslov: 'Online store', opis: 'Catalogue, filters and cart built for phones, with the payment methods your market uses.' },
    { naslov: 'Integrations', opis: 'Marketplaces, feeds and suppliers synced on their own. Less typing, more time for customers.' },
    { naslov: 'Systems', opis: 'Appointment booking, B2B portal, an app built around your business.' },
    { naslov: 'AI tools', opis: 'An editor you tell what to change, and product descriptions for your catalogue.' },
    { naslov: 'Google and speed', opis: 'Technical SEO and speed that we measure and show you, with dates.' },
    { naslov: 'Hosting and maintenance', opis: 'Updates, backups and monitoring. You sell, we look after the rest.' },
    { naslov: 'One point of contact', opis: 'One studio, one number. The studio that built it also fixes it.' },
  ],
}

export const podnozje = {
  opis: 'Hunar is a web studio from Bosnia and Herzegovina. Websites, online stores and custom systems, from design to hosting and maintenance.',
  znacenje: 'hunar: Bosnian for skill, craft',
}

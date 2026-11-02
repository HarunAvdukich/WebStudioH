// English Services page (/en/services), same shape as usluge.js. Written for companies
// outside Bosnia and Herzegovina, so local terms (OLX, Ananas, cash on delivery) are
// explained. Services without a finished example (mobile apps, redesign) are offered,
// never presented as done work. Every number carries its date.

import { oglasiMrt } from '../brojke.js'

export const jezik = 'en'

const olx = oglasiMrt('en')
export const put = '/en/services'

export const seo = {
  naslov: 'Services · Websites, online stores, apps and SEO · Hunar',
  opis: 'Websites, online stores, SEO, online booking, AI chatbots, mobile apps, hosting and maintenance. One studio from design to upkeep.',
}

export const vrh = {
  nad: 'Services',
  naslov: 'From a first website to a system that runs itself.',
  smjena: {
    prije: 'For companies anywhere, we build',
    rijeci: ['websites', 'online stores', 'mobile apps', 'SEO', 'online booking', 'AI chatbots', 'website redesigns', 'hosting and upkeep'],
    poslije: '.',
  },
  uvod: 'A shop that just wants a website needs something different from a company that needs a system. So our services work like steps: start with the one you need today and add the next when the business grows.',
}

export const pitaj = {
  dugme: 'Ask about this',
  poruka: 'Hi, I am interested in {usluga}. Can we talk?',
}

export const stepenice = [
  {
    id: 'stranica',
    oznaka: 'Website',
    ime: 'Website and redesign',
    naslov: 'So customers find you and get it in thirty seconds.',
    opis: 'For companies, shops and associations that need a clean, fast website, or a new one in place of the old.',
    stavke: [
      'Design made for your company, not a template',
      'Services, contact, map and a WhatsApp button',
      'Fast on phones, where most customers look at you',
      'You edit the text and images yourself',
      'Redesign: send us the link to your current site and we tell you what we would change and why',
    ],
    usluge: [
      { ime: 'Websites', uPoruci: 'a website' },
      { ime: 'Website redesign', uPoruci: 'a website redesign' },
    ],
  },
  {
    id: 'shop',
    oznaka: 'Online store',
    ime: 'Online store',
    naslov: 'A shop that stays open after you close.',
    opis: 'For retailers who want to sell online too, properly and without complications.',
    stavke: [
      'Catalogue with categories, filters and search',
      'A cart that works on phones',
      'Cash on delivery and bank transfer, cards with a payment processor contract',
      'Pages for delivery, returns and complaints',
      'OLX link: listings on OLX, the largest classifieds site in Bosnia, update themselves when you change a price or stock',
    ],
    uzivo: { tekst: 'See it live:', linkovi: [{ ime: 'mrt.ba', url: 'https://mrt.ba' }, { ime: 'smarttime.ba', url: 'https://smarttime.ba' }] },
    usluge: [{ ime: 'Online store', uPoruci: 'an online store' }],
  },
  {
    id: 'seo',
    oznaka: 'SEO and links',
    ime: 'SEO and local marketplaces',
    naslov: 'Less typing, more time for customers.',
    opis: 'So people find you on Google, and products reach marketplaces on their own. Links built for the Bosnian market, and adaptable to yours.',
    stavke: [
      'SEO: speed, titles and descriptions, structured data and Google Search Console',
      'Products are posted and updated on OLX by themselves when you change a price or stock',
      'The catalogue feeds Ananas, a large online marketplace in the region',
      'Prices and stock are imported from suppliers, no retyping',
      `On mrt.ba this runs ${olx.o.broj} ${olx.imenica} (checked ${olx.o.datum})`,
    ],
    usluge: [{ ime: 'SEO', uPoruci: 'SEO' }],
    igra: 'olx',
  },
  {
    id: 'sistemi',
    oznaka: 'Systems',
    ime: 'Systems and apps',
    naslov: 'When you need more than a store.',
    opis: 'For companies that want the web to do part of the work.',
    stavke: [
      'Online booking: customers pick the service and time themselves (example: smarttime.ba)',
      'An AI chatbot on your site (example: the Kobi assistant on mrt.ba)',
      'A mobile app for Android and iPhone, for your customers or your team',
      'A B2B portal for wholesale customers (example: b2b.mrt.ba)',
    ],
    usluge: [
      { ime: 'Online booking', uPoruci: 'online booking' },
      { ime: 'AI chatbot', uPoruci: 'an AI chatbot' },
      { ime: 'Mobile apps', uPoruci: 'a mobile app' },
    ],
    igra: 'termin',
  },
]

export const odrzavanje = {
  id: 'odrzavanje',
  oznaka: 'Maintenance',
  ime: 'Hosting and maintenance',
  nad: 'Always with the site',
  naslov: 'A website is finished only when it still works tomorrow.',
  stavke: [
    'Hosting, domain and business email',
    'Updates and regular backups',
    'Monitoring of email and orders',
    'Small content changes',
    'Help when something gets stuck, from the studio that built the site',
  ],
  usluge: [{ ime: 'Hosting and maintenance', uPoruci: 'hosting and maintenance' }],
  mjerac: { vrijednost: 100, opis: 'Lighthouse, desktop, hunar.ba home page', datum: 'measured 29 Sep 2026', izmjeri: 'https://hunar.ba/' },
}

export const scena = {
  oznaka: 'Illustration: one website grows from a simple page into a system',
  stepenica: 'Step',
  adresa: 'yourcompany.com',
  dugme: 'Message us on WhatsApp',
  pouzece: 'Cash on delivery ✓  Bank transfer ✓',
  cijenaPrije: '89 €',
  cijenaPoslije: '79 €',
  cijene: ['145 €', '59 €', '320 €'],
  veze: [
    { ime: 'Google', prije: 'search', poslije: 'titles and speed ✓' },
    { ime: 'OLX', prije: 'listings', poslije: 'listing updated ✓' },
    { ime: 'Ananas', prije: 'feed', poslije: 'feed refreshed ✓' },
    { ime: 'Supplier', prije: 'prices and stock', poslije: 'stock imported ✓' },
  ],
  b2b: 'B2B',
  termin: { naslov: 'Book a time', potvrda: 'Tuesday, 10:00 ✓' },
  asistent: 'Assistant: Can I help you choose?',
  aplikacija: 'App',
  odrzavanje: 'Maintenance: hosting, backups, monitoring and help',
}

export const trake = [
  ['websites', 'online stores', 'mobile apps', 'SEO', 'online booking', 'AI chatbots', 'redesign', 'hosting and upkeep'],
  ['cash on delivery', 'stock', 'suppliers', 'OLX listings', 'marketplace feeds', 'bookings', 'B2B', 'speed on phones'],
]

export const igre = {
  olx: {
    nad: 'Try it',
    naslov: 'Change the price, and the listing updates itself.',
    trgovina: 'Your store',
    oglas: 'Listing on OLX',
    artikal: 'Lawn mower, 46 cm',
    cijena: 'Price',
    zaliha: 'Stock',
    valuta: '€',
    naStanju: 'In stock: {n}',
    nema: 'Out of stock',
    azurirano: 'updated just now',
    manje: 'Decrease',
    vise: 'Increase',
    napomena: `Illustration. On mrt.ba this runs ${olx.o.broj} listings (checked ${olx.o.datum}).`,
  },
  termin: {
    nad: 'Try it',
    naslov: 'Click a free time slot.',
    usluga: 'Engraving',
    dani: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    daniPuni: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    sati: ['09:00', '10:00', '11:00', '13:00'],
    zakazano: 'Booked ✓',
    zauzeto: 'taken',
    napomena: 'Illustration. This is how customers book engraving on smarttime.ba.',
  },
}

export const vodic = {
  nad: 'Guide',
  naslov: 'Not sure which step you need?',
  uvod: 'Two questions, and we tell you where to start.',
  prvo: {
    pitanje: 'What do you sell?',
    odgovori: [
      { id: 'usluge', tekst: 'Services (repairs, salons, trades)', uPoruci: 'I sell services' },
      { id: 'proizvode', tekst: 'Products', uPoruci: 'I sell products' },
    ],
  },
  usluge: {
    pitanje: 'Do you book appointments with customers?',
    odgovori: [
      { id: 'da', tekst: 'Yes, every day', uPoruci: 'I book appointments with customers' },
      { id: 'ne', tekst: 'No', uPoruci: 'I do not book appointments' },
    ],
  },
  proizvode: {
    pitanje: 'Do you also sell on marketplaces or buy stock from suppliers?',
    odgovori: [
      { id: 'da', tekst: 'Yes', uPoruci: 'I also sell on marketplaces or buy from suppliers' },
      { id: 'ne', tekst: 'No, only in the shop', uPoruci: 'I sell only in the shop' },
    ],
  },
  preporuke: {
    termini: { stepenica: 4, ime: 'online booking', opis: 'Customers pick the service and time themselves, even when you are closed. Like smarttime.ba.' },
    stranica: { stepenica: 1, ime: 'a website', opis: 'So customers find you and get it in thirty seconds. Booking can be added later.' },
    olx: { stepenica: 3, ime: 'an online store with marketplace links', opis: 'A store that keeps listings and stock up to date by itself. Like mrt.ba.' },
    shop: { stepenica: 2, ime: 'an online store', opis: 'Start with the store, and add the links when the business grows.' },
  },
  vama: 'You need:',
  posalji: 'Send the answers on WhatsApp',
  ponovo: 'Start over',
  korak: 'Question {n} of 2',
  poruka: 'Hi! {odgovori}. The guide on hunar.ba suggested: {preporuka}. Can we talk?',
}

export const poziv = {
  nad: 'Message us',
  naslov: 'Describe your business in two sentences.',
  opis: 'We suggest where to start. We answer personally.',
  dugme: 'Message us on WhatsApp',
  ili: 'or call',
}

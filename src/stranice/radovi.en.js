// English Work page (/en/work) and case studies (/en/work/<slug>), same shape as radovi.js.
// Local terms are explained: OLX is the largest classifieds site in Bosnia and Herzegovina,
// Ananas a large online marketplace in the region. Every number carries its date.

export const jezik = 'en'
export const put = '/en/work'

export const seo = {
  naslov: 'Work · mrt.ba and SmartTime · Hunar',
  opis: 'Real online stores we built, with numbers you can check: mrt.ba, a tool store linked to OLX, and SmartTime, a watch store with online booking.',
}

export const vrh = {
  nad: 'Work',
  naslov: 'Work you can open and check yourself.',
  uvod: 'We do not show sketches, we show stores that run. Open them on your phone, browse the catalogue, look at the cart.',
}

export const kartica = {
  kursor: 'See the work',
  kako: 'How it was built',
  vise: 'More about it',
  otvori: 'Open {ime}',
  listajte: 'Scroll',
}

export const radovi = [
  {
    slug: 'mrt',
    ime: 'mrt.ba',
    oznaka: 'Tools, machines and equipment',
    opis: 'A catalogue from several suppliers, OLX listings that update themselves, a feed for Ananas, a B2B portal and the Kobi assistant.',
    url: 'https://mrt.ba',
    seo: {
      naslov: 'mrt.ba: a tool store linked to OLX · Hunar',
      opis: 'How we built mrt.ba: a tool store with thousands of products, OLX listings that update themselves, supplier import, a marketplace feed and a B2B portal.',
    },
    naslov: 'mrt.ba: thousands of products, and OLX keeps itself up to date.',
    uvod: 'Motor Remont Trade sells tools, machines, garden and farm equipment in Bosnia and Herzegovina. They needed a store that carries thousands of products from several suppliers and keeps them current on OLX, the largest classifieds site in the country, while the owner edits it without a developer.',
    napravili: [
      'A WooCommerce store with a theme written only for mrt.ba',
      'Import of catalogue, prices and stock from several suppliers',
      'An OLX link: products are posted and updated by themselves',
      'A feed for Ananas, a large online marketplace in the region',
      'A B2B portal for wholesale, b2b.mrt.ba',
      'An AI editor in the admin and the Kobi assistant on the site',
      'Hosting, caching and maintenance',
    ],
    brojke: [
      { do: 7447, opis: 'products in 262 categories', datum: 'checked 1 Oct 2026' },
      { do: 4453, opis: 'OLX listings that update themselves', datum: 'checked 29 Sep 2026' },
      { do: 52, poslije: ' ms', opis: 'server response', datum: 'measured 27 Sep 2026' },
    ],
    mjerac: { vrijednost: 52, poslije: ' ms', udio: 0.9, opis: 'Server response, mrt.ba (lower is better)', datum: 'measured 27 Sep 2026' },
    citat: {
      tekst: 'We needed a store that could carry thousands of products and keep them current on OLX by itself. Today we have over 7,400 products, the listings update themselves, and we change the content ourselves from the admin.',
      ko: 'mrt.ba (translated from Bosnian)',
    },
    slika: { src: '/project-mrt.webp', width: 1200, height: 769, alt: 'The mrt.ba home page on a desktop: a catalogue of tools, machines and equipment' },
    snimci: [
      { src: '/radovi/mrt-artikal.webp', width: 780, height: 1688, alt: 'The Stiga Combi 53 SQ lawn mower on mrt.ba at 799 KM, a phone screenshot', opis: 'Product on mrt.ba' },
      { src: '/radovi/mrt-olx.webp', width: 780, height: 1688, alt: 'The same Stiga Combi 53 SQ lawn mower as an OLX listing from Brčko, 799 KM, a phone screenshot', opis: 'The same product as an OLX listing' },
    ],
    snimciNaslov: 'Same product, same price, on mrt.ba and on OLX.',
    snimciOpis: 'Same product, same price: the Stiga Combi 53 SQ mower on mrt.ba and as an OLX listing. Captured on a phone on 29 Sep 2026.',
    igra: 'olx',
    poziv: { naslov: 'Do you also sell on marketplaces?', opis: 'We can link your store so that listings run by themselves.' },
  },
  {
    slug: 'smarttime',
    ime: 'SmartTime',
    oznaka: 'Watches, engraving and repairs',
    opis: 'Customers pick a watch on their phone and book an engraving or repair slot themselves.',
    url: 'https://smarttime.ba',
    seo: {
      naslov: 'SmartTime: a watch store with online booking · Hunar',
      opis: 'How we built SmartTime: a store with over 500 watches, pages for engraving and repairs, and appointment booking right on the site, no phone calls.',
    },
    naslov: 'SmartTime: a watch on your phone, a booking without a phone call.',
    uvod: 'SmartTime sells wristwatches and does engraving and repairs. They needed a store where customers easily find a watch on their phone and book an appointment themselves.',
    napravili: [
      'A WooCommerce store with a catalogue and filters',
      'Appointment booking for engraving and watch repair',
      'Dedicated pages for engraving and repairs',
      'Google reviews on the home page',
      'Secure checkout and maintenance',
    ],
    brojke: [
      { do: 538, opis: 'products, 522 of them wristwatches', datum: 'checked 1 Oct 2026' },
      { do: 17, opis: 'watch brands', datum: 'checked 1 Oct 2026' },
      { do: 35, opis: 'Google reviews on the home page', datum: 'checked 1 Oct 2026' },
    ],
    mjerac: { vrijednost: 89, poslije: '', udio: 0.89, opis: 'PageSpeed, desktop, smarttime.ba', datum: 'Lighthouse, median of three runs, 27 Sep 2026' },
    citat: {
      tekst: 'The online store looks professional, and customers easily find and order a watch on their phones. Next to a catalogue of over 500 models we also have dedicated pages for engraving and repairs.',
      ko: 'SmartTime (translated from Bosnian)',
    },
    slika: { src: '/project-smarttime.webp', width: 1200, height: 769, alt: 'The smarttime.ba home page on a desktop: a catalogue of wristwatches' },
    snimci: [
      { src: '/radovi/smarttime-sat.webp', width: 780, height: 1688, alt: 'The Casio F-91W watch on smarttime.ba, a product page on a phone', opis: 'Product page' },
      { src: '/radovi/smarttime-termin.webp', width: 780, height: 1688, alt: 'Appointment booking on smarttime.ba: choosing a service, e.g. a watch battery change', opis: 'Appointment booking' },
    ],
    snimciNaslov: 'A watch and a booking, both on a phone.',
    snimciOpis: 'A product page and appointment booking on smarttime.ba. Captured on a phone on 29 Sep 2026.',
    igra: 'termin',
    poziv: { naslov: 'Do you sell services, not only products?', opis: 'Appointment booking can work for you too.' },
  },
  {
    slug: 'urez',
    ime: 'urez.ba',
    oznaka: 'Custom engraving',
    opis: 'Our own store for personalised engravings. In progress, online soon.',
    uIzradi: 'In progress',
    seo: {
      naslov: 'urez.ba: an engraving store in progress · Hunar',
      opis: 'urez.ba is the Hunar studio’s own store for personalised engraved products, currently in progress.',
    },
    naslov: 'urez.ba: our engraving store, in progress.',
    uvod: 'urez.ba is our own store for personalised engraved products. We are building it now; once it is online, its story and numbers will be here, like with the other work.',
    napravili: ['Personalised engraved products', 'The Hunar studio’s own store', 'Online soon'],
    poziv: { naslov: 'The next card could be your company.', opis: 'Tell us what you sell and what you need. We answer personally.' },
  },
]

export const studija = {
  mrvice: { pocetna: 'Home', radovi: 'Work' },
  napravili: 'What we built',
  brojke: 'Numbers',
  klijent: 'In the client’s words',
  snimci: 'Phone screenshots',
  povucite: 'Drag',
  lupa: 'Move the mouse over a screenshot',
  uvecaj: 'Enlarge screenshot',
  zatvori: 'Close',
  probajte: 'Try it',
  citanje: '{n} min left',
  procitano: 'read',
  svi: 'All work',
  otvori: 'Open {ime}',
  dugme: 'Message us on WhatsApp',
  ili: 'or call',
  nad: 'Your business',
}

export const poziv = {
  nad: 'Your work',
  naslov: 'The next card could be your company.',
  opis: 'Tell us what you sell and what you need. We answer personally.',
  dugme: 'Message us on WhatsApp',
  ili: 'or call',
}

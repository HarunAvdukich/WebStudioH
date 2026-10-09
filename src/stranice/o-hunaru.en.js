// English About page (/en/about), same shape as o-hunaru.js. No headcount, names or faces
// (PRODUCT.md).

import { contact } from '../data.js'

export const jezik = 'en'
export const put = '/en/about'

export const seo = {
  naslov: 'About Hunar, a web studio in Bosnia · Hunar',
  opis: 'Hunar is a web studio from Bosnia and Herzegovina, formerly WebStudioH. Design, code, hosting and maintenance from one studio.',
}

export const vrh = {
  nad: 'About Hunar',
  naslov: 'Hunar means skill.',
  uvod: 'Hunar is a web studio from Bosnia and Herzegovina. We do the design, code, hosting and maintenance ourselves, from one place, so nothing gets passed between a designer, a developer and a hosting company. When you call us, you reach the one who built your website.',
  uvod2: 'We work with companies in Bosnia and Herzegovina and beyond, and we speak the language of business: marketplaces, cash on delivery, suppliers, stock, appointments. We do not sell "digital solutions", we build websites and stores that work for your business and take manual work off your hands.',
}

export const ruka = {
  obicno: { nad: 'Usually', naslov: 'Four companies, four phone numbers.' },
  kodNas: { nad: 'With us', naslov: 'One number, from the first sketch to maintenance.' },
  kartice: [
    { ime: 'Designer', opis: 'sketch and look', ikona: 'dizajn' },
    { ime: 'Developer', opis: 'code and store', ikona: 'kod' },
    { ime: 'Hosting company', opis: 'server and domain', ikona: 'server' },
    { ime: 'Maintenance', opis: 'when something breaks', ikona: 'alat' },
  ],
  izmedju: ['hand-offs', 'waiting', 'a new number'],
  jedna: {
    naslov: 'Everything from one place.',
    opis: 'When you call us, you reach the one who built your website.',
    stavke: ['Design', 'Code', 'Hosting', 'Maintenance'],
  },
}

export const znak = {
  nad: 'The mark',
  recenica: 'Our mark is two identical letters, u and n, joined in a loop. That is how we work: we connect your company with customers, marketplaces, suppliers and appointments.',
}

export const kako = {
  nad: 'How we work',
  naslov: 'Four rules we do not bend.',
  pravila: [
    { naslov: 'Proof before promises.', opis: 'We show stores that run and numbers with dates.' },
    { naslov: 'Speed is measured.', opis: 'When we say a website is fast, we also say on which device and when it was measured.', mjerac: true },
    { naslov: 'Honest.', opis: 'We promise nothing that you or your customers cannot check.' },
    { naslov: 'A short path.', opis: 'You message us on WhatsApp, we answer personally.' },
  ],
  mjerac: { vrijednost: 100, opis: 'Lighthouse, desktop, hunar.ba home page', datum: 'measured 29 Sep 2026' },
}

// Company facts in one place, for people and search engines; the same as the JSON-LD (JsonLd.jsx).
export const ukratko = {
  nad: 'In short',
  naslov: 'Hunar at a glance.',
  stavke: [
    { pojam: 'Who we are', opis: ['Hunar (hunar.ba), a web studio from Bosnia and Herzegovina. We used to work under the name WebStudioH.'] },
    {
      pojam: 'What we build',
      opis: ['Websites, online stores and custom systems: sync with marketplaces (OLX, Ananas) and suppliers, online booking, B2B portals, SEO, AI chatbots, hosting and maintenance.'],
    },
    { pojam: 'Who for', opis: ['Companies across Bosnia and Herzegovina, and companies abroad in English.'] },
    { pojam: 'Since', opis: ['1 June 2026.'] },
    {
      pojam: 'Work',
      opis: [
        { tekst: 'mrt.ba', put: '/en/work/mrt' },
        ', a tool store synced with OLX, the largest classifieds site in Bosnia, and ',
        { tekst: 'SmartTime', put: '/en/work/smarttime' },
        ', a watch store with online booking.',
      ],
    },
    {
      pojam: 'Contact',
      opis: [
        'WhatsApp and phone ',
        { tekst: '+387 60 3000 751', href: contact.phoneHref },
        ', email ',
        { tekst: contact.email, href: `mailto:${contact.email}` },
        '.',
      ],
    },
  ],
}

export const trake = [
  ['design', 'code', 'hosting', 'maintenance', 'one number', 'one studio'],
  ['marketplaces', 'cash on delivery', 'suppliers', 'stock', 'appointments', 'speed on phones'],
]

export const poziv = {
  nad: 'Message us',
  naslov: 'Have a business that deserves a good website?',
  opis: 'Tell us what you sell and what you need. We answer personally.',
  dugme: 'Message us on WhatsApp',
  ili: 'or call',
}

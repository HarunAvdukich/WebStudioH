// English Contact page (/en/contact), same shape as kontakt.js.

export const jezik = 'en'
export const put = '/en/contact'

export const seo = {
  naslov: 'Contact · message us on WhatsApp · Hunar',
  opis: 'Message us on WhatsApp or call +387 60 3000 751. Tell us what you sell and what you need, and we answer personally.',
}

export const poruka = {
  nad: 'Contact',
  naslov: 'Message us. We answer personally.',
  uvod: 'WhatsApp is the fastest. Pick what you need, and the message writes itself.',
  pitanje: { prije: 'What you need:', poslije: '?' },
  izbori: [
    { id: 'stranica', tekst: 'Website', uPoruci: 'a website' },
    { id: 'shop', tekst: 'Online store', uPoruci: 'an online store' },
    { id: 'olx', tekst: 'Marketplace link', uPoruci: 'a marketplace link' },
    { id: 'aplikacija', tekst: 'Mobile app', uPoruci: 'a mobile app' },
    { id: 'sistem', tekst: 'Custom system', uPoruci: 'a custom system' },
    { id: 'ne-znam', tekst: 'Not sure yet', uPoruci: '' },
  ],
  tekst: 'Hi, I run a company and I am interested in {x}. Can we talk?',
  tekstNeZnam: 'Hi, I run a company and I am not sure yet what I need. Can we talk?',
  telefon: { ime: 'Hunar', status: 'we answer personally' },
  posalji: 'Open WhatsApp with this message',
  otvara: '✓✓ opening WhatsApp',
  polje: 'WhatsApp message',
}

export const kanali = {
  naslov: 'Or reach us like this',
  lista: [
    { ime: 'WhatsApp', vrijednost: '+387 60 3000 751', vrsta: 'whatsapp' },
    { ime: 'Phone', vrijednost: '+387 60 3000 751', vrsta: 'telefon' },
    { ime: 'Email', vrijednost: 'info@hunar.ba', vrsta: 'mail' },
  ],
  recenzija: { pitanje: 'Worked with us?', link: 'Leave a review on Google' },
}

export const obrazac = {
  nad: 'Form',
  naslov: 'Or write to us here.',
  uvod: 'Tell us what you sell and what you need. We answer personally.',
  polja: {
    ime: 'Name',
    firma: 'Company (optional)',
    kontakt: 'Phone or email',
    treba: 'What you need',
    poruka: 'Message',
  },
  izbori: ['Website', 'Online store', 'Marketplace link', 'Mobile app', 'System', 'Not sure yet'],
  primjer: 'E.g. I sell tools, I have about 500 products and listings on marketplaces.',
  dugme: 'Send',
  saljem: 'Sending',
  ispod: 'We use your details only to answer you.',
  hvala: { naslov: 'Thank you! Your message arrived.', opis: 'We will get back to you personally.' },
  greska: 'The message did not go through. Try again or message us on WhatsApp +387 60 3000 751.',
  zamka: 'Do not fill in:',
}

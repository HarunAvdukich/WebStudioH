// English Pricing page (/en/pricing), same shape as cijene.js. Starting prices match the
// Black November ads (22 Nov 2026); everything else is quoted for the job.

import { oglasiMrt } from '../brojke.js'

export const jezik = 'en'

const olx = oglasiMrt('en')
export const put = '/en/pricing'

export const seo = {
  naslov: 'Pricing · quoted for your project · Hunar',
  opis: 'A website from 300 KM, an online store from 899 KM, online booking from 499 KM. Ready in 2 days, with a free sketch first.',
}

export const vrh = {
  nad: 'Pricing',
  naslov: 'Clear starting prices. Ready in days, not months.',
  uvod: 'A website from 300 KM, an online store from 899 KM and online booking from 499 KM (1 EUR is about 1.96 KM). Once you send the text and photos, you get it ready in 2 days. Each one also comes as a stronger Plus package. Larger stores, marketplace links and custom systems are quoted for the job.',
}

export const razgovor = {
  nad: 'How a quote is made',
  naslov: 'From the first message to a quote, in four steps.',
  koraci: [
    { naslov: 'You tell us what you sell and what you need.', opis: 'WhatsApp, phone or email, whatever suits you.' },
    { naslov: 'We have a short talk.', opis: 'We only ask what changes the job: number of products, marketplaces, suppliers, bookings.' },
    { naslov: 'You get a quote with a clear scope.', opis: 'It says exactly what you get.' },
    { naslov: 'Once we agree, we start.', opis: 'You follow the progress.' },
  ],
  kontakt: { ime: 'Hunar', status: 'we answer personally' },
  pise: 'typing',
  poruke: [
    { od: 'vi', korak: 0, tekst: 'Hi, I run a company and I am interested in a website. Can we talk?' },
    { od: 'mi', korak: 0, tekst: 'Hi! What do you sell and what do you need?' },
    { od: 'vi', korak: 1, tekst: 'I sell tools, I have about 500 products and listings on OLX.' },
    { od: 'mi', korak: 1, tekst: 'Do you get products from suppliers? And should the OLX listings update themselves?' },
    { od: 'vi', korak: 1, tekst: 'Yes, from two suppliers. And yes, that would help a lot.' },
    { od: 'mi', korak: 2, dokument: { ime: 'Quote.pdf', opis: 'store, OLX link, supplier import' } },
    { od: 'vi', korak: 3, tekst: 'Deal.' },
    { od: 'mi', korak: 3, tekst: 'We are starting. We are sending you a link to follow the progress.' },
  ],
  oznaka: 'An example conversation. Not a real client chat.',
}

export const narudzba = {
  nad: 'What you can order',
  naslov: 'Clear starting prices, ready in 2 days.',
  akcija: { oznaka: 'Black Friday', tekst: 'A website from 300 KM instead of 669 KM. Prices are valid until 30 November 2026. Every order comes with a free sketch first, so you decide before you pay.' },
  bilo: 'was',
  rok: 'ready in 2 days',
  okreni: 'See what you get',
  kartice: [
    { ime: 'Website', paket: 'Basic', cijena: { od: 'from 300 KM', bilo: '669 KM' }, opis: 'For companies and associations that need a clean, fast website: custom design, for phone and desktop, contact, map and WhatsApp messages, basic SEO. A redesign of your current site works too.' },
    { ime: 'Online store', paket: 'Basic', cijena: { od: 'from 899 KM', bilo: '1,499 KM' }, opis: 'For retailers who want to sell online: catalogue, cart, cash on delivery and bank transfer. Orders come in even when you are closed.' },
    { ime: 'Online booking', paket: 'Basic', cijena: { od: 'from 499 KM', bilo: '829 KM' }, opis: 'For salons, barbers and clinics: clients book a slot themselves, around the clock, and you get fewer calls.' },
    { ime: 'Store with marketplace links', cijena: { od: 'quoted' }, opis: 'Everything in the online store, plus OLX listings that update themselves, a feed for Ananas and supplier import. A B2B portal if you need one.' },
    { ime: 'Custom system', cijena: { od: 'quoted' }, opis: 'An AI chatbot, a mobile app or a B2B portal built around how you work.' },
  ],
}

export const plus = {
  nad: 'Plus package',
  naslov: 'When you need more, there is Plus.',
  uvod: 'Every service also comes as a stronger package. You get everything in the basic package, and a lot more on top.',
  oznaka: 'Plus',
  sve: 'Everything in basic, and:',
  paketi: [
    { ime: 'Website Plus', cijena: 'from 799 KM', stavke: ['more pages, a gallery and news', 'an English or German version, for the diaspora and foreign buyers', 'a set up Google profile, stronger SEO and visitor statistics', 'domain and hosting for the first year', '3 months of maintenance'] },
    { ime: 'Online store Plus', cijena: 'from 1,799 KM', stavke: ['OLX listings that update themselves and a feed for Ananas', 'product import from suppliers', 'card payments, once you have a contract with a bank', 'we enter the products for you', 'coupons and sales', 'order alerts on Viber or WhatsApp', 'domain and hosting for the first year, 3 months of maintenance'] },
    { ime: 'Online booking Plus', cijena: 'from 999 KM', stavke: ['more staff and chairs', 'a reminder to the client a day before', 'deposits and gift vouchers', 'booking statistics for the owner', 'a salon website along with booking'] },
  ],
}

export const odrzavanje = {
  nad: 'Maintenance',
  naslov: 'Monthly, by agreement.',
  opis: 'Updates, backups, caching and speed monitoring, email and order monitoring, small changes and help when something gets stuck.',
  mjerac: { vrijednost: 100, opis: 'Lighthouse, desktop, hunar.ba home page', datum: 'measured 29 Sep 2026', izmjeri: 'https://hunar.ba/' },
}

export const pitanja = {
  nad: 'Questions',
  naslov: 'What people ask us most.',
  lista: [
    { p: 'What does the 300 KM website include?', o: 'A custom website for phone and desktop, contact, map and WhatsApp messages, with a free sketch first. If you need more, we tell you the price before we start, with no hidden costs.' },
    { p: 'What is the Plus package?', o: 'A stronger package for each service: everything in basic, plus a second language, more pages, OLX links, reminders, domain and hosting for the first year and 3 months of maintenance, depending on the service. Website Plus is from 799 KM, online store Plus from 1,799 KM and booking Plus from 999 KM.' },
    { p: 'How long does it take?', o: 'A website, an online store or booking is ready in 2 days after you send the text and photos. A store with marketplace links and supplier import takes longer, and the deadline is in the quote.' },
    { p: 'Is the website mine?', o: 'Yes. The website and the materials are yours.' },
    { p: 'Can I change the content myself?', o: 'Yes. You edit text, images and products yourself, and you get a short training at handover.' },
    { p: 'Do you redesign existing websites?', o: 'Yes. Send us the link and we tell you what we would change and why.' },
    { p: 'Can you connect a store to OLX?', o: `Yes. On mrt.ba this runs ${olx.o.broj} listings (checked ${olx.o.datum}). OLX is the largest classifieds site in Bosnia and Herzegovina.` },
  ],
}

export const poziv = {
  nad: 'Quote',
  naslov: 'Tell us what you need, and we tell you what it costs.',
  opis: 'Tell us what you sell and what you need. We answer personally.',
  dugme: 'Message us on WhatsApp',
  ili: 'or call',
}

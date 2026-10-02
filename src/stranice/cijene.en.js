// English Pricing page (/en/pricing), same shape as cijene.js. Prices are not published;
// every quote is made for the job.

export const jezik = 'en'
export const put = '/en/pricing'

export const seo = {
  naslov: 'Pricing · quoted for your project · Hunar',
  opis: 'The price of a website or online store depends on what you need. Here is how a quote is made and what you get.',
}

export const vrh = {
  nad: 'Pricing',
  naslov: 'Priced by agreement. Here is why and how.',
  uvod: 'A shop that needs a website and a store with thousands of products and marketplace links do not need the same work, so not the same price either. Instead of a price list that fits nobody, we make a quote for your job.',
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
  naslov: 'Everything by agreement, by scope.',
  okreni: 'See what you get',
  kartice: [
    { ime: 'Website', opis: 'For companies and associations that need a clean, fast website: custom design, contact and map, basic SEO, text you edit yourself. A redesign of your current site works too.' },
    { ime: 'Online store', opis: 'For retailers who want to sell online: catalogue, filters and cart, cash on delivery and bank transfer, support after launch.' },
    { ime: 'Store with marketplace links', opis: 'Everything in the online store, plus OLX listings that update themselves, a feed for Ananas and supplier import. A B2B portal if you need one.' },
    { ime: 'Custom system', opis: 'Online booking, an AI chatbot, a mobile app or a B2B portal built around how you work.' },
  ],
}

export const odrzavanje = {
  nad: 'Maintenance',
  naslov: 'Monthly, by agreement.',
  opis: 'Updates, backups, caching and speed monitoring, email and order monitoring, small changes and help when something gets stuck.',
  mjerac: { vrijednost: 100, opis: 'Lighthouse, desktop, hunar.ba home page', datum: 'measured 29 Sep 2026' },
}

export const pitanja = {
  nad: 'Questions',
  naslov: 'What people ask us most.',
  lista: [
    { p: 'Why are there no fixed prices?', o: 'Because every job has a different scope. We price what you actually need, with no hidden costs.' },
    { p: 'How long does it take?', o: 'The deadline is in the quote and depends on the scope. A simple website is done sooner than a store with marketplace links and supplier import.' },
    { p: 'Is the website mine?', o: 'Yes. The website and the materials are yours.' },
    { p: 'Can I change the content myself?', o: 'Yes. You edit text, images and products yourself, and you get a short training at handover.' },
    { p: 'Do you redesign existing websites?', o: 'Yes. Send us the link and we tell you what we would change and why.' },
    { p: 'Can you connect a store to OLX?', o: 'Yes. On mrt.ba this runs 4,453 listings (checked 29 Sep 2026). OLX is the largest classifieds site in Bosnia and Herzegovina.' },
  ],
}

export const poziv = {
  nad: 'Quote',
  naslov: 'Tell us what you need, and we tell you what it costs.',
  opis: 'Tell us what you sell and what you need. We answer personally.',
  dugme: 'Message us on WhatsApp',
  ili: 'or call',
}

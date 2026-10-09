import { Head } from 'vite-react-ssg'
import { contact, profili, osnovano } from '../data.js'
import { SITE_URL, SITE_NAME, ogImageFor } from './Seo.jsx'

// Strukturirani podaci (schema.org, JSON-LD). Firma je na svakoj stranici, a sajt,
// članci i mrvice puta idu kroz <Seo podaci={...}> na stranici kojoj pripadaju.

const ORGANIZACIJA_ID = `${SITE_URL}/#organizacija`
const SAJT_ID = `${SITE_URL}/#sajt`
// +387 60 3000 751 iz tel:+387603000751
const telefon = contact.phoneHref.replace(/^tel:(\+387)(\d{2})(\d{4})(\d+)$/, '$1 $2 $3 $4')

const organizacija = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZACIJA_ID,
  name: SITE_NAME,
  alternateName: ['Hunar web studio', 'hunar.ba', 'WebStudioH'],
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/hunar-logo-icon.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL}/og/home.jpg`,
  sameAs: profili,
  description:
    'Hunar je web studio iz Bosne i Hercegovine (hunar.ba, ranije WebStudioH). Pravimo web stranice, web trgovine i sisteme po mjeri: veze sa OLX-om, Ananasom i dobavljačima, zakazivanje termina i B2B portale.',
  // "hunar" je i riječ (vještina); ovo kaže da je ovdje riječ o firmi.
  disambiguatingDescription: 'Web studio iz Bosne i Hercegovine na adresi hunar.ba.',
  foundingDate: osnovano,
  email: contact.email,
  telephone: telefon,
  // Firma radi na terenu (Google profil bez adrese), pa je adresa samo država.
  address: { '@type': 'PostalAddress', addressCountry: 'BA' },
  areaServed: { '@type': 'Country', name: 'Bosna i Hercegovina' },
  knowsLanguage: ['bs', 'en'],
  // Čime se bavimo, za pretraživače i AI asistente; svaka stavka ima stranicu ili rad koji je dokazuje.
  knowsAbout: [
    'Izrada web stranica',
    'Izrada web trgovina',
    'WooCommerce',
    'WordPress',
    'Povezivanje web trgovine sa OLX-om',
    'Feed za Ananas',
    'Uvoz artikala od dobavljača',
    'Online zakazivanje termina',
    'B2B portal za veleprodaju',
    'Brzina web stranica',
    'SEO optimizacija',
    'AI chatbot za web stranicu',
    'Mobilne aplikacije',
    'Redizajn web stranica',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Usluge',
    itemListElement: [
      ['Izrada web stranica', 'Prezentacijske stranice za firme, sa kontaktom i po potrebi zakazivanjem termina.', '/usluge'],
      ['Izrada web trgovina', 'WooCommerce trgovine sa katalogom, korpom, naplatom i dostavom.', '/usluge'],
      ['Povezivanje sa OLX-om i Ananasom', 'OLX oglasi i Ananas feed koji se ažuriraju iz trgovine.', '/savjeti/povezivanje-web-shopa-sa-olx-om'],
      ['Uvoz artikala od dobavljača', 'Uvoz kataloga, cijena, zaliha, slika i barkodova od više dobavljača.', '/savjeti/uvoz-artikala-od-dobavljaca'],
      ['Online zakazivanje termina', 'Zakazivanje usluga direktno na stranici.', '/savjeti/online-zakazivanje-termina'],
      ['B2B portal za veleprodaju', 'Poseban ulaz za partnere sa veleprodajnim cijenama i narudžbenicom.', '/radovi/mrt'],
      ['SEO optimizacija', 'Brzina, naslovi i opisi, strukturirani podaci i Google Search Console.', '/usluge'],
      ['AI chatbot', 'Asistent na stranici koji odgovara kupcima, kao Kobi na mrt.ba.', '/usluge'],
      ['Mobilne aplikacije', 'Aplikacije za Android i iPhone, za kupce ili za tim.', '/usluge'],
      ['Redizajn web stranica', 'Nova stranica umjesto stare, sa novim dizajnom, brzinom i tekstom.', '/usluge'],
      ['Hosting i održavanje', 'Hosting, keš, sigurnosne kopije i izmjene.', '/usluge'],
    ].map(([name, description, path]) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name, description, url: SITE_URL + path },
    })),
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: telefon,
    email: contact.email,
    availableLanguage: ['bs', 'en'],
  },
}

// Samo na početnoj: Google iz nje čita ime sajta.
export function sajt(jezik = 'bs') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SAJT_ID,
    name: SITE_NAME,
    alternateName: ['hunar.ba', 'WebStudioH'],
    url: `${SITE_URL}/`,
    inLanguage: jezik,
    publisher: { '@id': ORGANIZACIJA_ID },
  }
}

// Stranica O Hunaru: kaže pretraživaču da je ova stranica o firmi iz Organization.
export function oFirmi({ path, naslov, opis, jezik = 'bs' }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE_URL}${path}#stranica`,
    url: SITE_URL + path,
    name: naslov,
    description: opis,
    inLanguage: jezik,
    about: { '@id': ORGANIZACIJA_ID },
    mainEntity: { '@id': ORGANIZACIJA_ID },
  }
}

// koraci: [{ ime, path }], od početne do trenutne stranice.
export function mrvice(koraci) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: koraci.map((k, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: k.ime,
      item: SITE_URL + k.path,
    })),
  }
}

export function clanak(post) {
  const path = `/savjeti/${post.slug}`
  const autor = { '@type': 'Organization', '@id': ORGANIZACIJA_ID, name: SITE_NAME, url: `${SITE_URL}/` }
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    inLanguage: 'bs',
    url: SITE_URL + path,
    mainEntityOfPage: SITE_URL + path,
    image: SITE_URL + ogImageFor(path),
    author: autor,
    publisher: autor,
  }
}

export default function JsonLd() {
  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(organizacija)}</script>
    </Head>
  )
}

import { Head } from 'vite-react-ssg'
import { contact } from '../data.js'
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
  alternateName: 'WebStudioH',
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/hunar-logo-icon.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL}/og/home.jpg`,
  description:
    'Web studio iz Bosne i Hercegovine. Pravimo web stranice, web trgovine i sisteme po mjeri: veze sa OLX-om, Ananasom i dobavljačima, zakazivanje termina i B2B portale.',
  email: contact.email,
  telephone: telefon,
  areaServed: { '@type': 'Country', name: 'Bosna i Hercegovina' },
  knowsLanguage: ['bs', 'en'],
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
    dateModified: post.date,
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

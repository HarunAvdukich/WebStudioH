import { Head } from 'vite-react-ssg'
import { contact } from '../data.js'
import { SITE_URL, SITE_NAME } from './Seo.jsx'

// Organization / local-business structured data (site-wide).
const data = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE_NAME,
  description:
    'Izrada WooCommerce web trgovina za bh. prodavnice, sa OLX sinhronizacijom i uvozom kataloga od dobavljača.',
  url: SITE_URL,
  email: contact.email,
  telephone: contact.phoneDisplay,
  image: `${SITE_URL}/hunar-logo-icon.png`,
  logo: `${SITE_URL}/hunar-logo-icon.png`,
  areaServed: 'BA',
  address: { '@type': 'PostalAddress', addressCountry: 'BA' },
  priceRange: '$$',
}

export default function JsonLd() {
  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Head>
  )
}

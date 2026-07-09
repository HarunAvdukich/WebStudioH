import { Head } from 'vite-react-ssg'
import { contact } from '../data.js'
import { SITE_URL, SITE_NAME } from './Seo.jsx'

// Organization / local-business structured data (site-wide).
const data = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE_NAME,
  description:
    'Dizajn i izrada modernih web stranica i online trgovina za firme koje žele izgledati ozbiljno online.',
  url: SITE_URL,
  email: contact.email,
  telephone: contact.phoneDisplay,
  image: `${SITE_URL}/webstudioh-logo-icon.png`,
  logo: `${SITE_URL}/webstudioh-logo-icon.png`,
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

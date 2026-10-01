import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Services from '../components/Services.jsx'
import Process from '../components/Process.jsx'
import Faq from '../components/Faq.jsx'
import FinalCta from '../components/FinalCta.jsx'
import { faqServices } from '../data.js'

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Izrada web trgovina, OLX integracija i održavanje"
        path="/usluge"
        description="WooCommerce web trgovine, povezivanje sa OLX-om i dobavljačima, održavanje, SEO i AI alati na jednom mjestu."
      />
      <PageHero
        eyebrow="Usluge"
        title="Sve što vaša web trgovina treba, na jednom mjestu."
        subtitle="Od trgovine i integracija, preko SEO-a i brzine, do održavanja i hostinga."
      />
      <Services showHead={false} />
      <Process />
      <Faq eyebrow="Česta pitanja" title="Sve što vas zanima o saradnji." items={faqServices} />
      <FinalCta />
    </>
  )
}

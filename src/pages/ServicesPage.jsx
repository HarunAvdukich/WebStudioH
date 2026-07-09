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
        title="Usluge"
        path="/usluge"
        description="Dizajn web stranica, WordPress i WooCommerce razvoj, SEO, održavanje i hosting — sve na jednom mjestu."
      />
      <PageHero
        eyebrow="Usluge"
        title="Sve što vaša web stranica treba, na jednom mjestu."
        subtitle="Od dizajna i razvoja, preko SEO-a, do održavanja i hostinga — kompletna briga o vašem online prisustvu."
      />
      <Services showHead={false} />
      <Process />
      <Faq eyebrow="Česta pitanja" title="Sve što vas zanima o saradnji." items={faqServices} />
      <FinalCta />
    </>
  )
}

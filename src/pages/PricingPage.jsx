import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Pricing from '../components/Pricing.jsx'
import Includes from '../components/Includes.jsx'
import Faq from '../components/Faq.jsx'
import FinalCta from '../components/FinalCta.jsx'
import { faqPricing, maintenance } from '../data.js'

export default function PricingPage() {
  return (
    <>
      <Seo
        title="Cijene"
        path="/cijene"
        description="Paketi za web trgovine i prezentacijske stranice. Cijenu dajemo u razgovoru, kad znamo šta prodajete i gdje."
      />
      <PageHero
        title="Jednostavni paketi, prilagođeni vama."
        subtitle="Cijenu dajemo u razgovoru, kad znamo šta prodajete i gdje. Na svakoj etiketi piše šta dobijate."
      />
      <Pricing />
      <section className="band band--paper">
        <div className="container receipts">
          <Includes />
          <Includes
            title={maintenance.title}
            sub={maintenance.eyebrow}
            items={maintenance.items}
            total="Po dogovoru"
          />
        </div>
      </section>
      <Faq title="Pitanja o cijenama i saradnji." items={faqPricing} />
      <FinalCta />
    </>
  )
}

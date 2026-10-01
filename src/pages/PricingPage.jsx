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
        title="Cijene izrade web stranice i web trgovine"
        path="/cijene"
        description="Paketi za web trgovine i prezentacijske stranice, transparentno i bez skrivenih troškova."
      />
      <PageHero
        eyebrow="Cijene"
        title="Jednostavni paketi, prilagođeni vama."
        subtitle="Transparentno i bez skrivenih troškova. Svaki paket kreiramo prema vašim ciljevima i budžetu."
      />
      <Pricing showHead={false} />
      <Includes />
      <Includes eyebrow={maintenance.eyebrow} title={maintenance.title} items={maintenance.items} />
      <Faq eyebrow="Česta pitanja" title="Pitanja o cijenama i saradnji." items={faqPricing} />
      <FinalCta />
    </>
  )
}

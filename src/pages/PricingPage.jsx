import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Pricing from '../components/Pricing.jsx'
import Includes from '../components/Includes.jsx'
import Faq from '../components/Faq.jsx'
import FinalCta from '../components/FinalCta.jsx'
import { faqPricing } from '../data.js'

export default function PricingPage() {
  return (
    <>
      <Seo
        title="Cijene"
        path="/cijene"
        description="Jednostavni paketi za web stranice i online trgovine — transparentno i bez skrivenih troškova."
      />
      <PageHero
        eyebrow="Cijene"
        title="Jednostavni paketi, prilagođeni vama."
        subtitle="Transparentno i bez skrivenih troškova — svaki paket kreiramo prema vašim ciljevima i budžetu."
      />
      <Pricing showHead={false} />
      <Includes />
      <Faq eyebrow="Česta pitanja" title="Pitanja o cijenama i saradnji." items={faqPricing} />
      <FinalCta />
    </>
  )
}

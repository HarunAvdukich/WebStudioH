import Seo from '../components/Seo.jsx'
import Hero from '../components/Hero.jsx'
import ValueStrip from '../components/ValueStrip.jsx'
import SyncProof from '../components/SyncProof.jsx'
import Services from '../components/Services.jsx'
import WhyUs from '../components/WhyUs.jsx'
import Portfolio from '../components/Portfolio.jsx'
import Testimonials from '../components/Testimonials.jsx'
import FinalCta from '../components/FinalCta.jsx'

export default function Home() {
  return (
    <>
      <Seo
        path="/"
        description="WebStudioH gradi WooCommerce trgovine za bh. prodavnice, povezane sa OLX-om, Ananasom i dobavljačima."
      />
      <Hero />
      <ValueStrip />
      <SyncProof />
      <Services preview />
      <WhyUs />
      <Portfolio preview />
      <Testimonials />
      <FinalCta />
    </>
  )
}

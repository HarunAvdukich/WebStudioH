import Seo from '../components/Seo.jsx'
import Hero from '../components/Hero.jsx'
import ValueStrip from '../components/ValueStrip.jsx'
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
        description="WebStudioH dizajnira i gradi moderne web stranice i online trgovine za firme koje žele izgledati ozbiljno, prodavati više i istaknuti se online."
      />
      <Hero />
      <ValueStrip />
      <Services preview />
      <WhyUs />
      <Portfolio preview />
      <Testimonials />
      <FinalCta />
    </>
  )
}

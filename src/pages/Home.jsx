import Seo from '../components/Seo.jsx'
import Hero from '../components/Hero.jsx'
import Stats from '../components/Stats.jsx'
import Stories from '../components/Stories.jsx'
import ServiceGroups from '../components/ServiceGroups.jsx'
import Process from '../components/Process.jsx'
import Testimonials from '../components/Testimonials.jsx'
import FinalCta from '../components/FinalCta.jsx'

export default function Home() {
  return (
    <div className="pocetna">
      <Seo
        path="/"
        description="Hunar pravi web stranice, web trgovine i sisteme za zakazivanje za firme u BiH: od stranice udruženja do trgovine povezane sa OLX-om."
      />
      <Hero />
      <Stats />
      <Stories />
      <ServiceGroups />
      {/* Proces, utisci i poziv su još u tamnom izgledu ostatka sajta, pa
          dobijaju tamnu podlogu dok ne dođu na red u drugom dijelu. */}
      <div className="pocetna__kraj">
        <Process />
        <Testimonials />
        <FinalCta />
      </div>
    </div>
  )
}

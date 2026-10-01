import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Portfolio from '../components/Portfolio.jsx'
import Testimonials from '../components/Testimonials.jsx'
import FinalCta from '../components/FinalCta.jsx'

export default function WorkPage() {
  return (
    <>
      <Seo
        title="Radovi: mrt.ba, SmartTime i urez.ba"
        path="/radovi"
        description="Odabir projekata koje smo dizajnirali i izgradili: web trgovine i prezentacijske stranice."
      />
      <PageHero
        eyebrow="Radovi"
        title="Radovi koji izgledaju kako treba i daju rezultate."
        subtitle="Odabir projekata koje smo dizajnirali i izgradili, od velikih web trgovina do stranica udruženja."
      />
      <Portfolio showHead={false} />
      <Testimonials eyebrow="Povjerenje" title="Klijenti koji su nam vjerovali." />
      <FinalCta />
    </>
  )
}

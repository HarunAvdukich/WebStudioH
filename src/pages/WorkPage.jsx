import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Portfolio from '../components/Portfolio.jsx'
import Testimonials from '../components/Testimonials.jsx'
import FinalCta from '../components/FinalCta.jsx'

export default function WorkPage() {
  return (
    <>
      <Seo
        title="Radovi"
        path="/radovi"
        description="Odabir projekata koje smo dizajnirali i izgradili — web trgovine, poslovne stranice i portfoliji."
      />
      <PageHero
        eyebrow="Radovi"
        title="Radovi koji izgledaju kako treba — i daju rezultate."
        subtitle="Odabir projekata koje smo dizajnirali i izgradili — od web trgovina do poslovnih stranica i portfolija."
      />
      <Portfolio showHead={false} />
      <Testimonials eyebrow="Povjerenje" title="Klijenti koji su nam vjerovali." />
      <FinalCta />
    </>
  )
}

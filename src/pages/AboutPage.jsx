import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Testimonials from '../components/Testimonials.jsx'
import FinalCta from '../components/FinalCta.jsx'
import { values } from '../data.js'

const stats = [
  { num: '40', sfx: '+', label: 'Projekata isporučeno' },
  { num: '98', sfx: '+', label: 'Prosj. PageSpeed' },
  { num: '100', sfx: '%', label: 'Izrađeno po mjeri' },
  { num: '24', sfx: 'h', label: 'Vrijeme odgovora' },
]

export default function AboutPage() {
  return (
    <>
      <Seo
        title="O nama"
        path="/o-nama"
        description="Mali, posvećen studio koji spaja dizajn i performanse — gradimo web stranice i online trgovine za bh. firme."
      />
      <PageHero
        eyebrow="O nama"
        title="Studio koji spaja dizajn i performanse."
        subtitle="Mali, posvećen tim koji gradi web stranice i trgovine kakve velike agencije naplaćuju višestruko — bez komplikacija."
      />

      <section className="about-story">
        <div className="container about-story__grid">
          <div className="about-story__text" data-reveal>
            <span className="eyebrow">Naša priča</span>
            <h2 className="section-title">Mali studio, velika posvećenost.</h2>
            <p>
              WebStudioH je nastao iz jednostavne ideje: da i male i srednje firme
              zaslužuju web prisustvo koje izgleda i radi vrhunski — bez
              korporativnih cijena i nepotrebnih komplikacija.
            </p>
            <p>
              Danas spajamo dizajn, razvoj i performanse pod jednim krovom. Radimo
              blisko sa svakim klijentom, od prve skice do lansiranja i dalje,
              gradeći stranice koje ne samo da lijepo izgledaju — već donose stvarne
              rezultate.
            </p>
          </div>

          <div className="about-panel" data-reveal data-reveal-delay="90">
            <div className="about-panel__stats">
              {stats.map((s) => (
                <div key={s.label} className="about-stat">
                  <div className="about-stat__num">
                    {s.num}
                    <span>{s.sfx}</span>
                  </div>
                  <div className="about-stat__label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <div className="about-values__head" data-reveal>
            <span className="eyebrow">Naše vrijednosti</span>
            <h2 className="section-title">Ono u šta vjerujemo.</h2>
          </div>
          <div className="grid-4">
            {values.map((v) => (
              <div key={v.n} className="why-card" data-reveal data-reveal-delay={Number(v.n) * 60}>
                <div className="why-card__icon">{v.n}</div>
                <h3 className="why-card__title">{v.t}</h3>
                <p className="card-text">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <FinalCta />
    </>
  )
}

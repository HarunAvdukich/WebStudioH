import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import Testimonials from '../components/Testimonials.jsx'
import FinalCta from '../components/FinalCta.jsx'
import { values, aboutStats } from '../data.js'

export default function AboutPage() {
  return (
    <>
      <Seo
        title="O nama"
        path="/o-nama"
        description="Mali, posvećen studio koji gradi web trgovine za bh. prodavnice i povezuje ih sa OLX-om i dobavljačima."
      />
      <PageHero
        title="Studio koji spaja dizajn i performanse."
        subtitle="Mali, posvećen studio koji gradi web trgovine kakve velike agencije naplaćuju višestruko, bez komplikacija."
      />

      <section className="band band--paper">
        <div className="container about__grid">
          <div className="about__story">
            <h2 className="section-title">Mali studio, velika posvećenost.</h2>
            <p>
              WebStudioH je nastao iz jednostavne ideje: da i male i srednje firme
              zaslužuju web prisustvo koje izgleda i radi vrhunski, bez
              korporativnih cijena i nepotrebnih komplikacija.
            </p>
            <p>
              Danas gradimo web trgovine za bh. tržište: od kataloga i korpe do
              OLX-a, Ananasa i uvoza od dobavljača. Radimo blisko sa svakim
              klijentom, od prve skice do lansiranja i dalje.
            </p>
          </div>

          <aside className="decl-panel" aria-labelledby="deklaracija-studija">
            <h3 id="deklaracija-studija" className="decl-panel__title">Deklaracija</h3>
            <dl className="decl">
              {aboutStats.map((s) => (
                <div key={s.label} className="decl__row">
                  <dt>{s.label}</dt>
                  <dd>
                    {s.num}
                    {s.sfx}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="decl-panel__note">Izmjereno 27. 9. 2026.</p>
          </aside>
        </div>
      </section>

      <section className="band band--shelf">
        <div className="container why__grid">
          <h2 className="section-title">Ono u šta vjerujemo.</h2>
          <ul className="why__list" style={{ marginTop: 0 }}>
            {values.map((v) => (
              <li key={v.n}>
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Testimonials />
      <FinalCta />
    </>
  )
}

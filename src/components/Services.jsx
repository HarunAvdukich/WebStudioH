import { Link } from 'react-router-dom'
import { services } from '../data.js'

export default function Services({ preview = false, showHead = true }) {
  const list = preview ? services.slice(0, 3) : services

  return (
    <section id="services" className="services">
      <div className="container">
        {showHead && (
          <div className="services__head" data-reveal>
            <span className="eyebrow">Šta radimo</span>
            <h2 className="section-title">
              Sve što vaša web stranica treba, na jednom mjestu.
            </h2>
          </div>
        )}

        <div className="grid-3">
          {list.map((s) => (
            <div
              key={s.n}
              className="service-card"
              data-reveal
              data-reveal-delay={s.delay}
            >
              <span className="service-card__n">{s.n}</span>
              <h3 className="card-title">{s.t}</h3>
              <p className="card-text">{s.d}</p>
            </div>
          ))}
        </div>

        {preview && (
          <div className="services__more" data-reveal>
            <Link className="link-underline" to="/usluge">
              Sve usluge →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import Barcode from './Barcode.jsx'
import Icon, { WhatsAppIcon } from './Icon.jsx'
import { contact, projects, homeStats } from '../data.js'

const mrt = projects.find((p) => p.slug === 'mrt')

// Deklaracija etikete mrt.ba: izmjerene vrijednosti, izvor u src/data.js.
const deklaracija = [
  { dt: 'Artikala', dd: homeStats[0].num + homeStats[0].sfx },
  { dt: 'Kategorija', dd: '278' },
  { dt: 'OLX oglasa', dd: homeStats[1].num + homeStats[1].sfx },
  { dt: 'Odziv servera', dd: homeStats[2].num + homeStats[2].sfx },
]

export default function Hero() {
  const wa = `${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappText)}`

  return (
    <section className="hero">
      <div className="container hero__grid">
        <div>
          <h1 className="display hero__title">
            Web trgovine za bh. prodavnice, povezane sa OLX-om i vašim dobavljačima.
          </h1>
          <p className="hero__sub">
            Gradimo WooCommerce trgovine koje rade na telefonu, same objavljuju
            artikle na OLX i preuzimaju katalog od dobavljača. Najveća od njih,
            mrt.ba, ima 7.400+ artikala.
          </p>
          <div className="hero__actions">
            <a className="btn btn--red" href={wa} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={22} />
              Piši na WhatsApp
            </a>
            <Link className="btn btn--paper" to="/radovi">
              Pogledaj radove
              <Icon name="arrow" className="icon--arrow" />
            </Link>
          </div>
          <p className="hero__status">
            <i aria-hidden="true" />
            Dostupni za nove projekte
          </p>
        </div>

        <div className="hero__stage">
          <div className="rail" aria-hidden="true" />
          <article className="tag tag--hang hero__tag hang" aria-labelledby="hero-tag-name">
            <header className="tag__head tag__head--ink">
              <strong>{mrt.name}</strong>
              <span>Šifra MRT-01</span>
            </header>
            <div className="tag__shot">
              <img
                src={mrt.image}
                alt="Početna stranica mrt.ba sa kategorijama alata"
                width="1200"
                height="769"
                fetchpriority="high"
              />
            </div>
            <div className="tag__body">
              <h2 id="hero-tag-name" className="tag__name">
                Web trgovina alata i opreme
              </h2>
              <dl className="decl">
                {deklaracija.map((r) => (
                  <div key={r.dt} className="decl__row">
                    <dt>{r.dt}</dt>
                    <dd>{r.dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <footer className="tag__foot">
              <div className="price price--red">
                <small>Živo od</small>
                <strong>6. 9. 2026.</strong>
              </div>
              <Link className="hero__case" to="/radovi/mrt">
                Studija slučaja
                <Icon name="arrow" size={16} />
              </Link>
              <Barcode code="387004200101" className="barcode--sm" />
            </footer>
          </article>
        </div>
      </div>
    </section>
  )
}

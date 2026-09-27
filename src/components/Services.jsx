import { Link } from 'react-router-dom'
import Barcode from './Barcode.jsx'
import Icon from './Icon.jsx'
import { shelfRows } from './shelf.js'
import { services } from '../data.js'

// Svaka usluga je artikal na polici. Širine se smjenjuju, da polica ne bude mreža istih kartica.
const PREVIEW_SPANS = [7, 5, 12]
const FULL_SPANS = [7, 5, 5, 7, 6, 6]

function ServiceTag({ s, span }) {
  const wide = span === 12
  return (
    <article className={`tag tag--hang hang span-${span}${wide ? ' tag--wide' : ''}`}>
      <div className="tag__main">
        <header className="tag__head">
          <span>Šifra WS-{s.n}</span>
          <span>1 usluga</span>
        </header>
        <div className="tag__body">
          <h3 className="tag__name">{s.t}</h3>
          <p className="tag__text">{s.d}</p>
        </div>
      </div>
      <footer className="tag__foot">
        <div className="price">
          <small>Cijena</small>
          <strong>po dogovoru</strong>
        </div>
        <Barcode code={`38700420${s.n.padStart(4, '0')}`} />
      </footer>
    </article>
  )
}

export default function Services({ preview = false, showHead = true }) {
  const list = preview ? services.slice(0, 3) : services
  const rows = shelfRows(list, preview ? PREVIEW_SPANS : FULL_SPANS)

  return (
    <section className="band band--shelf">
      <div className="container">
        {showHead && (
          <div className="sec-head">
            <h2 className="section-title">Sve što vaša web trgovina treba, na jednom mjestu.</h2>
            {preview && (
              <Link className="text-link" to="/usluge">
                Sve usluge
                <Icon name="arrow" size={18} />
              </Link>
            )}
          </div>
        )}

        {rows.map((row, r) => (
          <div key={r} className="shelf-row">
            {row.map(({ item, span }) => (
              <ServiceTag key={item.n} s={item} span={span} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { serviceGroups } from '../data.js'

export default function ServiceGroups() {
  return (
    <section className="usluge-grupe" id="usluge">
      <div className="container">
        <h2 className="sekcija__naslov" data-reveal>Šta pravimo</h2>
        <div className="usluge-grupe__mreza">
          {serviceGroups.map((g, i) => (
            <article className="grupa" key={g.id} data-reveal data-reveal-delay={i * 70}>
              <h3 className="grupa__naslov">{g.naslov}</h3>
              <p className="grupa__tekst">{g.tekst}</p>
              <ul className="grupa__primjeri">
                {g.primjeri.map((p) => (
                  <li key={p.naziv}>
                    <Link to={p.href}>{p.naziv}</Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

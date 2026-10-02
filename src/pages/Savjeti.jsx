import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { Vrh } from '../components/stranica/dijelovi.jsx'
import ZavrsniPoziv from '../components/stranica/ZavrsniPoziv.jsx'
import { posts } from '../posts.js'
import { formatDate } from '../data.js'
import { popuni } from '../lib/whatsapp.js'
import { useNagibSkrola } from '../lib/nagibSkrola.js'
import { seo, vrh, kartica, poziv } from '../stranice/savjeti.js'
import '../components/stranica/stranica.css'
import '../components/savjeti/savjeti.css'

// Savjeti (/savjeti): vodiči iz prakse kao kartice koje uđu, nagnu se pod mišem, a lista se
// malo nagne pri brzom skrolu.
export default function Savjeti() {
  const lista = useRef(null)
  useNagibSkrola(lista)
  return (
    <div className="st st-savjeti">
      <Seo punNaslov={seo.naslov} description={seo.opis} path="/savjeti" />
      <Vrh nad={vrh.nad} naslov={vrh.naslov} uvod={vrh.uvod} />
      <section className="st-dio sv-dio">
        <div className="st-sirina">
          <div className="sv-lista" ref={lista}>
            {posts.map((p, i) => (
              <div key={p.slug} data-pokret="pojavi" style={{ '--i': i % 2 }}>
                <Link to={`/savjeti/${p.slug}`} className="sv-k" data-nagib="4" data-kursor={kartica.procitaj}>
                  <span className="sv-k__br">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="sv-k__naslov">{p.title}</h2>
                  <p className="sv-k__opis">{p.excerpt}</p>
                  <span className="sv-k__dno">
                    <span className="sv-k__meta">
                      {formatDate(p.updated || p.date)} · {popuni(kartica.citanja, { n: p.read })}
                    </span>
                    <span className="sv-k__dalje">
                      {kartica.procitaj}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ZavrsniPoziv {...poziv} />
    </div>
  )
}

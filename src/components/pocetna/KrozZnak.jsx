import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '@fontsource-variable/urbanist'
import './pocetna.css'
import { ZnakPutanje } from './Znak.jsx'
import { LOGO_SIRINA, LOGO_VISINA } from './motor.js'
import { Pokretac } from './pokretac.js'
import { contact } from '../../data.js'
import {
  whatsappLink, meni, uvod, poglavlja, uNajava, sat, prelaz, nNajava, kosilica,
  potpis, finale, podnozje,
} from '../../pocetna.js'

function IkonaPoruka({ boja = 'currentColor' }) {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={boja} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12z" />
    </svg>
  )
}

function Dugme({ children = 'Pišite nam na WhatsApp' }) {
  return (
    <a className="kz-dugme" href={whatsappLink} target="_blank" rel="noopener">
      <IkonaPoruka />
      {children}
    </a>
  )
}

function Oznake({ ime, podaci }) {
  return (
    <ol className="kz-oznake">
      {podaci.oznake.map((o, i) => (
        <li key={o.naslov} className={`kz-oznaka kz-oznaka--${o.strana === 'L' ? 'lijevo' : 'desno'}`} data-oznaka={ime}>
          <span className="kz-oznaka__crta" aria-hidden="true" />
          <span className="kz-oznaka__tacka" aria-hidden="true" />
          <span className="kz-oznaka__karta">
            <span className="kz-oznaka__vrh">
              <span className="kz-broj" aria-hidden="true">{i + 1}</span>
              <strong>{o.naslov}</strong>
            </span>
            <span className="kz-oznaka__opis">{o.opis}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}

function Lista({ ime, podaci }) {
  return (
    <div className="kz-sloj kz-lista" data-sloj={`lista-${ime}`} aria-hidden="true">
      <div className="kz-lista__lijevo">
        <p className="kz-lista__naslov">{podaci.lista.naslov}</p>
        <ul>
          {podaci.lista.stavke.map((s) => (
            <li key={s} data-stavka={ime}>
              <span className="kz-kvacica">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0F241D" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L19 7" /></svg>
              </span>
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div className="kz-lista__desno">
        <span className="kz-lista__posto" data-posto={ime}>0%</span>
        <span className="kz-lista__ispod">sklopljeno</span>
      </div>
      <p className="kz-lista__sad"><span className="kz-kvacica je-puna">✓</span><span data-sad={ime}>{podaci.lista.stavke[0]}</span></p>
    </div>
  )
}

export default function KrozZnak() {
  const prica = useRef(null)
  const scena = useRef(null)
  const svg = useRef(null)
  const platno = useRef(null)
  const [otvoren, setOtvoren] = useState(false)

  useEffect(() => {
    if (!document.documentElement.classList.contains('pokret')) return undefined
    const pokretac = new Pokretac({
      prica: prica.current,
      scena: scena.current,
      svg: svg.current,
      platno: platno.current,
      podaci: { sat, kosilica, poglavlja },
    })
    pokretac.pokreni()
    return () => pokretac.ugasi()
  }, [])

  useEffect(() => {
    if (!otvoren) return undefined
    const zatvori = (e) => e.key === 'Escape' && setOtvoren(false)
    window.addEventListener('keydown', zatvori)
    return () => window.removeEventListener('keydown', zatvori)
  }, [otvoren])

  return (
    <div className="kz">
      <section className="kz-prica" ref={prica} aria-label="Hunar, web stranice i trgovine za firme u BiH">
        <div className="kz-scena" ref={scena}>
          <svg
            ref={svg}
            className="kz-znak"
            viewBox={`0 0 ${LOGO_SIRINA} ${LOGO_VISINA}`}
            role="img"
            aria-label="Hunar"
          >
            <ZnakPutanje />
          </svg>

          <header className="kz-zaglavlje">
            <p className="kz-poglavlje" data-poglavlje aria-hidden="true">{`01 / ${String(poglavlja.length).padStart(2, '0')} · Hunar`}</p>
            <nav className="kz-meni" aria-label="Glavni meni">
              {meni.map((m) => (
                <Link key={m.put} to={m.put}>{m.naziv}</Link>
              ))}
              <a className="kz-meni__dugme" href={whatsappLink} target="_blank" rel="noopener">Pišite nam</a>
            </nav>
            <button
              type="button"
              className="kz-meni__otvori"
              aria-expanded={otvoren}
              aria-controls="kz-meni-telefon"
              aria-label={otvoren ? 'Zatvori meni' : 'Otvori meni'}
              onClick={() => setOtvoren((o) => !o)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                {otvoren ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </header>

          <div className="kz-sloj kz-uvod" data-sloj="uvod">
            <p className="kz-nad kz-uvod__nad">{uvod.nad}</p>
            <div className="kz-uvod__red">
              <div className="kz-uvod__glavno">
                <h1>{uvod.naslov}</h1>
                <div className="kz-dugmad">
                  <Dugme />
                  <a className="kz-tel" href={contact.phoneHref}>{contact.phoneDisplay}</a>
                </div>
              </div>
              <p className="kz-uvod__opis">{uvod.opis}</p>
            </div>
            <p className="kz-skrol" aria-hidden="true">
              Skrolajte
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
            </p>
          </div>

          <p className="kz-sloj kz-kanal" data-sloj="kanal" aria-hidden="true">{sat.kanal}</p>

          <div className="kz-sloj kz-predmet" data-sloj="predmet" aria-hidden="true">
            <canvas ref={platno} />
          </div>

          <div className="kz-sloj kz-najava" data-sloj="uNajava">
            <p className="kz-nad">{uNajava.nad}</p>
            <h2>{uNajava.naslov}</h2>
            <p className="kz-opis">{uNajava.opis}</p>
          </div>

          <div className="kz-grupa kz-grupa--sat">
            <img className="kz-staticno" src="/kadrovi/sat/42.webp" alt={sat.alt} width="600" height="800" loading="lazy" decoding="async" />
            <Oznake ime="sat" podaci={sat} />
          </div>
          <Lista ime="sat" podaci={sat} />

          <div className="kz-sloj kz-kraj kz-kraj--sat" data-sloj="satKraj">
            <div className="kz-kraj__glavno">
              <h3>{sat.kraj.naslov}</h3>
              <p>{sat.kraj.opis}</p>
            </div>
            <div className="kz-kraj__uz">
              <p>{sat.kraj.uz}</p>
              <p className="kz-izvor">{sat.kraj.izvor}</p>
            </div>
          </div>

          <div className="kz-sloj kz-prelaz" data-sloj="prelaz">
            <p className="kz-nad">{prelaz.nad}</p>
            <p className="kz-prelaz__tekst">{prelaz.naslov}</p>
          </div>

          <div className="kz-sloj kz-najava" data-sloj="nNajava">
            <p className="kz-nad">{nNajava.nad}</p>
            <h2>{nNajava.naslov}</h2>
            <p className="kz-opis">{nNajava.opis}</p>
          </div>

          <div className="kz-grupa kz-grupa--kosilica">
            <img className="kz-staticno" src="/kadrovi/kosilica/42.webp" alt={kosilica.alt} width="600" height="800" loading="lazy" decoding="async" />
            <Oznake ime="kosilica" podaci={kosilica} />
          </div>
          <Lista ime="kosilica" podaci={kosilica} />

          <div className="kz-sloj kz-kraj kz-kraj--kosilica" data-sloj="kosKraj">
            <div className="kz-kraj__glavno">
              <h3>{kosilica.kraj.naslov}</h3>
              <p>{kosilica.kraj.opis}</p>
              <p className="kz-citat">{kosilica.kraj.citat}</p>
            </div>
            <div className="kz-kraj__uz">
              <p className="kz-izvor">{kosilica.kraj.izvor}</p>
            </div>
          </div>

          <span className="kz-izradio" data-izradio aria-hidden="true">Izradio</span>
          <div className="kz-sloj kz-potpis" data-sloj="potpis">
            <p className="kz-potpis__tekst">{potpis.tekst}</p>
            <ul className="kz-radovi">
              {potpis.radovi.map((r) => (
                <li key={r.put}>
                  <Link className="kz-rad" to={r.put}>
                    <span className="kz-rad__ime">{r.naziv}</span>
                    <span className="kz-rad__opis">{r.opis}</span>
                    <span className="kz-rad__vise">
                      <span className="kz-rad__rijec">{potpis.vise}</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="kz-finale" aria-labelledby="kz-finale-naslov">
        <h2 id="kz-finale-naslov">{finale.naslov}</h2>
        <p className="kz-opis">{finale.opis}</p>
        <ol className="kz-ponuda">
          {finale.ponuda.map((x, i) => (
            <li key={x.naslov}>
              <span className="kz-ponuda__vrh"><span className="kz-broj" aria-hidden="true">{i + 1}</span><strong>{x.naslov}</strong></span>
              <span className="kz-ponuda__opis">{x.opis}</span>
            </li>
          ))}
        </ol>
        <div className="kz-dugmad kz-dugmad--sredina">
          <Dugme />
          <a className="kz-tel" href={contact.phoneHref}>{contact.phoneDisplay}</a>
          <a className="kz-tel" href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
        <p className="kz-finale__ispod">{finale.ispod}</p>
      </section>

      <div id="kz-meni-telefon" className={`kz-meni-telefon${otvoren ? ' je-otvoren' : ''}`} hidden={!otvoren}>
        <nav aria-label="Meni">
          {meni.map((m) => (
            <Link key={m.put} to={m.put} onClick={() => setOtvoren(false)}>{m.naziv}</Link>
          ))}
        </nav>
        <Dugme />
      </div>

      <footer className="kz-podnozje">
        <div className="kz-podnozje__red">
          <svg className="kz-podnozje__logo" viewBox={`0 0 ${LOGO_SIRINA} ${LOGO_VISINA}`} role="img" aria-label="Hunar">
            <ZnakPutanje />
          </svg>
          <p>{podnozje.opis}</p>
        </div>
        <div className="kz-podnozje__red kz-podnozje__red--linkovi">
          <nav aria-label="Podnožje">
            {meni.map((m) => (
              <Link key={m.put} to={m.put}>{m.naziv}</Link>
            ))}
            <Link to="/politika-privatnosti">Politika privatnosti</Link>
          </nav>
          <p>
            <a href={whatsappLink} target="_blank" rel="noopener">WhatsApp</a> i <a href={contact.phoneHref}>telefon {contact.phoneDisplay}</a> · <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        </div>
        <p className="kz-podnozje__dno">© 2026 Hunar · hunar.ba · {podnozje.znacenje}</p>
      </footer>
    </div>
  )
}

import { Fragment, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '@fontsource-variable/urbanist'
import '../stranica/stranica.css'
import '../onama/onama.css'
import '../igre/igre.css'
import '../radovi/studija.css'
import './pocetna.css'
import './prvi.css'
import './tok.css'
import { ZnakPutanje } from './Znak.jsx'
import { LOGO_SIRINA, LOGO_VISINA, POGLAVLJA } from './motor.js'
import { Pokretac } from './pokretac.js'
import PrviEkran from './PrviEkran.jsx'
import TokPocetne from './TokPocetne.jsx'
import LinijaPrice from './LinijaPrice.jsx'
import ZavrsniPoziv from '../stranica/ZavrsniPoziv.jsx'
import { useMagnet } from '../../lib/magnet.js'
import { projects } from '../../data.js'
import * as bosanski from '../../pocetna.js'

// Priča u slovu radi samo na širokom i dovoljno visokom ekranu (isto kao jeSiroko u motor.js).
export const SIROKO = '(min-width: 1180px) and (min-height: 600px)'

// Unutrašnja ruta ide kroz router; sidro, mail i vanjski link su obični linkovi.
function Veza({ to, children, ...ostalo }) {
  if (to.startsWith('/')) return <Link to={to} {...ostalo}>{children}</Link>
  const vanjski = to.startsWith('http')
  return (
    <a href={to} {...(vanjski ? { target: '_blank', rel: 'noopener' } : {})} {...ostalo}>
      {children}
    </a>
  )
}

// Naslov čije riječi izrone iz maske kad sloj priče uđe (klasa je-usao na sloju).
function Izroni({ tekst, as: Oznaka = 'h2', className }) {
  const rijeci = tekst.split(' ')
  return (
    <Oznaka className={className}>
      {rijeci.map((r, i) => (
        <Fragment key={i}>
          <span className="kz-m">
            <span className="kz-w" style={{ '--i': i }}>
              {r}
            </span>
          </span>
          {i < rijeci.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </Oznaka>
  )
}

// Prva brojka u opisu (7.460, 4,453, 52 ms) dobije data-do, da se odbroji kad oznaka izađe.
export function razbijBroj(tekst) {
  const m = tekst.match(/(\d{1,3}(?:[.,]\d{3})+|\d+)( ms)?/)
  if (!m) return null
  return {
    prije: tekst.slice(0, m.index),
    broj: m[0],
    vrijednost: Number(m[1].replace(/[.,]/g, '')),
    poslije: m[2] || '',
    ostatak: tekst.slice(m.index + m[0].length),
  }
}

function Oznake({ ime, podaci, brojke = false }) {
  return (
    <ol className="kz-oznake">
      {podaci.oznake.map((o, i) => {
        const b = brojke ? razbijBroj(o.opis) : null
        return (
          <li key={o.naslov} className={`kz-oznaka kz-oznaka--${o.strana === 'L' ? 'lijevo' : 'desno'}`} data-oznaka={ime}>
            <span className="kz-oznaka__crta" aria-hidden="true" />
            <span className="kz-oznaka__tacka" aria-hidden="true" />
            <span className="kz-oznaka__karta">
              <span className="kz-oznaka__vrh">
                <span className="kz-broj" aria-hidden="true">{i + 1}</span>
                <strong>{o.naslov}</strong>
              </span>
              <span className="kz-oznaka__opis">
                {b ? (
                  <>
                    {b.prije}
                    <b className="kz-odbroj" data-do={b.vrijednost} data-poslije={b.poslije}>
                      {b.broj}
                    </b>
                    {b.ostatak}
                  </>
                ) : (
                  o.opis
                )}
              </span>
            </span>
          </li>
        )
      })}
    </ol>
  )
}

// Lupa prati miš preko snimka telefona (R10): krug uveća snimak 2,5 puta.
const UVECANJE = 2.5
function pratiLupom(e) {
  if (e.pointerType !== 'mouse') return
  const okvir = e.currentTarget
  const img = okvir.querySelector('img')
  const lupa = okvir.querySelector('.kz-lupa')
  if (!img?.src || !lupa) return
  const r = okvir.getBoundingClientRect()
  const x = e.clientX - r.left
  const y = e.clientY - r.top
  lupa.style.transform = `translate(${x - 90}px, ${y - 90}px)`
  lupa.style.backgroundImage = `url(${img.src})`
  lupa.style.backgroundSize = `${r.width * UVECANJE}px ${img.offsetHeight * UVECANJE}px`
  lupa.style.backgroundPosition = `${90 - x * UVECANJE}px ${90 - y * UVECANJE}px`
  okvir.classList.add('je-lupa')
}
const skloniLupu = (e) => e.currentTarget.classList.remove('je-lupa')

// Prava stranica artikla na telefonu; slika se učita tek poslije prve interakcije.
function Sajt({ sloj, podaci, uvecaj }) {
  return (
    <figure className="kz-sloj kz-sajt" data-sloj={sloj}>
      <div className="kz-sajt__telefon" data-kursor={uvecaj} onPointerMove={pratiLupom} onPointerLeave={skloniLupu}>
        <img data-src={podaci.slika} alt={podaci.alt} width="780" height="1270" decoding="async" />
        <span className="kz-lupa" aria-hidden="true" />
      </div>
      <figcaption className="kz-sajt__tekst">
        <Izroni tekst={podaci.naslov} as="h3" />
        <p>{podaci.opis}</p>
        <p className="kz-izvor">{podaci.izvor}</p>
      </figcaption>
    </figure>
  )
}

function Lista({ ime, podaci, ispod }) {
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
        <span className="kz-lista__ispod">{ispod}</span>
      </div>
    </div>
  )
}

// Radovi u potpisu (R7): red se oboji, a snimak rada prati miš.
function RadoviPotpis({ potpis }) {
  const snimak = useRef(null)
  const slike = Object.fromEntries(projects.filter((p) => p.image).map((p) => [p.slug, p.image]))
  const pomjeri = (e) => {
    const el = snimak.current
    if (!el || e.pointerType !== 'mouse') return
    const red = e.target.closest?.('[data-rad]')
    if (!red) {
      el.classList.remove('je-vid')
      return
    }
    const src = slike[red.dataset.rad]
    if (src && el.dataset.slika !== src) {
      el.dataset.slika = src
      el.style.backgroundImage = `url(${src})`
    }
    const r = el.parentElement.getBoundingClientRect()
    el.style.transform = `translate(${e.clientX - r.left + 28}px, ${e.clientY - r.top - 90}px) rotate(-3deg)`
    el.classList.add('je-vid')
  }
  return (
    <div className="kz-radovi-okvir" onPointerMove={pomjeri} onPointerLeave={() => snimak.current?.classList.remove('je-vid')}>
      <ul className="kz-radovi">
        {potpis.radovi.map((r) => (
          <li key={r.put}>
            <Veza className="kz-rad" to={r.put} data-kursor={potpis.vise} data-rad={r.put.split('/').pop()}>
              <span className="kz-rad__ime">{r.naziv}</span>
              <span className="kz-rad__opis">{r.opis}</span>
              <span className="kz-rad__vise">
                <span className="kz-rad__rijec">{potpis.vise}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </Veza>
          </li>
        ))}
      </ul>
      <span ref={snimak} className="kz-rad-snimak" aria-hidden="true" />
    </div>
  )
}

export default function KrozZnak({ t = bosanski }) {
  const prica = useRef(null)
  const scena = useRef(null)
  const svg = useRef(null)
  const platno = useRef(null)
  const pokretac = useRef(null)
  const korijen = useRef(null)
  const pisite = useRef(null)
  useMagnet(pisite)
  const { ui, sat, kosilica, potpis, finale, drugiJezik } = t

  // Priča u slovu samo na širokom ekranu uz pokrete; inače stranica teče (TokPocetne).
  useEffect(() => {
    const html = document.documentElement
    if (!html.classList.contains('pokret')) {
      // Obična stranica: snimci stranica se učitaju kao i svaka slika ispod prvog ekrana.
      for (const img of prica.current.querySelectorAll('img[data-src]')) img.src = img.dataset.src
      return undefined
    }
    const mq = window.matchMedia(SIROKO)
    const prebaci = () => {
      if (mq.matches && !pokretac.current) {
        pokretac.current = new Pokretac({
          prica: prica.current,
          scena: scena.current,
          svg: svg.current,
          platno: platno.current,
          podaci: { sat, kosilica, poglavlja: t.poglavlja },
        })
        pokretac.current.pokreni()
      } else if (!mq.matches && pokretac.current) {
        pokretac.current.ugasi()
        pokretac.current = null
      }
      // Stranica koja teče potvrdi pokrete, da ih inline skripta ne ugasi.
      if (!mq.matches) html.dataset.kz = 'tok'
    }
    prebaci()
    mq.addEventListener('change', prebaci)
    return () => {
      mq.removeEventListener('change', prebaci)
      pokretac.current?.ugasi()
      pokretac.current = null
      delete html.dataset.kz
    }
  }, [t, sat, kosilica])

  // Traka sa WhatsAppom na telefonu uleti u završno dugme, a dugme zasvijetli.
  useEffect(() => {
    const dugme = korijen.current?.querySelector('.kz-finale .zp__dugme')
    const html = document.documentElement
    if (!dugme || !html.classList.contains('pokret')) return undefined
    const io = new IntersectionObserver(
      ([u]) => {
        html.classList.toggle('kz-pristao', u.isIntersecting)
        if (u.isIntersecting && window.matchMedia('(max-width: 760px)').matches) {
          dugme.classList.remove('je-svijetli')
          void dugme.offsetWidth
          dugme.classList.add('je-svijetli')
        }
      },
      { threshold: 0.6 },
    )
    io.observe(dugme)
    return () => {
      io.disconnect()
      html.classList.remove('kz-pristao')
    }
  }, [])

  return (
    <div className="kz" ref={korijen}>
      <LinijaPrice imena={t.linija} korijen={korijen} />
      <section className="kz-prica" ref={prica} aria-label={ui.prica} data-poglavlje-pocetak>
        <div className="kz-scena" ref={scena}>
          <svg ref={svg} className="kz-znak" viewBox={`0 0 ${LOGO_SIRINA} ${LOGO_VISINA}`} role="img" aria-label="Hunar">
            <ZnakPutanje />
          </svg>

          <header className="kz-zaglavlje">
            <p className="kz-poglavlje" aria-hidden="true">
              <span className="kz-poglavlje__brojcanik">
                <span data-poglavlje-tekst>{`01 / ${String(t.poglavlja.length).padStart(2, '0')} · ${t.poglavlja[0].ime}`}</span>
              </span>
            </p>
            <nav className="kz-meni" aria-label={ui.glavniMeni}>
              {t.meni.map((m) => (
                <Veza key={m.put} to={m.put}>{m.naziv}</Veza>
              ))}
              <Link className="kz-jezik" to={drugiJezik.put} hrefLang={drugiJezik.jezik} lang={drugiJezik.jezik} aria-label={drugiJezik.naziv}>
                {drugiJezik.oznaka}
              </Link>
              <a ref={pisite} className="kz-meni__dugme" href={t.whatsappLink} target="_blank" rel="noopener">{ui.dugmeKratko}</a>
            </nav>
            {/* Linija priče (R4): tanka linija na vrhu, tačka skoči na poglavlje. */}
            <div className="kz-linija" aria-label={ui.poglavlja} role="group">
              <span className="kz-linija__pun" aria-hidden="true" />
              {t.poglavlja.map((pg, i) => (
                <button key={pg.broj} type="button" className="kz-linija__tacka" style={{ '--x': POGLAVLJA[i] }} data-kursor={pg.ime} aria-label={`${pg.broj} ${pg.ime}`} onClick={() => pokretac.current?.skoci(i)}>
                  <i />
                </button>
              ))}
            </div>
          </header>

          <PrviEkran t={t} />

          <div className="kz-samo-prica">
            <p className="kz-sloj kz-kanal" data-sloj="kanal" aria-hidden="true">{sat.kanal}</p>

            <div className="kz-sloj kz-predmet" data-sloj="predmet" aria-hidden="true">
              <canvas ref={platno} />
            </div>

            <div className="kz-sloj kz-najava" data-sloj="uNajava">
              <p className="kz-nad">{t.uNajava.nad}</p>
              <Izroni tekst={t.uNajava.naslov} />
              <p className="kz-opis">{t.uNajava.opis}</p>
            </div>

            <div className="kz-grupa kz-grupa--sat">
              <Oznake ime="sat" podaci={sat} />
            </div>
            <Lista ime="sat" podaci={sat} ispod={ui.sklopljeno} />

            <div className="kz-sloj kz-kraj kz-kraj--sat" data-sloj="satKraj">
              <div className="kz-kraj__glavno">
                <Izroni tekst={sat.kraj.naslov} as="h3" />
                <p>{sat.kraj.opis}</p>
              </div>
              <div className="kz-kraj__uz">
                <p>{sat.kraj.uz}</p>
              </div>
            </div>

            <Sajt sloj="satSajt" podaci={sat.sajt} uvecaj={ui.uvecaj} />

            <div className="kz-sloj kz-prelaz" data-sloj="prelaz">
              <p className="kz-nad">{t.prelaz.nad}</p>
              <p className="kz-prelaz__tekst">{t.prelaz.naslov}</p>
            </div>

            <div className="kz-sloj kz-najava" data-sloj="nNajava">
              <p className="kz-nad">{t.nNajava.nad}</p>
              <Izroni tekst={t.nNajava.naslov} />
              <p className="kz-opis">{t.nNajava.opis}</p>
            </div>

            <div className="kz-grupa kz-grupa--kosilica">
              <Oznake ime="kosilica" podaci={kosilica} brojke />
            </div>
            <Lista ime="kosilica" podaci={kosilica} ispod={ui.sklopljeno} />

            <div className="kz-sloj kz-kraj kz-kraj--kosilica" data-sloj="kosKraj">
              <div className="kz-kraj__glavno">
                <Izroni tekst={kosilica.kraj.naslov} as="h3" />
                <p>{kosilica.kraj.opis}</p>
                <blockquote className="kz-citat">
                  <p>{kosilica.kraj.citat}</p>
                  <footer>{kosilica.kraj.citatOd}</footer>
                </blockquote>
              </div>
            </div>

            <Sajt sloj="kosSajt" podaci={kosilica.sajt} uvecaj={ui.uvecaj} />

            <span className="kz-izradio" data-izradio aria-hidden="true">{ui.izradio}</span>
            <div className="kz-sloj kz-potpis" data-sloj="potpis">
              <p className="kz-potpis__tekst">{potpis.tekst}</p>
              <RadoviPotpis potpis={potpis} />
            </div>
          </div>
        </div>
      </section>

      <TokPocetne t={t} />

      <div className="st kz-kraj-stranice">
        <ZavrsniPoziv id="ponuda" className="kz-finale" naslov={finale.naslov} opis={finale.opis} dugme={ui.dugme} ili={finale.ili} ispod={finale.ispod}>
          <ol className="kz-ponuda" data-pokret="kvacice">
            {finale.ponuda.map((x, i) => (
              <li key={x.naslov} style={{ '--i': i }}>
                <div className="kz-ponuda__k" data-nagib="6">
                  <span className="kv__ik" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="11" />
                      <path d="M7 12.4l3.3 3.3L17 9" pathLength="1" />
                    </svg>
                  </span>
                  <span className="kv__tx">
                    <strong>{x.naslov}</strong>
                    <span className="kz-ponuda__opis">{x.opis}</span>
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </ZavrsniPoziv>
      </div>
    </div>
  )
}

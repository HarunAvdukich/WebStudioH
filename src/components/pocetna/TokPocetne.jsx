import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Primjer from './Primjer.jsx'
import Film from './Film.jsx'
import IzJedneRuke from '../onama/IzJedneRuke.jsx'
import TekstOkoZnaka from '../okvir/TekstOkoZnaka.jsx'
import GalerijaSnimaka from '../radovi/GalerijaSnimaka.jsx'
import Vodic from '../igre/Vodic.jsx'
import { CestaPitanja, DioNaslov } from '../stranica/dijelovi.jsx'
import { igraj } from '../../lib/primjeri.js'
import { popuni, waLink } from '../../lib/whatsapp.js'
import { cl } from '../../lib/pokreti/racun.js'

const zivo = () => typeof document !== 'undefined' && document.documentElement.classList.contains('pokret')

// Napredak dijela dok prolazi kroz ekran: 0 kad mu vrh dođe na 75 % visine ekrana, 1 kad
// mu dno dođe tamo. Samo uz pokrete i dok je dio na ekranu.
function useProlaz(ref, crtaj) {
  useEffect(() => {
    const el = ref.current
    if (!el || !zivo()) return undefined
    let kadar = 0
    let vidljiv = false
    const korak = () => {
      kadar = 0
      const r = el.getBoundingClientRect()
      crtaj(cl((window.innerHeight * 0.75 - r.top) / r.height))
    }
    const naSkrol = () => {
      if (vidljiv && !kadar) kadar = requestAnimationFrame(korak)
    }
    const io = new IntersectionObserver(([u]) => {
      vidljiv = u.isIntersecting
      naSkrol()
    })
    io.observe(el)
    window.addEventListener('scroll', naSkrol, { passive: true })
    return () => {
      io.disconnect()
      cancelAnimationFrame(kadar)
      window.removeEventListener('scroll', naSkrol)
    }
  }, [ref, crtaj])
}

// Kartica usluge sa većim živim primjerom: primjer se odigra kad kartica dođe na ekran,
// a dodir ga odigra ponovo. "Pitajte za ovo" otvara WhatsApp sa imenom usluge.
function KarticaUsluge({ u, i, t }) {
  const ref = useRef(null)
  const igre = useRef(0)
  useEffect(() => {
    const el = ref.current?.querySelector('.pr')
    if (!el || !zivo()) return undefined
    const io = new IntersectionObserver(
      ([x]) => {
        if (!x.isIntersecting) return
        io.disconnect()
        igraj(el, u.id, { n: 0, t: t.primjeri })
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [u.id, t.primjeri])

  const ponovo = (e) => {
    if (!zivo()) return
    igre.current += 1
    igraj(ref.current.querySelector('.pr'), u.id, { n: igre.current, cilj: e?.target, t: t.primjeri })
  }

  return (
    <article className="tk-usluga" data-pokret="pojavi" style={{ '--i': i % 2 }}>
      <span className="tk-usluga__br">{String(i + 1).padStart(2, '0')}</span>
      <h3>{u.ime}</h3>
      <p>{u.opis}</p>
      <div
        ref={ref}
        className="tk-usluga__primjer"
        role="button"
        tabIndex={0}
        aria-label={`${u.ime}. ${t.prvi.primjer}`}
        onClick={ponovo}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            ponovo()
          }
        }}
      >
        <Primjer id={u.id} t={t.primjeri} aktivan={false} className="pr--veci" />
      </div>
      <a className="tk-pitaj" href={waLink(popuni(t.sta.pitaj.poruka, { usluga: u.uPoruci }))} target="_blank" rel="noopener">
        {t.sta.pitaj.dugme}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
    </article>
  )
}

// Kako do ponude: linija kroz četiri koraka se puni dok skrolate; poruka se otkuca, ponuda
// dobije pečat, a traka napretka se napuni.
function DoPonude({ t }) {
  const ref = useRef(null)
  const otkucano = useRef(false)
  const crtaj = useCallback((p) => {
    const el = ref.current
    el.style.setProperty('--linija', p.toFixed(3))
    const koraci = el.querySelectorAll('.tk-korak')
    koraci.forEach((k, i) => k.classList.toggle('je-upaljen', p >= (i + 0.15) / koraci.length))
    const poruka = el.querySelector('.tk-korak__poruka')
    if (poruka && !otkucano.current && koraci[0].classList.contains('je-upaljen')) {
      otkucano.current = true
      const tekst = poruka.dataset.tekst
      let j = 0
      const kucaj = () => {
        j += 1
        poruka.textContent = tekst.slice(0, j)
        if (j < tekst.length) setTimeout(kucaj, 28)
      }
      kucaj()
    }
  }, [])
  useProlaz(ref, crtaj)

  return (
    <section className="st-dio tk-ponuda" data-poglavlje="3">
      <div className="st-sirina">
        <DioNaslov nad={t.nad} naslov={t.naslov} />
        <ol className="tk-koraci" ref={ref}>
          <span className="tk-koraci__linija" aria-hidden="true">
            <i />
          </span>
          {t.koraci.map((k, i) => (
            <li key={i} className="tk-korak">
              <span className="tk-korak__br" aria-hidden="true">
                {i + 1}
              </span>
              <b>{k.naslov}</b>
              {k.opis && <span className="tk-korak__opis">{k.opis}</span>}
              {k.poruka && (
                <p className="tk-korak__poruka" data-tekst={k.poruka} aria-label={`${t.primjer}: ${k.poruka}`}>
                  {k.poruka}
                </p>
              )}
              {k.dokument && (
                <div className="tk-korak__dok" aria-hidden="true">
                  <b>{k.dokument}</b>
                  <i style={{ width: '90%' }} />
                  <i style={{ width: '70%' }} />
                  <i style={{ width: '80%' }} />
                  <span>{k.pecat}</span>
                </div>
              )}
              {i === t.koraci.length - 1 && (
                <span className="tk-korak__traka" aria-hidden="true">
                  <i />
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

// SmartTime na telefonu: snimak prave stranice; dodir ga uveća (lupa na telefonu).
function Uredjaj({ t, sajt }) {
  const [uvecan, setUvecan] = useState(false)
  return (
    <section className="st-dio tk-uredjaj">
      <div className="st-sirina">
        <p className="st-nad">{t.nad}</p>
        <h2 className="st-h2" data-pokret="izroni">
          {t.naslov}
        </h2>
        <button type="button" className={`tk-uredjaj__tel${uvecan ? ' je-uvecan' : ''}`} aria-pressed={uvecan} aria-label={`${t.uvecaj}: ${sajt.alt}`} data-kursor={t.uvecaj} onClick={() => setUvecan((u) => !u)}>
          <img src={sajt.slika} alt={sajt.alt} width="780" height="1270" loading="lazy" decoding="async" />
        </button>
        <p className="tk-uredjaj__izvor">
          {t.izvor} {t.uvecaj}.
        </p>
      </div>
    </section>
  )
}

// Početna na telefonu, u uskom prozoru i bez JavaScripta: stranica teče, sat i kosilica se
// sklapaju u filmu. Redoslijed je izbor vlasnika (animacije-10): usluge naprijed, reference ispod.
export default function TokPocetne({ t }) {
  return (
    <div className="st kz-tok">
      <section className="st-dio tk-sta" data-poglavlje="1">
        <div className="st-sirina">
          <DioNaslov nad={t.sta.nad} naslov={t.sta.naslov} uvod={t.sta.opis} />
          <div className="tk-usluge">
            {t.usluge.map((u, i) => (
              <KarticaUsluge key={u.id} u={u} i={i} t={t} />
            ))}
          </div>
        </div>
      </section>

      <Film vrsta="sat" predmet={t.sat} dio={t.film.sat} film={t.film} jezik={t.jezik} />

      <section className="st-dio tk-pali">
        <div className="st-sirina">
          <p className="tk-pali__tekst" data-pokret="pali">
            {t.sat.kraj.naslov} {t.sat.kraj.opis}
          </p>
          <p className="tk-pali__uz">{t.sat.kraj.uz}</p>
        </div>
      </section>

      <div data-poglavlje="2">
        <div className="st-sirina tk-onama__nad">
          <p className="st-nad">{t.onama.nad}</p>
        </div>
        <IzJedneRuke t={t.ruka} />
        <section className="st-dio on-znak tk-znak">
          <div className="st-sirina on-znak__in">
            <TekstOkoZnaka className="on-znak__svg" />
            <div>
              <p className="st-nad">{t.onama.znakNad}</p>
              <p className="on-znak__recenica" data-pokret="pali">
                {t.znak.recenica}
              </p>
            </div>
          </div>
        </section>
      </div>

      <DoPonude t={t.doPonude} />

      <div data-poglavlje="4">
        <section className="st-dio tk-reference">
          <div className="st-sirina">
            <DioNaslov nad={t.reference.nad} naslov={t.reference.naslov} uvod={t.reference.opis} />
          </div>
        </section>
        <Film vrsta="kosilica" predmet={t.kosilica} dio={t.film.kosilica} film={t.film} jezik={t.jezik} />
        <section className="st-dio tk-citat">
          <figure className="st-sirina">
            <blockquote data-pokret="izroni">{t.kosilica.kraj.citat}</blockquote>
            <figcaption>{t.kosilica.kraj.citatOd}</figcaption>
          </figure>
        </section>
        <Uredjaj t={t.reference.smarttime} sajt={t.sat.sajt} />
        <section className="st-dio tk-galerija">
          <div className="st-sirina">
            <h2 className="st-h2" data-pokret="izroni">
              {t.reference.galerija.naslov}
            </h2>
          </div>
          <div className="st-sirina">
            <GalerijaSnimaka snimci={t.reference.galerija.snimci} opis={t.reference.galerija.opis} t={t.reference.galerija.t} />
          </div>
          <div className="st-sirina">
            <ul className="tk-radovi">
              {t.potpis.radovi.map((r) => (
                <li key={r.put}>
                  <Link className="tk-rad" to={r.put} data-kursor={t.potpis.vise}>
                    <b>{r.naziv}</b>
                    <span>{r.opis}</span>
                    <span className="tk-rad__vise">
                      {t.potpis.vise}
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <div data-poglavlje="5">
        <section className="st-dio tk-vodic">
          <div className="st-sirina">
            <DioNaslov nad={t.vodicNad.nad} naslov={t.vodicNad.naslov} />
            <Vodic t={t.vodic} stepenice={t.stepenice} />
          </div>
        </section>
        <section className="st-dio tk-pitanja">
          <div className="st-sirina">
            <DioNaslov nad={t.pitanja.nad} naslov={t.pitanja.naslov} />
            <CestaPitanja lista={t.pitanja.lista} />
          </div>
        </section>
      </div>
    </div>
  )
}

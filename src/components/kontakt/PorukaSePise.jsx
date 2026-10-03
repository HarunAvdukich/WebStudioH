import { useEffect, useRef, useState } from 'react'
import { ZnakPetlja } from '../pocetna/Znak.jsx'
import SmjenaRijeci from '../stranica/SmjenaRijeci.jsx'
import { waLink, popuni } from '../../lib/whatsapp.js'

const tekstZa = (t, izbor) => (izbor.uPoruci ? popuni(t.tekst, { x: izbor.uPoruci }) : t.tekstNeZnam)
const spavaj = (ms) => new Promise((r) => setTimeout(r, ms))

// Veliki trenutak Kontakta, "Poruka koja se sama piše". Izaberete šta vam treba, a poruka za
// WhatsApp se izbriše i napiše ispočetka; dugme je otvara u WhatsAppu. Dok posjetilac ništa ne
// dira, izbori se jednom smijene sami (riječ u pitanju i poruka), pa stanu na prvom.
// Bez JavaScripta stoji prva poruka, a dugme radi.
export default function PorukaSePise({ t }) {
  const [izabran, setIzabran] = useState(0)
  const [tekst, setTekstStanje] = useState(() => tekstZa(t, t.izbori[0]))
  const tekstRef = useRef(tekst)
  const setTekst = (x) => {
    tekstRef.current = x
    setTekstStanje(x)
  }
  const [pise, setPise] = useState(false)
  const [poslane, setPoslane] = useState([])
  const zeton = useRef(0)
  const dirao = useRef(false)
  const korijen = useRef(null)

  const napisi = async (i) => {
    const moj = ++zeton.current
    setIzabran(i)
    const cilj = tekstZa(t, t.izbori[i])
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTekst(cilj)
      return
    }
    setPise(true)
    let sad = tekstRef.current
    while (sad.length) {
      await spavaj(7)
      if (moj !== zeton.current) return
      sad = sad.slice(0, -3)
      setTekst(sad)
    }
    for (let n = 1; n <= cilj.length; n++) {
      await spavaj(22)
      if (moj !== zeton.current) return
      setTekst(cilj.slice(0, n))
    }
    setPise(false)
  }

  // Jedan krug izbora dok posjetilac ništa ne dira, samo dok je dio na ekranu.
  useEffect(() => {
    if (!document.documentElement.classList.contains('pokret')) return undefined
    let ugaseno = false
    const pokreni = async () => {
      for (let i = 1; i <= t.izbori.length; i++) {
        await spavaj(3600)
        if (ugaseno || dirao.current) return
        await napisi(i % t.izbori.length)
      }
    }
    const io = new IntersectionObserver(([u]) => {
      if (!u.isIntersecting) return
      io.disconnect()
      pokreni()
    })
    io.observe(korijen.current)
    const dirni = () => (dirao.current = true)
    korijen.current.addEventListener('pointerdown', dirni)
    korijen.current.addEventListener('focusin', dirni)
    return () => {
      ugaseno = true
      io.disconnect()
      zeton.current++
    }
  }, [t])

  // Paralaksa (14): pozadinski slojevi se pomjeraju sa mišem, samo za miš i uz .pokret.
  useEffect(() => {
    const el = korijen.current
    if (!document.documentElement.classList.contains('pokret')) return undefined
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    let kadar = 0
    const pomjeri = (e) => {
      if (kadar) return
      kadar = requestAnimationFrame(() => {
        kadar = 0
        el.style.setProperty('--px', (e.clientX / window.innerWidth - 0.5).toFixed(3))
        el.style.setProperty('--py', (e.clientY / window.innerHeight - 0.5).toFixed(3))
      })
    }
    window.addEventListener('pointermove', pomjeri, { passive: true })
    return () => {
      window.removeEventListener('pointermove', pomjeri)
      cancelAnimationFrame(kadar)
    }
  }, [])

  const izaberi = (i) => {
    dirao.current = true
    napisi(i)
  }

  const posalji = () => {
    dirao.current = true
    setPoslane((p) => [...p.slice(-1), { id: Date.now(), tekst }])
  }

  const gotovo = !pise && tekst.length > 0

  return (
    <section className="kt-poruka" ref={korijen}>
      <div className="kt-poruka__sjaj" aria-hidden="true" />
      <svg className="kt-poruka__znak" viewBox="0 0 170 124" aria-hidden="true">
        <ZnakPetlja boja="none" />
      </svg>
      <div className="st-sirina kt-poruka__in">
        <div className="kt-poruka__lijevo">
          <p className="st-nad">{t.nad}</p>
          <h1 className="st-h1 kt-poruka__h1">{t.naslov}</h1>
          <p className="st-uvod">{t.uvod}</p>
          <p className="kt-poruka__pitanje">
            {t.pitanje.prije}{' '}
            <SmjenaRijeci rijeci={t.izbori.map((x) => x.tekst)} indeks={izabran} iza={t.pitanje.poslije} />
          </p>
          <div className="kt-izbori" role="group" aria-label={t.pitanje.prije}>
            {t.izbori.map((x, i) => (
              <button key={x.id} type="button" aria-pressed={izabran === i} className={izabran === i ? 'je-izabran' : undefined} onClick={() => izaberi(i)}>
                {x.tekst}
              </button>
            ))}
          </div>
        </div>
        <div className="kt-tel">
          <div className="kt-tel__zag">
            <svg viewBox="0 0 170 124" aria-hidden="true">
              <ZnakPetlja boja="#19B07E" />
            </svg>
            <span>
              <b>{t.telefon.ime}</b>
              <small>{t.telefon.status}</small>
            </span>
          </div>
          <div className="kt-tel__chat" aria-hidden="true">
            {poslane.map((p) => (
              <div key={p.id} className="kt-tel__m">
                {p.tekst}
                <small>{t.otvara}</small>
              </div>
            ))}
          </div>
          <div className="kt-tel__unos">
            <p className={`kt-tel__polje${pise ? ' je-pise' : ''}`} aria-label={t.polje} aria-live="polite">
              {tekst}
            </p>
            <a
              className={`kt-tel__salji${gotovo ? ' je-spremno' : ''}`}
              href={waLink(tekst || tekstZa(t, t.izbori[izabran]))}
              target="_blank"
              rel="noopener"
              aria-label={t.posalji}
              data-kursor="WhatsApp"
              onClick={posalji}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

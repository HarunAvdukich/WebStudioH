import { useEffect, useRef } from 'react'
import Seo from '../components/Seo.jsx'
import { Vrh } from '../components/stranica/dijelovi.jsx'
import ZavrsniPoziv from '../components/stranica/ZavrsniPoziv.jsx'
import VodoravnaGalerija from '../components/radovi/VodoravnaGalerija.jsx'
import { PAROVI } from '../lib/jezik.js'
import '../components/stranica/stranica.css'
import '../components/radovi/radovi.css'

// Dubina na vrhu (14): snimci radova lebde desno i pomjeraju se različitom brzinom sa skrolom
// i mišem. Samo na širokom ekranu; na telefonu ih nema (i ne učitavaju se).
function useDubina(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || !document.documentElement.classList.contains('pokret')) return undefined
    let kadar = 0
    let mx = 0
    let my = 0
    const crtaj = () => {
      kadar = 0
      el.style.setProperty('--sy', String(Math.min(window.scrollY, 900)))
      el.style.setProperty('--mx', mx.toFixed(3))
      el.style.setProperty('--my', my.toFixed(3))
    }
    const zakazi = () => {
      if (!kadar) kadar = requestAnimationFrame(crtaj)
    }
    const mis = (e) => {
      mx = e.clientX / window.innerWidth - 0.5
      my = e.clientY / window.innerHeight - 0.5
      zakazi()
    }
    window.addEventListener('scroll', zakazi, { passive: true })
    window.addEventListener('pointermove', mis, { passive: true })
    return () => {
      window.removeEventListener('scroll', zakazi)
      window.removeEventListener('pointermove', mis)
      cancelAnimationFrame(kadar)
    }
  }, [ref])
}

export default function Radovi({ t }) {
  const vrh = useRef(null)
  useDubina(vrh)
  const [mrt, smarttime] = t.radovi
  return (
    <div className="st st-radovi">
      <Seo
        punNaslov={t.seo.naslov}
        description={t.seo.opis}
        path={t.put}
        jezik={t.jezik}
        verzije={[
          { jezik: 'bs', path: '/radovi' },
          { jezik: 'en', path: PAROVI['/radovi'] },
        ]}
      />
      <div ref={vrh} className="rd-vrh">
        <Vrh nad={t.vrh.nad} naslov={t.vrh.naslov} uvod={t.vrh.uvod} />
        <div className="rd-dubina" aria-hidden="true">
          <img className="rd-dubina__1" src={mrt.slika.src} width={mrt.slika.width} height={mrt.slika.height} alt="" loading="lazy" decoding="async" />
          <img className="rd-dubina__2" src={smarttime.snimci[0].src} width="780" height="1688" alt="" loading="lazy" decoding="async" />
          <img className="rd-dubina__3" src={mrt.snimci[1].src} width="780" height="1688" alt="" loading="lazy" decoding="async" />
        </div>
      </div>

      <VodoravnaGalerija t={t} />

      <ZavrsniPoziv {...t.poziv} />
    </div>
  )
}

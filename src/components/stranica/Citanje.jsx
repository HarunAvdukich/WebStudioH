import { useEffect, useState } from 'react'
import { cl } from '../../lib/pokreti/racun.js'
import { popuni } from '../../lib/whatsapp.js'

const dvije = (n) => String(n).padStart(2, '0')

// Napredak čitanja (16) i oznaka dijela (24) za duge tekstove (studije, članci): tanka linija
// na vrhu se puni dok čitate, a gore lijevo stoji "02 / 09 · Naslov dijela · još 3 min".
// Dijelovi su naslovi h2 sa id-jem u tekstu. Ukras: tekst je isti u članku.
export default function Citanje({ clanak, naslovi, minuta, t }) {
  const [stanje, setStanje] = useState({ p: 0, aktivni: -1 })

  useEffect(() => {
    const el = clanak.current
    if (!el) return undefined
    const h2 = naslovi.map((n) => document.getElementById(n.id)).filter(Boolean)
    let kadar = 0
    const racunaj = () => {
      kadar = 0
      const r = el.getBoundingClientRect()
      const p = cl(-r.top / Math.max(1, r.height - window.innerHeight * 0.6))
      let aktivni = -1
      h2.forEach((h, i) => {
        if (h.getBoundingClientRect().top < window.innerHeight * 0.35) aktivni = i
      })
      setStanje((s) => (Math.abs(s.p - p) < 0.002 && s.aktivni === aktivni ? s : { p, aktivni }))
    }
    const naSkrol = () => {
      if (!kadar) kadar = requestAnimationFrame(racunaj)
    }
    racunaj()
    window.addEventListener('scroll', naSkrol, { passive: true })
    window.addEventListener('resize', naSkrol)
    return () => {
      window.removeEventListener('scroll', naSkrol)
      window.removeEventListener('resize', naSkrol)
      cancelAnimationFrame(kadar)
    }
  }, [clanak, naslovi])

  const ostalo = Math.max(1, Math.ceil(minuta * (1 - stanje.p)))
  const vidljiva = stanje.aktivni >= 0 && stanje.p < 0.995
  const naslov = naslovi[Math.max(0, stanje.aktivni)]

  return (
    <>
      <div className="st-citanje" aria-hidden="true">
        <span style={{ transform: `scaleX(${stanje.p})` }} />
      </div>
      <div className={`st-oznaka${vidljiva ? ' je-vidljiva' : ''}`} aria-hidden="true">
        <span className="st-oznaka__in">
          <span className="st-oznaka__br" key={`b${stanje.aktivni}`}>
            {dvije(Math.max(1, stanje.aktivni + 1))}
          </span>
          <span className="st-oznaka__od">/ {dvije(naslovi.length)} ·</span>
          <span className="st-oznaka__naslov" key={`n${stanje.aktivni}`}>
            {naslov?.tekst}
          </span>
          <span className="st-oznaka__min">· {popuni(t.citanje, { n: ostalo })}</span>
        </span>
      </div>
    </>
  )
}

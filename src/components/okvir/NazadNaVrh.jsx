import { useEffect, useState } from 'react'
import { okvir } from '../../okvir.js'
import { procitano, vidljivVrh } from '../../lib/pokreti/racun.js'
import { glatko } from '../../lib/glatkiSkrol.js'

// Dugme za vrh na dugim stranicama. Prsten oko njega pokazuje koliko je pročitano.
export default function NazadNaVrh() {
  const [stanje, setStanje] = useState({ vidljiv: false, p: 0 })

  useEffect(() => {
    const naSkrol = () => {
      const y = window.scrollY
      const ekran = window.innerHeight
      const visina = document.documentElement.scrollHeight
      const vidljiv = vidljivVrh(y, visina, ekran)
      const p = procitano(y, visina, ekran)
      setStanje((s) => (s.vidljiv === vidljiv && Math.abs(s.p - p) < 0.005 ? s : { vidljiv, p }))
    }
    naSkrol()
    window.addEventListener('scroll', naSkrol, { passive: true })
    return () => window.removeEventListener('scroll', naSkrol)
  }, [])

  const gore = () => {
    if (glatko.lenis) glatko.lenis.scrollTo(0)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className={`ok-vrh${stanje.vidljiv ? ' je-vidljiv' : ''}`}
      onClick={gore}
      aria-label={okvir.nazadNaVrh}
      tabIndex={stanje.vidljiv ? 0 : -1}
    >
      <svg className="ok-vrh__prsten" viewBox="0 0 58 58" aria-hidden="true">
        <circle className="bg" cx="29" cy="29" r="26" />
        <circle className="pr" cx="29" cy="29" r="26" pathLength="1" style={{ strokeDashoffset: 1 - stanje.p }} />
      </svg>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}

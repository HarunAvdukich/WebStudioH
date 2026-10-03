import { useEffect, useRef, useState } from 'react'
import { ZnakPetlja } from './Znak.jsx'
import { cl } from '../../lib/pokreti/racun.js'

// Linija priče na telefonu: prozirna traka gore sa znakom, imenom poglavlja koje se okrene i
// crticama koje se pune. Izađe poslije prvog ekrana. Poglavlja su dijelovi sa data-poglavlje.
export default function LinijaPrice({ imena, korijen }) {
  const [stanje, setStanje] = useState({ k: 0, vid: false })
  const crtice = useRef(null)

  useEffect(() => {
    const html = document.documentElement
    if (!html.classList.contains('pokret')) return undefined
    let kadar = 0
    const korak = () => {
      kadar = 0
      const H = window.innerHeight
      const dijelovi = Array.from(korijen.current?.querySelectorAll('[data-poglavlje]') || [])
      if (!dijelovi.length) return
      const tacka = H * 0.35
      const vrhovi = [0, ...dijelovi.map((d) => d.getBoundingClientRect().top)]
      let k = 0
      vrhovi.forEach((v, i) => {
        if (v <= tacka && i > 0) k = i
      })
      const kraj = k + 1 < vrhovi.length ? vrhovi[k + 1] : document.documentElement.scrollHeight - window.scrollY
      const pocetak = k === 0 ? -window.scrollY : vrhovi[k]
      const dio = cl((tacka - pocetak) / Math.max(1, kraj - pocetak))
      const segmenti = crtice.current?.children || []
      Array.from(segmenti).forEach((s, i) => {
        s.firstChild.style.transform = `scaleX(${i < k ? 1 : i === k ? dio.toFixed(3) : 0})`
      })
      const vid = window.scrollY > H * 0.85
      setStanje((st) => (st.k === k && st.vid === vid ? st : { k, vid }))
    }
    const naSkrol = () => {
      if (!kadar) kadar = requestAnimationFrame(korak)
    }
    korak()
    window.addEventListener('scroll', naSkrol, { passive: true })
    window.addEventListener('resize', naSkrol)
    return () => {
      cancelAnimationFrame(kadar)
      window.removeEventListener('scroll', naSkrol)
      window.removeEventListener('resize', naSkrol)
    }
  }, [korijen])

  return (
    <div className={`kz-linija-tel${stanje.vid ? ' je-vid' : ''}`} aria-hidden="true">
      <div className="kz-linija-tel__red">
        <svg viewBox="0 0 170 124">
          <ZnakPetlja />
        </svg>
        <span className="kz-linija-tel__ime">
          <em key={stanje.k}>{imena[stanje.k]}</em>
        </span>
        <span className="kz-linija-tel__br">
          {String(stanje.k + 1).padStart(2, '0')} / {String(imena.length).padStart(2, '0')}
        </span>
      </div>
      <span className="kz-linija-tel__crtice" ref={crtice}>
        {imena.map((ime) => (
          <span key={ime}>
            <i />
          </span>
        ))}
      </span>
    </div>
  )
}

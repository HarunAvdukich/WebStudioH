import { useEffect, useRef } from 'react'

// Slova koja se podebljaju pod mišem (30): Urbanist je promjenljiv font, pa svako slovo blizu
// miša postane deblje, bez skoka. Samo za miš i uz .pokret; inače je naslov običan.
// Slova se razbiju tek u pregledniku; naslov dobije aria-label sa cijelim tekstom.
export default function PodebljanaSlova({ tekst, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const h = ref.current
    if (!h || !document.documentElement.classList.contains('pokret')) return undefined
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    const izvorno = h.textContent
    h.setAttribute('aria-label', izvorno)
    h.textContent = ''
    const slova = []
    for (const dio of izvorno.split(/(\s+)/)) {
      if (!dio) continue
      if (/^\s+$/.test(dio)) {
        h.append(dio)
        continue
      }
      const rijec = document.createElement('span')
      rijec.className = 'ps-r'
      rijec.setAttribute('aria-hidden', 'true')
      for (const c of dio) {
        const s = document.createElement('span')
        s.className = 'ps-s'
        s.textContent = c
        rijec.append(s)
        slova.push(s)
      }
      h.append(rijec)
    }
    let centri = []
    const mjeri = () => {
      centri = slova.map((s) => {
        const r = s.getBoundingClientRect()
        return [r.left + r.width / 2, r.top + r.height / 2]
      })
    }
    let kadar = 0
    let mx = -1e4
    let my = -1e4
    const crtaj = () => {
      kadar = 0
      slova.forEach((s, i) => {
        const [x, y] = centri[i]
        const blizina = Math.max(0, 1 - Math.hypot(mx - x, my - y) / 260)
        s.style.fontVariationSettings = `'wght' ${Math.round(500 + 400 * blizina * blizina)}`
      })
    }
    const zakazi = () => {
      if (!kadar) kadar = requestAnimationFrame(crtaj)
    }
    const pomjeri = (e) => {
      mx = e.clientX
      my = e.clientY
      zakazi()
    }
    const osvjezi = () => {
      mjeri()
      zakazi()
    }
    mjeri()
    window.addEventListener('pointermove', pomjeri, { passive: true })
    window.addEventListener('scroll', osvjezi, { passive: true })
    window.addEventListener('resize', osvjezi)
    document.fonts?.ready.then(osvjezi)
    return () => {
      window.removeEventListener('pointermove', pomjeri)
      window.removeEventListener('scroll', osvjezi)
      window.removeEventListener('resize', osvjezi)
      cancelAnimationFrame(kadar)
      h.textContent = izvorno
      h.removeAttribute('aria-label')
    }
  }, [tekst])

  return (
    <h1 ref={ref} className={`ps ${className}`}>
      {tekst}
    </h1>
  )
}

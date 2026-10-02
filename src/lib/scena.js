// Zakačena scena: visok dio sa ljepljivim (sticky) unutrašnjim ekranom. Napredak od 0 do 1
// prema skrolu se šalje funkciji crtaj, samo dok je dio na ekranu. Scena se kači samo uz
// .pokret i na širokom ekranu (KACI); inače stranica teče normalno.
import { useEffect, useState } from 'react'
import { napredakSkrola } from './pokreti/racun.js'

export const KACI = '(min-width: 1024px) and (min-height: 600px)'

// Da li se scena kači: uz .pokret i na širokom i dovoljno visokom ekranu. Prati promjenu prozora.
export function useKaci() {
  const [kaci, setKaci] = useState(false)
  useEffect(() => {
    if (!document.documentElement.classList.contains('pokret')) return undefined
    const mq = window.matchMedia(KACI)
    const promjena = () => setKaci(mq.matches)
    promjena()
    mq.addEventListener('change', promjena)
    return () => mq.removeEventListener('change', promjena)
  }, [])
  return kaci
}

export function useScena(ref, crtaj, aktivno) {
  useEffect(() => {
    const el = ref.current
    if (!el || !aktivno) return undefined
    let kadar = 0
    let vidljiv = false
    const korak = () => {
      kadar = 0
      crtaj(napredakSkrola(el.getBoundingClientRect(), window.innerHeight))
    }
    const naSkrol = () => {
      if (vidljiv && !kadar) kadar = requestAnimationFrame(korak)
    }
    const io = new IntersectionObserver(([u]) => {
      vidljiv = u.isIntersecting
      naSkrol()
    })
    io.observe(el)
    korak()
    window.addEventListener('scroll', naSkrol, { passive: true })
    window.addEventListener('resize', naSkrol)
    return () => {
      io.disconnect()
      cancelAnimationFrame(kadar)
      window.removeEventListener('scroll', naSkrol)
      window.removeEventListener('resize', naSkrol)
    }
  }, [ref, crtaj, aktivno])
}

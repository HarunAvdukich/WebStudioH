// Nagib pri brzom skrolu (34): lista se malo nagne kad brzo skrolate, kao da ima težinu, pa
// se smiri. Na telefonu blaže. Samo uz .pokret.
import { useEffect } from 'react'

export function useNagibSkrola(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || !document.documentElement.classList.contains('pokret')) return undefined
    const jacina = window.matchMedia('(hover: hover) and (pointer: fine)').matches ? 0.09 : 0.045
    let prije = window.scrollY
    let t0 = performance.now()
    let nagib = 0
    let cilj = 0
    let kadar = 0
    const korak = () => {
      nagib += (cilj - nagib) * 0.14
      cilj *= 0.86
      el.style.transform = Math.abs(nagib) < 0.02 ? '' : `skewY(${nagib.toFixed(3)}deg)`
      kadar = Math.abs(nagib) < 0.02 && Math.abs(cilj) < 0.02 ? 0 : requestAnimationFrame(korak)
    }
    const naSkrol = () => {
      const sad = performance.now()
      const brzina = (window.scrollY - prije) / Math.max(8, sad - t0)
      prije = window.scrollY
      t0 = sad
      cilj = Math.max(-3, Math.min(3, brzina * jacina * 10))
      if (!kadar) kadar = requestAnimationFrame(korak)
    }
    window.addEventListener('scroll', naSkrol, { passive: true })
    return () => {
      window.removeEventListener('scroll', naSkrol)
      cancelAnimationFrame(kadar)
      el.style.transform = ''
    }
  }, [ref])
}

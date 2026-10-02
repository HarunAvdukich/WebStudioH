// Dugme se lagano privuče mišu kad je miš blizu. Samo za miš i bez "smanji pokrete".
import { useEffect } from 'react'
import { magnet } from './pokreti/racun.js'

export function useMagnet(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const pomjeri = (e) => {
      const r = el.getBoundingClientRect()
      const { x, y } = magnet(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2))
      el.style.transform = x || y ? `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)` : ''
      el.classList.toggle('ok-magnet--prati', !!(x || y))
    }
    window.addEventListener('pointermove', pomjeri, { passive: true })
    return () => {
      window.removeEventListener('pointermove', pomjeri)
      el.style.transform = ''
    }
  }, [ref])
}

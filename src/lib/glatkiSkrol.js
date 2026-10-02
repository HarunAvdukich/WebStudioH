// Glatki skrol (Lenis) na svim stranicama osim početne, koja ima svoj. Samo za miš i uz .pokret,
// a Lenis se učita tek poslije prve interakcije, da ne uspori prvi ekran.
import { useEffect } from 'react'
import { poslijeInterakcije } from './interakcija.js'

export const glatko = { lenis: null }

export function useGlatkiSkrol(ukljuceno) {
  useEffect(() => {
    if (!ukljuceno) return undefined
    if (!document.documentElement.classList.contains('pokret')) return undefined
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    let ugasen = false
    const otkazi = poslijeInterakcije(async () => {
      const [{ default: Lenis }] = await Promise.all([import('lenis'), import('lenis/dist/lenis.css')])
      if (ugasen) return
      glatko.lenis = new Lenis({ lerp: 0.1, smoothWheel: true, autoRaf: true })
    })
    return () => {
      ugasen = true
      otkazi()
      glatko.lenis?.destroy()
      glatko.lenis = null
    }
  }, [ukljuceno])
}

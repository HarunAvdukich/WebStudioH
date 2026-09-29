import { useCallback, useEffect, useRef, useState } from 'react'
import { ClientOnly } from 'vite-react-ssg'
import { HunarZnak } from './Brand.jsx'
import { odluci, procitaj } from '../lib/mogucnosti.js'
import { poslijeInterakcije } from '../lib/interakcija.js'

const MAKS_OKRET = 0.61 // 35 stepeni, skrolom kroz naslov

function Platno({ naSpremno }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!odluci(procitaj()).tri) return undefined
    let ugasi = () => {}
    let otkazano = false

    const pokreni = async () => {
      const [{ napraviScenu }, { napraviZnak }] = await Promise.all([
        import('../three/scena.js'),
        import('../three/znak3d.js'),
      ])
      if (otkazano || !ref.current) return
      const s = napraviScenu(ref.current, { udaljenost: 4.2 })
      // Svjetla scene su podešena za artikle na tamnom; na krečnoj podlozi
      // znak bi izblijedio, pa je izlaganje niže.
      s.renderer.toneMappingExposure = 0.52
      const znak = napraviZnak()
      s.scena.add(znak)
      // Shaderi se prevode bez blokiranja glavne niti gdje preglednik to podržava.
      await s.renderer.compileAsync(s.scena, s.kamera)
      if (otkazano) {
        s.ugasi()
        return
      }

      let misX = 0
      let misY = 0
      const naMis = (e) => {
        misY = (e.clientX / window.innerWidth - 0.5) * 0.5
        misX = (e.clientY / window.innerHeight - 0.5) * 0.3
      }
      window.addEventListener('pointermove', naMis, { passive: true })

      const io = new IntersectionObserver(([u]) => (u.isIntersecting ? s.pokreni() : s.zaustavi()))
      io.observe(ref.current)

      s.pokreni(() => {
        const skrol = Math.min(window.scrollY / window.innerHeight, 1)
        znak.rotation.y += (misY + skrol * MAKS_OKRET - znak.rotation.y) * 0.08
        znak.rotation.x += (misX - znak.rotation.x) * 0.08
      })
      naSpremno()
      ugasi = () => {
        window.removeEventListener('pointermove', naMis)
        io.disconnect()
        s.ugasi()
      }
    }

    // Ravni znak izgleda isto kao 3D dok se ne okrene, pa 3D čeka prvu
    // interakciju i slobodan trenutak glavne niti.
    let id = 0
    const otkazi = poslijeInterakcije(() => {
      id = 'requestIdleCallback' in window
        ? window.requestIdleCallback(pokreni, { timeout: 800 })
        : window.setTimeout(pokreni, 200)
    })
    return () => {
      otkazano = true
      otkazi()
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(id)
      window.clearTimeout(id)
      ugasi()
    }
  }, [naSpremno])

  return <canvas ref={ref} className="hero-znak__platno" aria-hidden="true" />
}

export default function HeroMark3D() {
  const [spremno, setSpremno] = useState(false)
  const naSpremno = useCallback(() => setSpremno(true), [])
  return (
    <div className={`hero-znak${spremno ? ' je-spremno' : ''}`} role="img" aria-label="Znak Hunar">
      <HunarZnak className="hero-znak__ravni" />
      <ClientOnly>{() => <Platno naSpremno={naSpremno} />}</ClientOnly>
    </div>
  )
}

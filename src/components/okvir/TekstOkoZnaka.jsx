import { useEffect, useId, useRef } from 'react'
import { SLOVO } from '../pocetna/Znak.jsx'
import { useOkvir } from '../../lib/useOkvir.js'

// Znak u podnožju: iscrta se kad dođe na ekran (data-pokret="crtaj"), a oko slova u i n
// teče "vještina · umijeće · hunar"; pod mišem ubrza. Tekst ide po nevidljivoj putanji bez
// pathLength, da startOffset bude u pravim jedinicama. Teče samo dok je znak na ekranu i uz .pokret.
export default function TekstOkoZnaka() {
  const { okvir } = useOkvir()
  const id = useId().replace(/:/g, '')
  const ref = useRef(null)

  useEffect(() => {
    const svg = ref.current
    if (!svg || !document.documentElement.classList.contains('pokret')) return undefined
    const duzina = svg.querySelector('defs path').getTotalLength()
    const tekstovi = [...svg.querySelectorAll('textPath')]
    tekstovi.forEach((t) => t.parentNode.setAttribute('textLength', duzina))
    let pomak = 0
    let brzina = 1
    let cilj = 1
    let kadar = 0
    let vidljiv = false
    let zadnje = 0
    const korak = (sad) => {
      const dt = zadnje ? Math.min(0.05, (sad - zadnje) / 1000) : 0
      zadnje = sad
      brzina += (cilj - brzina) * 0.06
      pomak = (pomak + dt * 60 * brzina) % duzina
      tekstovi.forEach((t, i) => t.setAttribute('startOffset', i % 2 ? pomak - duzina : pomak))
      kadar = vidljiv ? requestAnimationFrame(korak) : 0
      if (!kadar) zadnje = 0
    }
    const io = new IntersectionObserver(([u]) => {
      vidljiv = u.isIntersecting
      if (vidljiv && !kadar) kadar = requestAnimationFrame(korak)
    })
    const brze = () => (cilj = 4)
    const sporije = () => (cilj = 1)
    io.observe(svg)
    svg.addEventListener('pointerenter', brze)
    svg.addEventListener('pointerleave', sporije)
    return () => {
      io.disconnect()
      cancelAnimationFrame(kadar)
      svg.removeEventListener('pointerenter', brze)
      svg.removeEventListener('pointerleave', sporije)
    }
  }, [])

  const tekst = okvir.znakTekst.repeat(3)
  return (
    <svg ref={ref} className="ok-znak-tekst" viewBox="0 0 170 124" data-pokret="crtaj" role="img" aria-label="Hunar">
      <defs>
        <path id={`${id}u`} d={SLOVO} />
      </defs>
      <g transform="translate(2,2) scale(0.38961)">
        <path className="crta" d={SLOVO} pathLength="1" />
        <path className="crta" d={SLOVO} pathLength="1" transform="rotate(180 213 154)" />
        <text aria-hidden="true" lengthAdjust="spacing"><textPath href={`#${id}u`}>{tekst}</textPath></text>
        <text aria-hidden="true" lengthAdjust="spacing"><textPath href={`#${id}u`}>{tekst}</textPath></text>
        <g transform="rotate(180 213 154)">
          <text aria-hidden="true" lengthAdjust="spacing"><textPath href={`#${id}u`}>{tekst}</textPath></text>
          <text aria-hidden="true" lengthAdjust="spacing"><textPath href={`#${id}u`}>{tekst}</textPath></text>
        </g>
      </g>
    </svg>
  )
}

import { useEffect, useRef } from 'react'
import { useOkvir } from '../../lib/useOkvir.js'
import { useMagnet } from '../../lib/magnet.js'
import { waLink } from '../../lib/whatsapp.js'
import BrojTelefona from '../okvir/BrojTelefona.jsx'

// Završni poziv na dnu stranice. Živa pozadina (svjetla i zrno) i, za miš, svjetlo koje prati
// miš i otkriva polje sitnih znakova. Naslov izranja, dugme se privlači mišu, broj se kopira.
// `poruka` je tekst za WhatsApp; bez nje ide opšta poruka sa jezika stranice.
export default function ZavrsniPoziv({ nad, naslov, opis, dugme, ili, poruka }) {
  const { whatsappLink } = useOkvir()
  const ref = useRef(null)
  const dug = useRef(null)
  useMagnet(dug)

  useEffect(() => {
    const el = ref.current
    if (!el || !document.documentElement.classList.contains('pokret')) return undefined
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    let kadar = 0
    let x = 0
    let y = 0
    const crtaj = () => {
      kadar = 0
      el.style.setProperty('--mx', `${x}px`)
      el.style.setProperty('--my', `${y}px`)
    }
    const pomjeri = (e) => {
      const r = el.getBoundingClientRect()
      x = e.clientX - r.left
      y = e.clientY - r.top
      el.classList.add('je-svjetlo')
      if (!kadar) kadar = requestAnimationFrame(crtaj)
    }
    const izadji = () => el.classList.remove('je-svjetlo')
    el.addEventListener('pointermove', pomjeri, { passive: true })
    el.addEventListener('pointerleave', izadji)
    return () => {
      el.removeEventListener('pointermove', pomjeri)
      el.removeEventListener('pointerleave', izadji)
      cancelAnimationFrame(kadar)
    }
  }, [])

  return (
    <section className="zp" ref={ref}>
      <div className="zp__pozadina" aria-hidden="true">
        <i className="zp__s zp__s--1" />
        <i className="zp__s zp__s--2" />
        <i className="zp__s zp__s--3" />
        <span className="zp__znakovi" />
        <span className="zp__znakovi zp__znakovi--svjetlo" />
        <span className="zp__zrno" />
      </div>
      <div className="st-sirina zp__in">
        <p className="st-nad">{nad}</p>
        <h2 className="zp__h" data-pokret="izroni">
          {naslov}
        </h2>
        {opis && <p className="zp__opis">{opis}</p>}
        <div className="zp__dugmad">
          <a ref={dug} className="ok-dugme" href={poruka ? waLink(poruka) : whatsappLink} target="_blank" rel="noopener">
            {dugme}
          </a>
          <span className="zp__ili">
            {ili} <BrojTelefona />
          </span>
        </div>
      </div>
    </section>
  )
}

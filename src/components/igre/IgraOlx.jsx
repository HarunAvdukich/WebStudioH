import { useRef, useState } from 'react'
import { novaCijena, novaZaliha } from '../../lib/igre.js'
import { popuni } from '../../lib/whatsapp.js'

const smanjenoKretanje = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Probajte sami: OLX veza (26). Promjena cijene ili zalihe u "vašoj trgovini" pošalje signal
// preko linije, a oglas na OLX-u se ažurira sam. Ilustracija, sa napomenom ispod.
export default function IgraOlx({ t }) {
  const [trgovina, setTrgovina] = useState({ cijena: 459, zaliha: 3 })
  const [oglas, setOglas] = useState({ cijena: 459, zaliha: 3, svjeze: false })
  const puls = useRef(null)
  const red = useRef(Promise.resolve())

  const posalji = (stanje) => {
    red.current = red.current.then(async () => {
      if (!smanjenoKretanje() && puls.current?.animate) {
        await puls.current.animate(
          [
            { left: '0%', opacity: 0 },
            { left: '12%', opacity: 1, offset: 0.15 },
            { left: '88%', opacity: 1, offset: 0.85 },
            { left: '100%', opacity: 0 },
          ],
          { duration: 600, easing: 'ease-in-out' },
        ).finished
      }
      setOglas({ ...stanje, svjeze: true })
      setTimeout(() => setOglas((o) => ({ ...o, svjeze: false })), 1200)
    })
  }

  const zadnje = useRef(trgovina)
  const promijeni = (kljuc, promjena) => {
    const s = zadnje.current
    const novo = { ...s, [kljuc]: kljuc === 'cijena' ? novaCijena(s.cijena, promjena) : novaZaliha(s.zaliha, promjena) }
    zadnje.current = novo
    setTrgovina(novo)
    posalji(novo)
  }

  const cijena = (c) => `${c} ${t.valuta}`

  return (
    <div className="ig-olx">
      <div className="ig-olx__k">
        <p className="ig-lbl">{t.trgovina}</p>
        <b>{t.artikal}</b>
        <div className="ig-olx__red">
          <span>{t.cijena}</span>
          <button type="button" aria-label={`${t.manje}: ${t.cijena}`} onClick={() => promijeni('cijena', -10)}>
            −
          </button>
          <output>{cijena(trgovina.cijena)}</output>
          <button type="button" aria-label={`${t.vise}: ${t.cijena}`} onClick={() => promijeni('cijena', 10)}>
            +
          </button>
        </div>
        <div className="ig-olx__red">
          <span>{t.zaliha}</span>
          <button type="button" aria-label={`${t.manje}: ${t.zaliha}`} onClick={() => promijeni('zaliha', -1)}>
            −
          </button>
          <output>{trgovina.zaliha}</output>
          <button type="button" aria-label={`${t.vise}: ${t.zaliha}`} onClick={() => promijeni('zaliha', 1)}>
            +
          </button>
        </div>
      </div>
      <div className="ig-olx__veza" aria-hidden="true">
        <span ref={puls} className="ig-olx__puls" />
      </div>
      <div className={`ig-olx__k ig-olx__oglas${oglas.zaliha <= 0 ? ' je-nema' : ''}${oglas.svjeze ? ' je-svjeze' : ''}`} aria-live="polite">
        <p className="ig-lbl">{t.oglas}</p>
        <div className="ig-olx__slika" aria-hidden="true" />
        <b>{t.artikal}</b>
        <span className="ig-olx__cijena">{cijena(oglas.cijena)}</span>
        <small>{oglas.zaliha > 0 ? popuni(t.naStanju, { n: oglas.zaliha }) : t.nema}</small>
        <small className="ig-olx__kad">{t.azurirano}</small>
      </div>
    </div>
  )
}

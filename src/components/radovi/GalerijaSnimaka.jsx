import { useEffect, useRef, useState } from 'react'
import { velicina } from '../../lib/velicina.js'

const UVECANJE = 2.5
const LUPA = 180

// Snimak sa lupom (29): na računaru okrugla lupa prati miš i uveća snimak 2,5 puta; klik
// (ili dodir na telefonu) otvori snimak preko cijelog ekrana.
function Snimak({ s, onOtvori, vukao, t }) {
  const [lupa, setLupa] = useState(null)
  return (
    <button
      type="button"
      className={`gs__snimak${s.siroka ? ' gs__snimak--siroka' : ''}`}
      aria-label={`${t.uvecaj}: ${s.alt}`}
      data-kursor={t.uvecaj}
      onClick={() => {
        if (!vukao.current) onOtvori(s)
      }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || vukao.current) return
        const r = e.currentTarget.getBoundingClientRect()
        setLupa({ x: e.clientX - r.left, y: e.clientY - r.top, w: r.width, h: r.height })
      }}
      onPointerLeave={() => setLupa(null)}
    >
      <img src={s.src} width={s.width} height={s.height} alt={s.alt} loading="lazy" decoding="async" draggable={false} />
      {lupa && (
        <span
          className="gs__lupa"
          aria-hidden="true"
          style={{
            left: lupa.x,
            top: lupa.y,
            backgroundImage: `url(${s.src})`,
            backgroundSize: `${lupa.w * UVECANJE}px ${lupa.h * UVECANJE}px`,
            backgroundPosition: `${(LUPA / 2) * velicina() - lupa.x * UVECANJE}px ${(LUPA / 2) * velicina() - lupa.y * UVECANJE}px`,
          }}
        />
      )}
      {s.opis && <span className="gs__opis">{s.opis}</span>}
    </button>
  )
}

// Galerija koja se povlači (33): mišem se povuče i nastavi klizati sama (inercija); na
// telefonu se povlači prstom (običan vodoravni skrol). Tastaturom se skrola strelicama.
export default function GalerijaSnimaka({ snimci, opis, t }) {
  const traka = useRef(null)
  const vukao = useRef(false)
  const [uvecan, setUvecan] = useState(null)

  useEffect(() => {
    const el = traka.current
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    let pocetak = null
    let brzina = 0
    let kadar = 0
    const dolje = (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      cancelAnimationFrame(kadar)
      pocetak = { x: e.clientX, skrol: el.scrollLeft, zadnjiX: e.clientX, t: performance.now() }
      vukao.current = false
      brzina = 0
    }
    const pomjeri = (e) => {
      if (!pocetak) return
      const dx = e.clientX - pocetak.x
      if (Math.abs(dx) > 5 && !vukao.current) {
        vukao.current = true
        el.classList.add('je-vuce')
        el.setPointerCapture?.(e.pointerId)
      }
      if (!vukao.current) return
      const sad = performance.now()
      brzina = (pocetak.zadnjiX - e.clientX) / Math.max(1, sad - pocetak.t)
      pocetak.zadnjiX = e.clientX
      pocetak.t = sad
      el.scrollLeft = pocetak.skrol - dx
    }
    const gore = () => {
      if (!pocetak) return
      pocetak = null
      el.classList.remove('je-vuce')
      let v = brzina * 16
      const klizi = () => {
        if (Math.abs(v) < 0.4) return
        el.scrollLeft += v
        v *= 0.94
        kadar = requestAnimationFrame(klizi)
      }
      kadar = requestAnimationFrame(klizi)
      setTimeout(() => (vukao.current = false), 0)
    }
    el.addEventListener('pointerdown', dolje)
    window.addEventListener('pointermove', pomjeri)
    window.addEventListener('pointerup', gore)
    return () => {
      el.removeEventListener('pointerdown', dolje)
      window.removeEventListener('pointermove', pomjeri)
      window.removeEventListener('pointerup', gore)
      cancelAnimationFrame(kadar)
    }
  }, [])

  useEffect(() => {
    if (!uvecan) return undefined
    const esc = (e) => e.key === 'Escape' && setUvecan(null)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [uvecan])

  return (
    <figure className="gs">
      <div className="gs__traka" ref={traka} tabIndex={0} role="group" aria-label={t.snimci}>
        {snimci.map((s, i) => (
          <div key={s.src} className="gs__mjesto" data-pokret="otkrij" style={{ '--i': i }}>
            <Snimak s={s} onOtvori={setUvecan} vukao={vukao} t={t} />
          </div>
        ))}
      </div>
      <figcaption className="gs__potpis">
        {opis}
        <span className="gs__povucite" aria-hidden="true">
          {t.povucite} ↔
        </span>
      </figcaption>
      {uvecan && (
        <div className="gs__veliko" role="dialog" aria-modal="true" aria-label={uvecan.alt} onClick={() => setUvecan(null)}>
          <img src={uvecan.src} width={uvecan.width} height={uvecan.height} alt={uvecan.alt} />
          <button type="button" className="gs__zatvori" onClick={() => setUvecan(null)} autoFocus>
            {t.zatvori}
          </button>
        </div>
      )}
    </figure>
  )
}

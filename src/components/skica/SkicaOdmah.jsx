import { useState } from 'react'
import { prati } from '../../lib/statistika.js'

// Osnovna skica odmah: naziv, grad i djelatnost, pa šablon public/demoskica.html u okviru.
// Bez JavaScripta forma otvori isti šablon u novoj kartici (GET na /demoskica.html).
// Okvir se učita tek na klik, da ne optereti prvo učitavanje stranice.
export default function SkicaOdmah({ t, sablon, onSkica }) {
  const [url, setUrl] = useState('')

  const pokazi = (e) => {
    e.preventDefault()
    const podaci = Object.fromEntries(new FormData(e.currentTarget).entries())
    const q = new URLSearchParams({ ime: podaci.ime.trim(), grad: podaci.grad.trim(), vrsta: podaci.vrsta })
    if (!podaci.grad.trim()) q.delete('grad')
    setUrl(`${sablon}?${q}`)
    onSkica?.(podaci)
    prati('skica-odmah', { vrsta: podaci.vrsta })
  }

  return (
    <div className="sk-odmah">
      <form className="sk-unos" action={sablon} method="get" target="_blank" onSubmit={pokazi}>
        <label className="ob__p">
          <input name="ime" required placeholder=" " autoComplete="organization" maxLength={60} />
          <span>{t.polja.ime}</span>
        </label>
        <label className="ob__p">
          <input name="grad" placeholder=" " autoComplete="address-level2" maxLength={40} />
          <span>{t.polja.grad}</span>
        </label>
        <label className="ob__p sk-vrsta">
          <select name="vrsta" defaultValue={t.vrste[0].v}>
            {t.vrste.map((v) => (
              <option key={v.v} value={v.v}>
                {v.ime}
              </option>
            ))}
          </select>
          <span>{t.polja.vrsta}</span>
        </label>
        <button className="ok-dugme sk-unos__dugme" type="submit">
          {t.dugme}
        </button>
      </form>

      <figure className={`sk-okvir${url ? ' je-puno' : ''}`}>
        <figcaption className="sk-okvir__traka">
          <span className="sk-okvir__tacke" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="sk-okvir__oznaka">{t.oznaka}</span>
          {url && (
            <a href={url} target="_blank" rel="noopener" data-bez-zavjese>
              {t.cijeli}
            </a>
          )}
        </figcaption>
        {url ? (
          <iframe key={url} src={url} title={t.oznaka} loading="lazy" />
        ) : (
          <p className="sk-okvir__prazno">{t.prazno}</p>
        )}
      </figure>

      {url && (
        <a className="ox-link sk-dalje" href="#forma">
          {t.dalje}
        </a>
      )}
    </div>
  )
}

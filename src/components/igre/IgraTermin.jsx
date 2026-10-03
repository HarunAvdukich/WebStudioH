import { useState } from 'react'
import { slobodan } from '../../lib/igre.js'

// Probajte sami: zakažite termin (27). Klik na slobodan termin: polje iskoči, ostali se
// povuku, a odozdo izađe potvrda. Mreža je 4 sata × 5 dana. Ilustracija.
export default function IgraTermin({ t }) {
  const [izabran, setIzabran] = useState(-1)
  const polja = t.sati.flatMap((sat, red) => t.dani.map((dan, kolona) => ({ i: red * t.dani.length + kolona, sat, kolona })))
  const opis = izabran >= 0 ? `${t.usluga} · ${t.daniPuni[polja[izabran].kolona]}, ${polja[izabran].sat}` : ''

  return (
    <div className={`ig-ter${izabran >= 0 ? ' je-izabran' : ''}`}>
      <p className="ig-lbl">{t.usluga}</p>
      <div className="ig-ter__dani" aria-hidden="true">
        {t.dani.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="ig-ter__mreza">
        {polja.map((p) => {
          const zauzeto = !slobodan(p.i)
          return (
            <button
              key={p.i}
              type="button"
              disabled={zauzeto}
              aria-pressed={izabran === p.i}
              aria-label={`${t.daniPuni[p.kolona]}, ${p.sat}${zauzeto ? `, ${t.zauzeto}` : ''}`}
              className={izabran === p.i ? 'je-izabran' : undefined}
              onClick={() => setIzabran((s) => (s === p.i ? -1 : p.i))}
            >
              {p.sat}
            </button>
          )
        })}
      </div>
      <div className="ig-ter__potvrda" aria-live="polite">
        {izabran >= 0 && (
          <>
            <b>{t.zakazano}</b>
            <span>{opis}</span>
          </>
        )}
      </div>
    </div>
  )
}

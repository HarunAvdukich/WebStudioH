import { useCallback, useRef } from 'react'
import { useKaci, useScena } from '../../lib/scena.js'
import { stanjeRuke } from '../../lib/scene/ruka.js'
import { ZnakPetlja } from '../pocetna/Znak.jsx'

const IKONE = {
  dizajn: (
    <>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </>
  ),
  kod: <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />,
  server: (
    <>
      <rect x="2" y="3" width="20" height="7" rx="2" />
      <rect x="2" y="14" width="20" height="7" rx="2" />
      <path d="M6 6.5h.01M6 17.5h.01" />
    </>
  ),
  alat: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
}

// Veliki trenutak O Hunaru, "Iz jedne ruke": četiri kartice (dizajner, programer, hosting,
// održavanje) sa prebacivanjem između, pa se skupe u špil i pretvore u jednu karticu. Na
// širokom ekranu je zakačena scena; na telefonu se kartice slažu jedna na drugu dok skrolate.
export default function IzJedneRuke({ t }) {
  const kaci = useKaci()
  const dio = useRef(null)

  const crtaj = useCallback((p) => {
    const el = dio.current
    if (!el) return
    const s = stanjeRuke(p)
    el.dataset.naslov = s.naslov
    el.style.setProperty('--razmak', s.razmak.toFixed(3))
    el.style.setProperty('--strelice', s.strelice.toFixed(3))
    el.style.setProperty('--jedna', s.jedna.toFixed(3))
    el.querySelectorAll('.ir__k').forEach((k, i) => {
      k.style.opacity = s.kartice[i].vidljivost
      k.style.setProperty('--nagib', `${s.kartice[i].nagib.toFixed(2)}deg`)
      k.style.setProperty('--pomak', `${s.kartice[i].pomak.toFixed(1)}px`)
    })
    el.querySelectorAll('.ir__jedna li').forEach((li, i) => li.classList.toggle('je-gotovo', s.stavke[i]))
  }, [])
  useScena(dio, crtaj, kaci)

  const kartice = t.kartice.map((k, i) => (
    <div className="ir__k" key={k.ime} style={{ '--i': i }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {IKONE[k.ikona]}
      </svg>
      <b>{k.ime}</b>
      <small>{k.opis}</small>
      {i < t.izmedju.length && (
        <span className="ir__str" aria-hidden="true">
          {t.izmedju[i]}
        </span>
      )}
    </div>
  ))

  const jedna = (
    <div className="ir__jedna">
      <svg viewBox="0 0 170 124" aria-hidden="true">
        <ZnakPetlja />
      </svg>
      <b>{t.jedna.naslov}</b>
      <p>{t.jedna.opis}</p>
      <ul>
        {t.jedna.stavke.map((x) => (
          <li key={x} className={kaci ? undefined : 'je-gotovo'}>
            {x}
            <span aria-hidden="true"> ✓</span>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <section className={`ir${kaci ? ' je-scena' : ''}`} ref={dio} data-naslov="obicno">
      <div className="ir__ekran">
        <div className="ir__naslov">
          <p className="st-nad">
            <span className="ir__b1">{t.obicno.nad}</span>
            <span className="ir__b2">{t.kodNas.nad}</span>
          </p>
          <h2>
            <span className="ir__b1">{t.obicno.naslov}</span>
            <span className="ir__b2">{t.kodNas.naslov}</span>
          </h2>
        </div>
        <div className="ir__scena">
          {kartice}
          {jedna}
        </div>
      </div>
    </section>
  )
}

import { useCallback, useRef, useState } from 'react'
import { stanjeRazgovora } from '../../lib/scene/razgovor.js'
import { useKaci, useScena } from '../../lib/scena.js'
import { ZnakPetlja } from '../pocetna/Znak.jsx'
import { DioNaslov } from '../stranica/dijelovi.jsx'

// Veliki trenutak Cijena, "Razgovor": kako nastaje ponuda, ispričano kao razgovor. Na širokom
// ekranu je zakačena scena (lijevo koraci, desno telefon), a poruke stižu skrolom, sa "piše"
// prije našeg odgovora. Na telefonu i bez JavaScripta razgovor teče preko cijele širine, a
// koraci stoje između poruka. Jasno piše da je to primjer.

function Poruka({ p, ...ostalo }) {
  if (p.dokument)
    return (
      <div className={`rz__m rz__m--${p.od} rz__m--dok`} {...ostalo}>
        <i aria-hidden="true" />
        <span>
          {p.dokument.ime}
          <small>{p.dokument.opis}</small>
        </span>
      </div>
    )
  return (
    <div className={`rz__m rz__m--${p.od}`} {...ostalo}>
      {p.tekst}
    </div>
  )
}

function Tok({ t }) {
  return (
    <section className="st-dio rz rz--tok">
      <div className="st-sirina">
        <DioNaslov nad={t.nad} naslov={t.naslov} />
        <div className="rz__tok">
          {t.koraci.map((k, i) => (
            <div className="rz__blok" key={i}>
              <div className="rz__korak" data-pokret="pojavi">
                <b>{i + 1}</b>
                <span>
                  <strong>{k.naslov}</strong> {k.opis}
                </span>
              </div>
              {t.poruke
                .filter((p) => p.korak === i)
                .map((p, j) => (
                  <Poruka key={j} p={p} data-pokret="pojavi" />
                ))}
            </div>
          ))}
        </div>
        <p className="rz__oznaka">{t.oznaka}</p>
      </div>
    </section>
  )
}

export default function Razgovor({ t }) {
  const kaci = useKaci()
  const dio = useRef(null)
  const [st, setSt] = useState(() => stanjeRazgovora(1, t.poruke))

  const crtaj = useCallback(
    (p) => {
      const s = stanjeRazgovora(p, t.poruke)
      setSt((prije) => (prije.vidljive === s.vidljive && prije.pise === s.pise && prije.korak === s.korak ? prije : s))
    },
    [t],
  )
  useScena(dio, crtaj, kaci)

  if (!kaci) return <Tok t={t} />

  return (
    <section className="rz rz--scena" ref={dio}>
      <div className="rz__ekran">
        <div className="rz__lijevo">
          <p className="st-nad">{t.nad}</p>
          <h2 className="rz__naslov">{t.naslov}</h2>
          <ol className="rz__koraci">
            {t.koraci.map((k, i) => (
              <li key={i} className={i === st.korak ? 'je-sad' : i < st.korak ? 'je-bilo' : undefined}>
                <b>{i + 1}</b>
                <span>
                  {k.naslov}
                  <small>{k.opis}</small>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="rz__desno">
          <div className="rz__tel">
            <div className="rz__zag">
              <svg viewBox="0 0 170 124" aria-hidden="true">
                <ZnakPetlja boja="#19B07E" />
              </svg>
              <span>
                <b>{t.kontakt.ime}</b>
                <small>{st.pise ? `${t.pise}…` : t.kontakt.status}</small>
              </span>
            </div>
            <div className="rz__poruke" aria-live="polite">
              {t.poruke.slice(0, st.vidljive).map((p, i) => (
                <Poruka key={i} p={p} />
              ))}
              {st.pise && (
                <div className="rz__pise" aria-label={t.pise}>
                  <i />
                  <i />
                  <i />
                </div>
              )}
            </div>
          </div>
          <p className="rz__oznaka">{t.oznaka}</p>
        </div>
      </div>
    </section>
  )
}

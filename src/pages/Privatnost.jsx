import { Fragment, useRef } from 'react'
import Seo from '../components/Seo.jsx'
import Citanje from '../components/stranica/Citanje.jsx'
import { contact } from '../data.js'
import { idOd } from '../lib/idOd.js'
import { PAROVI } from '../lib/jezik.js'
import '../components/stranica/stranica.css'
import '../components/savjeti/savjeti.css'

// {email} u tekstu postaje link na mail.
function SaMailom({ tekst }) {
  const dijelovi = tekst.split('{email}')
  return dijelovi.map((d, i) => (
    <Fragment key={i}>
      {d}
      {i < dijelovi.length - 1 && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
    </Fragment>
  ))
}

// Politika privatnosti (/politika-privatnosti i /en/privacy): napredak čitanja, naslovi
// dijelova izranjaju.
export default function Privatnost({ t }) {
  const ref = useRef(null)
  const naslovi = t.dijelovi.map((d) => ({ id: idOd(d.naslov), tekst: d.naslov }))
  return (
    <div className="st st-privatnost">
      <Seo
        punNaslov={t.seo.naslov}
        description={t.seo.opis}
        path={t.put}
        jezik={t.jezik}
        verzije={[
          { jezik: 'bs', path: '/politika-privatnosti' },
          { jezik: 'en', path: PAROVI['/politika-privatnosti'] },
        ]}
      />
      <Citanje clanak={ref} naslovi={naslovi} minuta={2} t={t.citanje} />
      <header className="cl-vrh">
        <div className="st-vrh__sjaj" aria-hidden="true" />
        <div className="st-sirina cl-vrh__in">
          <p className="st-nad">{t.vrh.nad}</p>
          <h1 className="st-h1 cl-vrh__h1">{t.vrh.naslov}</h1>
          <p className="st-uvod cl-vrh__uvod">{t.vrh.uvod}</p>
          <p className="cl-vrh__meta">{t.vrh.azurirano}</p>
        </div>
      </header>
      <section className="st-tekst-dio">
        <div className="st-sirina">
          <article className="st-tekst" ref={ref}>
            {t.dijelovi.map((d, i) => (
              <Fragment key={d.naslov}>
                <h2 id={naslovi[i].id} data-pokret="izroni">
                  {d.naslov}
                </h2>
                {d.p?.map((x) => (
                  <p key={x}>
                    <SaMailom tekst={x} />
                  </p>
                ))}
                {d.ul && (
                  <ul>
                    {d.ul.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                )}
              </Fragment>
            ))}
          </article>
        </div>
      </section>
    </div>
  )
}

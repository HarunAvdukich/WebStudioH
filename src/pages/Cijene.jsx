import { useState } from 'react'
import Seo from '../components/Seo.jsx'
import { Vrh, DioNaslov, Mjerac, CestaPitanja } from '../components/stranica/dijelovi.jsx'
import ZavrsniPoziv from '../components/stranica/ZavrsniPoziv.jsx'
import Razgovor from '../components/cijene/Razgovor.jsx'
import { PAROVI } from '../lib/jezik.js'
import '../components/stranica/stranica.css'
import '../components/cijene/cijene.css'

// Kartica koja se okrene (36): naprijed ime, pozadi šta dobijate. Pod mišem, fokusom ili dodirom.
function Kartica({ k, i, okreni, bilo, rok }) {
  const [okrenuta, setOkrenuta] = useState(false)
  return (
    <div className="fk-mjesto" data-pokret="pojavi" style={{ '--i': i }}>
      <button type="button" className={`fk${okrenuta ? ' je-okrenuta' : ''}`} aria-pressed={okrenuta} onClick={() => setOkrenuta((o) => !o)}>
        <span className="fk__in">
          <span className="fk__s fk__s--pr">
            <span className="fk__br">
              {String(i + 1).padStart(2, '0')}
              {k.paket && <span className="fk__paket">{k.paket}</span>}
            </span>
            <b>{k.ime}</b>
            {k.cijena && (
              <span className={`fk__cijena${k.cijena.bilo ? '' : ' fk__cijena--dogovor'}`}>
                <strong>{k.cijena.od}</strong>
                {k.cijena.bilo && (
                  <span className="fk__bilo">
                    <span className="sr-only">{bilo} </span>
                    <s>{k.cijena.bilo}</s>
                  </span>
                )}
              </span>
            )}
            {k.cijena?.bilo && <span className="fk__rok">{rok}</span>}
            <small>
              {okreni}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5" />
              </svg>
            </small>
          </span>
          <span className="fk__s fk__s--za">
            <b>{k.ime}</b>
            <span>{k.opis}</span>
            {k.cijena && <strong className="fk__cijena-za">{k.cijena.od}</strong>}
          </span>
        </span>
      </button>
    </div>
  )
}

export default function Cijene({ t }) {
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: t.jezik,
    mainEntity: t.pitanja.lista.map((x) => ({ '@type': 'Question', name: x.p, acceptedAnswer: { '@type': 'Answer', text: x.o } })),
  }
  return (
    <div className="st st-cijene">
      <Seo
        punNaslov={t.seo.naslov}
        description={t.seo.opis}
        path={t.put}
        jezik={t.jezik}
        verzije={[
          { jezik: 'bs', path: '/cijene' },
          { jezik: 'en', path: PAROVI['/cijene'] },
        ]}
        podaci={[faq]}
      />
      <Vrh nad={t.vrh.nad} naslov={t.vrh.naslov} uvod={t.vrh.uvod} />

      <Razgovor t={t.razgovor} />

      <section className="st-dio ci-narudzba">
        <div className="st-sirina">
          <DioNaslov nad={t.narudzba.nad} naslov={t.narudzba.naslov} />
          {t.narudzba.akcija && (
            <p className="ci-akcija">
              <b>{t.narudzba.akcija.oznaka}</b>
              <span>{t.narudzba.akcija.tekst}</span>
            </p>
          )}
          <div className="ci-kartice">
            {t.narudzba.kartice.map((k, i) => (
              <Kartica key={k.ime} k={k} i={i} okreni={t.narudzba.okreni} bilo={t.narudzba.bilo} rok={t.narudzba.rok} />
            ))}
          </div>
        </div>
      </section>

      {t.plus && (
        <section className="st-dio ci-plus">
          <div className="st-sirina">
            <DioNaslov nad={t.plus.nad} naslov={t.plus.naslov} uvod={t.plus.uvod} />
            <div className="ci-plus__lista">
              {t.plus.paketi.map((p, i) => (
                <article key={p.ime} className="ci-plus__kartica" data-pokret="pojavi" style={{ '--i': i }}>
                  <span className="ci-plus__oznaka">{t.plus.oznaka}</span>
                  <h3>{p.ime}</h3>
                  <strong className="ci-plus__cijena">{p.cijena}</strong>
                  <p className="ci-plus__sve">{t.plus.sve}</p>
                  <ul>
                    {p.stavke.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="st-dio ci-odrzavanje">
        <div className="st-sirina ci-odrzavanje__in">
          <div>
            <DioNaslov nad={t.odrzavanje.nad} naslov={t.odrzavanje.naslov} uvod={t.odrzavanje.opis} />
          </div>
          <Mjerac {...t.odrzavanje.mjerac} />
        </div>
      </section>

      <section className="st-dio ci-pitanja">
        <div className="st-sirina ci-pitanja__in">
          <DioNaslov nad={t.pitanja.nad} naslov={t.pitanja.naslov} />
          <CestaPitanja lista={t.pitanja.lista} />
        </div>
      </section>

      <ZavrsniPoziv {...t.poziv} />
    </div>
  )
}

import { useMemo, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { mrvice } from '../components/JsonLd.jsx'
import { DioNaslov, Kvacice, Mjerac } from '../components/stranica/dijelovi.jsx'
import Citanje from '../components/stranica/Citanje.jsx'
import ZavrsniPoziv from '../components/stranica/ZavrsniPoziv.jsx'
import GalerijaSnimaka from '../components/radovi/GalerijaSnimaka.jsx'
import IgraOlx from '../components/igre/IgraOlx.jsx'
import IgraTermin from '../components/igre/IgraTermin.jsx'
import NotFound from './NotFound.jsx'
import { pricaRada } from '../radovi.js'
import { formatBroj } from '../lib/pokreti/racun.js'
import { popuni } from '../lib/whatsapp.js'
import * as uslugeBs from '../stranice/usluge.js'
import * as uslugeEn from '../stranice/usluge.en.js'
import '../components/stranica/stranica.css'
import '../components/igre/igre.css'
import '../components/radovi/radovi.css'
import '../components/radovi/studija.css'

// Studija slučaja (/radovi/<slug> i /en/work/<slug>): vrh sa snimkom koji se otkrije, šta smo
// napravili, brojke sa datumom i mjerač, duga priča sa napretkom čitanja i oznakom dijela,
// snimci u galeriji sa lupom, igra (OLX veza ili termin), riječi klijenta i završni poziv.
export default function Studija({ t }) {
  const { slug } = useParams()
  const clanak = useRef(null)
  const r = t.radovi.find((x) => x.slug === slug)
  const prica = useMemo(() => pricaRada(slug, t.jezik), [slug, t.jezik])
  if (!r) return <NotFound />

  const en = t.jezik === 'en'
  const svi = en ? '/en/work' : '/radovi'
  const igre = (en ? uslugeEn : uslugeBs).igre
  const s = t.studija

  return (
    <div className="st st-studija">
      <Seo
        punNaslov={r.seo.naslov}
        description={r.seo.opis}
        path={`${svi}/${slug}`}
        jezik={t.jezik}
        tip="article"
        verzije={[
          { jezik: 'bs', path: `/radovi/${slug}` },
          { jezik: 'en', path: `/en/work/${slug}` },
        ]}
        podaci={[
          mrvice([
            { ime: s.mrvice.pocetna, path: en ? '/en' : '/' },
            { ime: s.mrvice.radovi, path: svi },
            { ime: r.ime, path: `${svi}/${slug}` },
          ]),
        ]}
      />
      {prica.naslovi.length > 0 && <Citanje clanak={clanak} naslovi={prica.naslovi} minuta={prica.minuta} t={s} />}

      <header className="sd-vrh">
        <div className="st-vrh__sjaj" aria-hidden="true" />
        <div className="st-sirina sd-vrh__in">
          <nav className="sd-mrvice" aria-label={s.mrvice.radovi}>
            <Link to={svi}>← {s.svi}</Link>
          </nav>
          <p className="st-nad">{r.oznaka}</p>
          <h1 className="st-h1 sd-vrh__h1">{r.naslov}</h1>
          <div className="st-vrh__dno">
            <p className="st-uvod">{r.uvod}</p>
            {r.url && (
              <p className="sd-vrh__linkovi">
                <a className="ok-dugme ok-dugme--malo" href={r.url} target="_blank" rel="noopener">
                  {popuni(s.otvori, { ime: r.ime })} ↗
                </a>
              </p>
            )}
            {r.uIzradi && <span className="vg__izrada">{r.uIzradi}</span>}
          </div>
          {r.slika && (
            <div className="sd-vrh__slika" data-pokret="otkrij">
              <img src={r.slika.src} width={r.slika.width} height={r.slika.height} alt={r.slika.alt} loading="lazy" decoding="async" />
            </div>
          )}
        </div>
      </header>

      <section className="st-dio sd-napravili">
        <div className="st-sirina sd-napravili__in">
          <div>
            <DioNaslov nad={s.napravili} naslov={r.ime} />
            <Kvacice stavke={r.napravili} />
          </div>
          {r.brojke && (
            <div className="sd-brojke">
              <p className="st-nad">{s.brojke}</p>
              <dl className="vg__brojke">
                {r.brojke.map((b) => (
                  <div key={b.opis}>
                    <dt data-pokret="broji" data-do={b.do} data-poslije={b.poslije || undefined}>
                      {formatBroj(b.do, t.jezik)}
                      {b.poslije}
                    </dt>
                    <dd>
                      {b.opis}
                      <small>{b.datum}</small>
                    </dd>
                  </div>
                ))}
              </dl>
              {r.mjerac && <Mjerac {...r.mjerac} mali />}
            </div>
          )}
        </div>
      </section>

      {prica.html && (
        <section className="sd-prica-dio">
          <div className="st-sirina">
            <article className="sd-prica" ref={clanak} dangerouslySetInnerHTML={{ __html: prica.html }} />
          </div>
        </section>
      )}

      {r.snimci && (
        <section className="st-dio sd-snimci">
          <div className="st-sirina">
            <DioNaslov nad={s.snimci} naslov={r.snimciNaslov} />
          </div>
          <div className="sd-snimci__traka">
            <GalerijaSnimaka snimci={[{ ...r.slika, siroka: true, opis: r.ime }, ...r.snimci]} opis={r.snimciOpis} t={s} />
          </div>
        </section>
      )}

      {r.igra && (
        <section className="st-dio sd-igra">
          <div className="st-sirina sd-igra__in">
            <DioNaslov nad={s.probajte} naslov={igre[r.igra].naslov} />
            <div className="us-igra">
              {r.igra === 'olx' ? <IgraOlx t={igre.olx} /> : <IgraTermin t={igre.termin} />}
              <p className="us-igra__napomena">{igre[r.igra].napomena}</p>
            </div>
          </div>
        </section>
      )}

      {r.citat && (
        <section className="st-dio sd-citat">
          <div className="st-sirina">
            <p className="st-nad">{s.klijent}</p>
            <blockquote>
              <p data-pokret="pali">„{r.citat.tekst}“</p>
              <cite>{r.citat.ko}</cite>
            </blockquote>
          </div>
        </section>
      )}

      <ZavrsniPoziv nad={s.nad} naslov={r.poziv.naslov} opis={r.poziv.opis} dugme={s.dugme} ili={s.ili} />
    </div>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { mrvice, usluga } from '../components/JsonLd.jsx'
import { Vrh, DioNaslov, Kvacice, CestaPitanja } from '../components/stranica/dijelovi.jsx'
import ZavrsniPoziv from '../components/stranica/ZavrsniPoziv.jsx'
import SkicaOdmah from '../components/skica/SkicaOdmah.jsx'
import SkicaObrazac from '../components/skica/SkicaObrazac.jsx'
import * as t from '../stranice/skica.js'
import '../components/stranica/stranica.css'
import '../components/olx/olx.css'
import '../components/kontakt/kontakt.css'
import '../components/skica/skica.css'

// Besplatna skica (/skica): osnovna skica odmah iz šablona, pa forma za skicu po mjeri.
// Na nju vode dugmad "Besplatna skica" sa početne, meni i reklame.
export default function Skica() {
  const [pocetno, setPocetno] = useState({})
  const naSkicu = (p) => {
    const vrsta = t.odmah.vrste.find((v) => v.v === p.vrsta)
    setPocetno({ ime: p.ime.trim(), grad: p.grad.trim(), djelatnost: vrsta?.ime || '' })
  }

  return (
    <div className="st st-olx st-skica">
      <Seo
        punNaslov={t.seo.naslov}
        description={t.seo.opis}
        path={t.put}
        podaci={[
          usluga({ path: t.put, naziv: 'Besplatna skica stranice', opis: t.seo.opis }),
          mrvice([
            { ime: 'Početna', path: '/' },
            { ime: 'Besplatna skica', path: t.put },
          ]),
        ]}
      />

      <Vrh nad={t.vrh.nad} naslov={t.vrh.naslov}>
        <div className="ox-vrh">
          <p className="st-uvod">{t.vrh.uvod}</p>
          <div className="ox-vrh__dugmad">
            <a className="ok-dugme" href="#odmah">
              {t.vrh.probaj}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </a>
            <a className="ox-link" href="#forma">
              {t.vrh.trazi}
            </a>
          </div>
        </div>
      </Vrh>

      <section className="st-dio sk-odmah-dio" id="odmah">
        <div className="st-sirina">
          <DioNaslov nad={t.odmah.nad} naslov={t.odmah.naslov} uvod={t.odmah.uvod} />
          <SkicaOdmah t={t.odmah} sablon={t.sablon} onSkica={naSkicu} />
        </div>
      </section>

      <section className="st-dio sk-razlika-dio">
        <div className="st-sirina">
          <DioNaslov nad={t.razlika.nad} naslov={t.razlika.naslov} />
          <div className="sk-razlika">
            <div className="sk-razlika__k" data-pokret="pojavi">
              <h3>{t.razlika.osnovna.naslov}</h3>
              <Kvacice stavke={t.razlika.osnovna.stavke} />
            </div>
            <div className="sk-razlika__k sk-razlika__k--mjera" data-pokret="pojavi" style={{ '--i': 1 }}>
              <p className="st-nad">{t.razlika.mjera.nad}</p>
              <h3>{t.razlika.mjera.naslov}</h3>
              <Kvacice stavke={t.razlika.mjera.stavke} />
              <a className="ok-dugme" href="#forma">
                {t.vrh.trazi}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="st-dio ox-koraci-dio">
        <div className="st-sirina">
          <DioNaslov nad={t.koraci.nad} naslov={t.koraci.naslov} />
          <ol className="ox-koraci">
            {t.koraci.lista.map((k, i) => (
              <li key={k.naslov} data-pokret="pojavi" style={{ '--i': i }}>
                <span className="ox-koraci__br" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{k.naslov}</h3>
                <p>{k.opis}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="st-dio kt-obrazac" id="forma">
        <div className="st-sirina kt-obrazac__in">
          <DioNaslov nad={t.obrazac.nad} naslov={t.obrazac.naslov} uvod={t.obrazac.uvod} />
          <SkicaObrazac key={JSON.stringify(pocetno)} t={t.obrazac} pocetno={pocetno} />
        </div>
      </section>

      <section className="st-dio ox-pitanja-dio">
        <div className="st-sirina ox-dva">
          <div>
            <DioNaslov nad={t.pitanja.nad} naslov={t.pitanja.naslov} />
            <nav className="ox-vise" aria-label={t.vise.nad}>
              <p className="st-nad">{t.vise.nad}</p>
              {t.vise.linkovi.map((l) => (
                <Link key={l.put} to={l.put} className="ox-link">
                  {l.tekst}
                </Link>
              ))}
            </nav>
          </div>
          <CestaPitanja lista={t.pitanja.lista} />
        </div>
      </section>

      <ZavrsniPoziv {...t.poziv} />
    </div>
  )
}

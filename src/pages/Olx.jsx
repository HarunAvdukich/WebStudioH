import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { mrvice } from '../components/JsonLd.jsx'
import { Vrh, DioNaslov, Kvacice, CestaPitanja } from '../components/stranica/dijelovi.jsx'
import ZavrsniPoziv from '../components/stranica/ZavrsniPoziv.jsx'
import SnimakOlx from '../components/olx/SnimakOlx.jsx'
import IgraOlx from '../components/igre/IgraOlx.jsx'
import { formatBroj } from '../lib/pokreti/racun.js'
import { waLink } from '../lib/whatsapp.js'
import { igre } from '../stranice/usluge.js'
import * as t from '../stranice/olx.js'
import '../components/stranica/stranica.css'
import '../components/igre/igre.css'
import '../components/olx/olx.css'

// OLX veza (/olx): stranica na koju vode poruke OLX trgovinama. Vrh, snimak sa mrt.ba (video
// tek na klik), kako radi u tri koraka, šta dobijate sa brojkama, igra, pitanja i poziv.
export default function Olx() {
  return (
    <div className="st st-olx">
      <Seo
        punNaslov={t.seo.naslov}
        description={t.seo.opis}
        path={t.put}
        podaci={[
          mrvice([
            { ime: 'Početna', path: '/' },
            { ime: 'OLX veza', path: t.put },
          ]),
        ]}
      />

      <Vrh nad={t.vrh.nad} naslov={t.vrh.naslov}>
        <div className="ox-vrh">
          <p className="st-uvod">{t.vrh.uvod}</p>
          <div className="ox-vrh__dugmad">
            <a className="ok-dugme" href="#snimak">
              {t.vrh.snimak}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </a>
            <a className="ox-link" href={waLink(t.poziv.poruka)} target="_blank" rel="noopener">
              {t.vrh.pitaj}
            </a>
          </div>
        </div>
      </Vrh>

      <section className="st-dio ox-snimak-dio" id="snimak">
        <div className="st-sirina ox-dva">
          <DioNaslov nad={t.snimak.nad} naslov={t.snimak.naslov} uvod={t.snimak.uvod} />
          <SnimakOlx t={t.snimak} />
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

      <section className="st-dio ox-dobijate-dio">
        <div className="st-sirina ox-dva">
          <div>
            <DioNaslov nad={t.dobijate.nad} naslov={t.dobijate.naslov} />
            <Kvacice stavke={t.dobijate.stavke} />
          </div>
          <div className="ox-brojke">
            <p className="st-nad">{t.dobijate.brojkeNad}</p>
            <dl>
              {t.dobijate.brojke.map((b) => (
                <div key={b.opis}>
                  <dt data-pokret="broji" data-do={b.do} data-poslije={b.poslije || undefined}>
                    {formatBroj(b.do, 'bs')}
                    {b.poslije}
                  </dt>
                  <dd>
                    {b.opis}
                    <small>{b.datum}</small>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="st-dio ox-igra-dio">
        <div className="st-sirina ox-dva">
          <DioNaslov nad={igre.olx.nad} naslov={igre.olx.naslov} />
          <div className="ox-igra" data-pokret="pojavi">
            <IgraOlx t={igre.olx} />
            <p className="ox-igra__napomena">{t.igraNapomena}</p>
          </div>
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

import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { mrvice } from '../components/JsonLd.jsx'
import { Vrh, DioNaslov, Kvacice, CestaPitanja } from '../components/stranica/dijelovi.jsx'
import ZavrsniPoziv from '../components/stranica/ZavrsniPoziv.jsx'
import { waLink } from '../lib/whatsapp.js'
import * as t from '../stranice/zakazivanje.js'
import '../components/stranica/stranica.css'
import '../components/olx/olx.css'
import '../components/zakazivanje/zakazivanje.css'

// Zakazivanje (/zakazivanje): stranica za berbernice i frizerske salone, na koju vode poruke.
// Demo je statičan fajl (public/demo-berbernica.html), pa linkovi na njega idu bez zavjese.
export default function Zakazivanje() {
  return (
    <div className="st st-olx st-zak">
      <Seo
        punNaslov={t.seo.naslov}
        description={t.seo.opis}
        path={t.put}
        podaci={[
          mrvice([
            { ime: 'Početna', path: '/' },
            { ime: 'Zakazivanje termina', path: t.put },
          ]),
        ]}
      />

      <Vrh nad={t.vrh.nad} naslov={t.vrh.naslov}>
        <div className="ox-vrh">
          <p className="st-uvod">{t.vrh.uvod}</p>
          <div className="ox-vrh__dugmad">
            <a className="ok-dugme" href={t.demo} data-bez-zavjese>
              {t.vrh.demo}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a className="ox-link" href={waLink(t.poziv.poruka)} target="_blank" rel="noopener">
              {t.vrh.pitaj}
            </a>
          </div>
        </div>
      </Vrh>

      <section className="st-dio zk-demo-dio" id="demo">
        <div className="st-sirina">
          <DioNaslov nad={t.probajte.nad} naslov={t.probajte.naslov} uvod={t.probajte.uvod} />
          <ul className="zk-kartice">
            {t.probajte.dijelovi.map((d, i) => (
              <li key={d.naslov} data-pokret="pojavi" style={{ '--i': i }}>
                <h3>{d.naslov}</h3>
                <p>{d.opis}</p>
                <a className="ox-link" href={t.demo + d.put} data-bez-zavjese>
                  {d.link}
                </a>
              </li>
            ))}
          </ul>
          <div className="zk-izgledi">
            <p className="st-nad">{t.probajte.izgledi.nad}</p>
            <div>
              {t.probajte.izgledi.lista.map((iz) => (
                <a key={iz.izgled} href={`${t.demo}?izgled=${iz.izgled}`} data-bez-zavjese>
                  {iz.ime}
                </a>
              ))}
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

      <section className="st-dio ox-dobijate-dio">
        <div className="st-sirina ox-dva">
          <div>
            <DioNaslov nad={t.dobijate.nad} naslov={t.dobijate.naslov} />
            <Kvacice stavke={t.dobijate.stavke} />
          </div>
          <div className="ox-brojke zk-dokaz">
            <p className="st-nad">{t.dobijate.dokaz.nad}</p>
            <h3>{t.dobijate.dokaz.naslov}</h3>
            <p>{t.dobijate.dokaz.opis}</p>
            <Link to={t.dobijate.dokaz.put} className="ox-link">
              {t.dobijate.dokaz.link}
            </Link>
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

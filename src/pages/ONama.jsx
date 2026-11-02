import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { oFirmi } from '../components/JsonLd.jsx'
import { DioNaslov, Mjerac } from '../components/stranica/dijelovi.jsx'
import Trake from '../components/stranica/Trake.jsx'
import ZavrsniPoziv from '../components/stranica/ZavrsniPoziv.jsx'
import TekstOkoZnaka from '../components/okvir/TekstOkoZnaka.jsx'
import PodebljanaSlova from '../components/onama/PodebljanaSlova.jsx'
import IzJedneRuke from '../components/onama/IzJedneRuke.jsx'
import { PAROVI } from '../lib/jezik.js'
import '../components/stranica/stranica.css'
import '../components/onama/onama.css'

// O Hunaru (/o-nama i /en/about): naslov čija se slova podebljaju pod mišem, veliki trenutak
// "Iz jedne ruke", znak sa tekstom oko njega, četiri pravila rada, činjenice o firmi ("Ukratko"),
// trake i završni poziv.
// Bez imena, lica i broja ljudi (PRODUCT.md).
export default function ONama({ t }) {
  return (
    <div className="st st-onama">
      <Seo
        punNaslov={t.seo.naslov}
        description={t.seo.opis}
        path={t.put}
        jezik={t.jezik}
        verzije={[
          { jezik: 'bs', path: '/o-nama' },
          { jezik: 'en', path: PAROVI['/o-nama'] },
        ]}
        podaci={[oFirmi({ path: t.put, naslov: t.seo.naslov, opis: t.seo.opis, jezik: t.jezik })]}
      />
      <header className="st-vrh on-vrh">
        <div className="st-vrh__sjaj" aria-hidden="true" />
        <div className="st-sirina st-vrh__in">
          <p className="st-nad">{t.vrh.nad}</p>
          <PodebljanaSlova tekst={t.vrh.naslov} className="st-h1 on-h1" />
          <div className="st-vrh__dno">
            <p className="st-uvod">{t.vrh.uvod}</p>
            <p className="st-uvod">{t.vrh.uvod2}</p>
          </div>
        </div>
      </header>

      <IzJedneRuke t={t.ruka} />

      <section className="st-dio on-znak">
        <div className="st-sirina on-znak__in">
          <TekstOkoZnaka className="on-znak__svg" />
          <div>
            <p className="st-nad">{t.znak.nad}</p>
            <p className="on-znak__recenica" data-pokret="pali">
              {t.znak.recenica}
            </p>
          </div>
        </div>
      </section>

      <section className="st-dio on-kako">
        <div className="st-sirina">
          <DioNaslov nad={t.kako.nad} naslov={t.kako.naslov} />
          <div className="on-kako__mreza">
            {t.kako.pravila.map((p, i) => (
              <div key={p.naslov} data-pokret="pojavi" style={{ '--i': i }}>
                <div className="on-k" data-nagib="5">
                  <span className="on-k__br">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{p.naslov}</h3>
                  <p>{p.opis}</p>
                  {p.mjerac && <Mjerac {...t.kako.mjerac} mali />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="st-dio on-ukratko">
        <div className="st-sirina">
          <DioNaslov nad={t.ukratko.nad} naslov={t.ukratko.naslov} />
          <dl className="on-u">
            {t.ukratko.stavke.map((s, i) => (
              <div key={s.pojam} className="on-u__red" data-pokret="pojavi" style={{ '--i': i }}>
                <dt>{s.pojam}</dt>
                <dd>
                  {s.opis.map((d, j) =>
                    typeof d === 'string' ? (
                      d
                    ) : d.put ? (
                      <Link key={j} to={d.put}>
                        {d.tekst}
                      </Link>
                    ) : (
                      <a key={j} href={d.href}>
                        {d.tekst}
                      </a>
                    ),
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Trake redovi={t.trake} />

      <ZavrsniPoziv {...t.poziv} />
    </div>
  )
}

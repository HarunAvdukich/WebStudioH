import { useCallback, useEffect, useRef, useState } from 'react'
import Seo from '../components/Seo.jsx'
import { ZnakPetlja } from '../components/pocetna/Znak.jsx'
import { whatsappLink } from '../okvir.js'
import { obracuni, daniOdDo, zbirPerioda, jeDatum } from '../lib/period.js'
import * as t from '../stranice/sati.js'
import '../components/sati/sati.css'

// Skrivena evidencija rada (/sati#k=<ključ>). Ključ iz linka ide funkciji /api/sati, koja vrati
// pogled za tu ulogu: vlasnik vidi sve, klijent samo radno vrijeme i teme. Bez ključa nema podataka.
// Izabrani period stoji u adresi (#k=...&od=GGGG-MM-DD&do=GGGG-MM-DD), pa se link može sačuvati.
function parametri() {
  const p = new URLSearchParams(window.location.hash.slice(1))
  return { kljuc: p.get('k') || '', od: p.get('od'), do: p.get('do') }
}

function upisiPeriod(period) {
  const p = new URLSearchParams(window.location.hash.slice(1))
  if (period) {
    p.set('od', period.od)
    p.set('do', period.do)
  } else {
    p.delete('od')
    p.delete('do')
  }
  // replaceState ne okida hashchange, pa se podaci ne učitavaju ponovo.
  history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${p}`)
}

const zadnjiDan = (kljuc) => {
  const [g, m] = kljuc.split('-').map(Number)
  return `${kljuc}-${String(new Date(g, m, 0).getDate()).padStart(2, '0')}`
}

export default function Sati() {
  const [stanje, setStanje] = useState({ faza: 'ucitava' })
  const [odabran, setOdabran] = useState(null) // 'GGGG-MM' ili 'period'
  const [period, setPeriod] = useState(null)
  const ucitaniKljuc = useRef(null)

  const ucitaj = useCallback(async (prisilno = false) => {
    const { kljuc, od, do: doDana } = parametri()
    if (jeDatum(od) && jeDatum(doDana)) {
      setPeriod({ od, do: doDana })
      setOdabran('period')
    }
    if (!kljuc) {
      ucitaniKljuc.current = null
      setStanje({ faza: 'bezKljuca' })
      return
    }
    if (kljuc === ucitaniKljuc.current && !prisilno) return // promijenio se samo period u adresi
    setStanje({ faza: 'ucitava' })
    try {
      const r = await fetch('/api/sati', { headers: { Authorization: `Bearer ${kljuc}` }, cache: 'no-store' })
      if (r.status === 401) return setStanje({ faza: 'odbijen' })
      if (r.status === 404) return setStanje({ faza: 'prazno' })
      if (!r.ok) throw new Error(String(r.status))
      const podaci = await r.json()
      ucitaniKljuc.current = kljuc
      setStanje(podaci.mjeseci?.length ? { faza: 'spremno', podaci } : { faza: 'prazno' })
    } catch {
      ucitaniKljuc.current = null
      setStanje({ faza: 'greska' })
    }
  }, [])

  useEffect(() => {
    ucitaj()
    const promjena = () => ucitaj()
    window.addEventListener('hashchange', promjena)
    return () => window.removeEventListener('hashchange', promjena)
  }, [ucitaj])

  const izaberiMjesec = (kljuc) => {
    setOdabran(kljuc)
    upisiPeriod(null)
  }
  const izaberiPeriod = (p) => {
    setPeriod(p)
    setOdabran('period')
    upisiPeriod(p)
  }

  const podaci = stanje.podaci
  const vlasnik = podaci?.uloga === 'vlasnik'
  const naPeriodu = odabran === 'period' && period
  const mjesec = podaci && !naPeriodu && (podaci.mjeseci.find((m) => m.kljuc === odabran) || podaci.mjeseci[0])

  return (
    <div className="sati">
      <Seo title={t.seo.naslov} description={t.seo.opis} noindex />
      <header className="sati__vrh">
        <a className="sati__znak" href="/" aria-label="Hunar, početna">
          <svg viewBox="0 0 170 124" aria-hidden="true">
            <ZnakPetlja />
          </svg>
          <span>Hunar</span>
        </a>
        {podaci && (
          <p className="sati__azurirano">
            {t.azurirano} {t.vrijemeAzuriranja(podaci.azurirano)}
          </p>
        )}
      </header>

      {stanje.faza === 'ucitava' && <Ucitava />}
      {t.stanja[stanje.faza] && <Poruka faza={stanje.faza} ponovo={() => ucitaj(true)} />}

      {stanje.faza === 'spremno' && (
        <>
          <h1 className="sati__naslov">{t.naslov(podaci.projekat)}</h1>
          <nav className="sati__mjeseci" aria-label={t.mjeseciOznaka}>
            {/* Period stoji prvi, da se na telefonu vidi bez klizanja reda. */}
            <button
              type="button"
              className="sati__mjesec-dugme"
              aria-pressed={Boolean(naPeriodu)}
              onClick={() => izaberiPeriod(period || obracuni().prosli)}
            >
              {t.periodDugme}
            </button>
            {podaci.mjeseci.map((m) => (
              <button
                key={m.kljuc}
                type="button"
                className="sati__mjesec-dugme"
                aria-pressed={!naPeriodu && m.kljuc === mjesec.kljuc}
                onClick={() => izaberiMjesec(m.kljuc)}
              >
                {t.mjesecNaziv(m.kljuc)}
              </button>
            ))}
          </nav>
          {naPeriodu ? (
            <>
              <BiracPerioda period={period} onChange={izaberiPeriod} />
              {period.od > period.do ? (
                <p className="sati__obavijest" role="alert">
                  {t.periodObrnut}
                </p>
              ) : (
                <Period key={`${period.od}-${period.do}`} mjeseci={podaci.mjeseci} period={period} vlasnik={vlasnik} />
              )}
            </>
          ) : (
            <Pregled
              key={mjesec.kljuc}
              oznaka={t.mjesecNaziv(mjesec.kljuc)}
              opis={t.mjesecLokativ(mjesec.kljuc)}
              zbir={mjesec}
              dani={mjesec.dani}
              raspon={daniOdDo(`${mjesec.kljuc}-01`, zadnjiDan(mjesec.kljuc))}
              vlasnik={vlasnik}
            />
          )}
          <p className="sati__napomena">{vlasnik ? t.napomena.vlasnik : t.napomena.klijent}</p>
        </>
      )}
    </div>
  )
}

// Obračun od 15. do 15. jednim dodirom, ili bilo koji raspon kroz polja Od i Do.
function BiracPerioda({ period, onChange }) {
  const { prosli, tekuci } = obracuni()
  const isti = (p) => p.od === period.od && p.do === period.do
  const promijeni = (polje) => (e) => {
    if (jeDatum(e.target.value)) onChange({ ...period, [polje]: e.target.value })
  }
  return (
    <div className="sati__period">
      <div className="sati__obracuni" role="group" aria-label={t.obracunOznaka}>
        {[
          ['prosli', prosli],
          ['tekuci', tekuci],
        ].map(([ime, p]) => (
          <button key={ime} type="button" className="sati__obracun" aria-pressed={isti(p)} onClick={() => onChange(p)}>
            <span className="sati__obracun-ime">{t.obracun[ime]}</span>
            <span className="sati__obracun-datumi">{t.kratkoOdDo(p)}</span>
          </button>
        ))}
      </div>
      <div className="sati__polja">
        <label className="sati__polje">
          <span>{t.polja.od}</span>
          <input type="date" value={period.od} max={period.do} onChange={promijeni('od')} />
        </label>
        <label className="sati__polje">
          <span>{t.polja.do}</span>
          <input type="date" value={period.do} min={period.od} onChange={promijeni('do')} />
        </label>
      </div>
    </div>
  )
}

function Period({ mjeseci, period, vlasnik }) {
  const zbir = zbirPerioda(mjeseci, period.od, period.do)
  return (
    <Pregled
      oznaka={t.kratkoOdDo(period)}
      opis={t.opisPerioda(period)}
      zbir={zbir}
      dani={zbir.dani}
      raspon={daniOdDo(period.od, period.do)}
      vlasnik={vlasnik}
    />
  )
}

function Pregled({ oznaka, opis, zbir, dani, raspon, vlasnik }) {
  return (
    <section className="sati__mjesec" aria-label={oznaka}>
      <p className="sati__zbir">
        <span className="sati__broj">{t.trajanje(zbir.radno)}</span>
        <span className="sati__zbir-tekst">
          {t.radnoVrijeme} {opis}
        </span>
      </p>
      <dl className="sati__brojke">
        <div>
          <dt>{t.oznake.sati}</dt>
          <dd>{t.decimalno(zbir.radno)}</dd>
        </div>
        <div>
          <dt>{t.oznake.dana}</dt>
          <dd>{zbir.dana}</dd>
        </div>
        {vlasnik && (
          <>
            <div className="sati__brojka-klijent">
              <dt>{t.oznake.klijent}</dt>
              <dd>{t.decimalno(zbir.klijent ?? zbir.radno)} h</dd>
            </div>
            <div>
              <dt>{t.oznake.claude}</dt>
              <dd>{t.trajanje(zbir.claude)}</dd>
            </div>
            <div>
              <dt>{t.oznake.poruke}</dt>
              <dd>{zbir.poruka}</dd>
            </div>
          </>
        )}
      </dl>
      {/* Za duge raspone stubići postanu tanji od piksela; tada ostaje samo lista. */}
      {raspon.length <= 93 && <Traka raspon={raspon} dani={dani} />}
      {dani.length > 0 ? (
        <ol className="sati__dani">
          {dani.map((d) => (
            <li key={d.datum} id={`dan-${d.datum}`} className="sati__dan">
              <div className="sati__dan-red">
                <span className="sati__datum">{t.dan(d.datum)}</span>
                <span className="sati__trajanje">{t.trajanje(d.radno)}</span>
              </div>
              {d.teme.length > 0 && <p className="sati__teme">{d.teme.join(' · ')}</p>}
              {vlasnik && (
                <p className="sati__detalji">
                  {d.od}-{d.do} · Claude {t.trajanje(d.claude)} · {t.poruka(d.poruka)}
                  {d.klijent != null && d.klijent !== d.radno && ` · za klijenta ${t.trajanje(d.klijent)}`}
                </p>
              )}
            </li>
          ))}
        </ol>
      ) : (
        <p className="sati__obavijest">{t.nemaRada}</p>
      )}
    </section>
  )
}

// Traka dana: jedan stubić za svaki dan raspona, visina je radno vrijeme tog dana. Lista ispod je
// ista informacija u tekstu, pa traka za čitač ekrana samo vodi na dan.
function Traka({ raspon, dani }) {
  const [aktivan, setAktivan] = useState(null)
  const poDatumu = new Map(dani.map((d) => [d.datum, d]))
  const najvise = Math.max(3600, ...dani.map((d) => d.radno))
  const stubovi = raspon.map((datum) => ({ datum, radno: poDatumu.get(datum)?.radno || 0 }))
  const opis = aktivan && `${t.dan(aktivan.datum)}: ${aktivan.radno ? t.trajanje(aktivan.radno) : 'bez rada'}`

  return (
    <div className="sati__traka-okvir">
      <p className="sati__traka-opis" aria-live="polite">
        {opis || t.traka}
      </p>
      <div className="sati__traka" role="group" aria-label={t.traka} onPointerLeave={() => setAktivan(null)}>
        {stubovi.map((d) => (
          <button
            key={d.datum}
            type="button"
            className={d.radno ? 'sati__stub' : 'sati__stub sati__stub--prazan'}
            disabled={!d.radno}
            aria-label={`${t.dan(d.datum)}: ${t.trajanje(d.radno)}`}
            onPointerEnter={() => setAktivan(d)}
            onFocus={() => setAktivan(d)}
            onBlur={() => setAktivan(null)}
            onClick={() => document.getElementById(`dan-${d.datum}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
          >
            <span style={{ '--v': d.radno ? Math.max(0.04, d.radno / najvise) : 0 }} />
          </button>
        ))}
      </div>
      <div className="sati__traka-ose" aria-hidden="true">
        <span>{t.kratkiDatum(raspon[0])}</span>
        <span>{t.kratkiDatum(raspon[raspon.length - 1])}</span>
      </div>
    </div>
  )
}

function Ucitava() {
  return (
    <div className="sati__ucitava" aria-busy="true" aria-label="Učitavam sate">
      <h1 className="sati__naslov">{t.naslov()}</h1>
      <span className="sati__kostur sati__kostur--broj" />
      <span className="sati__kostur sati__kostur--red" />
      <span className="sati__kostur sati__kostur--traka" />
      <span className="sati__kostur sati__kostur--red" />
      <span className="sati__kostur sati__kostur--red" />
    </div>
  )
}

function Poruka({ faza, ponovo }) {
  const s = t.stanja[faza]
  return (
    <div className="sati__poruka" role={faza === 'greska' ? 'alert' : undefined}>
      <h1 className="sati__naslov">{s.naslov}</h1>
      <p>{s.tekst}</p>
      {faza === 'odbijen' && (
        <a className="sati__dugme" href={whatsappLink} target="_blank" rel="noopener">
          {s.dugme}
        </a>
      )}
      {faza === 'greska' && (
        <button className="sati__dugme" type="button" onClick={ponovo}>
          {s.dugme}
        </button>
      )}
    </div>
  )
}

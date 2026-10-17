import { useCallback, useEffect, useState } from 'react'
import Seo from '../components/Seo.jsx'
import { ZnakPetlja } from '../components/pocetna/Znak.jsx'
import { whatsappLink } from '../okvir.js'
import * as t from '../stranice/sati.js'
import '../components/sati/sati.css'

// Skrivena evidencija rada (/sati#k=<ključ>). Ključ iz linka ide funkciji /api/sati, koja vrati
// pogled za tu ulogu: vlasnik vidi sve, klijent samo radno vrijeme i teme. Bez ključa nema podataka.
function kljucIzAdrese() {
  return new URLSearchParams(window.location.hash.slice(1)).get('k') || ''
}

export default function Sati() {
  const [stanje, setStanje] = useState({ faza: 'ucitava' })
  const [odabran, setOdabran] = useState(null)

  const ucitaj = useCallback(async () => {
    const kljuc = kljucIzAdrese()
    if (!kljuc) {
      setStanje({ faza: 'bezKljuca' })
      return
    }
    setStanje({ faza: 'ucitava' })
    try {
      const r = await fetch('/api/sati', { headers: { Authorization: `Bearer ${kljuc}` }, cache: 'no-store' })
      if (r.status === 401) return setStanje({ faza: 'odbijen' })
      if (r.status === 404) return setStanje({ faza: 'prazno' })
      if (!r.ok) throw new Error(String(r.status))
      const podaci = await r.json()
      setStanje(podaci.mjeseci?.length ? { faza: 'spremno', podaci } : { faza: 'prazno' })
    } catch {
      setStanje({ faza: 'greska' })
    }
  }, [])

  useEffect(() => {
    ucitaj()
    window.addEventListener('hashchange', ucitaj)
    return () => window.removeEventListener('hashchange', ucitaj)
  }, [ucitaj])

  const podaci = stanje.podaci
  const mjesec = podaci && (podaci.mjeseci.find((m) => m.kljuc === odabran) || podaci.mjeseci[0])
  const vlasnik = podaci?.uloga === 'vlasnik'

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
      {t.stanja[stanje.faza] && <Poruka faza={stanje.faza} ponovo={ucitaj} />}

      {stanje.faza === 'spremno' && (
        <>
          <h1 className="sati__naslov">{t.naslov(podaci.projekat)}</h1>
          {podaci.mjeseci.length > 1 && (
            <nav className="sati__mjeseci" aria-label={t.mjeseciOznaka}>
              {podaci.mjeseci.map((m) => (
                <button
                  key={m.kljuc}
                  type="button"
                  className="sati__mjesec-dugme"
                  aria-pressed={m.kljuc === mjesec.kljuc}
                  onClick={() => setOdabran(m.kljuc)}
                >
                  {t.mjesecNaziv(m.kljuc)}
                </button>
              ))}
            </nav>
          )}
          <Mjesec key={mjesec.kljuc} m={mjesec} vlasnik={vlasnik} />
          <p className="sati__napomena">{vlasnik ? t.napomena.vlasnik : t.napomena.klijent}</p>
        </>
      )}
    </div>
  )
}

function Mjesec({ m, vlasnik }) {
  return (
    <section className="sati__mjesec" aria-label={t.mjesecNaziv(m.kljuc)}>
      <p className="sati__zbir">
        <span className="sati__broj">{t.trajanje(m.radno)}</span>
        <span className="sati__zbir-tekst">
          {t.radnoVrijeme} {t.mjesecLokativ(m.kljuc)}
        </span>
      </p>
      <dl className="sati__brojke">
        <div>
          <dt>{t.oznake.sati}</dt>
          <dd>{t.decimalno(m.radno)}</dd>
        </div>
        <div>
          <dt>{t.oznake.dana}</dt>
          <dd>{m.dana}</dd>
        </div>
        {vlasnik && (
          <>
            <div>
              <dt>{t.oznake.claude}</dt>
              <dd>{t.trajanje(m.claude)}</dd>
            </div>
            <div>
              <dt>{t.oznake.poruke}</dt>
              <dd>{m.poruka}</dd>
            </div>
          </>
        )}
      </dl>
      <Traka m={m} />
      <ol className="sati__dani">
        {m.dani.map((d) => (
          <li key={d.datum} id={`dan-${d.datum}`} className="sati__dan">
            <div className="sati__dan-red">
              <span className="sati__datum">{t.dan(d.datum)}</span>
              <span className="sati__trajanje">{t.trajanje(d.radno)}</span>
            </div>
            {d.teme.length > 0 && <p className="sati__teme">{d.teme.join(' · ')}</p>}
            {vlasnik && (
              <p className="sati__detalji">
                {d.od}-{d.do} · Claude {t.trajanje(d.claude)} · {t.poruka(d.poruka)}
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}

// Traka dana: jedan stubić za svaki dan u mjesecu, visina je radno vrijeme tog dana. Lista
// ispod je ista informacija u tekstu, pa traka za čitač ekrana samo vodi na dan.
function Traka({ m }) {
  const [aktivan, setAktivan] = useState(null)
  const [g, mj] = m.kljuc.split('-').map(Number)
  const brojDana = new Date(g, mj, 0).getDate()
  const poDatumu = new Map(m.dani.map((d) => [d.datum, d]))
  const najvise = Math.max(3600, ...m.dani.map((d) => d.radno))
  const dani = Array.from({ length: brojDana }, (_, i) => {
    const datum = `${m.kljuc}-${String(i + 1).padStart(2, '0')}`
    return { datum, radno: poDatumu.get(datum)?.radno || 0 }
  })
  const opis = aktivan && `${t.dan(aktivan.datum)}: ${aktivan.radno ? t.trajanje(aktivan.radno) : 'bez rada'}`

  return (
    <div className="sati__traka-okvir">
      <p className="sati__traka-opis" aria-live="polite">
        {opis || t.traka}
      </p>
      <div className="sati__traka" role="group" aria-label={t.traka} onPointerLeave={() => setAktivan(null)}>
        {dani.map((d) => (
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
        <span>1.</span>
        <span>{brojDana}.</span>
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

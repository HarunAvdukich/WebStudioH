import { useEffect, useRef, useState } from 'react'
import Seo from '../components/Seo.jsx'
import { Vrh, DioNaslov, Kvacice, Mjerac, PitajteZaOvo } from '../components/stranica/dijelovi.jsx'
import SmjenaRijeci from '../components/stranica/SmjenaRijeci.jsx'
import Trake from '../components/stranica/Trake.jsx'
import ZavrsniPoziv from '../components/stranica/ZavrsniPoziv.jsx'
import SajtKojiRaste, { MiniSajt } from '../components/usluge/SajtKojiRaste.jsx'
import IgraOlx from '../components/igre/IgraOlx.jsx'
import IgraTermin from '../components/igre/IgraTermin.jsx'
import Vodic from '../components/igre/Vodic.jsx'
import { PAROVI } from '../lib/jezik.js'
import '../components/stranica/stranica.css'
import '../components/igre/igre.css'
import '../components/usluge/usluge.css'

// Boja pozadine po stepenici (pretapa se dok skrolate) i oznaka "02 / 05 · Web shop".
const BOJE = ['#0f241d', '#0c2a22', '#12271f', '#0b1f1a', '#0a1a15']

// Stavka sa linkovima (npr. "Kako to izgleda uživo: mrt.ba i smarttime.ba").
function Uzivo({ uzivo }) {
  return (
    <>
      {uzivo.tekst}{' '}
      {uzivo.linkovi.map((l, i) => (
        <span key={l.url}>
          {i > 0 && ' · '}
          <a href={l.url} target="_blank" rel="noopener">
            {l.ime}
          </a>
        </span>
      ))}
    </>
  )
}

export default function Usluge({ t }) {
  const dijelovi = [...t.stepenice, t.odrzavanje]
  const [aktivni, setAktivni] = useState(0)
  const omotac = useRef(null)

  // Koji dio je na sredini ekrana: od njega boja pozadine i oznaka dijela.
  useEffect(() => {
    const sekcije = [...omotac.current.querySelectorAll('[data-dio]')]
    const io = new IntersectionObserver(
      (ulazi) => {
        for (const u of ulazi) if (u.isIntersecting) setAktivni(Number(u.target.dataset.dio))
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    sekcije.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  const igra = (s) => {
    if (!s.igra) return null
    const ti = t.igre[s.igra]
    return (
      <div className="us-igra" data-pokret="pojavi">
        <p className="st-nad">{ti.nad}</p>
        <h3 className="us-igra__naslov">{ti.naslov}</h3>
        {s.igra === 'olx' ? <IgraOlx t={ti} /> : <IgraTermin t={ti} />}
        <p className="us-igra__napomena">{ti.napomena}</p>
      </div>
    )
  }

  return (
    <div className="st st-usluge">
      <Seo
        punNaslov={t.seo.naslov}
        description={t.seo.opis}
        path={t.put}
        jezik={t.jezik}
        verzije={[
          { jezik: 'bs', path: '/usluge' },
          { jezik: 'en', path: PAROVI['/usluge'] },
        ]}
      />
      <Vrh nad={t.vrh.nad} naslov={t.vrh.naslov} uvod={t.vrh.uvod}>
        <span className="smj-red">
          {t.vrh.smjena.prije} <SmjenaRijeci rijeci={t.vrh.smjena.rijeci} iza={t.vrh.smjena.poslije} />
        </span>
      </Vrh>

      <SajtKojiRaste t={t.scena} stepenice={t.stepenice} />

      <div className="us-dijelovi" ref={omotac} style={{ '--boja': BOJE[aktivni] }}>
        <div className="us-oznaka" aria-hidden="true">
          <span className="us-oznaka__in">
            <SmjenaRijeci rijeci={dijelovi.map((_, i) => String(i + 1).padStart(2, '0'))} indeks={aktivni} />
            <span className="us-oznaka__od">/ {String(dijelovi.length).padStart(2, '0')} ·</span>
            <SmjenaRijeci rijeci={dijelovi.map((d) => d.oznaka)} indeks={aktivni} />
          </span>
        </div>

        {t.stepenice.map((s, i) => (
          <section className="us-korak" id={s.id} key={s.id} data-dio={i}>
            <div className="st-sirina us-korak__in">
              <div className="us-korak__lijevo">
                <p className="us-korak__broj" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p className="st-nad">{s.ime}</p>
                <h2 className="st-h2" data-pokret="izroni">
                  {s.naslov}
                </h2>
                <p className="st-uvod" data-pokret="pali">
                  {s.opis}
                </p>
                <div className="us-pitaj">
                  {s.usluge.map((u) => (
                    <PitajteZaOvo key={u.ime} usluga={u} pitaj={t.pitaj} />
                  ))}
                </div>
              </div>
              <div className="us-korak__desno">
                <Kvacice stavke={s.uzivo ? [...s.stavke, <Uzivo key="uzivo" uzivo={s.uzivo} />] : s.stavke} />
                {igra(s)}
              </div>
              <MiniSajt t={t.scena} korak={i} />
            </div>
          </section>
        ))}

        <Trake redovi={t.trake} />

        <section className="us-korak us-odrzavanje" id={t.odrzavanje.id} data-dio={t.stepenice.length}>
          <div className="st-sirina us-korak__in">
            <div className="us-korak__lijevo">
              <p className="st-nad">{t.odrzavanje.nad}</p>
              <h2 className="st-h2" data-pokret="izroni">
                {t.odrzavanje.naslov}
              </h2>
              <div className="us-pitaj">
                {t.odrzavanje.usluge.map((u) => (
                  <PitajteZaOvo key={u.ime} usluga={u} pitaj={t.pitaj} />
                ))}
              </div>
            </div>
            <div className="us-korak__desno us-odrzavanje__desno">
              <Kvacice stavke={t.odrzavanje.stavke} />
              <Mjerac {...t.odrzavanje.mjerac} />
            </div>
          </div>
        </section>
      </div>

      <section className="st-dio us-vodic">
        <div className="st-sirina us-vodic__in">
          <DioNaslov nad={t.vodic.nad} naslov={t.vodic.naslov} uvod={t.vodic.uvod} />
          <Vodic t={t.vodic} stepenice={t.stepenice} />
        </div>
      </section>

      <ZavrsniPoziv {...t.poziv} />
    </div>
  )
}

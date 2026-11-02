import { useState } from 'react'
import { preporukaVodica, porukaVodica } from '../../lib/igre.js'
import { waLink, popuni } from '../../lib/whatsapp.js'
import { prati } from '../../lib/statistika.js'

// Vodič "koja stepenica vam treba" (40): dva pitanja, pa preporuka sa stepenicom koja
// zasvijetli. Dugme šalje odgovore na WhatsApp, pa posjetilac ne mora kucati. Bez cijena.
export default function Vodic({ t, stepenice }) {
  const [prvo, setPrvo] = useState(null)
  const [drugo, setDrugo] = useState(null)
  const korak = !prvo ? 0 : !drugo ? 1 : 2
  const preporuka = prvo && drugo ? t.preporuke[preporukaVodica(prvo, drugo)] : null
  const pitanje = korak === 0 ? t.prvo : korak === 1 ? t[prvo] : null

  const ispocetka = () => {
    setPrvo(null)
    setDrugo(null)
  }

  return (
    <div className="vd">
      <div className="vd__traka" aria-hidden="true">
        <span style={{ transform: `scaleX(${korak / 2})` }} />
      </div>
      <div className="vd__ekran" aria-live="polite" key={korak}>
        {pitanje ? (
          <>
            <p className="vd__korak">{popuni(t.korak, { n: korak + 1 })}</p>
            <h3 className="vd__pitanje">{pitanje.pitanje}</h3>
            <div className="vd__odgovori">
              {pitanje.odgovori.map((o) => (
                <button key={o.id} type="button" onClick={() => {
                    if (korak === 0) setPrvo(o.id)
                    else {
                      setDrugo(o.id)
                      prati('Vodič', { preporuka: t.preporuke[preporukaVodica(prvo, o.id)].ime })
                    }
                  }}>
                  {o.tekst}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="vd__korak">{t.vama}</p>
            <h3 className="vd__pitanje vd__rezultat">{preporuka.ime}</h3>
            <ol className="vd__stepenice" aria-hidden="true">
              {stepenice.map((s, i) => (
                <li key={s.id} className={i + 1 === preporuka.stepenica ? 'je-ova' : undefined}>
                  <b>{i + 1}</b>
                  {s.oznaka}
                </li>
              ))}
            </ol>
            <p className="vd__opis">{preporuka.opis}</p>
            <div className="vd__dno">
              <a className="ok-dugme" href={waLink(porukaVodica(t, prvo, drugo))} target="_blank" rel="noopener">
                {t.posalji}
              </a>
              <button type="button" className="vd__ponovo" onClick={ispocetka}>
                {t.ponovo}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

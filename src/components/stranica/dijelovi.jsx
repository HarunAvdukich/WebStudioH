// Mali zajednički dijelovi stranica u novom izgledu: vrh, naslov dijela, kvačice, mjerač,
// česta pitanja i "Pitajte za ovo". Bez JavaScripta sve je vidljivo; pokrete pali
// src/lib/pokreti (data-pokret) samo uz .pokret na <html>.
import { waLink, popuni } from '../../lib/whatsapp.js'

// Prvi ekran stranice. Naslov je vidljiv od prvog iscrtavanja; ulaz mu pomjera samo transform (CSS).
export function Vrh({ nad, naslov, uvod, children, className = '' }) {
  return (
    <header className={`st-vrh ${className}`}>
      <div className="st-vrh__sjaj" aria-hidden="true" />
      <div className="st-sirina st-vrh__in">
        <p className="st-nad">{nad}</p>
        <h1 className="st-h1">{naslov}</h1>
        {(children || uvod) && (
          <div className="st-vrh__dno">
            {children}
            {uvod && <p className="st-uvod">{uvod}</p>}
          </div>
        )}
      </div>
    </header>
  )
}

// Naslov dijela: naslov izranja, uvod se pali dok čitate.
export function DioNaslov({ nad, naslov, uvod, className = '' }) {
  return (
    <div className={`st-dn ${className}`}>
      {nad && <p className="st-nad">{nad}</p>}
      <h2 className="st-h2" data-pokret="izroni">
        {naslov}
      </h2>
      {uvod && (
        <p className="st-uvod" data-pokret="pali">
          {uvod}
        </p>
      )}
    </div>
  )
}

// Kvačice: krug se napuni, kvačica se iscrta, tekst uđe (pokret "kvacice").
export function Kvacice({ stavke, className = '' }) {
  return (
    <ul className={`kv ${className}`} data-pokret="kvacice">
      {stavke.map((s, i) => (
        <li key={i} style={{ '--i': i }}>
          <span className="kv__ik" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="11" />
              <path d="M7 12.4l3.3 3.3L17 9" pathLength="1" />
            </svg>
          </span>
          <span className="kv__tx">{s}</span>
        </li>
      ))}
    </ul>
  )
}

// Mjerač brzine: kazaljka se popne do izmjerene brojke, sa uređajem i datumom. `udio` je
// koliki dio luka je pun (podrazumijevano vrijednost / 100), `poslije` jedinica (npr. " ms").
export function Mjerac({ vrijednost, opis, datum, udio, poslije = '', mali = false }) {
  return (
    <figure className={`mj${mali ? ' mj--mali' : ''}`} data-pokret="mjerac" style={{ '--v': udio ?? vrijednost / 100 }}>
      <svg viewBox="0 0 220 124" aria-hidden="true">
        <path className="mj__trag" d="M20 112 A90 90 0 0 1 200 112" />
        <path className="mj__pun" d="M20 112 A90 90 0 0 1 200 112" pathLength="1" />
      </svg>
      <span className="mj__broj" data-pokret="broji" data-do={vrijednost} data-poslije={poslije || undefined}>
        {vrijednost}
        {poslije}
      </span>
      <figcaption>
        {opis}
        <small>{datum}</small>
      </figcaption>
    </figure>
  )
}

// Česta pitanja: <details> radi i bez JavaScripta; odgovor uđe glatko, plus postane x.
export function CestaPitanja({ lista }) {
  return (
    <div className="cp">
      {lista.map((x, i) => (
        <details key={i} className="cp__p" data-pokret="pojavi" style={{ '--i': i }}>
          <summary>
            <span>{x.p}</span>
            <i className="cp__plus" aria-hidden="true" />
          </summary>
          <div className="cp__o">
            <p>{x.o}</p>
          </div>
        </details>
      ))}
    </div>
  )
}

// "Pitajte za ovo": otvara WhatsApp sa porukom za tu uslugu.
export function PitajteZaOvo({ usluga, pitaj }) {
  return (
    <a
      className="st-pitaj"
      href={waLink(popuni(pitaj.poruka, { usluga: usluga.uPoruci }))}
      target="_blank"
      rel="noopener"
      data-kursor={pitaj.dugme}
    >
      <span className="st-pitaj__ime">{usluga.ime}</span>
      <span className="st-pitaj__dugme">
        {pitaj.dugme}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </a>
  )
}

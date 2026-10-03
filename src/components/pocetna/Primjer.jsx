// Mali živi primjer jedne usluge (ilustracija, ne urađen projekt). Isti markup ide na prvi
// ekran i u kartice "Šta pravimo". Igru vodi src/lib/primjeri.js; bez JavaScripta i uz
// smanjene pokrete primjer stoji u završnom stanju.

const KORPA = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="18" cy="20" r="1.5" />
    <path d="M2 3h3l2.4 11.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.5L22 7H6" />
  </svg>
)

const LUPA = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
)

function Sadrzaj({ id, t }) {
  const tp = t[id]
  switch (id) {
    case 'stranica':
      return (
        <div className="pr-sajt">
          <div className="pr-sajt__vrh">
            <i />
            <span>
              <i />
              <i />
              <i />
            </span>
          </div>
          <i className="pr-crta" style={{ width: '82%' }} />
          <i className="pr-crta" style={{ width: '60%' }} />
          <i className="pr-crta pr-crta--tanka" style={{ width: '72%' }} />
          <span className="pr-sajt__dugme">{tp.dugme}</span>
        </div>
      )
    case 'shop':
      return (
        <>
          <span className="pr-korpa" aria-label={tp.korpa}>
            {KORPA}
            <em>3</em>
          </span>
          <div className="pr-artikli">
            <span />
            <span />
            <span />
          </div>
          <div className="pr-cipovi">
            {tp.placanje.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </>
      )
    case 'aplikacija':
      return (
        <div className="pr-app">
          <div className="pr-app__tel">
            <i />
            <b />
            <i />
            <i style={{ width: '60%' }} />
            <b />
            <span className="pr-obavijest">
              <span>{tp.obavijesti[0][0]}</span>
              <span>{tp.obavijesti[0][1]}</span>
            </span>
          </div>
          <div className="pr-app__cipovi">
            {tp.uredjaji.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </div>
      )
    case 'seo':
      return (
        <>
          <div className="pr-trazi">
            {LUPA}
            <span className="pr-upit">{tp.pretrage[0][0]}</span>
          </div>
          <div className="pr-rezultat je-vid">
            <small>{tp.adresa}</small>
            <b>{tp.firma.replace('{djelatnost}', tp.pretrage[0][1])}</b>
            <span>
              {tp.dugmad.map((d) => (
                <i key={d}>{d}</i>
              ))}
            </span>
          </div>
        </>
      )
    case 'termini':
      return (
        <>
          <div className="pr-sati">
            {tp.sati.map((s, i) => (
              <span key={s} className={tp.zauzeti.includes(i) ? 'je-zauzet' : i === 2 ? 'je-da' : undefined}>
                {s}
              </span>
            ))}
          </div>
          <p className="pr-potvrda je-vid">{tp.potvrda.replace('{sat}', tp.sati[2])}</p>
        </>
      )
    case 'chatbot':
      return (
        <div className="pr-chat">
          <p className="pr-kupac je-vid">{tp.razgovori[0][0]}</p>
          <p className="pr-pise" aria-hidden="true">
            <i />
            <i />
            <i />
          </p>
          <p className="pr-bot je-vid">{tp.razgovori[0][1]}</p>
        </div>
      )
    case 'redizajn':
      return (
        <div className="pr-rz">
          <div className="pr-rz__staro">
            <i />
            <i />
            <i />
            <b />
            <i />
            <i />
            <i />
            <b />
          </div>
          <div className="pr-rz__novo">
            <span className="pr-rz__logo" />
            <i />
            <i />
            <span className="pr-rz__dugme">{tp.dugme}</span>
          </div>
          <span className="pr-rz__oz pr-rz__oz--prije">{tp.prije}</span>
          <span className="pr-rz__oz pr-rz__oz--poslije">{tp.poslije}</span>
        </div>
      )
    case 'odrzavanje':
      return (
        <ul className="pr-stanje">
          {tp.redovi.map(([a, b]) => (
            <li key={a}>
              {a}
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )
    default:
      return null
  }
}

export default function Primjer({ id, t, aktivan = true, className = '' }) {
  return (
    <div className={`pr pr--${id}${aktivan ? ' je-akt' : ''} ${className}`} data-primjer={id}>
      <span className="pr-oznaka">{t[id].oznaka}</span>
      <Sadrzaj id={id} t={t} />
    </div>
  )
}

import { useState } from 'react'

const IME_OBRASCA = 'kontakt'
const kodiraj = (podaci) =>
  Object.keys(podaci)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(podaci[k])}`)
    .join('&')

// Obrazac (Netlify Forms). Natpisi polja odlete gore dok pišete; poslije slanja dugme se
// skupi u krug, pretvori u kvačicu, a obrazac ustupi mjesto poruci "Hvala". Ako slanje ne
// uspije, ispod dugmeta stoji poruka sa platna. Bez JavaScripta obrazac se šalje običnim POST-om.
export default function Obrazac({ t }) {
  const [stanje, setStanje] = useState('unos') // unos | saljem | poslano | greska

  const posalji = async (e) => {
    e.preventDefault()
    const forma = e.currentTarget
    setStanje('saljem')
    try {
      const podaci = Object.fromEntries(new FormData(forma).entries())
      const [odgovor] = await Promise.all([
        fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: kodiraj(podaci) }),
        new Promise((r) => setTimeout(r, 900)),
      ])
      if (!odgovor.ok) throw new Error(String(odgovor.status))
      setStanje('poslano')
    } catch {
      setStanje('greska')
    }
  }

  if (stanje === 'poslano')
    return (
      <div className="ob-hvala" role="status">
        <svg viewBox="0 0 96 96" aria-hidden="true">
          <circle cx="48" cy="48" r="46" />
          <path d="M30 50l12 12 24-26" pathLength="1" />
        </svg>
        <h3>{t.hvala.naslov}</h3>
        <p>{t.hvala.opis}</p>
      </div>
    )

  return (
    <form className="ob" name={IME_OBRASCA} method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={posalji}>
      <input type="hidden" name="form-name" value={IME_OBRASCA} />
      <p className="ob__zamka">
        <label>
          {t.zamka} <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <label className="ob__p">
        <input name="ime" required placeholder=" " autoComplete="name" />
        <span>{t.polja.ime}</span>
      </label>
      <label className="ob__p">
        <input name="firma" placeholder=" " autoComplete="organization" />
        <span>{t.polja.firma}</span>
      </label>
      <label className="ob__p ob__p--cijelo">
        <input name="kontakt" required placeholder=" " autoComplete="email" />
        <span>{t.polja.kontakt}</span>
      </label>
      <fieldset className="ob__izbor">
        <legend>{t.polja.treba}</legend>
        {t.izbori.map((x, i) => (
          <label key={x}>
            <input type="radio" name="treba" value={x} defaultChecked={i === 0} />
            <span>{x}</span>
          </label>
        ))}
      </fieldset>
      <label className="ob__p ob__p--cijelo">
        <textarea name="poruka" required rows={4} placeholder=" " />
        <span>{t.polja.poruka}</span>
        <small className="ob__primjer">{t.primjer}</small>
      </label>
      <div className="ob__dno">
        <button className={`ob__salji${stanje === 'saljem' ? ' je-salje' : ''}`} type="submit" disabled={stanje === 'saljem'}>
          <span className="ob__salji-tx">{stanje === 'saljem' ? t.saljem : t.dugme}</span>
          <svg className="ob__krug" viewBox="0 0 54 54" aria-hidden="true">
            <circle cx="27" cy="27" r="20" pathLength="1" />
          </svg>
        </button>
        <small>{t.ispod}</small>
      </div>
      {stanje === 'greska' && (
        <p className="ob__greska" role="alert">
          {t.greska}
        </p>
      )}
    </form>
  )
}

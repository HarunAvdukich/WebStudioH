import { useState } from 'react'
import { prati } from '../../lib/statistika.js'

const IME_OBRASCA = 'skica'
const kodiraj = (podaci) =>
  Object.keys(podaci)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(podaci[k])}`)
    .join('&')

// Forma za skicu po mjeri (Netlify Forms, ime "skica"). Isti izgled i ponašanje kao obrazac
// na Kontaktu (src/components/kontakt/Obrazac.jsx). Ako je firma već probala osnovnu skicu,
// naziv, grad i djelatnost su upisani (pocetno). Bez JavaScripta šalje se običnim POST-om.
export default function SkicaObrazac({ t, pocetno = {} }) {
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
      prati('Skica forma')
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
        <input name="firma" required placeholder=" " autoComplete="organization" defaultValue={pocetno.ime || ''} />
        <span>{t.polja.firma}</span>
      </label>
      <label className="ob__p">
        <input name="djelatnost" required placeholder=" " defaultValue={pocetno.djelatnost || ''} />
        <span>{t.polja.djelatnost}</span>
      </label>
      <label className="ob__p">
        <input name="grad" placeholder=" " autoComplete="address-level2" defaultValue={pocetno.grad || ''} />
        <span>{t.polja.grad}</span>
      </label>
      <label className="ob__p">
        <input name="kontakt" required placeholder=" " autoComplete="tel" />
        <span>{t.polja.kontakt}</span>
      </label>
      <label className="ob__p ob__p--cijelo">
        <input name="link" placeholder=" " inputMode="url" />
        <span>{t.polja.link}</span>
      </label>
      <label className="ob__p ob__p--cijelo">
        <textarea name="napomena" rows={3} placeholder=" " />
        <span>{t.polja.napomena}</span>
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

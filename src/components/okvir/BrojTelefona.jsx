import { useRef, useState } from 'react'
import { contact } from '../../data.js'
import { useOkvir } from '../../lib/useOkvir.js'

// Broj telefona: na računaru klik kopira broj i pokaže potvrdu, na telefonu zove.
export default function BrojTelefona() {
  const { okvir } = useOkvir()
  const [kopirano, setKopirano] = useState(false)
  const tajmer = useRef(0)
  const klik = (e) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || !navigator.clipboard) return
    e.preventDefault()
    navigator.clipboard
      .writeText(okvir.telefon)
      .then(() => {
        setKopirano(true)
        clearTimeout(tajmer.current)
        tajmer.current = setTimeout(() => setKopirano(false), 2200)
      })
      .catch(() => {
        window.location.href = contact.phoneHref
      })
  }
  return (
    <>
      <a className={`ok-broj${kopirano ? ' je-kopirano' : ''}`} href={contact.phoneHref} onClick={klik} data-kursor={okvir.kopiraj}>
        {kopirano ? okvir.kopirano : okvir.telefon}
      </a>
      <span className={`ok-tost${kopirano ? ' je-vidljiv' : ''}`} role="status" aria-live="polite">
        {kopirano ? okvir.kopiranoDugo : ''}
      </span>
    </>
  )
}

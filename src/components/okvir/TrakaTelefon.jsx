import { useEffect, useState } from 'react'
import { whatsappLink, okvir } from '../../okvir.js'
import { contact } from '../../data.js'
import { smjerZaglavlja, vidljivaTraka } from '../../lib/pokreti/racun.js'

// Traka na dnu telefona: "Pišite nam" i poziv. Izađe poslije prvog ekrana, skloni se dok
// posjetilac skrola dolje i pri dnu stranice, vrati se kad krene gore. Na računaru je nema (CSS).
export default function TrakaTelefon() {
  const [vidljiva, setVidljiva] = useState(false)

  useEffect(() => {
    let prije = window.scrollY
    let smjer = 'vidi'
    const naSkrol = () => {
      const y = window.scrollY
      smjer = smjerZaglavlja(prije, y) ?? smjer
      prije = y
      setVidljiva(vidljivaTraka({ y, ekran: window.innerHeight, visina: document.documentElement.scrollHeight, smjer }))
    }
    naSkrol()
    window.addEventListener('scroll', naSkrol, { passive: true })
    return () => window.removeEventListener('scroll', naSkrol)
  }, [])

  const tab = vidljiva ? 0 : -1
  return (
    <div className={`ok-traka${vidljiva ? ' je-vidljiva' : ''}`} aria-hidden={!vidljiva}>
      <a className="ok-traka__wa" href={whatsappLink} target="_blank" rel="noopener" tabIndex={tab}>
        <span className="ok-traka__ik" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12z" />
          </svg>
        </span>
        <span>
          <b>{okvir.traka.pisite}</b>
          <small>
            <i aria-hidden="true" />
            {okvir.traka.licno}
          </small>
        </span>
      </a>
      <a className="ok-traka__tel" href={contact.phoneHref} aria-label={okvir.traka.pozovite} tabIndex={tab}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
        </svg>
      </a>
    </div>
  )
}

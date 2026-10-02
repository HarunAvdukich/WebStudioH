import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ZnakPutanje } from '../pocetna/Znak.jsx'
import { LOGO_SIRINA, LOGO_VISINA } from '../pocetna/motor.js'
import { meni, whatsappLink, okvir } from '../../okvir.js'
import { smjerZaglavlja } from '../../lib/pokreti/racun.js'
import { useMagnet } from '../../lib/magnet.js'

// Zaglavlje ostalih stranica: znak, meni, "Pišite nam". Skloni se dok se skrola dolje,
// vrati se gore. Na telefonu meni preko cijelog ekrana koji se raširi krugom iz dugmeta.
export default function Zaglavlje() {
  const { pathname } = useLocation()
  const [otvoren, setOtvoren] = useState(false)
  const [stanje, setStanje] = useState({ skriveno: false, malo: false })
  const dugme = useRef(null)
  const pisite = useRef(null)
  useMagnet(pisite)

  useEffect(() => setOtvoren(false), [pathname])

  useEffect(() => {
    let prije = window.scrollY
    const naSkrol = () => {
      const y = window.scrollY
      const s = smjerZaglavlja(prije, y)
      prije = y
      setStanje((st) => {
        const skriveno = s === null ? st.skriveno : s === 'skrij'
        const malo = y > 10
        return st.skriveno === skriveno && st.malo === malo ? st : { skriveno, malo }
      })
    }
    naSkrol()
    window.addEventListener('scroll', naSkrol, { passive: true })
    return () => window.removeEventListener('scroll', naSkrol)
  }, [])

  useEffect(() => {
    if (!otvoren) return undefined
    const html = document.documentElement
    const zatvori = (e) => e.key === 'Escape' && setOtvoren(false)
    html.classList.add('ok-meni-otvoren')
    window.addEventListener('keydown', zatvori)
    return () => {
      html.classList.remove('ok-meni-otvoren')
      window.removeEventListener('keydown', zatvori)
    }
  }, [otvoren])

  const prebaci = () => {
    const r = dugme.current.getBoundingClientRect()
    const html = document.documentElement
    html.style.setProperty('--ok-mx', `${r.left + r.width / 2}px`)
    html.style.setProperty('--ok-my', `${r.top + r.height / 2}px`)
    setOtvoren((o) => !o)
  }

  const klase = ['ok-zaglavlje']
  if (stanje.skriveno && !otvoren) klase.push('je-skriveno')
  if (stanje.malo) klase.push('je-malo')

  return (
    <>
      <header className={klase.join(' ')}>
        <Link className="ok-logo" to="/" aria-label={okvir.logo}>
          <svg viewBox={`0 0 ${LOGO_SIRINA} ${LOGO_VISINA}`} aria-hidden="true">
            <ZnakPutanje />
          </svg>
        </Link>
        <nav className="ok-meni-red" aria-label={okvir.glavniMeni}>
          {meni.map((m) => (
            <NavLink key={m.put} to={m.put} className={({ isActive }) => (isActive ? 'je-aktivno' : undefined)}>
              {m.naziv}
            </NavLink>
          ))}
          <a ref={pisite} className="ok-dugme ok-dugme--malo" href={whatsappLink} target="_blank" rel="noopener">
            {okvir.dugmeKratko}
          </a>
        </nav>
        <button
          ref={dugme}
          type="button"
          className="ok-otvori"
          aria-expanded={otvoren}
          aria-controls="ok-meni"
          aria-label={otvoren ? okvir.zatvoriMeni : okvir.otvoriMeni}
          onClick={prebaci}
        >
          <span />
          <span />
        </button>
      </header>
      <div id="ok-meni" className={`ok-meni${otvoren ? ' je-otvoren' : ''}`}>
        <nav aria-label={okvir.meniTelefon}>
          {meni.map((m, i) => (
            <span key={m.put} className="ok-meni__red">
              <Link to={m.put} style={{ '--i': i }} onClick={() => setOtvoren(false)}>
                {m.naziv}
              </Link>
            </span>
          ))}
        </nav>
        <a className="ok-dugme" href={whatsappLink} target="_blank" rel="noopener">
          {okvir.dugme}
        </a>
      </div>
    </>
  )
}

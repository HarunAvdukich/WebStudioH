import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Brand from './Brand.jsx'
import { navLinks, contact } from '../data.js'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  // Početna je svijetla; unutrašnje stranice ostaju tamne do drugog dijela redizajna.
  const svijetla = pathname === '/'
  const close = () => setOpen(false)
  const wa = `${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappText)}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}${svijetla ? ' nav--svijetla' : ''}`}>
      <div className="container nav__inner">
        <Brand />

        <div className="nav__links">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `nav__link${isActive ? ' nav__link--active' : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <a className="btn btn--nav btn--primary" href={wa} target="_blank" rel="noopener noreferrer">
          Pošalji upit
        </a>

        <button
          type="button"
          className={`nav__toggle${open ? ' is-open' : ''}`}
          aria-label="Otvori/zatvori meni"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`nav__mobile${open ? ' is-open' : ''}`}>
        {navLinks.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            onClick={close}
            className={({ isActive }) => (isActive ? 'is-active' : undefined)}
          >
            {l.label}
          </NavLink>
        ))}
        <a className="btn btn--md btn--primary" href={wa} target="_blank" rel="noopener noreferrer" onClick={close}>
          Pošalji upit
        </a>
      </div>
    </nav>
  )
}

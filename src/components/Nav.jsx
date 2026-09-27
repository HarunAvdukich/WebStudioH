import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Brand from './Brand.jsx'
import Icon, { WhatsAppIcon } from './Icon.jsx'
import { navLinks, contact } from '../data.js'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const close = () => setOpen(false)
  const wa = `${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappText)}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = ({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`

  return (
    <header className={`site-head${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container site-head__inner">
        <Brand />

        <nav className="nav-links" aria-label="Glavni meni">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <a className="btn btn--red btn--sm site-head__cta" href={wa} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon size={20} />
          Piši na WhatsApp
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? 'Zatvori meni' : 'Otvori meni'}
          aria-expanded={open}
          aria-controls="nav-drawer"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} size={22} />
        </button>
      </div>

      <div id="nav-drawer" className={`nav-drawer${open ? ' is-open' : ''}`}>
        {navLinks.map((l) => (
          <NavLink key={l.to} to={l.to} onClick={close} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
            {l.label}
            <Icon name="arrow" size={20} />
          </NavLink>
        ))}
        <a className="btn btn--red" href={wa} target="_blank" rel="noopener noreferrer" onClick={close}>
          <WhatsAppIcon size={20} />
          Piši na WhatsApp
        </a>
      </div>

      <div className="rail" aria-hidden="true" />
    </header>
  )
}

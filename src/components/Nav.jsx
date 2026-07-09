import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Brand from './Brand.jsx'
import { navLinks } from '../data.js'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const close = () => setOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
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

        <Link className="btn btn--nav btn--primary" to="/kontakt">
          Započni projekat →
        </Link>

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
        <Link className="btn btn--md btn--primary" to="/kontakt" onClick={close}>
          Započni projekat →
        </Link>
      </div>
    </nav>
  )
}

import { Link } from 'react-router-dom'
import Brand from './Brand.jsx'
import { contact } from '../data.js'

const columns = [
  {
    title: 'Usluge',
    links: [
      { label: 'Web trgovine', to: '/usluge' },
      { label: 'OLX i dobavljači', to: '/usluge' },
      { label: 'Održavanje', to: '/usluge' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { label: 'O nama', to: '/o-nama' },
      { label: 'Radovi', to: '/radovi' },
      { label: 'Cijene', to: '/cijene' },
      { label: 'Savjeti', to: '/savjeti' },
    ],
  },
  {
    title: 'Kontakt',
    links: [
      { label: contact.email, href: `mailto:${contact.email}` },
      { label: contact.phoneDisplay, href: contact.phoneHref },
      { label: 'WhatsApp', href: contact.whatsapp, external: true },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="container">
        <div className="site-foot__top">
          <div>
            <Brand onDark />
            <p className="site-foot__blurb">
              Web trgovine za bh. prodavnice, povezane sa OLX-om i vašim
              dobavljačima.
            </p>
          </div>

          <div className="site-foot__cols">
            {columns.map((col) => (
              <div key={col.title} className="site-foot__col">
                <h2>{col.title}</h2>
                {col.links.map((l) =>
                  l.to ? (
                    <Link key={l.label} to={l.to}>
                      {l.label}
                    </Link>
                  ) : (
                    <a
                      key={l.label}
                      href={l.href}
                      {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {l.label}
                    </a>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="site-foot__bar">
          <span>© 2026 WebStudioH</span>
          <Link to="/politika-privatnosti">Politika privatnosti</Link>
        </div>
      </div>
    </footer>
  )
}

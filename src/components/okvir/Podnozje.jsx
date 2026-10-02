import { Link } from 'react-router-dom'
import { meni, whatsappLink, okvir } from '../../okvir.js'
import { contact } from '../../data.js'
import TekstOkoZnaka from './TekstOkoZnaka.jsx'
import BrojTelefona from './BrojTelefona.jsx'

// Podnožje ostalih stranica, isti tekst kao na početnoj.
export default function Podnozje() {
  return (
    <footer className="ok-podnozje">
      <div className="ok-podnozje__red">
        <TekstOkoZnaka />
        <p>{okvir.podnozje.opis}</p>
      </div>
      <div className="ok-podnozje__red">
        <nav aria-label={okvir.podnozjeMeni}>
          {meni.map((m) => (
            <Link key={m.put} to={m.put}>
              {m.naziv}
            </Link>
          ))}
          <Link to={okvir.privatnost.put}>{okvir.privatnost.naziv}</Link>
        </nav>
        <p>
          <a href={whatsappLink} target="_blank" rel="noopener">
            {okvir.kontakt.whatsapp}
          </a>{' '}
          {okvir.kontakt.veznik} {okvir.kontakt.telefon} <BrojTelefona /> · <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </p>
      </div>
      <p className="ok-podnozje__dno">© 2026 Hunar · hunar.ba · {okvir.podnozje.znacenje}</p>
    </footer>
  )
}

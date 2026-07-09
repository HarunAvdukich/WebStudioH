import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'

export default function NotFound() {
  return (
    <section className="notfound">
      <Seo title="Stranica nije pronađena" noindex />
      <div className="container notfound__inner">
        <span className="eyebrow">Greška 404</span>
        <h1 className="notfound__title">Stranica nije pronađena.</h1>
        <p className="notfound__text">
          Izgleda da tražena stranica ne postoji ili je premještena.
        </p>
        <Link className="btn btn--md btn--primary" to="/">
          Nazad na početnu →
        </Link>
      </div>
    </section>
  )
}

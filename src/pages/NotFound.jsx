import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import Barcode from '../components/Barcode.jsx'
import Icon from '../components/Icon.jsx'

export default function NotFound() {
  return (
    <section className="notfound">
      <Seo title="Stranica nije pronađena" noindex />
      <div className="container">
        <h1 className="display page-head__title">Ovaj artikal nije na stanju.</h1>
        <p className="page-head__sub">Tražena stranica ne postoji ili je premještena.</p>
        <article className="tag">
          <header className="tag__head tag__head--ink">
            <strong>Stranica</strong>
            <span>Šifra 404</span>
          </header>
          <div className="tag__body">
            <dl className="decl">
              <div className="decl__row">
                <dt>Na stanju</dt>
                <dd>0</dd>
              </div>
            </dl>
          </div>
          <footer className="tag__foot">
            <Link className="btn btn--red" to="/">
              Nazad na početnu
              <Icon name="arrow" className="icon--arrow" />
            </Link>
            <Barcode code="387004200404" className="barcode--sm" />
          </footer>
        </article>
      </div>
    </section>
  )
}

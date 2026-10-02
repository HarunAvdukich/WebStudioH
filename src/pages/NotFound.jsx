import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { ZnakPetlja } from '../components/pocetna/Znak.jsx'
import { nePostoji, whatsappLink } from '../okvir.js'

// 404: znak se iscrta, a slova se izmiješaju pa slože u "Ova stranica ne postoji. Ali vaša može."
export default function NotFound() {
  return (
    <section className="ok-404">
      <Seo title={nePostoji.seo} noindex />
      <svg className="ok-404__znak" viewBox="0 0 170 124" data-pokret="crtaj" aria-hidden="true">
        <ZnakPetlja crtaj />
      </svg>
      <h1>
        <span data-pokret="slozi">{nePostoji.naslov}</span>
        <span className="ok-404__vasa" data-pokret="slozi">{nePostoji.podnaslov}</span>
      </h1>
      <div className="ok-404__dugmad">
        <Link className="ok-dugme" to="/">
          {nePostoji.nazad}
        </Link>
        <a className="ok-dugme ok-dugme--obrub" href={whatsappLink} target="_blank" rel="noopener">
          {nePostoji.pisite}
        </a>
      </div>
    </section>
  )
}

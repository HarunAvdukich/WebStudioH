import { Link } from 'react-router-dom'
import HeroMark3D from './HeroMark3D.jsx'
import { contact } from '../data.js'

export default function Hero() {
  const wa = `${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappText)}`
  return (
    <section id="top" className="uvod">
      <div className="container uvod__mreza">
        <div className="uvod__tekst">
          <h1 className="uvod__naslov" data-reveal data-reveal-delay="70">
            <span className="uvod__naglasak">Web stranice, trgovine i sistemi</span> koji rade za vaš posao.
          </h1>
          <p className="uvod__podnaslov" data-reveal data-reveal-delay="140">
            Od stranice udruženja do trgovine sa 7.400+ artikala povezane sa OLX-om
            i zakazivanja termina na SmartTimeu. Sve na jednom mjestu, od prvog
            razgovora do održavanja.
          </p>
          <div className="uvod__dugmad" data-reveal data-reveal-delay="210">
            <a className="btn btn--md btn--primary" href={wa} target="_blank" rel="noopener noreferrer">
              Pošalji upit
            </a>
            <Link className="btn btn--md btn--ghost" to="/radovi">
              Pogledaj radove
            </Link>
          </div>
        </div>
        <HeroMark3D />
      </div>
    </section>
  )
}

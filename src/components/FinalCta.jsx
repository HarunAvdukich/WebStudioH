import { Link } from 'react-router-dom'
import { contact } from '../data.js'

export default function FinalCta() {
  return (
    <section id="cta" className="cta">
      <div className="container">
        <div className="cta__card" data-reveal>
          <div className="cta__glow" />
          <div className="cta__inner">
            <h2 className="cta__title">
              Spremni da vaš posao radi i na webu?
            </h2>
            <p className="cta__sub">
              Stranica, trgovina ili sistem za zakazivanje: brzo, pregledno i
              povezano sa onim što već koristite.
            </p>
            <div className="cta__actions">
              <Link className="btn btn--lg btn--primary" to="/kontakt">
                Javite nam se →
              </Link>
              <a
                className="btn btn--lg btn--ghost"
                href={`${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Piši na WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

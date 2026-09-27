import { Link } from 'react-router-dom'
import { contact } from '../data.js'
import Icon, { WhatsAppIcon } from './Icon.jsx'

export default function FinalCta() {
  return (
    <section className="cta">
      <div className="container cta__grid">
        <div>
          <h2 className="display cta__title">Spremni da vaša trgovina prodaje i online?</h2>
          <p className="cta__sub">
            Pretvorimo vašu web stranicu u vašeg najvrednijeg prodavača: brzu,
            preglednu i povezanu sa OLX-om.
          </p>
        </div>
        <div className="cta__actions">
          <a
            className="btn btn--red"
            href={`${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappText)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={22} />
            Piši na WhatsApp
          </a>
          <Link className="btn btn--paper" to="/kontakt">
            Napravimo vašu trgovinu
            <Icon name="arrow" className="icon--arrow" />
          </Link>
        </div>
      </div>
    </section>
  )
}

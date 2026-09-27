import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { pricing } from '../data.js'

// Tri paketa kao tri cjenovne etikete na istom nosaču.
export default function Pricing() {
  return (
    <section className="band band--shelf">
      <div className="container">
        <div className="shelf-row">
          {pricing.map((plan, i) => (
            <article
              key={plan.name}
              className={`tag tag--hang hang price-tag span-4${plan.featured ? ' price-tag--akcija' : ''}`}
            >
              <header className={`tag__head${plan.featured ? ' tag__head--ink' : ''}`}>
                <strong>{plan.name}</strong>
                <span>Paket {i + 1}</span>
              </header>
              <div className="tag__body">
                <p className="tag__text">{plan.blurb}</p>
                <ul className="checks">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <Icon name="check" size={18} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <footer className="tag__foot">
                <div className={`price price--big${plan.featured ? ' price--red' : ''}`}>
                  <small>{plan.priceLabel}</small>
                  <strong>{plan.price}</strong>
                </div>
                <Link className={`btn ${plan.featured ? 'btn--ink' : 'btn--paper'}`} to="/kontakt">
                  {plan.cta}
                  <Icon name="arrow" className="icon--arrow" />
                </Link>
              </footer>
              {plan.badge && <span className="roundel">{plan.badge}</span>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

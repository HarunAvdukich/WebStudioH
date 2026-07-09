import { Link } from 'react-router-dom'
import { pricing } from '../data.js'

export default function Pricing({ showHead = true }) {
  return (
    <section id="pricing" className="pricing">
      <div className="container">
        {showHead && (
          <div className="pricing__head" data-reveal>
            <span className="eyebrow">Paketi</span>
            <h2 className="section-title">Jednostavni paketi, prilagođeni vama.</h2>
          </div>
        )}

        <div className="plans">
          {pricing.map((plan, i) => (
            <div
              key={plan.name}
              className={`plan${plan.featured ? ' plan--featured' : ''}`}
              data-reveal
              data-reveal-delay={i * 90}
            >
              {plan.badge && <span className="plan__badge">{plan.badge}</span>}
              <div className="plan__name">{plan.name}</div>
              <div className="plan__blurb">{plan.blurb}</div>
              <div className="plan__label">{plan.priceLabel}</div>
              <div className="plan__price">{plan.price}</div>

              <div className="plan__features">
                {plan.features.map((f) => (
                  <div key={f} className="feat">
                    <span className="feat__check">
                      <i />
                    </span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <Link
                className={`btn btn--block plan__cta ${
                  plan.featured ? 'btn--primary' : 'btn--ghost'
                }`}
                to="/kontakt"
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

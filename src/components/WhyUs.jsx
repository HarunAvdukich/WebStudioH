import { whyUs, homeStats } from '../data.js'

export default function WhyUs() {
  return (
    <section className="why container">
      <div className="why__aside" data-reveal>
        <span className="eyebrow">Zašto WebStudioH</span>
        <h2 className="why__title">
          Napravljeno da vaše poslovanje izgleda ozbiljno i bude izabrano.
        </h2>
        <p className="why__lede">
          Spajamo čist dizajn sa stvarnim performansama, tako da vaša trgovina ne
          izgleda samo dobro, nego gradi povjerenje i prodaje.
        </p>
        <div className="stats">
          {homeStats.map((s) => (
            <div key={s.label}>
              <div className="stat__num">
                {s.num}
                <span>{s.sfx}</span>
              </div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="why__grid">
        {whyUs.map((w) => (
          <div key={w.n} className="why-card" data-reveal data-reveal-delay={w.delay}>
            <div className="why-card__icon">{w.n}</div>
            <h3 className="why-card__title">{w.t}</h3>
            <p className="card-text">{w.d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

import { whyUs } from '../data.js'

const stats = [
  { num: '98', sfx: '+', label: 'Prosj. PageSpeed' },
  { num: '40', sfx: '+', label: 'Lansiranih stranica' },
  { num: '100', sfx: '%', label: 'Izrađeno po mjeri' },
]

export default function WhyUs() {
  return (
    <section className="why container">
      <div className="why__aside" data-reveal>
        <span className="eyebrow">Zašto WebStudioH</span>
        <h2 className="why__title">
          Napravljeno da vaše poslovanje izgleda ozbiljno — i bude izabrano.
        </h2>
        <p className="why__lede">
          Spajamo čist, promišljen dizajn sa stvarnim performansama, tako da vaša
          stranica ne izgleda samo premium — već gradi povjerenje i pretvara
          posjetioce u upite.
        </p>
        <div className="stats">
          {stats.map((s) => (
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

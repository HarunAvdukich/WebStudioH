import { whyUs, proofStats } from '../data.js'

export default function WhyUs() {
  return (
    <section className="band band--paper">
      <div className="container why__grid">
        <div>
          <h2 className="section-title">Trgovina koja radi i dok vi pakujete.</h2>
          <p className="lede" style={{ marginTop: 18 }}>
            Artikli odu na OLX sami, cijene i zalihe stižu od dobavljača, a narudžbe
            sa pouzećem čekaju u administraciji. Vama ostaje da spakujete i pošaljete.
          </p>
          <ul className="why__list">
            {whyUs.map((w) => (
              <li key={w.n}>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </li>
            ))}
          </ul>
        </div>

        <aside className="decl-panel" aria-labelledby="deklaracija">
          <h3 id="deklaracija" className="decl-panel__title">Deklaracija</h3>
          <dl className="decl">
            {proofStats.map((s) => (
              <div key={s.label} className="decl__row">
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
          <p className="decl-panel__note">Izmjereno 27. 9. 2026.</p>
        </aside>
      </div>
    </section>
  )
}

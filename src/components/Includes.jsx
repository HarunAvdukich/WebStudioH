import { includes } from '../data.js'

export default function Includes() {
  return (
    <section className="includes">
      <div className="container">
        <div className="includes__head" data-reveal>
          <span className="eyebrow">Uvijek uključeno</span>
          <h2 className="section-title">U svaki paket, bez doplate.</h2>
        </div>

        <div className="includes__grid">
          {includes.map((it, i) => (
            <div key={it} className="include" data-reveal data-reveal-delay={i * 50}>
              <span className="include__check">
                <i />
              </span>
              <span>{it}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

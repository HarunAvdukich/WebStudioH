import { process } from '../data.js'

export default function Process() {
  return (
    <section id="process" className="process">
      <div className="container">
        <div className="process__head" data-reveal>
          <span className="eyebrow">Kako radimo</span>
          <h2 className="section-title">Miran put do lansiranja u četiri koraka.</h2>
        </div>

        <div className="process__track">
          <div className="process__line" />
          <div className="grid-4">
            {process.map((p) => (
              <div key={p.n} className="step" data-reveal data-reveal-delay={p.delay}>
                <div className="step__num">{p.n}</div>
                <h3 className="step__title">{p.t}</h3>
                <p className="step__text">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

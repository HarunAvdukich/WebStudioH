import { homeStats } from '../data.js'

export default function Stats() {
  return (
    <section className="brojke" aria-label="Brojke iz naših radova">
      <div className="container brojke__red">
        {homeStats.map((s) => (
          <div className="brojka" key={s.label} data-reveal>
            <p className="brojka__broj">
              {s.num}
              <span>{s.sfx}</span>
            </p>
            <p className="brojka__opis">{s.label}</p>
            <p className="brojka__izvor">{s.izvor}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

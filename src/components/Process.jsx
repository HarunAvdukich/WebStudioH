import { process } from '../data.js'

// Četiri koraka kao redovi na računu; broj ovdje nosi redoslijed.
export default function Process() {
  return (
    <section className="band band--paper">
      <div className="container receipts">
        <div>
          <h2 className="section-title">Miran put do lansiranja u četiri koraka.</h2>
          <p className="lede" style={{ marginTop: 18 }}>
            Jedna kontakt osoba od prvog razgovora do lansiranja, i poslije njega.
          </p>
        </div>
        <div className="receipt-wrap">
          <div className="receipt">
            <p className="receipt__title">Kako radimo</p>
            <p className="receipt__sub">Redoslijed posla</p>
            <ol className="steps">
              {process.map((p) => (
                <li key={p.n}>
                  <span className="step__n">{Number(p.n)}</span>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

import Icon from './Icon.jsx'
import { syncProof } from '../data.js'

// Rad na djelu: isti artikal na mrt.ba i na OLX-u, stvarni snimci sa datumom.
function ProofTag({ side, title, price, red }) {
  return (
    <figure className="tag tag--hang hang proof-tag" style={{ margin: 0 }}>
      <header className={`tag__head${red ? ' tag__head--ink' : ''}`}>
        <strong>{side.source}</strong>
        <span>{side.code}</span>
      </header>
      <div className="tag__shot proof-tag__shot">
        <img src={side.image} alt={title} width="960" height="420" loading="lazy" />
      </div>
      <figcaption className="tag__foot">
        <div className={`price${red ? ' price--red' : ''}`}>
          <small>{syncProof.product}</small>
          <strong>{price}</strong>
        </div>
      </figcaption>
    </figure>
  )
}

export default function SyncProof() {
  return (
    <section className="band band--paper">
      <div className="container">
        <div className="sec-head">
          <div>
            <h2 className="section-title">Artikal sa mrt.ba sam se pojavio na OLX-u.</h2>
            <p className="lede">
              Ista kosilica, ista cijena. Oglas je objavio OLX dodatak trgovine, bez
              ručnog unosa, a kad se promijeni cijena ili zaliha, oglas se ažurira sam.
            </p>
          </div>
        </div>

        <div className="shelf-row proof-row">
          <div className="span-6">
            <ProofTag side={syncProof.shop} title={`${syncProof.product} na mrt.ba`} price={syncProof.price} />
          </div>
          <div className="proof-row__arrow" aria-hidden="true">
            <Icon name="arrow" size={34} />
          </div>
          <div className="span-6">
            <ProofTag side={syncProof.olx} title={`Isti artikal kao OLX oglas prodavca MotorRemont`} price={syncProof.price} red />
          </div>
        </div>
        <p className="proof-note mono">Snimljeno {syncProof.date} Aktivnih oglasa sa mrt.ba: 4.300+.</p>
      </div>
    </section>
  )
}

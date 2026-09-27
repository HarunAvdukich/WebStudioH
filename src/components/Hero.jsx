import { Link } from 'react-router-dom'
import { useParallax } from '../hooks/useParallax.js'

export default function Hero() {
  const stageRef = useParallax()

  return (
    <section id="top" className="hero" ref={stageRef} data-parallax-root>
      <div className="hero__aurora" />
      <div className="hero__glow" />

      <div className="container">
        <div className="hero__copy">
          <span className="badge" data-reveal>
            <span className="badge__dot" />
            Dostupni za nove projekte
          </span>

          <h1 className="hero__title" data-reveal data-reveal-delay="70">
            Web trgovine za bh. prodavnice,
            <br />
            povezane sa OLX-om
            <br />
            i vašim <span className="grad-text">dobavljačima.</span>
          </h1>

          <p className="hero__sub" data-reveal data-reveal-delay="140">
            Gradimo WooCommerce trgovine koje rade na telefonu, same objavljuju
            artikle na OLX i preuzimaju katalog od dobavljača. Najveća od njih,
            mrt.ba, ima 7.400+ artikala.
          </p>

          <div className="hero__actions" data-reveal data-reveal-delay="210">
            <Link className="btn btn--md btn--primary" to="/kontakt">
              Započni projekat →
            </Link>
            <Link className="btn btn--md btn--ghost" to="/radovi">
              Pogledaj radove
            </Link>
          </div>
        </div>

        {/* scena sa karticama koje lebde */}
        <div className="hero__stage">
          {/* glavna kartica: stvarni snimak mrt.ba */}
          <div className="stage-card stage-main">
            <div className="glass">
              <img
                className="stage-main__shot"
                src="/project-mrt.webp"
                alt="mrt.ba, početna stranica"
                width={1200}
                height={769}
                fetchpriority="high"
              />
            </div>
          </div>

          {/* kartica proizvoda, ilustracija: naprijed lijevo */}
          <div className="stage-card stage-shop stage-aside">
            <div className="glass--tight" style={{ padding: 14 }}>
              <div style={{ height: 104, borderRadius: 11, background: 'repeating-linear-gradient(45deg, rgba(87,180,255,.14) 0 11px, rgba(87,180,255,.05) 11px 22px)', border: '1px solid rgba(255,255,255,.07)', marginBottom: 12 }} />
              <div style={{ width: '64%', height: 11, borderRadius: 5, background: 'rgba(255,255,255,.7)', marginBottom: 8 }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="font-display" style={{ fontWeight: 600, fontSize: 16, color: '#57B4FF' }}>129 KM</span>
                <span style={{ padding: '6px 12px', borderRadius: 8, background: 'linear-gradient(180deg,#48ABFF,#1287F2)', color: '#fff', fontSize: 11, fontWeight: 600 }}>Dodaj u korpu</span>
              </div>
            </div>
          </div>

          {/* kartica brzine: desno */}
          <div className="stage-card stage-perf stage-aside">
            <div className="glass--tight" style={{ padding: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 58, height: 58, borderRadius: '50%', background: '#3ED598', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="font-display" style={{ width: 44, height: 44, borderRadius: '50%', background: '#12151b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 17, color: '#3ED598' }}>50</div>
                </div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: '#F4F6F8' }}>Odziv servera</div>
                  <div style={{ fontSize: 11, color: 'rgba(244,246,248,.5)', marginTop: 2 }}>mrt.ba, u milisekundama</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 34, marginTop: 16 }}>
                <span style={{ flex: 1, height: '40%', borderRadius: 3, background: 'rgba(87,180,255,.35)' }} />
                <span style={{ flex: 1, height: '62%', borderRadius: 3, background: 'rgba(87,180,255,.5)' }} />
                <span style={{ flex: 1, height: '80%', borderRadius: 3, background: 'rgba(87,180,255,.7)' }} />
                <span style={{ flex: 1, height: '100%', borderRadius: 3, background: '#57B4FF' }} />
              </div>
            </div>
          </div>

          {/* oznaka: OLX oglasi */}
          <div className="stage-chip stage-chip-conv stage-aside">
            <div className="chip" style={{ animation: 'wshFloat 6s ease-in-out infinite' }}>
              <span className="font-display" style={{ fontWeight: 600, fontSize: 15, color: '#3ED598' }}>4.300+</span>
              <span style={{ fontSize: 11.5, color: 'rgba(244,246,248,.62)' }}>OLX oglasa</span>
            </div>
          </div>

          {/* oznaka: artikli */}
          <div className="stage-chip stage-chip-live stage-aside">
            <div className="chip" style={{ animation: 'wshFloat2 7s ease-in-out infinite' }}>
              <span className="badge__dot" />
              <span style={{ fontSize: 11.5, color: 'rgba(244,246,248,.72)', fontWeight: 500 }}>7.400+ artikala</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

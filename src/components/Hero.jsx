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
            Dostupni za nove projekte · Ljeto 2026
          </span>

          <h1 className="hero__title" data-reveal data-reveal-delay="70">
            Web stranice koje izgledaju premium,
            <br />
            brzo se učitavaju i pretvaraju
            <br />
            posjetioce u <span className="grad-text">klijente.</span>
          </h1>

          <p className="hero__sub" data-reveal data-reveal-delay="140">
            WebStudioH dizajnira i gradi moderne web stranice i online trgovine za
            firme koje žele izgledati ozbiljno, prodavati više i istaknuti se online.
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

        {/* floating cards stage */}
        <div className="hero__stage">
          {/* main landing card */}
          <div className="stage-card stage-main">
            <div className="glass">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 15, height: 15, borderRadius: 5, background: 'linear-gradient(150deg,#1287F2,#0C63D6)' }} />
                  <span style={{ width: 52, height: 7, borderRadius: 4, background: 'rgba(255,255,255,.5)' }} />
                </div>
                <div style={{ display: 'flex', gap: 14 }}>
                  <span style={{ width: 30, height: 6, borderRadius: 3, background: 'rgba(255,255,255,.22)' }} />
                  <span style={{ width: 30, height: 6, borderRadius: 3, background: 'rgba(255,255,255,.22)' }} />
                  <span style={{ width: 30, height: 6, borderRadius: 3, background: 'rgba(255,255,255,.22)' }} />
                </div>
                <span style={{ width: 58, height: 20, borderRadius: 6, background: 'linear-gradient(180deg,#48ABFF,#1287F2)' }} />
              </div>
              <div style={{ width: '78%', height: 15, borderRadius: 6, background: 'rgba(255,255,255,.85)', marginBottom: 9 }} />
              <div style={{ width: '56%', height: 15, borderRadius: 6, background: 'rgba(255,255,255,.55)', marginBottom: 14 }} />
              <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                <span style={{ width: 96, height: 26, borderRadius: 8, background: 'linear-gradient(180deg,#48ABFF,#1287F2)' }} />
                <span style={{ width: 88, height: 26, borderRadius: 8, border: '1px solid rgba(255,255,255,.2)' }} />
              </div>
              <div style={{ height: 118, borderRadius: 12, background: 'repeating-linear-gradient(45deg, rgba(255,255,255,.05) 0 11px, rgba(255,255,255,.02) 11px 22px)', border: '1px solid rgba(255,255,255,.06)' }} />
            </div>
          </div>

          {/* shop card — front left */}
          <div className="stage-card stage-shop stage-aside">
            <div className="glass--tight" style={{ padding: 14 }}>
              <div style={{ height: 104, borderRadius: 11, background: 'repeating-linear-gradient(45deg, rgba(87,180,255,.14) 0 11px, rgba(87,180,255,.05) 11px 22px)', border: '1px solid rgba(255,255,255,.07)', marginBottom: 12 }} />
              <div style={{ width: '64%', height: 11, borderRadius: 5, background: 'rgba(255,255,255,.7)', marginBottom: 8 }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="font-display" style={{ fontWeight: 600, fontSize: 16, color: '#57B4FF' }}>$129</span>
                <span style={{ padding: '6px 12px', borderRadius: 8, background: 'linear-gradient(180deg,#48ABFF,#1287F2)', color: '#fff', fontSize: 11, fontWeight: 600 }}>Dodaj u korpu</span>
              </div>
            </div>
          </div>

          {/* performance card — right */}
          <div className="stage-card stage-perf stage-aside">
            <div className="glass--tight" style={{ padding: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 58, height: 58, borderRadius: '50%', background: 'conic-gradient(#3ED598 0% 96%, rgba(255,255,255,.1) 96% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="font-display" style={{ width: 44, height: 44, borderRadius: '50%', background: '#12151b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 17, color: '#3ED598' }}>98</div>
                </div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: '#F4F6F8' }}>Performanse</div>
                  <div style={{ fontSize: 11, color: 'rgba(244,246,248,.5)', marginTop: 2 }}>PageSpeed rezultat</div>
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

          {/* conversions chip */}
          <div className="stage-chip stage-chip-conv stage-aside">
            <div className="chip" style={{ animation: 'wshFloat 6s ease-in-out infinite' }}>
              <span className="font-display" style={{ fontWeight: 600, fontSize: 15, color: '#3ED598' }}>+142%</span>
              <span style={{ fontSize: 11.5, color: 'rgba(244,246,248,.62)' }}>konverzija</span>
            </div>
          </div>

          {/* live chip */}
          <div className="stage-chip stage-chip-live stage-aside">
            <div className="chip" style={{ animation: 'wshFloat2 7s ease-in-out infinite' }}>
              <span className="badge__dot" />
              <span style={{ fontSize: 11.5, color: 'rgba(244,246,248,.72)', fontWeight: 500 }}>Online za 4 sedmice</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

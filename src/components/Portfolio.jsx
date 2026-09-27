import { Link } from 'react-router-dom'
import { projects } from '../data.js'

function ShopPreview() {
  return (
    <div className="project__preview" style={{ padding: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,.18)' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,.18)' }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,.18)' }} />
        <span style={{ flex: 1 }} />
        <span style={{ width: 120, height: 14, borderRadius: 5, background: 'rgba(255,255,255,.06)' }} />
      </div>
      <div style={{ height: 70, borderRadius: 9, background: 'repeating-linear-gradient(45deg, rgba(87,180,255,.14) 0 10px, rgba(87,180,255,.04) 10px 20px)', marginBottom: 11 }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 9 }}>
        <div style={{ height: 66, borderRadius: 8, background: 'rgba(255,255,255,.05)' }} />
        <div style={{ height: 66, borderRadius: 8, background: 'rgba(255,255,255,.05)' }} />
        <div style={{ height: 66, borderRadius: 8, background: 'rgba(255,255,255,.05)' }} />
      </div>
    </div>
  )
}

function SaasPreview() {
  const bars = [35, 58, 42, 78, 100, 66]
  return (
    <div className="project__preview" style={{ padding: 14, display: 'flex', gap: 11 }}>
      <div style={{ width: 52, background: 'rgba(255,255,255,.04)', borderRadius: 9, padding: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9 }}>
        <span style={{ width: 22, height: 22, borderRadius: 7, background: 'linear-gradient(150deg,#1287F2,#0C63D6)' }} />
        <span style={{ width: 20, height: 6, borderRadius: 3, background: 'rgba(255,255,255,.14)' }} />
        <span style={{ width: 20, height: 6, borderRadius: 3, background: 'rgba(255,255,255,.14)' }} />
        <span style={{ width: 20, height: 6, borderRadius: 3, background: 'rgba(255,255,255,.14)' }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: 9, marginBottom: 11 }}>
          <div style={{ flex: 1, height: 44, borderRadius: 8, background: 'rgba(255,255,255,.05)' }} />
          <div style={{ flex: 1, height: 44, borderRadius: 8, background: 'rgba(255,255,255,.05)' }} />
        </div>
        <div style={{ height: 96, borderRadius: 9, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.05)', padding: 10, display: 'flex', alignItems: 'flex-end', gap: 6 }}>
          {bars.map((h, i) => (
            <span key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: h === 100 ? '#57B4FF' : `rgba(87,180,255,${0.4 + i * 0.04})` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function PortfolioPreview() {
  const tile = {
    height: 64,
    borderRadius: 8,
    background: 'repeating-linear-gradient(45deg, rgba(255,255,255,.06) 0 9px, rgba(255,255,255,.02) 9px 18px)',
  }
  return (
    <div className="project__preview" style={{ padding: 16 }}>
      <div className="font-display" style={{ fontWeight: 600, fontSize: 19, color: 'rgba(255,255,255,.85)', lineHeight: 1.15, marginBottom: 14 }}>
        Atelier
        <br />
        Maison
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
        <div style={tile} />
        <div style={tile} />
        <div style={tile} />
        <div style={tile} />
      </div>
    </div>
  )
}

const previews = {
  shop: ShopPreview,
  saas: SaasPreview,
  portfolio: PortfolioPreview,
}

export default function Portfolio({ preview = false, showHead = true }) {
  const list = preview ? projects.filter((p) => p.url).slice(0, 3) : projects
  const head = preview
    ? { link: '/radovi', linkText: 'Svi radovi →' }
    : { link: '/kontakt', linkText: 'Započni projekat →' }

  return (
    <section id="work" className="work">
      <div className="container">
        {(preview || showHead) && (
          <div className="work__head" data-reveal>
            <div>
              <span className="eyebrow">Odabrani radovi</span>
              <h2 className="section-title">
                Radovi koji izgledaju kako treba i daju rezultate.
              </h2>
            </div>
            <Link className="link-underline" to={head.link}>
              {head.linkText}
            </Link>
          </div>
        )}

        <div className="grid-3">
          {list.map((p, i) => {
            const Preview = previews[p.variant]
            return (
              <Link
                key={p.slug}
                to={`/radovi/${p.slug}`}
                className="project"
                data-reveal
                data-reveal-delay={i * 90}
              >
                {p.image ? (
                  <div className="project__preview project__preview--shot">
                    <img src={p.image} alt={`${p.name}, web stranica`} loading="lazy" />
                  </div>
                ) : (
                  <Preview />
                )}
                <div className="project__foot">
                  <div>
                    <div className="project__tag">{p.tag}</div>
                    <div className="project__name">{p.name}</div>
                  </div>
                  <span className="arrow-circle">→</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

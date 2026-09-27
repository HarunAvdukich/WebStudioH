import { useParams, Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import FinalCta from '../components/FinalCta.jsx'
import Barcode from '../components/Barcode.jsx'
import Icon from '../components/Icon.jsx'
import NotFound from './NotFound.jsx'
import { projects, publishedTestimonials, syncProof } from '../data.js'

export default function CaseStudyPage() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]
  if (!project) return <NotFound />

  const testimonial = publishedTestimonials.find((t) => t.project === slug)

  return (
    <>
      <Seo title={`${project.name} · ${project.tag}`} path={`/radovi/${project.slug}`} description={project.summary} />
      <PageHero title={project.name} subtitle={project.summary} />

      <section className="band band--shelf">
        <div className="container">
          <div className="case__grid">
            <div className="case__media">
              {project.image ? (
                <div className="case__shot">
                  <img src={project.image} alt={`${project.name}, web stranica`} width="1200" height="769" />
                </div>
              ) : (
                <div className="case__shot">
                  <div className="work-tag__soon" style={{ borderBottom: 0 }}>
                    U izradi
                  </div>
                </div>
              )}

              {slug === 'mrt' && (
                <figure className="tag proof-tag" style={{ margin: 0 }}>
                  <header className="tag__head tag__head--ink">
                    <strong>Isti artikal na OLX-u</strong>
                    <span>{syncProof.olx.code}</span>
                  </header>
                  <div className="tag__shot proof-tag__shot">
                    <img src={syncProof.olx.image} alt="OLX oglas prodavca MotorRemont za kosilicu Stiga Combi 53 SQ" width="960" height="420" loading="lazy" />
                  </div>
                  <figcaption className="tag__foot">
                    <div className="price price--red">
                      <small>Objavljeno automatski</small>
                      <strong>{syncProof.price}</strong>
                    </div>
                    <span className="mono" style={{ fontSize: 13, fontWeight: 600 }}>Snimljeno {syncProof.date}</span>
                  </figcaption>
                </figure>
              )}

              {testimonial && (
                <figure className="slip-wrap">
                  <div className="slip">
                    <div className="slip__head">
                      <span>Recenzija</span>
                      <span>{testimonial.name}</span>
                    </div>
                    <blockquote>{testimonial.quote}</blockquote>
                    <figcaption className="slip__sign">
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.role}</span>
                    </figcaption>
                  </div>
                </figure>
              )}
            </div>

            <article className="tag case__spec">
              <header className="tag__head tag__head--ink">
                <strong>{project.name}</strong>
                <span>{project.tag}</span>
              </header>
              <div className="tag__body" style={{ display: 'grid', gap: 18 }}>
                <p className="case__overview">{project.overview}</p>
                <div>
                  <h2 className="tag__name" style={{ fontSize: 26, marginBottom: 8 }}>
                    Šta smo isporučili
                  </h2>
                  <ul className="checks">
                    {project.highlights.map((h) => (
                      <li key={h}>
                        <Icon name="check" size={18} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <footer className="tag__foot">
                {project.url ? (
                  <a className="btn btn--red" href={project.url} target="_blank" rel="noopener noreferrer">
                    Posjeti sajt
                    <Icon name="out" size={20} />
                  </a>
                ) : (
                  <span className="case__soon">Sajt je u pripremi za objavu.</span>
                )}
                <Barcode code={`38700430000${index + 1}`} className="barcode--sm" />
              </footer>
            </article>
          </div>

          <div className="case__back">
            <Link className="text-link" to="/radovi">
              <Icon name="back" size={18} />
              Svi radovi
            </Link>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  )
}

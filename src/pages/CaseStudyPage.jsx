import { useParams, Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import FinalCta from '../components/FinalCta.jsx'
import NotFound from './NotFound.jsx'
import { projects, publishedTestimonials } from '../data.js'

export default function CaseStudyPage() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  if (!project) return <NotFound />

  const testimonial = publishedTestimonials.find((t) => t.project === slug)

  return (
    <>
      <Seo
        title={`${project.name} · ${project.tag}`}
        path={`/radovi/${project.slug}`}
        description={project.summary}
      />
      <PageHero eyebrow={project.tag} title={project.name} subtitle={project.summary} />

      <section className="case">
        <div className="container">
          <div className="case__media" data-reveal>
            {project.image ? (
              <img src={project.image} alt={`${project.name}, web stranica`} />
            ) : (
              <div className="case__media-ph">
                <span className="font-display">{project.name}</span>
                <span className="case__media-ph-note">Vizual uskoro</span>
              </div>
            )}
          </div>

          <div className="case__grid">
            <div className="case__overview" data-reveal>
              <span className="eyebrow">Pregled projekta</span>
              <p>{project.overview}</p>
              {project.url ? (
                <a
                  className="btn btn--md btn--primary"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Posjeti sajt ↗
                </a>
              ) : (
                <span className="case__soon">Sajt je u pripremi za objavu.</span>
              )}
            </div>

            <aside className="case__panel" data-reveal data-reveal-delay="90">
              <span className="case__panel-title">Šta smo isporučili</span>
              <div className="case__feats">
                {project.highlights.map((h) => (
                  <div key={h} className="feat">
                    <span className="feat__check">
                      <i />
                    </span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          {testimonial && (
            <figure className="case__quote" data-reveal>
              <div className="tst-card__stars" aria-label="Ocjena 5 od 5">
                ★★★★★
              </div>
              <blockquote>“{testimonial.quote}”</blockquote>
              <figcaption className="tst-card__author">
                <span className="tst-card__avatar" aria-hidden="true">
                  {testimonial.initials}
                </span>
                <span className="tst-card__meta">
                  <span className="tst-card__name">{testimonial.name}</span>
                  <span className="tst-card__role">{testimonial.role}</span>
                </span>
              </figcaption>
            </figure>
          )}

          <div className="case__back" data-reveal>
            <Link className="link-underline" to="/radovi">
              ← Svi radovi
            </Link>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  )
}

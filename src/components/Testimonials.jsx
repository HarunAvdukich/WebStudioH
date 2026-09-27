import { publishedTestimonials } from '../data.js'

export default function Testimonials({
  eyebrow = 'Recenzije',
  title = 'Ono što kažu naši klijenti.',
}) {
  if (publishedTestimonials.length === 0) return null

  return (
    <section className="tst">
      <div className="container">
        <div className="tst__head" data-reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section-title">{title}</h2>
        </div>

        <div className="grid-3">
          {publishedTestimonials.map((t, i) => (
            <figure
              key={t.name}
              className="tst-card"
              data-reveal
              data-reveal-delay={i * 90}
            >
              <div className="tst-card__stars" aria-label="Ocjena 5 od 5">
                ★★★★★
              </div>
              <blockquote className="tst-card__quote">“{t.quote}”</blockquote>
              <figcaption className="tst-card__author">
                <span className="tst-card__avatar" aria-hidden="true">
                  {t.initials}
                </span>
                <span className="tst-card__meta">
                  <span className="tst-card__name">{t.name}</span>
                  <span className="tst-card__role">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

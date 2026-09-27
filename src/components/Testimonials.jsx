import { publishedTestimonials } from '../data.js'

// Recenzije kao isječci termo papira: tekst klijenta i potpis firme.
export default function Testimonials({ title = 'Ono što kažu naši klijenti.' }) {
  if (publishedTestimonials.length === 0) return null

  return (
    <section className="band band--shelf">
      <div className="container">
        <div className="sec-head">
          <h2 className="section-title">{title}</h2>
        </div>

        <div className="slips">
          {publishedTestimonials.map((t) => (
            <figure key={t.name} className="slip-wrap" style={{ margin: 0 }}>
              <div className="slip">
                <div className="slip__head">
                  <span>Recenzija</span>
                  <span>{t.name}</span>
                </div>
                <blockquote>{t.quote}</blockquote>
                <figcaption className="slip__sign">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

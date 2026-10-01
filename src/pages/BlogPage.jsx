import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import FinalCta from '../components/FinalCta.jsx'
import { posts } from '../posts.js'
import { formatDate } from '../data.js'

export default function BlogPage() {
  return (
    <>
      <Seo
        title="Savjeti o web stranicama i online prodaji"
        path="/savjeti"
        description="Savjeti i vodiči o web stranicama, online trgovinama, SEO-u i cijenama, jednostavnim jezikom."
      />
      <PageHero
        eyebrow="Savjeti"
        title="Vodiči i savjeti za bolji web."
        subtitle="Praktični tekstovi o web stranicama, online prodaji i tome kako izvući najviše iz svog online prisustva."
      />

      <section className="blog">
        <div className="container blog__grid">
          {posts.map((p, i) => (
            <Link
              key={p.slug}
              to={`/savjeti/${p.slug}`}
              className="post-card"
              data-reveal
              data-reveal-delay={i * 90}
            >
              <div className="post-card__meta">
                <span>{formatDate(p.date)}</span>
                <span className="post-card__dot" />
                <span>{p.read} čitanja</span>
              </div>
              <h2 className="post-card__title">{p.title}</h2>
              <p className="post-card__excerpt">{p.excerpt}</p>
              <span className="post-card__more">Pročitaj →</span>
            </Link>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  )
}

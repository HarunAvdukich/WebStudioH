import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import FinalCta from '../components/FinalCta.jsx'
import Icon from '../components/Icon.jsx'
import { posts } from '../posts.js'
import { formatDate } from '../data.js'

export default function BlogPage() {
  return (
    <>
      <Seo
        title="Savjeti"
        path="/savjeti"
        description="Savjeti i vodiči o web stranicama, online trgovinama, SEO-u i cijenama, jednostavnim jezikom."
      />
      <PageHero
        title="Vodiči i savjeti za bolji web."
        subtitle="Praktični tekstovi o web stranicama, online prodaji i tome kako izvući najviše iz svog online prisustva."
      />

      <section className="band band--paper">
        <div className="container">
          <ul className="leaflet">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link to={`/savjeti/${p.slug}`}>
                  <span className="leaflet__meta">
                    {formatDate(p.date)}
                    <br />
                    {p.read} čitanja
                  </span>
                  <span>
                    <span className="leaflet__title" style={{ display: 'block' }}>
                      {p.title}
                    </span>
                    <span className="leaflet__excerpt" style={{ display: 'block', marginTop: 10 }}>
                      {p.excerpt}
                    </span>
                  </span>
                  <span className="text-link">
                    Pročitaj
                    <Icon name="arrow" size={18} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  )
}

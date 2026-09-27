import { Head } from 'vite-react-ssg'
import Icon from './Icon.jsx'

export default function Faq({ title = 'Pitanja koja najčešće dobijamo.', items }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  }

  return (
    <section className="band band--shelf">
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>
      <div className="container faq__grid">
        <h2 className="section-title">{title}</h2>
        <div>
          {items.map((it) => (
            <details key={it.q} className="faq-item">
              <summary>
                {it.q}
                <Icon name="plus" size={22} />
              </summary>
              <p>{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

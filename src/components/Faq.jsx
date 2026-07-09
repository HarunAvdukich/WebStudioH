import { Head } from 'vite-react-ssg'

export default function Faq({
  eyebrow = 'Česta pitanja',
  title = 'Pitanja koja najčešće dobijamo.',
  items,
}) {
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
    <section className="faq">
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>
      <div className="container faq__wrap">
        <div className="faq__head" data-reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="section-title">{title}</h2>
        </div>

        <div className="faq__list">
          {items.map((it, i) => (
            <details
              key={it.q}
              className="faq-item"
              data-reveal
              data-reveal-delay={i * 60}
            >
              <summary className="faq-item__q">
                {it.q}
                <span className="faq-item__icon" aria-hidden="true" />
              </summary>
              <div className="faq-item__a">{it.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

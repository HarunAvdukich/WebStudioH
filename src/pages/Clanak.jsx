import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import Seo from '../components/Seo.jsx'
import { clanak as clanakLd, mrvice } from '../components/JsonLd.jsx'
import Citanje from '../components/stranica/Citanje.jsx'
import ZavrsniPoziv from '../components/stranica/ZavrsniPoziv.jsx'
import NotFound from './NotFound.jsx'
import { posts } from '../posts.js'
import { formatDate } from '../data.js'
import { popuni } from '../lib/whatsapp.js'
import { clanak as t, poziv } from '../stranice/savjeti.js'
import '../components/stranica/stranica.css'
import '../components/savjeti/savjeti.css'

// Članak (/savjeti/<slug>): napredak čitanja i oznaka dijela, naslovi dijelova izranjaju,
// a na kraju je završni poziv. Tekst je u src/content/posts/<slug>.md.
export default function Clanak() {
  const { slug } = useParams()
  const ref = useRef(null)
  const post = posts.find((p) => p.slug === slug)
  if (!post) return <NotFound />

  return (
    <div className="st st-clanak">
      <Seo
        title={post.seoTitle || post.title}
        path={`/savjeti/${post.slug}`}
        description={post.excerpt}
        tip="article"
        podaci={[
          clanakLd(post),
          mrvice([
            { ime: t.mrvice.pocetna, path: '/' },
            { ime: t.mrvice.savjeti, path: '/savjeti' },
            { ime: post.title, path: `/savjeti/${post.slug}` },
          ]),
        ]}
      />
      <Head>
        <meta property="article:published_time" content={post.date} />
        {post.updated && <meta property="article:modified_time" content={post.updated} />}
      </Head>
      {post.naslovi.length > 0 && <Citanje clanak={ref} naslovi={post.naslovi} minuta={post.minuta} t={t} />}

      <header className="cl-vrh">
        <div className="st-vrh__sjaj" aria-hidden="true" />
        <div className="st-sirina cl-vrh__in">
          <nav className="sd-mrvice" aria-label={t.mrvice.savjeti}>
            <Link to="/savjeti">← {t.svi}</Link>
          </nav>
          <p className="st-nad">{t.mrvice.savjeti}</p>
          <h1 className="st-h1 cl-vrh__h1">{post.title}</h1>
          <p className="st-uvod cl-vrh__uvod">{post.excerpt}</p>
          <p className="cl-vrh__meta">
            {t.objavljeno} {formatDate(post.date)}
            {post.updated && post.updated !== post.date && (
              <>
                {' · '}
                {t.dopunjeno} {formatDate(post.updated)}
              </>
            )}
            {' · '}
            {popuni(t.citanja, { n: post.read })}
          </p>
        </div>
      </header>

      <section className="st-tekst-dio">
        <div className="st-sirina">
          <article className="st-tekst" ref={ref} dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </section>

      <ZavrsniPoziv {...poziv} />
    </div>
  )
}

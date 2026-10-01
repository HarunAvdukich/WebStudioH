import { useParams, Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import Seo from '../components/Seo.jsx'
import { clanak, mrvice } from '../components/JsonLd.jsx'
import PageHero from '../components/PageHero.jsx'
import FinalCta from '../components/FinalCta.jsx'
import NotFound from './NotFound.jsx'
import { posts } from '../posts.js'
import { formatDate } from '../data.js'

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)
  if (!post) return <NotFound />

  return (
    <>
      <Seo
        title={post.seoTitle || post.title}
        path={`/savjeti/${post.slug}`}
        description={post.excerpt}
        tip="article"
        podaci={[
          clanak(post),
          mrvice([
            { ime: 'Početna', path: '/' },
            { ime: 'Savjeti', path: '/savjeti' },
            { ime: post.title, path: `/savjeti/${post.slug}` },
          ]),
        ]}
      />
      <Head>
        <meta property="article:published_time" content={post.date} />
        {post.updated && <meta property="article:modified_time" content={post.updated} />}
      </Head>

      <PageHero eyebrow="Savjeti" title={post.title} subtitle={post.excerpt} />

      <article className="post">
        <div className="container post__wrap">
          <div className="post__meta" data-reveal>
            {formatDate(post.date)}
            {post.updated && post.updated !== post.date && <> · dopunjeno {formatDate(post.updated)}</>} ·{' '}
            {post.read} čitanja
          </div>
          <div
            className="post__body"
            data-reveal
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <div className="post__foot" data-reveal>
            <Link className="link-underline" to="/savjeti">
              ← Svi savjeti
            </Link>
            <Link className="btn btn--md btn--primary" to="/kontakt">
              Započni projekat →
            </Link>
          </div>
        </div>
      </article>

      <FinalCta />
    </>
  )
}

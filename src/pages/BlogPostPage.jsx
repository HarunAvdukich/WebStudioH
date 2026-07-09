import { useParams, Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import Seo from '../components/Seo.jsx'
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
      <Seo title={post.title} path={`/savjeti/${post.slug}`} description={post.excerpt} />
      <Head>
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
      </Head>

      <PageHero eyebrow="Savjeti" title={post.title} subtitle={post.excerpt} />

      <article className="post">
        <div className="container post__wrap">
          <div className="post__meta" data-reveal>
            {formatDate(post.date)} · {post.read} čitanja
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

import { useParams, Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import Seo from '../components/Seo.jsx'
import PageHero from '../components/PageHero.jsx'
import FinalCta from '../components/FinalCta.jsx'
import Icon from '../components/Icon.jsx'
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

      <PageHero title={post.title} subtitle={post.excerpt} />

      <section className="band band--shelf">
        <div className="container">
          <article className="article">
            <p className="article__meta">
              {formatDate(post.date)} · {post.read} čitanja
            </p>
            <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
            <div className="article__foot">
              <Link className="text-link" to="/savjeti">
                <Icon name="back" size={18} />
                Svi savjeti
              </Link>
              <Link className="btn btn--red" to="/kontakt">
                Započni projekat
                <Icon name="arrow" className="icon--arrow" />
              </Link>
            </div>
          </article>
        </div>
      </section>

      <FinalCta />
    </>
  )
}

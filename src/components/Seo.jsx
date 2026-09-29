import { Head } from 'vite-react-ssg'

export const SITE_NAME = 'Hunar'
export const SITE_URL = 'https://hunar.ba'
const DEFAULT_DESC =
  'Hunar pravi web stranice, web trgovine i sisteme za zakazivanje za firme u BiH, povezane sa OLX-om, Ananasom i dobavljačima.'

/**
 * Per-page <head> (title, description, canonical, Open Graph).
 * Uses vite-react-ssg's <Head> so tags are baked into the prerendered HTML.
 */
// Map a route path to its generated OG image (flat filename under /og/).
function ogImageFor(path) {
  if (!path || path === '/') return '/og/home.jpg'
  return `/og/${path.slice(1).replace(/\//g, '-')}.jpg`
}

export default function Seo({ title, description = DEFAULT_DESC, path = '', image, noindex = false }) {
  const fullTitle = title
    ? `${title} · ${SITE_NAME}`
    : `${SITE_NAME} · Web stranice, trgovine i sistemi`
  const url = SITE_URL + path
  const ogImage = SITE_URL + (image || ogImageFor(path))

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  )
}

import { Head } from 'vite-react-ssg'

export const SITE_NAME = 'Hunar'
export const SITE_URL = 'https://hunar.ba'
const DEFAULT_DESC =
  'Hunar je web studio iz BiH. Pravimo web stranice, web trgovine i sisteme po mjeri, povezane sa OLX-om, Ananasom i dobavljačima.'

/**
 * Per-page <head> (title, description, canonical, Open Graph).
 * Uses vite-react-ssg's <Head> so tags are baked into the prerendered HTML.
 */
// Map a route path to its generated OG image (flat filename under /og/).
export function ogImageFor(path) {
  if (!path || path === '/') return '/og/home.jpg'
  return `/og/${path.slice(1).replace(/\//g, '-')}.jpg`
}

// jezik: jezik stranice (lang na <html>); verzije: ista stranica na drugim jezicima,
// npr. [{ jezik: 'bs', path: '/' }, { jezik: 'en', path: '/en' }] (hreflang).
// tip: og:type ('website' ili 'article'); podaci: JSON-LD objekti samo za ovu stranicu.
export default function Seo({
  title,
  punNaslov,
  description = DEFAULT_DESC,
  path = '',
  image,
  noindex = false,
  jezik = 'bs',
  verzije,
  tip = 'website',
  podaci = [],
}) {
  const fullTitle = punNaslov
    ? punNaslov
    : title
      ? `${title} · ${SITE_NAME}`
      : `${SITE_NAME} · Web stranice, trgovine i sistemi za firme u BiH`
  const url = SITE_URL + path
  const ogImage = SITE_URL + (image || ogImageFor(path))

  return (
    <Head>
      <html lang={jezik} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {/* Stranica koja se ne indeksira nema canonical ni jezičke verzije. */}
      {noindex && <meta name="robots" content="noindex" />}
      {!noindex && <link rel="canonical" href={url} />}
      {!noindex &&
        verzije?.map((v) => (
          <link key={v.jezik} rel="alternate" hrefLang={v.jezik} href={SITE_URL + v.path} />
        ))}
      {!noindex && verzije && <link rel="alternate" hrefLang="x-default" href={SITE_URL + verzije[0].path} />}
      <meta property="og:type" content={tip} />
      <meta property="og:locale" content={jezik === 'en' ? 'en_US' : 'bs_BA'} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {!noindex && <meta property="og:url" content={url} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage} />
      {podaci.map((d, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(d)}</script>
      ))}
    </Head>
  )
}

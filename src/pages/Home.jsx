import Seo from '../components/Seo.jsx'
import KrozZnak from '../components/pocetna/KrozZnak.jsx'
import * as bosanski from '../pocetna.js'

export const VERZIJE_POCETNE = [
  { jezik: 'bs', path: '/' },
  { jezik: 'en', path: '/en' },
]

export default function Home() {
  return (
    <>
      <Seo path="/" punNaslov={bosanski.seo.naslov} description={bosanski.seo.opis} jezik="bs" verzije={VERZIJE_POCETNE} />
      <KrozZnak t={bosanski} />
    </>
  )
}

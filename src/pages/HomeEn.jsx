import Seo from '../components/Seo.jsx'
import KrozZnak from '../components/pocetna/KrozZnak.jsx'
import * as english from '../pocetna.en.js'
import { VERZIJE_POCETNE } from './Home.jsx'

// Engleska početna: isti dizajn, tekst iz pocetna.en.js.
export default function HomeEn() {
  return (
    <>
      <Seo path="/en" punNaslov={english.seo.naslov} description={english.seo.opis} image="/og/home.jpg" jezik="en" verzije={VERZIJE_POCETNE} />
      <KrozZnak t={english} />
    </>
  )
}

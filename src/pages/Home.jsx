import Seo from '../components/Seo.jsx'
import KrozZnak from '../components/pocetna/KrozZnak.jsx'
import { seo } from '../pocetna.js'

export default function Home() {
  return (
    <>
      <Seo path="/" punNaslov={seo.naslov} description={seo.opis} />
      <KrozZnak />
    </>
  )
}

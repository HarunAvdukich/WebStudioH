import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useReveal } from './hooks/useReveal.js'
import ScrollToTop from './components/ScrollToTop.jsx'
import '@fontsource-variable/urbanist'
import './components/okvir/okvir.css'
import Zaglavlje from './components/okvir/Zaglavlje.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFab from './components/WhatsAppFab.jsx'
import JsonLd from './components/JsonLd.jsx'
import { pokreniPokrete } from './lib/pokreti/pokretac.js'
import './lib/pokreti/pokreti.css'
import { pratiNaslovKartice } from './lib/naslovKartice.js'
import { naslovKartice } from './okvir.js'

export default function App() {
  const { pathname } = useLocation()
  // re-run scroll-reveal whenever the page changes
  useReveal(pathname)
  // Nova početna (bosanska i engleska) ima svoje zaglavlje i podnožje; ostale stranice
  // su još u starom izgledu.
  const pocetna = pathname === '/' || pathname === '/en' || pathname === '/en/'
  const engleski = pathname === '/en' || pathname.startsWith('/en/')

  // Male animacije (data-pokret) poslije svake promjene stranice.
  useEffect(() => pokreniPokrete(document), [pathname])
  // Naslov kartice poziva nazad kad posjetilac ode na drugu karticu.
  useEffect(() => pratiNaslovKartice(document, engleski ? naslovKartice.en : naslovKartice.bs), [engleski])

  // Vlastiti kursor samo za miš; kod se učita tek na prvi pokret miša.
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    let ugasi
    let gotovo = false
    const prvi = (e) => {
      if (e.pointerType !== 'mouse') return
      window.removeEventListener('pointermove', prvi)
      import('./lib/kursor.js').then(({ pokreniKursor }) => {
        if (!gotovo) ugasi = pokreniKursor(e)
      })
    }
    window.addEventListener('pointermove', prvi, { passive: true })
    return () => {
      gotovo = true
      window.removeEventListener('pointermove', prvi)
      ugasi?.()
    }
  }, [])

  return (
    <div className="page">
      <JsonLd />
      <ScrollToTop />
      {!pocetna && <Zaglavlje />}
      <main>
        <Outlet />
      </main>
      {!pocetna && <Footer />}
      {!pocetna && <WhatsAppFab />}
    </div>
  )
}

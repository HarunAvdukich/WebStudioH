import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useReveal } from './hooks/useReveal.js'
import ScrollToTop from './components/ScrollToTop.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFab from './components/WhatsAppFab.jsx'
import JsonLd from './components/JsonLd.jsx'

export default function App() {
  const { pathname } = useLocation()
  // re-run scroll-reveal whenever the page changes
  useReveal(pathname)
  // Nova početna (bosanska i engleska) ima svoje zaglavlje i podnožje; ostale stranice
  // su još u starom izgledu.
  const pocetna = pathname === '/' || pathname === '/en' || pathname === '/en/'

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
      {!pocetna && <Nav />}
      <main>
        <Outlet />
      </main>
      {!pocetna && <Footer />}
      {!pocetna && <WhatsAppFab />}
    </div>
  )
}

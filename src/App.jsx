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

  return (
    <div className="page">
      <JsonLd />
      <ScrollToTop />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  )
}

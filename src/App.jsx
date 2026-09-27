import { Outlet } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFab from './components/WhatsAppFab.jsx'
import JsonLd from './components/JsonLd.jsx'

export default function App() {
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

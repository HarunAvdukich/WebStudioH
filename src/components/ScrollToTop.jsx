import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { glatko } from '../lib/glatkiSkrol.js'

/**
 * Scrolls to the top of the page whenever the route changes, so navigating
 * between pages always starts at the top (instant, ignoring smooth-scroll).
 * Glatki skrol (Lenis) se vrati na vrh odmah, bez klizanja.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    glatko.lenis?.scrollTo(0, { immediate: true, force: true })
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

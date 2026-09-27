import { useEffect, useState } from 'react'
import { contact } from '../data.js'
import { WhatsAppIcon } from './Icon.jsx'

// Pojavi se tek kad glavno WhatsApp dugme ode sa ekrana, da ne prekriva etiketu mrt.ba.
export default function WhatsAppFab() {
  const [shown, setShown] = useState(false)
  const href = `${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappText)}`

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 640)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      className={`wa-fab${shown ? ' is-shown' : ''}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Piši nam na WhatsApp"
      tabIndex={shown ? 0 : -1}
    >
      <WhatsAppIcon size={28} />
    </a>
  )
}

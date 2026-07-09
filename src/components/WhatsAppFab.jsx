import { contact } from '../data.js'

export default function WhatsAppFab() {
  const href = `${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappText)}`
  return (
    <a
      className="wa-fab"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Piši nam na WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.6 5.9L4 29l8.3-1.6c1.7.9 3.6 1.4 5.7 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-4.9 1 .9-4.8-.3-.4C5.4 18 5 16.5 5 15 5 8.9 9.9 4 16 4s11 4.9 11 11-4.9 9.8-11 9.8zm5.6-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.2-.6-.4z"
        />
      </svg>
      <span className="wa-fab__label">WhatsApp</span>
    </a>
  )
}

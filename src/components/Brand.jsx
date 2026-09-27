import { Link } from 'react-router-dom'

// Logotip kao dvije naljepnice: crna sa imenom, crvena sa slovom H.
export default function Brand({ onDark = false }) {
  return (
    <Link className={`brand${onDark ? ' brand--on-dark' : ''}`} to="/" aria-label="WebStudioH, početna">
      <span className="brand__word" aria-hidden="true">WebStudio</span>
      <span className="brand__h" aria-hidden="true">H</span>
    </Link>
  )
}

import { Link } from 'react-router-dom'
import logo from '/webstudioh-logo.webp'

export default function Brand({ compact = false }) {
  return (
    <Link className="brand" to="/" aria-label="WebStudioH, početna">
      <img
        className={`brand__logo${compact ? ' brand__logo--sm' : ''}`}
        src={logo}
        alt="WebStudioH"
        width={900}
        height={185}
      />
    </Link>
  )
}

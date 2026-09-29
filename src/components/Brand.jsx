import { Link } from 'react-router-dom'

// Logo Hunar: znak (u i n, n je u okrenut za 180°) je smaragdni, slova su
// currentColor. Geometrija se pravi skriptom u Documents\Hunar\logo, ne ručno.
const ZNAK =
  'M0.0,0 V159.0 A149.0,149.0 0 0 0 298.0,159.0 V96.0 A57.0,57.0 0 0 0 220.0,149.0 V159.0 A71.0,71.0 0 0 1 78.0,159.0 V0 Z'
const SLOVA =
  'M0.0,0.0 H24.0 V142.0 H0.0 Z M72.0,90.0 H96.0 V142.0 H72.0 Z M0.0,90.0 A48.0,48.0 0 0 1 96.0,90.0 L72.0,90.0 A24.0,24.0 0 0 0 24.0,90.0 Z M121.2,42.0 H145.2 V94.0 H121.2 Z M193.2,42.0 H217.2 V142.0 H193.2 Z M217.2,94.0 A48.0,48.0 0 0 1 121.2,94.0 L145.2,94.0 A24.0,24.0 0 0 0 193.2,94.0 Z M242.4,42.0 H266.4 V142.0 H242.4 Z M314.4,90.0 H338.4 V142.0 H314.4 Z M242.4,90.0 A48.0,48.0 0 0 1 338.4,90.0 L314.4,90.0 A24.0,24.0 0 0 0 266.4,90.0 Z M462.2,92.0 A51.2,51.2 0 0 1 359.8,92.0 L383.8,92.0 A27.2,27.2 0 0 0 438.2,92.0 Z M359.8,92.0 A51.2,51.2 0 0 1 462.2,92.0 L438.2,92.0 A27.2,27.2 0 0 0 383.8,92.0 Z M438.2,42.0 H462.2 V142.0 H438.2 Z M487.4,42.0 H511.4 V142.0 H487.4 Z M487.4,88.2 A46.2,46.2 0 0 1 549.4,44.7 L541.2,67.3 A22.2,22.2 0 0 0 511.4,88.2 Z'

export function HunarLogo({ className }) {
  return (
    <svg className={className} viewBox="0 0 573.7 124" role="img" aria-label="Hunar" focusable="false">
      <g transform="translate(2,2) scale(0.38961)" fill="#0E8A64">
        <path d={ZNAK} />
        <path d={ZNAK} transform="rotate(180 213 154)" />
      </g>
      <path d={SLOVA} fill="currentColor" transform="translate(206.37,20.82) scale(0.6592)" />
    </svg>
  )
}

export function HunarZnak({ className }) {
  return (
    <svg className={className} viewBox="0 0 426 308" aria-hidden="true" focusable="false">
      <g fill="#0E8A64">
        <path d={ZNAK} />
        <path d={ZNAK} transform="rotate(180 213 154)" />
      </g>
    </svg>
  )
}

export default function Brand({ compact = false }) {
  return (
    <Link className="brand" to="/" aria-label="Hunar, početna">
      <HunarLogo className={`brand__logo${compact ? ' brand__logo--sm' : ''}`} />
    </Link>
  )
}

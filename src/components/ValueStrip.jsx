import { valueProps } from '../data.js'

// Male etikete okačene o nosač, na dnu žutog pojasa.
export default function ValueStrip() {
  return (
    <div className="strip">
      <div className="container">
        <div className="rail" aria-hidden="true" />
        <ul className="strip__tags" aria-label="Šta trgovina radi">
          {valueProps.map((v) => (
            <li key={v} className="mini-tag hang">
              {v}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

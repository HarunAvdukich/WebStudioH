import { includes } from '../data.js'

// Spisak stavki na termo papiru: šta je uključeno, bez iznosa.
export default function Includes({
  title = 'U svaki paket, bez doplate.',
  sub = 'Uvijek uključeno',
  items = includes,
  total = 'Bez doplate',
}) {
  return (
    <div className="receipt-wrap">
      <div className="receipt">
        <p className="receipt__title">{title}</p>
        <p className="receipt__sub">{sub}</p>
        <ul className="receipt__lines">
          {items.map((it) => (
            <li key={it}>
              <span className="qty">1 ×</span>
              <span className="item">{it}</span>
              <span className="leader" aria-hidden="true" />
            </li>
          ))}
        </ul>
        <p className="receipt__total">
          <span>Ukupno</span>
          <span>{total}</span>
        </p>
      </div>
    </div>
  )
}

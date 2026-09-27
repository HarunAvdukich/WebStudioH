import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { shelfRows } from './shelf.js'
import { projects } from '../data.js'

const PREVIEW_SPANS = [7, 5, 12]
const FULL_SPANS = [7, 5, 5, 7]

function WorkTag({ p, span }) {
  const wide = span === 12
  return (
    <article className={`tag tag--hang hang work-tag span-${span}${wide ? ' tag--wide' : ''}`}>
      {p.image ? (
        <div className="tag__shot">
          <img src={p.image} alt={`${p.name}, web stranica`} width="1200" height="769" loading="lazy" />
        </div>
      ) : (
        <div className="work-tag__soon">U izradi</div>
      )}
      <div className="tag__main">
        <header className="tag__head">
          <strong>{p.name}</strong>
          <span>{p.tag}</span>
        </header>
        <div className="tag__body">
          <p className="tag__text">{p.summary}</p>
        </div>
        <footer className="tag__foot">
          <Link className="text-link" to={`/radovi/${p.slug}`}>
            {p.url ? 'Pogledaj rad' : 'Više o projektu'}
            <Icon name="arrow" size={18} />
          </Link>
        </footer>
      </div>
      {!p.url && <span className="roundel">Uskoro</span>}
    </article>
  )
}

export default function Portfolio({ preview = false, showHead = true }) {
  const list = preview ? projects.filter((p) => p.url).slice(0, 3) : projects
  const rows = shelfRows(list, preview ? PREVIEW_SPANS : FULL_SPANS)

  return (
    <section className="band band--yellow">
      <div className="container">
        {(preview || showHead) && (
          <div className="sec-head">
            <h2 className="section-title">Radovi koji izgledaju kako treba i daju rezultate.</h2>
            <Link className="text-link" to={preview ? '/radovi' : '/kontakt'}>
              {preview ? 'Svi radovi' : 'Započni projekat'}
              <Icon name="arrow" size={18} />
            </Link>
          </div>
        )}

        {rows.map((row, r) => (
          <div key={r} className="shelf-row">
            {row.map(({ item, span }) => (
              <WorkTag key={item.slug} p={item} span={span} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

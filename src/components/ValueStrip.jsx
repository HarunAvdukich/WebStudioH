import { Fragment } from 'react'
import { valueProps } from '../data.js'

export default function ValueStrip() {
  return (
    <div className="value-strip" data-reveal>
      <div className="container value-strip__inner">
        {valueProps.map((v, i) => (
          <Fragment key={v}>
            {i > 0 && <span className="value-sep" />}
            <span className="value-item">{v}</span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

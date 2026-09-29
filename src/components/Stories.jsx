import Story from './Story.jsx'
import { stories } from '../data.js'

export default function Stories() {
  return (
    <div className="price" id="price">
      <div className="container price__uvod">
        <h2 className="sekcija__naslov">Radovi koji rade</h2>
        <a className="price__preskoci" href="#usluge">Preskoči priče</a>
      </div>
      {stories.map((p) => (
        <Story key={p.id} prica={p} />
      ))}
    </div>
  )
}

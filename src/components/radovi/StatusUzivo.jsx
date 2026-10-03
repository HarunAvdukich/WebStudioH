import { useEffect, useState } from 'react'
import { useOkvir } from '../../lib/useOkvir.js'
import { poslijeInterakcije } from '../../lib/interakcija.js'
import { prije, stanjeSajta } from '../../lib/status.js'

// Jedan zahtjev za cijelu stranicu, tek poslije prve interakcije (ne usporava prvi ekran).
let zahtjev = null
function ucitaj() {
  zahtjev ??= fetch('/api/status', { headers: { Accept: 'application/json' } })
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null)
  return zahtjev
}

// P3: zelena tačka "radi · provjereno prije 3 min" uz trgovinu koju smo napravili. Ako provjera
// nije dostupna ili sajt ne odgovara, ne pokazuje se ništa.
export default function StatusUzivo({ url, className = '' }) {
  const { jezik } = useOkvir()
  const [stanje, setStanje] = useState(null)
  const ime = url ? new URL(url).hostname.replace(/^www\./, '') : null

  useEffect(() => {
    if (!ime) return undefined
    let ziv = true
    const otkazi = poslijeInterakcije(() => {
      ucitaj().then((odgovor) => {
        const s = stanjeSajta(odgovor, ime, Date.now())
        if (ziv && s?.radi) setStanje({ provjereno: odgovor.provjereno })
      })
    })
    return () => {
      ziv = false
      otkazi()
    }
  }, [ime])

  if (!stanje) return null
  return (
    <span className={`su ${className}`}>
      <i aria-hidden="true" />
      {jezik === 'en' ? 'online' : 'radi'} · {prije(stanje.provjereno, Date.now(), jezik)}
    </span>
  )
}

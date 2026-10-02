import { useEffect, useState } from 'react'

// Riječ koja se smjenjuje: stara ode gore, nova dođe odozdo. Bez JavaScripta i uz
// "smanji pokrete" stoji prva riječ; čitač ekrana dobija cijeli spisak.
// Uz `indeks` (broj) riječ stoji na tom mjestu i ne smjenjuje se. `iza` se dodaje iza svake
// riječi (npr. tačka), da stoji uz riječ, a ne iza najduže.
export default function SmjenaRijeci({ rijeci, interval = 2400, indeks, iza = '', className = '' }) {
  const [stanje, setStanje] = useState({ sad: 0, bilo: -1 })
  const vodi = typeof indeks === 'number'

  useEffect(() => {
    if (vodi || !document.documentElement.classList.contains('pokret')) return undefined
    const id = setInterval(() => {
      if (!document.hidden) setStanje(({ sad }) => ({ sad: (sad + 1) % rijeci.length, bilo: sad }))
    }, interval)
    return () => clearInterval(id)
  }, [rijeci, interval, vodi])

  useEffect(() => {
    if (vodi) setStanje(({ sad, bilo }) => (sad === indeks ? { sad, bilo } : { sad: indeks, bilo: sad }))
  }, [vodi, indeks])

  return (
    <span className={`smj ${className}`}>
      <span className="sr-only">
        {rijeci.join(', ')}
        {iza}
      </span>
      <span className="smj__vidljivo" aria-hidden="true">
        {rijeci.map((r, i) => (
          <span key={r} className={`smj__r${i === stanje.sad ? ' je-sad' : ''}${i === stanje.bilo ? ' je-bilo' : ''}`}>
            {r}
            {iza}
          </span>
        ))}
      </span>
    </span>
  )
}

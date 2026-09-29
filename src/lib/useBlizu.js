import { useEffect, useState } from 'react'
import { poslijeInterakcije } from './interakcija.js'

// Postaje true kad je element na manje od jednog ekrana i posjetilac je već
// nešto uradio na stranici. Do tada se slike ispod prvog ekrana ne traže,
// da ne otimaju protok slovima i naslovu.
export function useBlizu(ref, margina = '100%') {
  const [blizu, setBlizu] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || blizu) return undefined
    let io = null
    const otkazi = poslijeInterakcije(() => {
      if (!('IntersectionObserver' in window)) {
        setBlizu(true)
        return
      }
      io = new IntersectionObserver(
        ([u]) => {
          if (!u.isIntersecting) return
          setBlizu(true)
          io.disconnect()
        },
        { rootMargin: `${margina} 0px ${margina} 0px` },
      )
      io.observe(el)
    })
    return () => {
      otkazi()
      io?.disconnect()
    }
  }, [ref, margina, blizu])
  return blizu
}

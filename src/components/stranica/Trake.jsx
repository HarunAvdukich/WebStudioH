import { useRef } from 'react'

// Dvije ukrštene trake sa jezikom posla. Teku, a pod mišem uspore (playbackRate, bez skoka).
// Ukras: isti pojmovi su u tekstu stranice, pa su trake skrivene od čitača ekrana.
export default function Trake({ redovi }) {
  const ref = useRef(null)
  const brzina = (b) => ref.current?.getAnimations({ subtree: true }).forEach((a) => (a.playbackRate = b))
  return (
    <div className="tr" ref={ref} aria-hidden="true" onPointerEnter={() => brzina(0.25)} onPointerLeave={() => brzina(1)}>
      {redovi.map((red, i) => (
        <div key={i} className={`tr__traka tr__traka--${i + 1}`}>
          <div className="tr__tok">
            {[0, 1].map((kopija) => (
              <span key={kopija} className="tr__dio">
                {red.map((r) => (
                  <span key={r} className="tr__r">
                    {r}
                    <i />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

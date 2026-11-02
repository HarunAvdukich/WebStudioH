import { useState } from 'react'
import { prati } from '../../lib/statistika.js'

// Snimak OLX veze (mrt.ba, 6. 10. 2026). Do klika je tu samo slika, koja se učita kad dođe na
// ekran; video kreće tek na klik, pa ne usporava učitavanje stranice. Bez JavaScripta link
// otvara sam snimak.
export default function SnimakOlx({ t }) {
  const [pusti, setPusti] = useState(false)
  return (
    <figure className="ox-snimak" data-pokret="pojavi">
      <div className="ox-snimak__okvir">
        {pusti ? (
          <video
            src={t.video}
            poster={t.slika.src}
            width={t.slika.width}
            height={t.slika.height}
            controls
            autoPlay
            muted
            playsInline
            aria-label={t.alt}
          />
        ) : (
          <a
            className="ox-snimak__pusti"
            href={t.video}
            data-bez-zavjese
            data-kursor={t.pusti}
            onClick={(e) => {
              e.preventDefault()
              setPusti(true)
              prati('OLX snimak')
            }}
          >
            <img src={t.slika.src} width={t.slika.width} height={t.slika.height} alt={t.alt} loading="lazy" decoding="async" />
            <span className="ox-snimak__dugme">
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
              </svg>
              {t.pusti}
              <small>{t.trajanje}</small>
            </span>
          </a>
        )}
      </div>
      <figcaption>{t.opis}</figcaption>
    </figure>
  )
}

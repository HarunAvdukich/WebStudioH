import { useEffect, useRef, useState } from 'react'
import { ClientOnly } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import StoryModel from './StoryModel.jsx'
import { odluci, procitaj } from '../lib/mogucnosti.js'
import { ocistiTekst, GRAVURA_MAX } from '../three/gravura.js'
import { useBlizu } from '../lib/useBlizu.js'
import { poslijeInterakcije } from '../lib/interakcija.js'

const put = (prica, ime) => `/price/${prica.id}/${ime}`

// Slika dobija adresu tek kad je priča blizu; bez JavaScripta je u <noscript>.
function Slika({ src, blizu, ...ostalo }) {
  return (
    <>
      <img src={blizu ? src : undefined} decoding="async" {...ostalo} />
      <noscript>
        <img src={src} loading="lazy" decoding="async" {...ostalo} />
      </noscript>
    </>
  )
}

function Video({ prica, korak, pusti, blizu }) {
  const ref = useRef(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (pusti) v.play().catch(() => {})
    else v.pause()
  }, [pusti])
  return (
    <video ref={ref} className="prica__video" muted playsInline loop preload="none"
      poster={blizu ? put(prica, korak.poster) : undefined} aria-label={korak.alt}>
      <source src={put(prica, `${korak.video}-720.mp4`)} type="video/mp4" media="(max-width: 767px)" />
      <source src={put(prica, `${korak.video}-1080.mp4`)} type="video/mp4" />
    </video>
  )
}

export default function Story({ prica }) {
  const ref = useRef(null)
  const [korak, setKorak] = useState(0)
  const [ziva, setZiva] = useState(false)
  const [video, setVideo] = useState(false)
  const [gravura, setGravura] = useState(undefined)
  const blizu = useBlizu(ref)

  useEffect(() => {
    const m = odluci(procitaj())
    setVideo(m.video)
    if (!m.pin || !ref.current) return undefined
    let gasi = () => {}
    let otkazano = false
    // Kačenje mijenja samo raspored ispod prvog ekrana, pa čeka prvu
    // interakciju i ne opterećuje učitavanje stranice.
    const otkazi = poslijeInterakcije(() =>
      import('../lib/pricaPokret.js').then(({ ozivi }) => {
        if (otkazano || !ref.current) return
        return ozivi(ref.current, { broj: prica.koraci.length, naKorak: setKorak }).then((g) => {
          if (otkazano) g()
          else {
            gasi = g
            setZiva(true)
          }
        })
      }),
    )
    return () => {
      otkazano = true
      otkazi()
      gasi()
    }
  }, [prica])

  return (
    <section ref={ref} id={`prica-${prica.id}`} className={`prica${ziva ? ' prica--ziva' : ''}`}
      data-tip={prica.koraci[korak].tip} aria-labelledby={`prica-${prica.id}-naslov`}>
      <div className="prica__scena">
        <header className="prica__zaglavlje">
          <h3 id={`prica-${prica.id}-naslov`} className="prica__naslov">{prica.naslov}</h3>
          <p className="prica__podnaslov">
            {prica.podnaslov}
            {prica.oznaka && <span className="prica__oznaka">{prica.oznaka}</span>}
          </p>
        </header>

        <div className="prica__vizual">
          <Slika className="prica__poster" src={put(prica, prica.model.poster)} blizu={blizu}
            alt={prica.model.alt} width="1200" height="1200" />
          <ClientOnly>{() => <StoryModel prica={prica} aktivan={korak === 0} gravura={gravura} />}</ClientOnly>
        </div>

        <ol className="prica__koraci">
          {prica.koraci.map((k, i) => (
            <li key={k.naslov} className={`prica__korak prica__korak--${k.tip}`} data-aktivan={i === korak || undefined}>
              <p className="prica__broj">{String(i + 1).padStart(2, '0')}</p>
              <h4 className="prica__korak-naslov">{k.naslov}</h4>
              <p className="prica__tekst">{k.tekst}</p>
              {k.tip === 'ekran' && (
                <figure className="prica__ekran">
                  <Slika src={put(prica, k.slika)} blizu={blizu} alt={k.alt} />
                  <figcaption>{k.izvor}</figcaption>
                </figure>
              )}
              {k.tip === 'video' && (
                video
                  ? <Video prica={prica} korak={k} pusti={i === korak} blizu={blizu} />
                  : <Slika className="prica__video" src={put(prica, k.poster)} blizu={blizu} alt={k.alt} />
              )}
              {k.tip === 'gravura' && (
                <label className="prica__gravura">
                  <span>Tekst gravure</span>
                  <input type="text" maxLength={GRAVURA_MAX} defaultValue={k.predlozak}
                    onChange={(e) => setGravura(ocistiTekst(e.target.value))} />
                </label>
              )}
            </li>
          ))}
        </ol>

        <Link className="prica__link" to={`/radovi/${prica.projekat}`}>Cijela priča o {prica.naslov}</Link>
      </div>
    </section>
  )
}

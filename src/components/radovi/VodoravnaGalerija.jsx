import { useCallback, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useKaci, useScena } from '../../lib/scena.js'
import { formatBroj } from '../../lib/pokreti/racun.js'
import { popuni } from '../../lib/whatsapp.js'
import { rasiri } from '../../lib/rasiri.js'

// Veliki trenutak Radova, "Vodoravna galerija": na širokom ekranu skrol vozi radove s lijeva
// na desno, snimci se pomjeraju različitom brzinom, a brojke se odbroje kad ploča uđe. Na
// telefonu i bez JavaScripta ploče stoje jedna ispod druge, a snimci se otkriju odozdo.
// Klik na snimak ili "Kako je napravljeno" raširi karticu u studiju (31).

function Ploca({ r, i, n, t, prefiks, navigate }) {
  const vizual = useRef(null)
  const put = prefiks + r.slug
  const otvori = (e) => {
    e.preventDefault()
    rasiri(vizual.current, put, navigate)
  }
  return (
    <article className={`vg__ploca vg__ploca--${r.slug}`}>
      <div className="vg__tekst">
        <p className="vg__br" aria-hidden="true">
          {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </p>
        <p className="st-nad">{r.oznaka}</p>
        <h2 className="vg__ime">{r.ime}</h2>
        <p className="vg__opis">{r.opis}</p>
        {r.brojke && (
          <dl className="vg__brojke">
            {r.brojke.map((b) => (
              <div key={b.opis}>
                <dt data-pokret="broji" data-do={b.do} data-poslije={b.poslije || undefined}>
                  {formatBroj(b.do, t.jezik)}
                  {b.poslije}
                </dt>
                <dd>
                  {b.opis}
                  <small>{b.datum}</small>
                </dd>
              </div>
            ))}
          </dl>
        )}
        {r.uIzradi && <span className="vg__izrada">{r.uIzradi}</span>}
        <div className="vg__linkovi">
          <Link to={put} data-bez-zavjese onClick={otvori} className="vg__kako">
            {r.uIzradi ? t.kartica.vise : t.kartica.kako}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          {r.url && (
            <a href={r.url} target="_blank" rel="noopener" className="vg__otvori">
              {popuni(t.kartica.otvori, { ime: r.ime })} ↗
            </a>
          )}
        </div>
      </div>
      <Link to={put} ref={vizual} className="vg__vizual" data-kursor={t.kartica.kursor} data-bez-zavjese onClick={otvori} aria-label={`${t.kartica.kako}: ${r.ime}`}>
        {r.slika ? (
          <>
            <span className="vg__racunar" data-pokret="otkrij">
              <img src={r.slika.src} width={r.slika.width} height={r.slika.height} alt={r.slika.alt} loading="lazy" decoding="async" />
            </span>
            {r.snimci.map((s, j) => (
              <span key={s.src} className={`vg__tel vg__tel--${j + 1}`} data-pokret="otkrij" style={{ '--i': j + 1 }}>
                <img src={s.src} width={s.width} height={s.height} alt={s.alt} loading="lazy" decoding="async" />
              </span>
            ))}
          </>
        ) : (
          <span className="vg__gravura" aria-hidden="true">
            <span>{r.ime}</span>
          </span>
        )}
      </Link>
      {r.citat && (
        <blockquote className="vg__citat">
          <p>„{r.citat.tekst}“</p>
          <cite>{r.citat.ko}</cite>
        </blockquote>
      )}
    </article>
  )
}

export default function VodoravnaGalerija({ t }) {
  const kaci = useKaci()
  const dio = useRef(null)
  const navigate = useNavigate()
  const prefiks = t.jezik === 'en' ? '/en/work/' : '/radovi/'

  const crtaj = useCallback((p) => {
    const sekcija = dio.current
    if (!sekcija) return
    const traka = sekcija.querySelector('.vg__traka')
    const sirina = window.innerWidth
    const max = traka.scrollWidth - sirina
    const x = p * max
    traka.style.transform = `translate3d(${-x}px, 0, 0)`
    sekcija.style.setProperty('--vg-p', p.toFixed(4))
    sekcija.querySelectorAll('.vg__ploca').forEach((ploca, i) => {
      // pomak ploče od sredine ekrana, u širinama ekrana: 0 kad je ploča tačno na ekranu
      ploca.style.setProperty('--o', (i - x / sirina).toFixed(3))
    })
  }, [])
  useScena(dio, crtaj, kaci)

  return (
    <section className={`vg${kaci ? ' je-vodoravno' : ''}`} ref={dio} style={{ '--n': t.radovi.length }}>
      <div className="vg__ekran">
        <div className="vg__traka">
          {t.radovi.map((r, i) => (
            <Ploca key={r.slug} r={r} i={i} n={t.radovi.length} t={t} prefiks={prefiks} navigate={navigate} />
          ))}
        </div>
        <div className="vg__napredak" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  )
}

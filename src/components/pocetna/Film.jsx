import { useCallback, useEffect, useRef, useState } from 'react'
import { useScena } from '../../lib/scena.js'
import { formatBroj } from '../../lib/pokreti/racun.js'
import { popuni } from '../../lib/whatsapp.js'
import { poslijeInterakcije } from '../../lib/interakcija.js'
import { kadroviFilma, pretapanje, stanjeFilma } from '../../lib/scene/film.js'

const kadar = (n) => String(n).padStart(3, '0')

// Film na telefonu (i u uskom prozoru): stranica zastane dok se predmet sklopi iz kadrova
// videa, a ispod se smjenjuju kartice. Dole je poziv "Listajte dalje" sa kružićem koji se
// puni i brojem kartice; desno tanka linija napretka. Bez JavaScripta i uz smanjene pokrete
// stoji sklopljen predmet i sve kartice jedna ispod druge.
export default function Film({ vrsta, predmet, dio, film, jezik }) {
  const ref = useRef(null)
  const platno = useRef(null)
  const [zivo, setZivo] = useState(false)
  const stanje = useRef({ karta: -2, posto: -1, slike: [], nacrtan: '', zove: 0, izbrojano: new Set() })
  const brojevi = kadroviFilma(predmet.broj)
  const n = dio.kartice.length

  useEffect(() => {
    // Film samo uz pokrete i kad priča u slovu ne radi (telefon, uski prozor).
    const mq = window.matchMedia('(min-width: 1180px) and (min-height: 600px)')
    const provjeri = () => setZivo(document.documentElement.classList.contains('pokret') && !mq.matches)
    provjeri()
    mq.addEventListener('change', provjeri)
    return () => mq.removeEventListener('change', provjeri)
  }, [])

  // Kadrovi se učitaju poslije prve interakcije, kad je film blizu (oko ekran i po).
  useEffect(() => {
    const el = ref.current
    if (!zivo || !el) return undefined
    let otkazi = () => {}
    const s = stanje.current
    const io = new IntersectionObserver(
      ([u]) => {
        if (!u.isIntersecting || s.slike.length) return
        io.disconnect()
        otkazi = poslijeInterakcije(() => {
          s.slike = brojevi.map((b) => {
            const img = new Image()
            img.decoding = 'async'
            img.onload = () => {
              el.classList.add('je-spreman')
              s.nacrtan = ''
              crtaj(s.p ?? 0)
            }
            img.src = `${predmet.kadrovi}${kadar(b)}.webp`
            return img
          })
        })
      },
      { rootMargin: '150% 0px' },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      otkazi()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zivo])

  const nacrtaj = (f) => {
    const s = stanje.current
    const c = platno.current
    if (!c || !s.slike.length) return
    const ucitana = (img) => img && img.complete && img.naturalWidth
    const { i, j, udio } = pretapanje(f, s.slike.length)
    let a = null
    for (let d = 0; d < s.slike.length && !a; d++) {
      for (const k of [i - d, i + d]) {
        if (ucitana(s.slike[k])) {
          a = s.slike[k]
          break
        }
      }
    }
    if (!a) return
    const b = a === s.slike[i] && ucitana(s.slike[j]) ? s.slike[j] : null
    const q = b ? Math.round(udio * 24) / 24 : 0
    const kljuc = `${a.src}:${q}`
    if (kljuc === s.nacrtan) return
    s.nacrtan = kljuc
    const r = c.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = Math.round(r.width * dpr)
    const h = Math.round(r.height * dpr)
    if (c.width !== w || c.height !== h) {
      c.width = w
      c.height = h
    }
    const ctx = c.getContext('2d')
    ctx.imageSmoothingQuality = 'high'
    ctx.globalAlpha = 1
    ctx.drawImage(a, 0, 0, w, h)
    if (q > 0) {
      ctx.globalAlpha = q
      ctx.drawImage(b, 0, 0, w, h)
      ctx.globalAlpha = 1
    }
  }

  const broji = (el) => {
    const cilj = Number(el.dataset.do)
    const poslije = el.dataset.poslije || ''
    const t0 = performance.now()
    const korak = (t) => {
      const q = Math.min(1, (t - t0) / 1200)
      el.textContent = formatBroj(cilj * (1 - Math.pow(1 - q, 3)), jezik) + poslije
      if (q < 1) requestAnimationFrame(korak)
    }
    requestAnimationFrame(korak)
  }

  const crtaj = useCallback(
    (p) => {
      const el = ref.current
      if (!el) return
      const s = stanje.current
      s.p = p
      const st = stanjeFilma(p, n)
      nacrtaj(st.f)
      el.style.setProperty('--napredak', p.toFixed(4))
      if (st.posto !== s.posto) {
        s.posto = st.posto
        const posto = el.querySelector('.fm__posto')
        if (posto) posto.textContent = popuni(film.sklopljeno, { n: st.posto })
      }
      if (st.karta !== s.karta) {
        const karte = el.querySelectorAll('.fm__karta')
        karte.forEach((k, i) => {
          k.classList.toggle('je-sad', i === st.karta)
          k.classList.toggle('je-bilo', i < st.karta)
        })
        const broj = karte[st.karta]?.querySelector('[data-do]')
        if (broj && !s.izbrojano.has(st.karta)) {
          s.izbrojano.add(st.karta)
          broji(broj)
        }
        const br = el.querySelector('.fm__br')
        if (br) br.textContent = `${Math.max(1, st.karta + 1)} / ${n}`
        s.karta = st.karta
      }
      el.classList.toggle('je-poziv', st.poziv)
      document.documentElement.classList.toggle('kz-u-filmu', st.poziv)
      // Kad posjetilac stane usred filma, poziv poskoči.
      el.classList.remove('je-zove')
      clearTimeout(s.zove)
      if (st.poziv) s.zove = setTimeout(() => el.classList.add('je-zove'), 1300)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, film.sklopljeno],
  )
  useScena(ref, crtaj, zivo)

  useEffect(
    () => () => {
      clearTimeout(stanje.current.zove)
      document.documentElement.classList.remove('kz-u-filmu')
    },
    [],
  )

  return (
    <section className={`fm fm--${vrsta}${zivo ? ' je-zivo' : ''}`} ref={ref} aria-label={dio.oznaka}>
      <div className="fm__in">
        <p className="fm__oznaka">{dio.oznaka}</p>
        {vrsta === 'sat' && (
          <span className="fm__posto" aria-hidden="true">
            {popuni(film.sklopljeno, { n: 100 })}
          </span>
        )}
        <div className="fm__kadar">
          <img src={`${predmet.kadrovi}${kadar(predmet.broj)}.webp`} alt={predmet.alt} width="768" height="1024" loading="lazy" decoding="async" />
          <canvas ref={platno} aria-hidden="true" />
        </div>
        <ol className="fm__kartice">
          {dio.kartice.map((k, i) => (
            <li key={i} className="fm__karta">
              {k.do != null ? (
                <>
                  <b className="fm__broj" data-do={k.do} data-poslije={k.poslije}>
                    {formatBroj(k.do, jezik)}
                    {k.poslije}
                  </b>
                  <p>{k.opis}</p>
                </>
              ) : (
                <>
                  {vrsta === 'sat' && (
                    <span className="fm__bro" aria-hidden="true">
                      {i + 1}
                    </span>
                  )}
                  <div>
                    <h3>{k.naslov}</h3>
                    <p>{k.opis}</p>
                  </div>
                </>
              )}
            </li>
          ))}
        </ol>
        <div className="fm__poziv" aria-hidden="true">
          <span className="fm__krug">
            <svg viewBox="0 0 42 42">
              <circle className="fm__krug-trag" cx="21" cy="21" r="19" />
              <circle className="fm__krug-pun" cx="21" cy="21" r="19" pathLength="1" />
            </svg>
            <span className="fm__strelice">
              <i />
              <i />
            </span>
          </span>
          <span className="fm__listaj">{film.listajte}</span>
          <span className="fm__br">1 / {n}</span>
        </div>
        <span className="fm__linija" aria-hidden="true">
          <i />
        </span>
      </div>
    </section>
  )
}

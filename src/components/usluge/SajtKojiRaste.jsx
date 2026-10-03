import { useCallback, useEffect, useRef } from 'react'
import { stanjeSajta, granice } from '../../lib/scene/sajt.js'
import { useKaci, useScena, KACI } from '../../lib/scena.js'
import { lerp } from '../../lib/pokreti/racun.js'

// Veliki trenutak Usluga, "Sajt koji raste": jedan izmišljen sajt raste kroz stepenice.
// Na širokom ekranu scena je zakačena (lijevo tekst stepenice, desno preglednik), a na
// telefonu svaka stepenica ima svoj mali preglednik koji se nadogradi kad uđe na ekran.
// Ilustracija; bez JavaScripta preglednik je sagrađen do kraja.

const KorpaIkona = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="18" cy="20" r="1.5" />
    <path d="M2 3h3l2.4 11.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.5L22 7H6" />
  </svg>
)

export function PreglednikSajta({ t }) {
  return (
    <div className="ss">
      <div className="ss__prozor">
        <div className="ss__traka">
          <i />
          <i />
          <i />
          <span>{t.adresa}</span>
        </div>
        <div className="ss__ekran">
          <div className="ss__zag" data-s="zaglavlje">
            <span className="ss__logo" />
            <span className="ss__nav">
              <i />
              <i />
              <i />
            </span>
            <b className="ss__b2b" data-s="b2b">
              <span>{t.b2b}</span>
            </b>
            <span className="ss__korpa" data-s="korpa">
              <KorpaIkona />
              <em data-s="korpaBroj">2</em>
            </span>
          </div>
          <div className="ss__hero">
            <span className="ss__l ss__l1" data-s="linija" />
            <span className="ss__l ss__l2" data-s="linija" />
            <span className="ss__l ss__l3" data-s="linija" />
            <span className="ss__wa" data-s="dugme">
              <span>{t.dugme}</span>
            </span>
          </div>
          <div className="ss__grid">
            {[t.cijenaPoslije, ...t.cijene].map((c, i) => (
              <div className="ss__art" data-s="artikal" key={i}>
                <span className="ss__slika" />
                <span className="ss__n" />
                <span className={`ss__cij${i === 0 ? ' je-nova' : ''}`} data-s={i === 0 ? 'cijena' : undefined}>
                  {c}
                </span>
              </div>
            ))}
          </div>
          <span className="ss__pouzece" data-s="pouzece">
            <span>{t.pouzece}</span>
          </span>
          <div className="ss__kal" data-s="termin">
            <b>{t.termin.naslov}</b>
            <div className="ss__kal-g">
              {Array.from({ length: 14 }, (_, i) => (
                <i key={i} className={i === 8 ? 'je-cilj je-da' : undefined} data-s={i === 8 ? 'terminCilj' : undefined} />
              ))}
            </div>
            <small>{t.termin.potvrda}</small>
          </div>
          <div className="ss__ai" data-s="asistent">
            <span>{t.asistent}</span>
          </div>
        </div>
      </div>
      <div className="ss-veze" data-s="veze">
        {t.veze.map((v) => (
          <div className="ss-veza" key={v.ime}>
            <span className="ss-veza__linija" data-s="vezaLinija" />
            <span className="ss-znacka" data-s="znacka">
              <b>{v.ime}</b>
              <small data-prije={v.prije} data-poslije={v.poslije}>{v.poslije}</small>
            </span>
          </div>
        ))}
      </div>
      <div className="ss-app" data-s="aplikacija">
        <span className="ss-app__zag" />
        <span className="ss-app__k" />
        <span className="ss-app__k" />
        <span className="ss-app__ime">{t.aplikacija}</span>
      </div>
      <div className="ss-odr" data-s="odrzavanje">
        <span className="ss-odr__pun" data-s="odrzavanjePun" />
        <span className="ss-odr__tx">{t.odrzavanje}</span>
      </div>
    </div>
  )
}

// Upisuje stanje scene u markup preglednika (samo stilovi, bez React iscrtavanja po kadru).
export function veziPreglednik(korijen, t) {
  const sve = (s) => [...korijen.querySelectorAll(`[data-s="${s}"]`)]
  const jedan = (s) => korijen.querySelector(`[data-s="${s}"]`)
  const el = {
    zaglavlje: jedan('zaglavlje'),
    linije: sve('linija'),
    dugme: jedan('dugme'),
    artikli: sve('artikal'),
    korpa: jedan('korpa'),
    korpaBroj: jedan('korpaBroj'),
    pouzece: jedan('pouzece'),
    veze: jedan('veze'),
    vezaLinije: sve('vezaLinija'),
    znacke: sve('znacka'),
    cijena: jedan('cijena'),
    b2b: jedan('b2b'),
    termin: jedan('termin'),
    terminCilj: jedan('terminCilj'),
    asistent: jedan('asistent'),
    aplikacija: jedan('aplikacija'),
    odrzavanje: jedan('odrzavanje'),
    odrzavanjePun: jedan('odrzavanjePun'),
  }
  const vidi = (e, q, y = 0, x = 0, s = 1) => {
    e.style.opacity = q
    e.style.transform = `translate(${(1 - q) * x}px, ${(1 - q) * y}px)${s !== 1 ? ` scale(${lerp(s, 1, q)})` : ''}`
  }
  return (st) => {
    vidi(el.zaglavlje, st.zaglavlje, -10)
    el.linije.forEach((l, i) => (l.style.transform = `scaleX(${st.linije[i]})`))
    vidi(el.dugme, st.dugme, 0, 0, 0.7)
    el.artikli.forEach((a, i) => vidi(a, st.artikli[i], 30, 0, 0.88))
    vidi(el.korpa, st.korpa, -8)
    el.korpaBroj.textContent = st.korpaBroj
    vidi(el.pouzece, st.pouzece, 10)
    el.veze.classList.toggle('je-tece', st.tece)
    el.vezaLinije.forEach((l, i) => (l.style.transform = `scaleX(${st.veze[i].linija})`))
    el.znacke.forEach((z, i) => {
      vidi(z, st.veze[i].znacka, 0, 30)
      const small = z.querySelector('small')
      small.textContent = st.veze[i].azurirano ? small.dataset.poslije : small.dataset.prije
    })
    el.cijena.textContent = st.cijenaNova ? t.cijenaPoslije : t.cijenaPrije
    el.cijena.classList.toggle('je-nova', st.cijenaNova)
    vidi(el.b2b, st.b2b, -6)
    vidi(el.termin, st.termin, 40)
    el.terminCilj.classList.toggle('je-da', st.terminIzabran)
    vidi(el.asistent, st.asistent, 0, 0, 0.7)
    vidi(el.aplikacija, st.aplikacija, 60)
    vidi(el.odrzavanje, st.odrzavanje, 16)
    el.odrzavanjePun.style.transform = `scaleX(${st.odrzavanjePun})`
  }
}

// Zakačena scena za širok ekran. Skrivena od čitača ekrana: isti tekst je u stepenicama ispod.
export default function SajtKojiRaste({ t, stepenice }) {
  const kaci = useKaci()
  const dio = useRef(null)
  const primijeni = useRef(null)

  useEffect(() => {
    if (!kaci) return
    const korijen = dio.current
    const upisi = veziPreglednik(korijen.querySelector('.ss'), t)
    const tekstovi = [...korijen.querySelectorAll('.sajt-scena__t')]
    const tacke = [...korijen.querySelectorAll('.sajt-scena__put i')]
    const pun = korijen.querySelector('.sajt-scena__put span')
    const broj = korijen.querySelector('.sajt-scena__broj')
    primijeni.current = (st) => {
      upisi(st)
      tekstovi.forEach((x, i) => {
        x.style.opacity = st.tekstovi[i].vidljivost
        x.style.transform = `translateY(${st.tekstovi[i].pomak}px)`
      })
      tacke.forEach((x, i) => x.classList.toggle('je-upaljena', st.tacke[i]))
      pun.style.transform = `scaleX(${st.put})`
      broj.textContent = st.korak
    }
  }, [kaci, t])

  const crtaj = useCallback((p) => primijeni.current?.(stanjeSajta(p)), [])
  useScena(dio, crtaj, kaci)

  return (
    <section className="sajt-scena" ref={dio} aria-hidden="true">
      <div className="sajt-scena__ekran">
        <div className="sajt-scena__lijevo">
          <p className="st-nad">
            {t.stepenica} <b className="sajt-scena__broj">1</b> / {stepenice.length}
          </p>
          <div className="sajt-scena__tekstovi">
            {stepenice.map((s) => (
              <div className="sajt-scena__t" key={s.id}>
                <p className="sajt-scena__ime">{s.ime}</p>
                <h3>{s.naslov}</h3>
                <p>{s.opis}</p>
              </div>
            ))}
          </div>
          <div className="sajt-scena__put">
            <span />
            {stepenice.map((s) => (
              <i key={s.id} />
            ))}
          </div>
        </div>
        <PreglednikSajta t={t} />
      </div>
    </section>
  )
}

// Mali preglednik uz stepenicu na telefonu (ili bez zakačene scene): kad uđe na ekran,
// sajt se nadogradi od početka do kraja te stepenice.
export function MiniSajt({ t, korak }) {
  const ref = useRef(null)
  useEffect(() => {
    const korijen = ref.current?.querySelector('.ss')
    if (!korijen || !document.documentElement.classList.contains('pokret')) return undefined
    if (window.matchMedia(KACI).matches) return undefined
    const upisi = veziPreglednik(korijen, t)
    const [od, doKraja] = granice(korak)
    upisi(stanjeSajta(od))
    let kadar = 0
    const io = new IntersectionObserver(
      ([u]) => {
        if (!u.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const f = (sad) => {
          const q = Math.min(1, (sad - t0) / 1800)
          upisi(stanjeSajta(lerp(od, doKraja, q)))
          if (q < 1) kadar = requestAnimationFrame(f)
        }
        kadar = requestAnimationFrame(f)
      },
      { threshold: 0.45 },
    )
    io.observe(korijen)
    return () => {
      io.disconnect()
      cancelAnimationFrame(kadar)
    }
  }, [t, korak])
  return (
    <div className="st-korak__preglednik" ref={ref} aria-hidden="true">
      <PreglednikSajta t={t} />
    </div>
  )
}

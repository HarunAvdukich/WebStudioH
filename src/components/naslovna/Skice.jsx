// Male isprogramirane skice za kartice početne (19. 11. 2026). Samo markup; pokreti su u skice.css.
// Sve je ukras (aria-hidden), tekst kartice nosi značenje.
import { useEffect, useRef, useState } from 'react'

const KURSOR = <svg className="sk-kur" viewBox="0 0 24 24"><path d="M4 3l7 17 2.5-7L21 10.5z" fill="#fff" stroke="#10231c" strokeWidth="1.5" strokeLinejoin="round" /></svg>
const KVACICA = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 12l4 4 8-8" /></svg>
const Cijena = ({ a, b }) => <span className="sk-cij"><em>{a}</em><em>{b}</em></span>

/* ===== Zašto Hunar ===== */
const STUBOVI = [
  // OLX veza: cijena se promijeni jednom i ode na sve kanale
  () => (
    <div className="sk sk-veza">
      <div className="sv-art"><i className="sv-sl" /><span>Motorna pila</span><Cijena a="289 KM" b="269 KM" /></div>
      <svg className="sv-zice" viewBox="0 0 40 100" preserveAspectRatio="none"><path d="M0 50C20 50 20 18 40 18" /><path d="M0 50H40" /><path d="M0 50C20 50 20 82 40 82" /></svg>
      <div className="sv-kan">
        {['OLX', 'Ananas', 'Web shop'].map((k) => <div key={k}><span>{k}</span><Cijena a="289" b="269" /></div>)}
      </div>
    </div>
  ),
  // Sve na jednom mjestu: slojevi se slože
  () => (
    <div className="sk sk-slojevi">
      {['Dizajn', 'Kod', 'Hosting', 'Održavanje'].map((t, i) => <div key={t} style={{ '--i': i }}><span>{t}</span></div>)}
      <span className="ss-broj">1 broj</span>
    </div>
  ),
  // AI noću: kupac pita u 02:14, Kobi odgovori
  () => (
    <div className="sk sk-noc">
      <div className="sn-gore"><i className="sn-mj" /><span>02:14</span></div>
      <span className="sn-k">Imate li lanac za pilu 40 cm?</span>
      <span className="sn-t"><i /><i /><i /></span>
      <span className="sn-b"><b>Kobi</b>Imamo, 3 komada. Evo linka.</span>
    </div>
  ),
  // Brzina: mjerač se napuni do 99
  () => (
    <div className="sk sk-brzina">
      <svg viewBox="0 0 120 66"><path className="sb-pod" d="M10 60a50 50 0 0 1 100 0" pathLength="100" /><path className="sb-luk" d="M10 60a50 50 0 0 1 100 0" pathLength="100" /></svg>
      <b className="sb-br" />
      <span className="sb-ozn">PageSpeed · računar</span>
    </div>
  ),
]

/* ===== Usluge ===== */
const USLUGE = [
  // Web stranica: kursor klikne dugme
  () => (
    <div className="sk sk-web">
      <div className="sk-bar"><i /><i /><i /><span /></div>
      <div className="sw-t"><b className="sw-n" /><b className="sw-n2" /><b className="sw-d" /></div>
      <div className="sw-k"><b /><b /><b /></div>
      {KURSOR}
    </div>
  ),
  // Web shop: artikal odleti u korpu
  () => (
    <div className="sk sk-shop">
      <div className="sh-art">{[0, 1, 2].map((i) => <div key={i}><i /><b /><em /></div>)}</div>
      <div className="sh-korpa">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 7h14l-1 13H6zM9 7a3 3 0 0 1 6 0" /></svg>
        <Cijena a="2" b="3" />
      </div>
      <i className="sh-let" />
    </div>
  ),
  // Rezervacije: dan, pa sat, pa potvrda
  () => (
    <div className="sk sk-kal">
      <div className="sk-dani">{['P', 'U', 'S', 'Č', 'P', 'S', 'N'].map((d, i) => <span key={i} className="dn">{d}</span>)}{Array.from({ length: 14 }, (_, i) => <span key={'d' + i} className={i === 9 ? 'izabran' : i % 7 > 5 ? 'zatv' : ''}>{i + 10}</span>)}</div>
      <div className="sk-sati"><span>09:00</span><span className="izabran">10:30</span><span>12:00</span><b className="sk-ok">{KVACICA}Potvrđeno</b></div>
    </div>
  ),
  // AI chatbot: oblačić se otvori na stranici
  () => (
    <div className="sk sk-bot">
      <div className="sk-bar"><i /><i /><i /><span /></div>
      <div className="sb-str"><b /><b /><b /></div>
      <div className="sb-prozor">
        <span className="sb-p1">Dostavljate li u Mostar?</span>
        <span className="sb-p2">Da, za 1 do 2 dana.</span>
      </div>
      <i className="sb-dug" />
    </div>
  ),
]

/* ===== Kako radimo ===== */
const KORACI = [
  () => (
    <div className="sk sk-k sk-raz">
      <span className="kr-a">Prodajem alat, treba mi shop.</span>
      <span className="kr-b">Pošaljite link, javljamo se.</span>
    </div>
  ),
  () => (
    <div className="sk sk-k sk-pon">
      <div className="kp-list"><b /><b /><b className="kr" /><b /><span>KM</span></div>
      <span className="kp-pecat">30 / 70</span>
    </div>
  ),
  () => (
    <div className="sk sk-k sk-izr">
      <div className="sk-bar"><i /><i /><i /><span /></div>
      <div className="ki-t"><b /><b /><b /></div>
      <span className="ki-oz">probni link</span>
    </div>
  ),
  () => (
    <div className="sk sk-k sk-obj">
      <div className="ko-url"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 11h12v9H6zM9 11V8a3 3 0 0 1 6 0v3" /></svg><span>vasa-firma.ba</span></div>
      <div className="ko-tr"><i /></div>
      <span className="ko-st"><i />Na mreži</span>
    </div>
  ),
  () => (
    <div className="sk sk-k sk-odr">
      <svg viewBox="0 0 120 50" preserveAspectRatio="none"><path className="od-pod" d="M0 50V40L20 36L40 38L60 26L80 28L100 14L120 8V50Z" /><path className="od-lin" d="M0 40L20 36L40 38L60 26L80 28L100 14L120 8" pathLength="100" /></svg>
      <span className="od-ok">{KVACICA}Radi</span>
    </div>
  ),
]

/* ===== Djelatnosti ===== */
const BRANSE = [
  () => (
    <div className="sk sk-b sk-trg">
      <i className="bt-sl" />
      <div className="bt-tx"><b /><span>49 KM</span><em>U korpu</em></div>
      <span className="bt-olx">i na OLX-u</span>
    </div>
  ),
  () => (
    <div className="sk sk-b sk-ali">
      <div className="ba-niz">
        {[['Bušilica', 12], ['Brusilica', 7], ['Lanac 40 cm', 31], ['Kompresor', 4], ['Bušilica', 12], ['Brusilica', 7], ['Lanac 40 cm', 31], ['Kompresor', 4]].map(([n, k], i) => <div key={i}><span>{n}</span><b>{k} kom</b></div>)}
      </div>
      <span className="ba-oz">uvoz od dobavljača</span>
    </div>
  ),
  () => (
    <div className="sk sk-b sk-b2b">
      <div className="bb-red bb-zag"><span>Artikal</span><span>MPC</span><span>Partner</span></div>
      <div className="bb-red"><span>Brusilica</span><span>189</span><b>154</b></div>
      <div className="bb-red"><span>Kompresor</span><span>420</span><b>351</b></div>
    </div>
  ),
  () => (
    <div className="sk sk-b sk-fri">
      {['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30'].map((t, i) => <span key={t} className={i === 5 ? 'novi' : [1, 2, 6].includes(i) ? 'zauzet' : ''}>{t}</span>)}
    </div>
  ),
  () => (
    <div className="sk sk-b sk-sto">
      <div className="bs-obav"><i>{KVACICA}</i><div><b>Podsjetnik</b><span>Sutra u 10:00, kontrola</span></div></div>
      <div className="bs-obav bs-2"><i>{KVACICA}</i><div><b>Termin potvrđen</b><span>Pacijent je odgovorio: Dolazim</span></div></div>
    </div>
  ),
  () => (
    <div className="sk sk-b sk-res">
      <div className="br-meni"><div><span>Ćevapi, 10 kom</span><b>12 KM</b></div><div><span>Pita krompiruša</span><b>6 KM</b></div><div><span>Domaća limunada</span><b>4 KM</b></div></div>
      <span className="br-sto">Sto za 4 · 20:00</span>
    </div>
  ),
]

// Skica se pokrene kad dođe na ekran (klasa sk-ide), a van ekrana stoji kao gotova slika.
function Om({ children }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => el.classList.toggle('sk-ide', e.isIntersecting), { rootMargin: '60px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div className="sk-om" aria-hidden="true" ref={ref}>{children}</div>
}
const skica = (niz, i) => { const S = niz[i % niz.length]; return <Om><S /></Om> }
export const SkicaStub = ({ i }) => skica(STUBOVI, i)
export const SkicaUsluga = ({ i }) => skica(USLUGE, i)
export const SkicaKorak = ({ i }) => skica(KORACI, i)
export const SkicaBransa = ({ i }) => skica(BRANSE, i)

/* ===== Mapa BiH ===== */
// Obris: Natural Earth 1:50m (javno vlasništvo), projektovan na 435×428. Gradovi po geografskim koordinatama.
const OBRIS = 'M399.7 69.3L400.6 72.7L398.2 84.4L393.6 97L386.2 110L378.5 122.4L376.4 128.9L375.9 139.3L374.9 147.5L376 151.9L378.5 156.1L387.1 159.4L398.7 167.6L408.5 178.3L421.2 190.5L425.1 195L425.1 199.8L421.4 203.4L410.6 204.8L399.4 203.7L395.1 202.5L391 204L388.6 206.7L389.9 210L401.4 224.8L414.8 245.9L415.5 255.1L413.9 262.2L410.8 267.2L405.2 266.3L401 262.5L394.6 262.7L389.6 263.8L383.1 271.5L379.9 271.2L374.3 272.3L370.8 273.8L365.2 271.6L359.3 270.1L356.8 272.5L355.7 277L359.3 285.1L366.1 297.9L365 307.6L359.8 308.7L355.1 300.6L350.9 299.3L346.1 299.5L335.1 309L327 316.9L325.1 322.4L322.2 328.4L321.3 332.8L321.5 347.3L306.9 349.7L303.9 351.8L302.1 356.2L303.3 374.9L304.5 384.9L312.8 400.4L313.1 405.2L311.9 408.5L306 414.6L303.2 416.8L301.3 417.5L291.6 413.5L287 411.6L267.6 397.9L259 390.3L245.5 380.4L237.1 374.7L232.9 366.1L226.2 364.2L218.4 366.9L209.5 360.7L215.7 357.5L217.3 354.5L216.5 350.5L213.7 345.1L189.7 321.6L177.9 305.6L176 299.9L175.9 284.6L173.1 281L155.4 274L135.7 254.1L115.4 234.7L112.6 229.2L102.1 214.5L89.4 201.1L79.2 192.5L70.8 182.8L61.5 169.2L56.7 148.7L52.5 130.4L49.6 123.3L43.7 120.8L25.5 99.2L10 86.6L10.1 73L12.7 50.4L15.6 24.6L19.3 21.1L26.4 19.1L34.4 19.9L41.5 23L55.4 40.7L63.3 47.5L70.1 50.2L77.8 42.7L87.4 27.2L95.7 19L123.7 22L137.5 10L159.8 25.7L169 28.1L174.2 25.9L181.3 26.9L196.9 31.5L200.6 33.4L205.3 33.1L216.8 27L220.8 27.7L234 39.8L240.7 39.9L248.7 34.7L253.8 30.2L269 33.6L277.7 31.5L285 31.3L292.8 33.4L300 36.2L306.9 38.6L325.7 39.9L334.7 47.5L338.3 54.9L338.4 59.4L339.3 64.3L344.5 69L355.8 71.7L362.9 71.1L366.7 70.8L376.3 66.5L387.7 64.3L395.9 66.9L399.7 69.3Z'

// slug: [x, y, gdje je natpis (d desno, l lijevo, g gore, n dole), stalno vidljiv]
const MJESTA = {
  sarajevo: [298.8, 223.1, 'd', 1], 'banja-luka': [166.9, 85.7, 'n', 1], tuzla: [327.2, 120.8, 'n', 1], zenica: [244.3, 171, 'g', 1],
  mostar: [233.5, 300, 'd', 1], bijeljina: [385.2, 87.9, 'g', 1], prijedor: [115.4, 54.5, 'n', 1], brcko: [341.5, 70.7, 'g', 0],
  doboj: [263.3, 91.8, 'g', 0], cazin: [32.3, 56.4, 'd', 0], bihac: [24.2, 79.7, 'n', 1], travnik: [218.2, 167.6, 'l', 0],
  gracanica: [287.6, 96, 'n', 0], lukavac: [311.2, 120.3, 'l', 0], visoko: [273.4, 203.1, 'l', 0], livno: [147.2, 227.4, 'n', 1],
  'siroki-brijeg': [210.4, 294, 'l', 0], gorazde: [359.5, 251.3, 'd', 1],
}
const NATPIS = { d: [10, 4, 'start'], l: [-10, 4, 'end'], g: [0, -11, 'middle'], n: [0, 19, 'middle'] }

export function Gradovi({ gradovi }) {
  const [aktivan, setAktivan] = useState(null)
  const ukljuci = (s) => () => setAktivan(s)
  const iskljuci = () => setAktivan(null)
  return (
    <div className="gradovi">
      <div className="mapa">
        <svg viewBox="0 0 435 428" role="group" aria-label="Mapa BiH sa gradovima za koje imamo stranice">
          <defs>
            <pattern id="mapa-tacke" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.1" /></pattern>
          </defs>
          <path className="mapa-obris" d={OBRIS} />
          <path className="mapa-tacke" d={OBRIS} fill="url(#mapa-tacke)" />
          {gradovi.map((g, i) => {
            const m = MJESTA[g.slug]
            if (!m) return null
            const [x, y, poz, stalno] = m
            const [dx, dy, anchor] = NATPIS[poz]
            return (
              <a key={g.slug} href={g.link} className={'mjesto' + (stalno ? ' stalno' : '') + (aktivan === g.slug ? ' on' : '')} aria-label={`Izrada web stranica: ${g.ime}`} style={{ '--i': i }}
                onMouseEnter={ukljuci(g.slug)} onMouseLeave={iskljuci} onFocus={ukljuci(g.slug)} onBlur={iskljuci}>
                <circle className="m-val" cx={x} cy={y} r="5" />
                <circle className="m-tac" cx={x} cy={y} r="4.2" />
                <circle className="m-hit" cx={x} cy={y} r="14" />
                <text x={x + dx} y={y + dy} textAnchor={anchor}>{g.ime}</text>
              </a>
            )
          })}
        </svg>
      </div>
      <div className="gradovi-tekst">
        <h3>Radimo za firme <span>iz cijele BiH</span>, uživo ili preko poruka.</h3>
        <p>Izaberite grad na mapi ili ispod i pogledajte šta radimo za firme iz njega.</p>
        <div className="cipovi">
          {gradovi.map((g) => (
            <a className={'cip' + (aktivan === g.slug ? ' on' : '')} href={g.link} key={g.link}
              onMouseEnter={ukljuci(g.slug)} onMouseLeave={iskljuci} onFocus={ukljuci(g.slug)} onBlur={iskljuci}>{g.ime}</a>
          ))}
        </div>
      </div>
    </div>
  )
}

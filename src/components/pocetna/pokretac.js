// Pokreće priču na stranici: mjeri scenu, prati skrol i piše stilove direktno u
// elemente (bez ponovnog iscrtavanja Reacta), crta kadrove sklapanja na platnu.
// GSAP, Lenis i kadrovi se učitavaju tek poslije prve interakcije.
import { raspored, kamera, transformacija, predmet, VRIJEME, SLOJEVI, cl, jeSiroko, LOGO_SIRINA } from './motor.js'
import { poslijeInterakcije } from '../../lib/interakcija.js'

const PREDMETI = ['sat', 'kosilica']

function broj(n) {
  return String(n).padStart(2, '0')
}

export class Pokretac {
  constructor({ prica, scena, svg, platno, podaci }) {
    this.prica = prica
    this.scena = scena
    this.svg = svg
    this.platno = platno
    this.podaci = podaci
    this.p = 0
    this.kadrovi = { sat: [], kosilica: [] }
    this.nacrtan = ''
    this.okvir = 0
    this.zadnje = {}
  }

  pokreni() {
    const q = (s) => Array.from(this.scena.querySelectorAll(s))
    this.slojevi = {}
    for (const el of q('[data-sloj]')) this.slojevi[el.dataset.sloj] = el
    this.oznake = { sat: q('[data-oznaka="sat"]'), kosilica: q('[data-oznaka="kosilica"]') }
    this.stavke = { sat: q('[data-stavka="sat"]'), kosilica: q('[data-stavka="kosilica"]') }
    this.posto = { sat: this.scena.querySelector('[data-posto="sat"]'), kosilica: this.scena.querySelector('[data-posto="kosilica"]') }
    this.sad = { sat: this.scena.querySelector('[data-sad="sat"]'), kosilica: this.scena.querySelector('[data-sad="kosilica"]') }
    this.izradio = this.scena.querySelector('[data-izradio]')
    this.poglavlje = this.scena.querySelector('[data-poglavlje]')
    this.ctx = this.platno.getContext('2d')

    document.documentElement.dataset.kz = 'radi'
    this.izmjeri(true)
    // Stranica može biti otvorena usred skrola (osvježavanje, povratak nazad).
    this.p = this.napredak()
    this.crtaj()

    this.naSkrol = () => this.zakazi()
    this.naVelicinu = () => {
      this.izmjeri(false)
      this.zakazi()
    }
    window.addEventListener('scroll', this.naSkrol, { passive: true })
    window.addEventListener('resize', this.naVelicinu)
    this.otkazi = poslijeInterakcije(() => {
      this.ucitajKadrove()
      this.ucitajGlatko()
    })
  }

  ugasi() {
    window.removeEventListener('scroll', this.naSkrol)
    window.removeEventListener('resize', this.naVelicinu)
    if (this.okvir) cancelAnimationFrame(this.okvir)
    this.otkazi?.()
    this.okidac?.kill()
    if (this.tik) this.gsap?.ticker.remove(this.tik)
    this.lenis?.destroy()
    delete document.documentElement.dataset.kz
  }

  izmjeri(prvi) {
    const W = window.innerWidth
    let H = window.innerHeight
    // Na telefonu traka adrese mijenja visinu pri skrolu; male promjene visine se
    // ignorišu da stranica ne skače.
    if (!prvi && this.R && W === this.R.W && Math.abs(H - this.R.H) < 140) H = this.R.H
    const R = raspored(W, H)
    this.R = R
    const s = this.prica.style
    const px = (v) => `${v}px`
    s.setProperty('--kz-h', px(H))
    s.setProperty('--logo-w', px(R.logoW))
    s.setProperty('--logo-h', px(R.logoH))
    s.setProperty('--logo-l', px(R.logoL))
    s.setProperty('--logo-t', px(R.logoT))
    s.setProperty('--kanal-l', px(R.kanalL))
    s.setProperty('--kanal-w', px(R.kanalW))
    s.setProperty('--box-l', px(R.boxL))
    s.setProperty('--box-t', px(R.boxT))
    s.setProperty('--box-w', px(R.boxW))
    s.setProperty('--box-h', px(R.boxH))
    s.setProperty('--sig-dno', px(R.sigDno))
    this.prica.classList.toggle('kz--siroko', jeSiroko(W, H))

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.platno.width = Math.round(R.boxW * dpr)
    this.platno.height = Math.round(R.boxH * dpr)
    this.nacrtan = ''

    // Kartice oznaka na krakovima znaka (samo na širokom ekranu).
    if (R.siroko) {
      const karta = Math.min(290, R.kanalL - 64)
      for (const ime of PREDMETI) {
        this.oznake[ime].forEach((el, i) => {
          const o = this.podaci[ime].oznake[i]
          const y = R.boxT + o.y * R.boxH
          const lijevo = o.strana === 'L'
          const x = lijevo ? R.kanalL - 32 - karta : R.kanalL + R.kanalW + 32
          const ivica = lijevo ? R.W / 2 - R.boxW * 0.24 : R.W / 2 + R.boxW * 0.24
          const cs = el.style
          cs.setProperty('--x', px(x))
          cs.setProperty('--y', px(y - 40 + (o.pomak * R.boxH) / 820))
          cs.setProperty('--w', px(karta))
          cs.setProperty('--cl', px(lijevo ? x + karta : ivica))
          cs.setProperty('--cw', px(Math.max(0, lijevo ? ivica - x - karta : x - ivica)))
          cs.setProperty('--cy', px(y))
          cs.setProperty('--dl', px(ivica - 4.5))
        })
      }
      // Na niskom ekranu kartice sa opisom ne stanu jedna ispod druge: tada opis
      // ostaje samo na zadnjoj kartici koja se pojavila.
      this.prica.classList.remove('kz--zbijeno')
      let zbijeno = false
      for (const ime of PREDMETI) {
        const oznake = this.podaci[ime].oznake
        const visina = Math.max(...this.oznake[ime].map((el) => el.querySelector('.kz-oznaka__karta').offsetHeight))
        for (const strana of ['L', 'D']) {
          const ys = oznake
            .filter((o) => o.strana === strana)
            .map((o) => o.y * R.boxH + (o.pomak * R.boxH) / 820)
            .sort((x, y) => x - y)
          for (let i = 1; i < ys.length; i++) if (ys[i] - ys[i - 1] < visina + 10) zbijeno = true
        }
      }
      this.prica.classList.toggle('kz--zbijeno', zbijeno)
    } else {
      this.prica.classList.remove('kz--zbijeno')
    }
    const dom = Math.max(1, this.prica.offsetHeight - H)
    this.pocetak = this.prica.getBoundingClientRect().top + window.scrollY
    this.domet = dom
  }

  napredak() {
    return cl((window.scrollY - this.pocetak) / this.domet)
  }

  zakazi() {
    if (this.okvir) return
    this.okvir = requestAnimationFrame(() => {
      this.okvir = 0
      if (!this.okidac) this.p = this.napredak()
      this.crtaj()
    })
  }

  vidljivost(ime, o, interaktivan = false) {
    const el = this.slojevi[ime]
    if (!el) return
    const v = Math.round(o * 1000) / 1000
    if (this.zadnje[ime] === v) return
    this.zadnje[ime] = v
    el.style.opacity = String(v)
    if (interaktivan) {
      const skriven = v < 0.5
      el.inert = skriven
      el.style.pointerEvents = skriven ? 'none' : 'auto'
    }
  }

  crtaj() {
    const p = this.p
    const R = this.R
    const c = kamera(p, R)
    const t = transformacija(c, R)
    // Okvir logotipa se ne mijenja (bez pomjeranja rasporeda); kamera ga samo
    // transformiše iz mjesta na prvom ekranu.
    const k0 = R.logoW / LOGO_SIRINA
    this.svg.style.transform = `translate(${(t.x - R.logoL).toFixed(2)}px, ${(t.y - R.logoT).toFixed(2)}px) scale(${(t.k / k0).toFixed(5)})`

    this.vidljivost('uvod', SLOJEVI.uvod(p), true)
    this.vidljivost('uNajava', SLOJEVI.uNajava(p))
    this.vidljivost('kanal', SLOJEVI.kanal(p))
    const kanalPredmet = p < 0.5 ? this.podaci.sat : this.podaci.kosilica
    const kanalTekst = R.siroko ? kanalPredmet.kanal : kanalPredmet.kanalKratko
    if (this.slojevi.kanal && this.slojevi.kanal.textContent !== kanalTekst) this.slojevi.kanal.textContent = kanalTekst

    const aktivan = p < 0.5 ? 'sat' : 'kosilica'
    const stanja = {}
    for (const ime of PREDMETI) {
      const d = this.podaci[ime]
      const st = predmet(VRIJEME[ime], d.oznake.length, d.lista.stavke.length, d.broj, p)
      stanja[ime] = st
      this.oznake[ime].forEach((el, i) => {
        let o = st.oznake[i]
        if (!R.siroko) o = i === st.aktivnaOznaka ? o : 0
        const v = Math.round(o * 1000) / 1000
        if (el.dataset.o !== String(v)) {
          el.dataset.o = String(v)
          el.style.opacity = String(v)
        }
        el.classList.toggle('je-aktivna', i === st.aktivnaOznaka)
      })
      this.vidljivost(`lista-${ime}`, st.lista)
      this.stavke[ime].forEach((el, i) => el.classList.toggle('je-gotovo', i < st.gotovo))
      if (this.posto[ime]) this.posto[ime].textContent = `${st.posto}%`
      if (this.sad[ime]) this.sad[ime].textContent = `${d.lista.stavke[Math.min(d.lista.stavke.length - 1, st.gotovo)]} · ${st.posto}%`
    }
    const pr = stanja[aktivan]
    this.vidljivost('predmet', Math.max(stanja.sat.vidljivost, stanja.kosilica.vidljivost))
    if (pr.vidljivost > 0) this.nacrtaj(aktivan, pr.kadar)

    this.vidljivost('satKraj', SLOJEVI.satKraj(p))
    this.vidljivost('prelaz', SLOJEVI.prelaz(p))
    this.vidljivost('nNajava', SLOJEVI.nNajava(p))
    this.vidljivost('kosKraj', SLOJEVI.kosKraj(p))

    // "Izradio" uz logotip u potpisu.
    const io = SLOJEVI.izradio(p)
    if (this.izradio) {
      this.izradio.style.opacity = String(Math.round(io * 1000) / 1000)
      if (io > 0) {
        const hgt = 124 * t.k
        if (R.siroko) {
          const f = hgt / 1.15
          this.izradio.style.fontSize = `${f.toFixed(1)}px`
          this.izradio.style.left = `${(t.x - 0.4 * f - 4.2 * f).toFixed(1)}px`
          this.izradio.style.width = `${(4.2 * f).toFixed(1)}px`
          this.izradio.style.top = `${(t.y + 0.923 * hgt - 0.82 * f).toFixed(1)}px`
        } else {
          this.izradio.style.fontSize = '44px'
          this.izradio.style.left = `${R.pad + 2}px`
          this.izradio.style.width = 'auto'
          this.izradio.style.top = `${(t.y - 54).toFixed(1)}px`
        }
      }
    }
    this.vidljivost('potpis', SLOJEVI.potpis(p), true)

    if (this.poglavlje) {
      let pg = this.podaci.poglavlja[0]
      for (const x of this.podaci.poglavlja) if (p >= x.od) pg = x
      const tekst = `${pg.broj} / ${broj(this.podaci.poglavlja.length)} · ${pg.ime}`
      if (this.poglavlje.textContent !== tekst) this.poglavlje.textContent = tekst
    }
  }

  nacrtaj(ime, i) {
    const lista = this.kadrovi[ime]
    if (!lista.length) return
    // Najbliži već učitan kadar, da se ne čeka mreža usred skrola.
    let img = null
    for (let d = 0; d < lista.length && !img; d++) {
      for (const j of [i - d, i + d]) {
        const k = lista[j]
        if (k && k.complete && k.naturalWidth) {
          img = k
          break
        }
      }
    }
    if (!img) return
    const kljuc = `${ime}:${img.src}`
    if (kljuc === this.nacrtan) return
    this.nacrtan = kljuc
    const { width, height } = this.platno
    this.ctx.clearRect(0, 0, width, height)
    this.ctx.drawImage(img, 0, 0, width, height)
  }

  ucitajKadrove() {
    for (const ime of PREDMETI) {
      const d = this.podaci[ime]
      // Prvo krajnji kadrovi, pa ostali, da sklapanje odmah ima početak i kraj.
      const redoslijed = [1, d.broj]
      for (let i = 2; i < d.broj; i++) redoslijed.push(i)
      this.kadrovi[ime] = new Array(d.broj)
      for (const n of redoslijed) {
        const img = new Image()
        img.decoding = 'async'
        img.onload = () => {
          this.nacrtan = ''
          this.zakazi()
        }
        img.src = `${d.kadrovi}${broj(n)}.webp`
        this.kadrovi[ime][n - 1] = img
      }
    }
  }

  async ucitajGlatko() {
    try {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('lenis'),
        import('lenis/dist/lenis.css'),
      ])
      if (!this.prica.isConnected) return
      gsap.registerPlugin(ScrollTrigger)
      this.gsap = gsap
      this.lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
      this.lenis.on('scroll', ScrollTrigger.update)
      this.tik = (vrijeme) => this.lenis.raf(vrijeme * 1000)
      gsap.ticker.add(this.tik)
      gsap.ticker.lagSmoothing(0)
      this.okidac = ScrollTrigger.create({
        trigger: this.prica,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (s) => {
          this.p = s.progress
          this.zakazi()
        },
        onRefresh: () => this.izmjeri(false),
      })
      this.p = this.okidac.progress
      this.zakazi()
    } catch {
      // Bez GSAP-a i Lenisa priča i dalje radi na običnom skrolu.
    }
  }
}

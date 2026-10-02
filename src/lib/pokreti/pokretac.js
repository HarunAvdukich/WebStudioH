// Pokreće male animacije na stranici, prema atributu data-pokret:
// - "izroni": riječi se dižu iz maske;
// - "pojavi": element izroni odozdo (sa --i za red);
// - "crtaj": SVG putanje se iscrtaju pa oboje;
// - "slozi": slova se izmiješaju pa slože;
// - "kvacice": stavke dobiju kvačice jedna za drugom (markup daje komponenta);
// - "broji": brojka se odbroji do vrijednosti iz data-do;
// - "pali": riječi se pale dok skrolate.
// Kartice sa data-nagib se nagnu pod mišem.
// Radi samo uz klasu .pokret na <html> (JavaScript i bez "smanji pokrete"). Ono što je vidljivo
// odmah pri učitavanju ostaje kakvo jeste (osim "crtaj" i "slozi"), da prvi ekran ne treperi.
import { mijesaj, eo, paljenje, formatBroj, nagib } from './racun.js'

// Svaku riječ u tekstu (i u unutrašnjim oznakama) umota u span; uz maska=true i u masku.
function razbijNaRijeci(el, maska = true) {
  const setac = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  const cvorovi = []
  while (setac.nextNode()) cvorovi.push(setac.currentNode)
  let i = 0
  const rijeci = []
  for (const cvor of cvorovi) {
    const frag = document.createDocumentFragment()
    for (const dio of cvor.textContent.split(/(\s+)/)) {
      if (!dio) continue
      if (/^\s+$/.test(dio)) {
        frag.append(dio)
        continue
      }
      const rijec = document.createElement('span')
      rijec.className = maska ? 'pk-w' : 'pk-p'
      rijec.style.setProperty('--i', i++)
      rijec.textContent = dio
      rijeci.push(rijec)
      if (maska) {
        const m = document.createElement('span')
        m.className = 'pk-m'
        m.append(rijec)
        frag.append(m)
      } else frag.append(rijec)
    }
    cvor.replaceWith(frag)
  }
  return rijeci
}

// Slova se izmiješaju pa slože u tekst. Element mora imati čist tekst.
function slozi(el) {
  const tekst = el.dataset.pkTekst || (el.dataset.pkTekst = el.textContent)
  const trajanje = 900 + tekst.length * 25
  const t0 = performance.now()
  const korak = (t) => {
    const q = Math.min(1, (t - t0) / trajanje)
    el.textContent = q < 1 ? mijesaj(tekst, q) : tekst
    if (q < 1) requestAnimationFrame(korak)
  }
  requestAnimationFrame(korak)
}

// Brojka se odbroji od nule do data-do, sa razdjelnikom hiljada prema jeziku stranice.
function broji(el) {
  const cilj = Number(el.dataset.do)
  const jezik = document.documentElement.lang === 'en' ? 'en' : 'bs'
  const poslije = el.dataset.poslije || ''
  const t0 = performance.now()
  const korak = (t) => {
    const q = Math.min(1, (t - t0) / 1400)
    el.textContent = formatBroj(cilj * eo(q), jezik) + poslije
    if (q < 1) requestAnimationFrame(korak)
  }
  requestAnimationFrame(korak)
}

// Nagib kartica pod mišem: jedan slušač za cijelu stranicu, samo za miš.
let nagibUkljucen = false
function ukljuciNagib() {
  if (nagibUkljucen || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  nagibUkljucen = true
  let zadnja = null
  const pusti = () => {
    if (!zadnja) return
    zadnja.style.removeProperty('--rx')
    zadnja.style.removeProperty('--ry')
    zadnja = null
  }
  window.addEventListener(
    'pointermove',
    (e) => {
      const k = e.target instanceof Element ? e.target.closest('[data-nagib]') : null
      if (k !== zadnja) pusti()
      if (!k) return
      zadnja = k
      const r = k.getBoundingClientRect()
      const { rx, ry } = nagib(e.clientX - r.left, e.clientY - r.top, r.width, r.height, Number(k.dataset.nagib) || 5)
      k.style.setProperty('--rx', `${rx.toFixed(2)}deg`)
      k.style.setProperty('--ry', `${ry.toFixed(2)}deg`)
    },
    { passive: true },
  )
  document.documentElement.addEventListener('pointerleave', pusti)
}

export function pokreniPokrete(korijen = document) {
  const html = document.documentElement
  if (!html.classList.contains('pokret')) return () => {}
  html.dataset.pokreti = 'radi'
  ukljuciNagib()
  const visina = window.innerHeight

  const io = new IntersectionObserver(
    (ulazi) => {
      for (const u of ulazi) {
        if (!u.isIntersecting) continue
        io.unobserve(u.target)
        u.target.classList.add('pk-vidljiv')
        if (u.target.dataset.pokret === 'slozi') slozi(u.target)
        if (u.target.dataset.pokret === 'broji') broji(u.target)
      }
    },
    { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
  )

  // Tekst koji se pali: stanje se računa odmah, pa ono što je već pročitano ne trepne.
  const pasusi = []
  const osvijetli = () => {
    for (const p of pasusi) {
      const n = Math.round(paljenje(p.el.getBoundingClientRect().top, window.innerHeight) * p.rijeci.length)
      if (n === p.n) continue
      p.n = n
      p.rijeci.forEach((w, i) => w.classList.toggle('on', i < n))
    }
  }
  let kadar = 0
  const naSkrol = () => {
    if (!kadar) kadar = requestAnimationFrame(() => {
      kadar = 0
      osvijetli()
    })
  }

  for (const el of korijen.querySelectorAll('[data-pokret]:not(.pk-spremno)')) {
    const vrsta = el.dataset.pokret
    const r = el.getBoundingClientRect()
    const odmahVidljiv = r.top < visina && r.bottom > 0
    if (vrsta === 'pali') {
      if (odmahVidljiv) continue
      pasusi.push({ el, rijeci: razbijNaRijeci(el, false), n: -1 })
      el.classList.add('pk-spremno')
      continue
    }
    if (odmahVidljiv && vrsta !== 'slozi' && vrsta !== 'crtaj') continue
    if (vrsta === 'izroni') razbijNaRijeci(el)
    if (vrsta === 'broji') el.textContent = formatBroj(0, html.lang === 'en' ? 'en' : 'bs') + (el.dataset.poslije || '')
    el.classList.add('pk-spremno')
    io.observe(el)
  }

  if (pasusi.length) {
    osvijetli()
    window.addEventListener('scroll', naSkrol, { passive: true })
  }
  return () => {
    io.disconnect()
    window.removeEventListener('scroll', naSkrol)
    cancelAnimationFrame(kadar)
  }
}

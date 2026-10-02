// Pokreće male animacije na stranici: elementi sa data-pokret="izroni", "pojavi", "crtaj" ili "slozi".
// Radi samo uz klasu .pokret na <html> (JavaScript i bez "smanji pokrete"). Ono što je vidljivo
// odmah pri učitavanju ostaje kakvo jeste (osim "crtaj" i "slozi"), da prvi ekran ne treperi i ne kasni.
import { mijesaj } from './racun.js'

// Svaku riječ u tekstu (i u unutrašnjim oznakama) umota u masku, da može izroniti.
function razbijNaRijeci(el) {
  const setac = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  const cvorovi = []
  while (setac.nextNode()) cvorovi.push(setac.currentNode)
  let i = 0
  for (const cvor of cvorovi) {
    const frag = document.createDocumentFragment()
    for (const dio of cvor.textContent.split(/(\s+)/)) {
      if (!dio) continue
      if (/^\s+$/.test(dio)) {
        frag.append(dio)
        continue
      }
      const maska = document.createElement('span')
      maska.className = 'pk-m'
      const rijec = document.createElement('span')
      rijec.className = 'pk-w'
      rijec.style.setProperty('--i', i++)
      rijec.textContent = dio
      maska.append(rijec)
      frag.append(maska)
    }
    cvor.replaceWith(frag)
  }
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

export function pokreniPokrete(korijen = document) {
  const html = document.documentElement
  if (!html.classList.contains('pokret')) return () => {}
  html.dataset.pokreti = 'radi'
  const visina = window.innerHeight
  const io = new IntersectionObserver(
    (ulazi) => {
      for (const u of ulazi) {
        if (!u.isIntersecting) continue
        io.unobserve(u.target)
        u.target.classList.add('pk-vidljiv')
        if (u.target.dataset.pokret === 'slozi') slozi(u.target)
      }
    },
    { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
  )
  for (const el of korijen.querySelectorAll('[data-pokret]:not(.pk-spremno)')) {
    const vrsta = el.dataset.pokret
    const r = el.getBoundingClientRect()
    const odmahVidljiv = r.top < visina && r.bottom > 0
    if (odmahVidljiv && vrsta !== 'slozi' && vrsta !== 'crtaj') continue
    if (vrsta === 'izroni') razbijNaRijeci(el)
    el.classList.add('pk-spremno')
    io.observe(el)
  }
  return () => io.disconnect()
}

// Kartica postaje stranica (31): klik na rad raširi njegovu karticu preko cijelog ekrana
// (clip-path, bez animacije rasporeda), otvori studiju ispod, pa se sloj polako izgubi.
// Bez .pokret (bez JavaScripta ili uz "smanji pokrete") studija se otvori odmah.

const TRAJANJE = 620

export function rasiri(izvor, put, navigate) {
  if (!document.documentElement.classList.contains('pokret') || !izvor?.animate) {
    navigate(put)
    return
  }
  const r = izvor.getBoundingClientRect()
  const sirina = window.innerWidth
  const visina = window.innerHeight
  const sloj = document.createElement('div')
  sloj.className = 'rasiri'
  sloj.setAttribute('aria-hidden', 'true')
  const slika = izvor.querySelector('img')
  if (slika) {
    const kopija = document.createElement('img')
    kopija.src = slika.currentSrc || slika.src
    kopija.alt = ''
    kopija.className = 'rasiri__slika'
    sloj.append(kopija)
  }
  document.body.append(sloj)
  const od = `inset(${r.top}px ${sirina - r.right}px ${visina - r.bottom}px ${r.left}px round 22px)`
  const animacija = sloj.animate([{ clipPath: od }, { clipPath: 'inset(0px 0px 0px 0px round 0px)' }], {
    duration: TRAJANJE,
    easing: 'cubic-bezier(0.7, 0, 0.2, 1)',
    fill: 'forwards',
  })
  sloj.querySelector('img')?.animate([{ opacity: 1 }, { opacity: 0.22 }], { duration: TRAJANJE, fill: 'forwards' })
  animacija.finished.then(() => {
    navigate(put)
    setTimeout(() => {
      sloj.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 420, easing: 'ease-out', fill: 'forwards' }).finished.then(() => sloj.remove())
    }, 90)
  })
}

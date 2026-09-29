import { korakZaNapredak } from './pricaKorak.js'

// Priče se kače asinhrono i ne nužno redom stranice. ScrollTrigger računa
// razmak zakačenih scena redom kojim su napravljene, pa se prvo poredaju
// po mjestu na stranici i tek onda osvježe.
let osvjezi = 0
const osvjeziKasnije = (ScrollTrigger) => {
  clearTimeout(osvjezi)
  osvjezi = setTimeout(() => {
    ScrollTrigger.sort()
    ScrollTrigger.refresh()
  }, 60)
}

// Zaustavi scenu priče dok skrol ide kroz korake; svaki korak se pojavi,
// prethodni nestane. Vraća funkciju koja sve gasi.
export async function ozivi(el, { broj, naKorak }) {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
  gsap.registerPlugin(ScrollTrigger)
  // Raspored zakačene scene mora važiti prije kačenja: GSAP izmjeri scenu
  // i zadrži tu visinu, a bez klase bi to bila visina svih koraka jedan ispod drugog.
  el.classList.add('prica--ziva')
  const koraci = el.querySelectorAll('.prica__korak')
  gsap.set(koraci, { autoAlpha: 0, y: 40 })
  gsap.set(koraci[0], { autoAlpha: 1, y: 0 })
  let zadnji = 0
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: 'top top',
      end: `+=${Math.min(broj, 4) * 75}%`,
      pin: el.querySelector('.prica__scena'),
      scrub: 0.6,
      onUpdate: (st) => {
        const i = korakZaNapredak(st.progress, broj)
        if (i !== zadnji) {
          zadnji = i
          naKorak(i)
        }
      },
    },
  })
  osvjeziKasnije(ScrollTrigger)
  // Vremenska linija traje onoliko koliko ima koraka, a prelaz je kratak i
  // stoji na granici koraka, kao korakZaNapredak: između prelaza je na
  // ekranu samo jedan korak.
  koraci.forEach((k, i) => {
    if (i === 0) return
    tl.to(koraci[i - 1], { autoAlpha: 0, y: -40, duration: 0.18 }, i - 0.18)
    tl.to(k, { autoAlpha: 1, y: 0, duration: 0.18 }, i)
  })
  tl.set({}, {}, broj)
  return () => {
    tl.scrollTrigger?.kill()
    tl.kill()
    gsap.set(koraci, { clearProps: 'all' })
    el.classList.remove('prica--ziva')
    osvjeziKasnije(ScrollTrigger)
  }
}

import { korakZaNapredak } from './pricaKorak.js'

// Zaustavi scenu priče dok skrol ide kroz korake; svaki korak se pojavi,
// prethodni nestane. Vraća funkciju koja sve gasi.
export async function ozivi(el, { broj, naKorak }) {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
  gsap.registerPlugin(ScrollTrigger)
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
  koraci.forEach((k, i) => {
    if (i === 0) return
    tl.to(koraci[i - 1], { autoAlpha: 0, y: -40, duration: 1 }, i - 0.5)
    tl.to(k, { autoAlpha: 1, y: 0, duration: 1 }, i - 0.5)
  })
  return () => {
    tl.scrollTrigger?.kill()
    tl.kill()
    gsap.set(koraci, { clearProps: 'all' })
  }
}

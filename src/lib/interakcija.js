// Teške stvari (GSAP, Lenis, kadrovi sklapanja) ne kreću dok posjetilac ništa
// ne uradi na stranici, da ne uspore prvi ekran i ocjenu brzine. Prvi pokret
// miša, dodir, točkić, tipka ili skrol ih otključaju, a stranica otvorena usred
// skrola je već otključana.
const DOGADAJI = ['pointermove', 'pointerdown', 'touchstart', 'wheel', 'keydown', 'scroll']

let bilo = false
const cekaju = new Set()

function otkljucaj() {
  if (bilo) return
  bilo = true
  for (const d of DOGADAJI) window.removeEventListener(d, otkljucaj, true)
  for (const fn of cekaju) fn()
  cekaju.clear()
}

let slusa = false
function slusaj() {
  if (slusa) return
  slusa = true
  for (const d of DOGADAJI) window.addEventListener(d, otkljucaj, { capture: true, passive: true })
}

// Pozove fn poslije prve interakcije (odmah ako je već bila). Vraća otkazivanje.
export function poslijeInterakcije(fn) {
  if (bilo || window.scrollY > 0) {
    bilo = true
    fn()
    return () => {}
  }
  cekaju.add(fn)
  slusaj()
  return () => cekaju.delete(fn)
}

// Račun za male animacije okvira i stranica. Bez DOM-a, da ga provjeri test u Nodeu.

export const cl = (x, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, x))
export const lerp = (a, b, t) => a + (b - a) * t
export const eo = (t) => 1 - Math.pow(1 - t, 3)

// Slova koja se pojavljuju dok se tekst ne složi (404).
const ABECEDA = 'abcdefghijklmnoprstuvzšđčćž'
const OSTAJE = /[\s.,!?:;„“"'·-]/

// Tekst u kojem je složen tek dio slova (napredak 0 do 1). Razmak i interpunkcija ostaju.
export function mijesaj(tekst, napredak, slucajno = Math.random) {
  const slozeno = Math.floor(cl(napredak) * tekst.length)
  let out = ''
  for (let i = 0; i < tekst.length; i++) {
    const c = tekst[i]
    out += i < slozeno || OSTAJE.test(c) ? c : ABECEDA[Math.floor(slucajno() * ABECEDA.length)]
  }
  return out
}

// Zaglavlje se skloni kad se skrola dolje, a vrati čim krene gore. Na vrhu je uvijek vidljivo.
// null znači da se ništa ne mijenja (pomak je premali).
export function smjerZaglavlja(prije, sada, { prag = 6, vrh = 80 } = {}) {
  if (sada <= vrh) return 'vidi'
  if (sada - prije > prag) return 'skrij'
  if (prije - sada > prag) return 'vidi'
  return null
}

// Traka sa WhatsAppom na telefonu: tek poslije prvog ekrana, ne pri dnu (tamo je podnožje
// sa kontaktom) i ne dok posjetilac skrola dolje.
export function vidljivaTraka({ y, ekran, visina, smjer }) {
  if (y < ekran * 0.8) return false
  if (y + ekran > visina - 240) return false
  return smjer !== 'skrij'
}

// Koliko je stranice pročitano, od 0 do 1.
export function procitano(y, visina, ekran) {
  const max = visina - ekran
  return max > 0 ? cl(y / max) : 0
}

// Dugme za vrh: samo na dugim stranicama i kad se posjetilac odmakne od vrha.
export const vidljivVrh = (y, visina, ekran) => visina > ekran * 3 && y > ekran * 1.5

// Magnetno dugme: koliko se pomjeri prema mišu, u pikselima.
export function magnet(dx, dy, { radijus = 140, snaga = 0.3 } = {}) {
  if (Math.hypot(dx, dy) > radijus) return { x: 0, y: 0 }
  return { x: dx * snaga, y: dy * snaga }
}

// Tekst koji se pali dok čitate: koliko je pasusa upaljeno (0 do 1) prema njegovom vrhu.
// Počne kad vrh pređe 92% ekrana, a sve je upaljeno kad vrh dođe na 52% ekrana.
export const paljenje = (vrh, ekran) => cl((ekran * 0.92 - vrh) / (ekran * 0.4))

// Brojka sa razdjelnikom hiljada: bosanski tačka (4.453), engleski zarez (4,453).
export const formatBroj = (n, jezik = 'bs') =>
  String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, jezik === 'en' ? ',' : '.')

// Nagib kartice pod mišem, u stepenima. x i y su položaj miša u kartici.
export function nagib(x, y, sirina, visina, max = 6) {
  return { rx: (0.5 - y / visina) * 2 * max, ry: (x / sirina - 0.5) * 2 * max }
}

// Napredak zakačene scene: 0 kad vrh dijela dođe na vrh ekrana, 1 kad dno dođe na dno.
export function napredakSkrola({ top, height }, ekran) {
  const max = height - ekran
  return max > 0 ? cl(-top / max) : 0
}

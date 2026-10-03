// Scena "Sajt koji raste" (Usluge): stanje izmišljenog sajta za napredak p od 0 do 1.
// Četiri stepenice po četvrtinu skrola: obična stranica, trgovina, SEO i veze, sistemi.
// Na kraju se napuni održavanje. Bez DOM-a, da ga provjeri test; komponenta samo upisuje stilove.
import { cl, eo } from '../pokreti/racun.js'

export const KORACI = 4
const seg = (p, a, b) => cl((p - a) / (b - a))

// Početak i kraj stepenice i (0 do 3), za telefon, gdje svaka stepenica raste za sebe.
export const granice = (i) => [i / KORACI, (i + 1) / KORACI]

export function stanjeSajta(p) {
  const tekstovi = Array.from({ length: KORACI }, (_, i) => {
    const a0 = i / KORACI
    const ulaz = i === 0 ? 1 : eo(seg(p, a0 - 0.02, a0 + 0.04))
    const izlaz = i === KORACI - 1 ? 1 : 1 - seg(p, a0 + 0.22, a0 + 0.25)
    return { vidljivost: Math.min(ulaz, izlaz), pomak: (1 - ulaz) * 26 - (1 - izlaz) * 26 }
  })
  return {
    korak: Math.min(KORACI, Math.floor(p * KORACI) + 1),
    tekstovi,
    put: cl(p * 1.33),
    tacke: Array.from({ length: KORACI }, (_, i) => p >= i / KORACI - 0.001),
    // 1. obična stranica
    zaglavlje: eo(seg(p, 0, 0.05)),
    linije: [eo(seg(p, 0.02, 0.09)), eo(seg(p, 0.05, 0.12)), eo(seg(p, 0.08, 0.14))],
    dugme: seg(p, 0.12, 0.18),
    // 2. trgovina
    artikli: Array.from({ length: 4 }, (_, i) => seg(p, 0.27 + i * 0.03, 0.33 + i * 0.03)),
    korpa: seg(p, 0.36, 0.4),
    korpaBroj: p > 0.46 ? 2 : p > 0.42 ? 1 : 0,
    pouzece: seg(p, 0.44, 0.48),
    // 3. SEO i veze: Google, OLX, Ananas, dobavljač
    veze: Array.from({ length: 4 }, (_, i) => ({
      linija: eo(seg(p, 0.52 + i * 0.03, 0.58 + i * 0.03)),
      znacka: seg(p, 0.55 + i * 0.03, 0.6 + i * 0.03),
      azurirano: p >= 0.66 + i * 0.02,
    })),
    tece: p > 0.62,
    cijenaNova: p >= 0.65,
    // 4. sistemi i aplikacije
    b2b: seg(p, 0.77, 0.8),
    termin: eo(seg(p, 0.79, 0.85)),
    terminIzabran: p > 0.84,
    asistent: seg(p, 0.85, 0.89),
    aplikacija: eo(seg(p, 0.88, 0.93)),
    // održavanje, uvijek uz stranicu
    odrzavanje: eo(seg(p, 0.92, 0.95)),
    odrzavanjePun: seg(p, 0.94, 1),
  }
}

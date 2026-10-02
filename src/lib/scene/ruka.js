// Scena "Iz jedne ruke" (O Hunaru): četiri kartice (dizajner, programer, hosting, održavanje)
// stoje razmaknute sa "prebacivanjem" između, pa se skupe u špil i pretvore u jednu karticu
// "Sve iz jedne ruke". Napredak p od 0 do 1. Bez DOM-a, da ga provjeri test.
import { cl, eo } from '../pokreti/racun.js'

const seg = (p, a, b) => cl((p - a) / (b - a))
export const KARTICA = 4

export function stanjeRuke(p) {
  const ulaz = Array.from({ length: KARTICA }, (_, i) => eo(seg(p, 0.02 + i * 0.05, 0.12 + i * 0.05)))
  const skupi = eo(seg(p, 0.36, 0.6))
  const jedna = eo(seg(p, 0.6, 0.74))
  return {
    naslov: p < 0.6 ? 'obicno' : 'kodNas',
    // razmak: 1 = raširene u redu, 0 = u špilu na sredini
    razmak: 1 - skupi,
    kartice: ulaz.map((u, i) => ({
      vidljivost: u * (1 - jedna),
      nagib: skupi * (i - 1.5) * 4,
      pomak: (1 - u) * 40,
    })),
    strelice: Math.min(eo(seg(p, 0.2, 0.3)), 1 - seg(p, 0.36, 0.44)),
    jedna,
    stavke: Array.from({ length: 4 }, (_, i) => p >= 0.76 + i * 0.05),
  }
}

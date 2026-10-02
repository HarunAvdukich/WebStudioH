// Scena "Razgovor" (Cijene): koliko poruka se vidi za napredak p od 0 do 1, da li druga
// strana "piše" i u kojem smo koraku. Poruke stižu ravnomjerno od 4% do 86% skrola.
// Bez DOM-a, da ga provjeri test.

const POCETAK = 0.04
const KRAJ = 0.86
const PISE = 0.06

export const pragPoruke = (i, ukupno) => (ukupno > 1 ? POCETAK + (i * (KRAJ - POCETAK)) / (ukupno - 1) : POCETAK)

export function stanjeRazgovora(p, poruke) {
  const n = poruke.length
  let vidljive = 0
  while (vidljive < n && p >= pragPoruke(vidljive, n)) vidljive++
  const sljedeca = poruke[vidljive]
  const pise = !!sljedeca && sljedeca.od === 'mi' && p >= pragPoruke(vidljive, n) - PISE
  const korak = vidljive > 0 ? poruke[vidljive - 1].korak : 0
  return { vidljive, pise, korak }
}

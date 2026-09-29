// Geometrija jedne kuke znaka Hunar (slovo u); n je ista kuka okrenuta za 180°.
// Brojevi su isti kao u Documents\Hunar\logo\hunar_logo.py (SVG koordinate, y dolje).
export const KUKA = { s: 78, R: 110, gap: 14, e: 10 }

export function kukaDimenzije({ s, R, gap, e } = KUKA) {
  const H = 2 * R + s + e
  const x1 = s / 2
  const xR = x1 + 2 * R
  const xL = xR - s - gap
  const x3 = xL + 2 * R
  const W = x3 + s / 2
  const cyb = H - s / 2 - R
  const cya = s / 2 + R
  const rIn = R - s / 2 - gap
  const cnx = xL + R
  const yVrh = cya - Math.sqrt(rIn ** 2 - (xR + s / 2 - cnx) ** 2)
  return { W, H, x1, xR, xL, x3, cyb, cya, rIn, cnx, yVrh }
}

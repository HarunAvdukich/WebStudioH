import { Shape, ExtrudeGeometry, Mesh, MeshPhysicalMaterial, Color } from 'three'
import { KUKA, kukaDimenzije } from '../brand/kuka.js'

// SVG (y dolje) u three (y gore): y -> -y, ugao -> -ugao. Okrenuta kuka: +180°.
function kukaOblik(rotirana) {
  const { s, R } = KUKA
  const { W, H, x1, xR, xL, cyb, cya, rIn, cnx, yVrh } = kukaDimenzije()
  const P = (x, y) => (rotirana ? [W - x, -(H - y)] : [x, -y])
  const A = (a) => (rotirana ? Math.PI - a : -a)
  const th1 = Math.atan2(yVrh - cya, xR + s / 2 - cnx)
  const o = new Shape()
  o.moveTo(...P(x1 - s / 2, 0))
  o.lineTo(...P(x1 - s / 2, cyb))
  o.absarc(...P(x1 + R, cyb), R + s / 2, A(Math.PI), A(0), false)
  o.lineTo(...P(xR + s / 2, yVrh))
  o.absarc(...P(xL + R, cya), rIn, A(th1), A(Math.PI), false)
  o.lineTo(...P(xR - s / 2, cyb))
  o.absarc(...P(x1 + R, cyb), R - s / 2, A(0), A(Math.PI), true)
  o.lineTo(...P(x1 + s / 2, 0))
  o.closePath()
  return o
}

export function znakGeometrija({ dubina = 40, zaobljenje = 6, velicina = 2 } = {}) {
  const geo = new ExtrudeGeometry([kukaOblik(false), kukaOblik(true)], {
    depth: dubina,
    bevelEnabled: zaobljenje > 0,
    bevelThickness: zaobljenje,
    bevelSize: zaobljenje,
    bevelSegments: 4,
    curveSegments: 48,
  })
  const { W } = kukaDimenzije()
  const k = velicina / (W + 2 * zaobljenje)
  geo.scale(k, k, k)
  geo.center()
  return geo
}

export function napraviZnak({ boja = '#0E8A64' } = {}) {
  const mat = new MeshPhysicalMaterial({
    color: new Color(boja),
    roughness: 0.34,
    metalness: 0.05,
    specularIntensity: 0.3,
    clearcoat: 0.5,
    clearcoatRoughness: 0.12,
    // Okruženje je svijetlo za artikle na tamnoj sceni; znak bi u njemu
    // izblijedio u mint, a mora ostati smaragdni kao na logotipu.
    envMapIntensity: 0.3,
  })
  return new Mesh(znakGeometrija(), mat)
}

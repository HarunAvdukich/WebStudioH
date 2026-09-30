// Račun priče "Kroz znak": gdje je kamera, šta je vidljivo i koji kadar sklapanja
// se crta za napredak skrola p (0 do 1). Bez DOM-a, da se može provjeriti testom.

// viewBox zvaničnog logotipa
export const LOGO_SIRINA = 573.7
export const LOGO_VISINA = 124

// Tamni procjep u slovu u i u slovu n, u koordinatama logotipa. Računato iz
// geometrije znaka: slovo n je slovo u okrenuto za 180 stepeni, pa je procjep u n
// slika procjepa u u.
export const A = { x: 42.71, y: 48.75 }
export const B = { x: 127.26, y: 75.25 }
const PROCJEP = 52.85 // širina procjepa u jedinicama znaka
const ZNAK = 0.38961 // razmjer znaka unutar logotipa

export const cl = (x) => (x < 0 ? 0 : x > 1 ? 1 : x)
export const ez = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
export const lp = (a, b, t) => a + (b - a) * t
export const seg = (p, a, b) => cl((p - a) / (b - a))
export const fade = (p, a0, a1, b0, b1) => cl((p - a0) / (a1 - a0)) * (1 - cl((p - b0) / (b1 - b0)))

// Isti uslov kao media upit u pocetna.css.
export const jeSiroko = (W, H) => W >= 1180 && H >= 600

export function raspored(W, H) {
  const siroko = jeSiroko(W, H)
  const pad = siroko ? Math.min(120, W * 0.083) : 24
  const odnos = LOGO_VISINA / LOGO_SIRINA
  const logoW = siroko ? Math.min(1200, W - 2 * pad, (H - 390) / odnos) : W - 2 * pad
  const logoH = logoW * odnos
  const logoL = siroko ? (W - logoW) / 2 : pad
  const logoT = siroko ? Math.max(130, (H - logoH) / 2 - 60) : H * 0.34

  const kanalW = siroko ? Math.min(760, Math.max(560, W * 0.51)) : Math.min(W - 90, 420)
  const jedinica = (logoW / LOGO_SIRINA) * ZNAK
  const zum = kanalW / (PROCJEP * jedinica)
  const sred = { x: W / 2, y: H * 0.52 }

  let boxW, boxH, boxT
  if (siroko) {
    boxH = Math.min(H * 0.9, (kanalW - 60) / 0.75)
    boxW = boxH * 0.75
    boxT = (H - boxH) / 2 + H * 0.01
  } else {
    boxW = Math.min(kanalW - 24, H * 0.44 * 0.75)
    boxH = boxW / 0.75
    boxT = H * 0.135
  }

  // Potpis: logo se smanji i dobije "Izradio" ispred (široko) ili iznad (usko).
  let sig, fin
  if (siroko) {
    const s = 0.5
    const f = (logoW * s * odnos) / 1.15
    const grupa = 3.15 * f + 0.4 * f + logoW * s
    const L = W / 2 - grupa / 2 + 3.55 * f
    sig = { L, T: H * 0.17, s }
    fin = { L, T: H * 0.107, s }
  } else {
    sig = { L: pad, T: H * 0.2, s: 1 }
    fin = sig
  }

  return {
    W, H, siroko, pad, logoW, logoH, logoL, logoT,
    kanalW, kanalL: W / 2 - kanalW / 2, zum, sred,
    boxW, boxH, boxT, boxL: W / 2 - boxW / 2, sig, fin,
  }
}

function org(P, left, top, s, logoW) {
  const k = (logoW / LOGO_SIRINA) * s
  return { x: left + P.x * k, y: top + P.y * k }
}

// Kamera: ulaz u slovo u, prelet preko petlje u slovo n, izlaz, potpis.
export function kamera(p, R) {
  const Z = R.zum
  const start = org(A, R.logoL, R.logoT, 1, R.logoW)
  const o1 = org(B, R.logoL, R.logoT, 1, R.logoW)
  const sig = org(B, R.sig.L, R.sig.T, R.sig.s, R.logoW)
  const fin = org(B, R.fin.L, R.fin.T, R.fin.s, R.logoW)
  let e
  if (p < 0.14) {
    e = ez(seg(p, 0.04, 0.14))
    return { L: A, s: Math.pow(Z, e), x: lp(start.x, R.sred.x, e), y: lp(start.y, R.sred.y, e) }
  }
  if (p < 0.47) return { L: A, s: Z, x: R.sred.x, y: R.sred.y }
  if (p < 0.55) {
    e = ez(seg(p, 0.47, 0.55))
    return {
      L: { x: lp(A.x, B.x, e), y: lp(A.y, B.y, e) },
      s: Math.pow(Z, 1 - 0.62 * Math.sin(Math.PI * e)),
      x: R.sred.x,
      y: R.sred.y,
    }
  }
  if (p < 0.82) return { L: B, s: Z, x: R.sred.x, y: R.sred.y }
  if (p < 0.86) {
    e = ez(seg(p, 0.82, 0.86))
    return { L: B, s: Math.pow(Z, 1 - e), x: lp(R.sred.x, o1.x, e), y: lp(R.sred.y, o1.y, e) }
  }
  if (p < 0.93) {
    e = ez(seg(p, 0.86, 0.9))
    return { L: B, s: lp(1, R.sig.s, e), x: lp(o1.x, sig.x, e), y: lp(o1.y, sig.y, e) }
  }
  e = ez(seg(p, 0.93, 0.97))
  return { L: B, s: R.fin.s, x: lp(sig.x, fin.x, e), y: lp(sig.y, fin.y, e) }
}

// Transformacija grupe logotipa za kameru, u pikselima scene.
export function transformacija(c, R) {
  const k = (R.logoW / LOGO_SIRINA) * c.s
  return { k, x: c.x - k * c.L.x, y: c.y - k * c.L.y }
}

export const VRIJEME = {
  sat: { vidljiv: 0.19, sklapanje: [0.33, 0.42], nestaje: 0.47, prvaOznaka: 0.205, korak: 0.013 },
  kosilica: { vidljiv: 0.58, sklapanje: [0.7, 0.785], nestaje: 0.82, prvaOznaka: 0.595, korak: 0.015 },
}

// Stanje jednog predmeta: kadar sklapanja, vidljivost, oznake i lista.
export function predmet(V, brojOznaka, brojStavki, brojKadrova, p) {
  const t = ez(seg(p, V.sklapanje[0], V.sklapanje[1]))
  const kadar = Math.round(t * (brojKadrova - 1))
  const vidljivost = cl((p - V.vidljiv) / 0.02) * (1 - cl((p - V.nestaje) / 0.02))
  const oznake = []
  for (let i = 0; i < brojOznaka; i++) {
    oznake.push(cl((p - (V.prvaOznaka + i * V.korak)) / 0.012) * (1 - cl(t / 0.12)))
  }
  const aktivnaOznaka = Math.max(0, Math.min(brojOznaka - 1, Math.floor((p - V.prvaOznaka) / V.korak)))
  const lista = cl((t - 0.02) / 0.08) * (1 - cl((p - (V.sklapanje[1] + 0.005)) / 0.012))
  const gotovo = Math.min(brojStavki, Math.floor(t * (brojStavki + 0.5)))
  return { t, kadar, vidljivost, oznake, aktivnaOznaka, lista, gotovo, posto: Math.round(t * 100) }
}

export const SLOJEVI = {
  uvod: (p) => 1 - cl((p - 0.02) / 0.05),
  uNajava: (p) => fade(p, 0.13, 0.15, 0.18, 0.195),
  kanal: (p) => Math.max(fade(p, 0.19, 0.21, 0.46, 0.48), fade(p, 0.58, 0.6, 0.81, 0.83)),
  satKraj: (p) => fade(p, 0.425, 0.44, 0.465, 0.48),
  prelaz: (p) => fade(p, 0.49, 0.5, 0.53, 0.54),
  nNajava: (p) => fade(p, 0.55, 0.565, 0.575, 0.59),
  kosKraj: (p) => fade(p, 0.79, 0.8, 0.815, 0.825),
  izradio: (p) => ez(seg(p, 0.87, 0.9)),
  potpis: (p) => fade(p, 0.895, 0.91, 0.925, 0.94),
  finale: (p) => cl((p - 0.935) / 0.04),
}

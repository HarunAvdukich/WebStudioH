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

// Priča je izmjerena u ekranima skrola (1 = jedna visina prozora), da svaki tekst
// stoji dovoljno dugo da se pročita. p (0 do 1) je udio od UKUPNO ekrana, a
// visina priče u pocetna.css je UKUPNO + 1 ekran (test to provjerava).
export const UKUPNO = 23.1
const e = (ekran) => ekran / UKUPNO

// Vremena u ekranima: [pojava, puno, počinje nestajati, nestalo] ili [od, do].
// Poslije svakog predmeta dolazi prava stranica tog artikla (satSajt, kosSajt).
export const T = {
  uvod: [0.2, 0.7],
  zumU: [0.4, 1.5],
  uNajava: [1.35, 1.55, 2.55, 2.75].map(e),
  kanalSat: [2.7, 2.9, 9.9, 10.1].map(e),
  satKraj: [8.6, 8.8, 9.9, 10.1].map(e),
  satSajt: [10.0, 10.25, 11.25, 11.45].map(e),
  prelet: [11.5, 12.5],
  prelaz: [11.6, 11.75, 12.25, 12.4].map(e),
  nNajava: [12.45, 12.65, 13.65, 13.85].map(e),
  kanalKos: [13.8, 14.0, 19.4, 19.6].map(e),
  kosKraj: [18.2, 18.4, 19.4, 19.6].map(e),
  kosSajt: [19.55, 19.8, 20.8, 21.0].map(e),
  zumVan: [21.0, 21.55],
  potpis: [21.55, 22.0],
  izradio: [21.65, 22.0],
  potpisTekst: [21.95, 22.15].map(e),
}
for (const k of ['uvod', 'zumU', 'prelet', 'zumVan', 'potpis', 'izradio']) T[k] = T[k].map(e)

// Početak svakog poglavlja (broj i ime su u tekstu stranice).
export const POGLAVLJA = [0, T.uNajava[0], T.prelet[0], T.nNajava[0], T.zumVan[0]]

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
  let sig
  if (siroko) {
    const s = 0.5
    const f = (logoW * s * odnos) / 1.15
    const grupa = 3.15 * f + 0.4 * f + logoW * s
    const L = W / 2 - grupa / 2 + 3.55 * f
    sig = { L, T: Math.max(96, H * 0.15), s }
  } else {
    sig = { L: pad, T: H * 0.2, s: 1 }
  }
  // Donja ivica potpisa: ispod nje idu tekst i radovi.
  const sigDno = sig.T + logoH * sig.s

  return {
    W, H, siroko, pad, logoW, logoH, logoL, logoT,
    kanalW, kanalL: W / 2 - kanalW / 2, zum, sred,
    boxW, boxH, boxT, boxL: W / 2 - boxW / 2, sig, sigDno,
  }
}

function org(P, left, top, s, logoW) {
  const k = (logoW / LOGO_SIRINA) * s
  return { x: left + P.x * k, y: top + P.y * k }
}

// Kamera: ulaz u slovo u, prelet preko petlje u slovo n, izlaz, potpis. Poslije
// potpisa scena stoji, a poziv na kraju (van scene) naiđe preko nje.
export function kamera(p, R) {
  const Z = R.zum
  const start = org(A, R.logoL, R.logoT, 1, R.logoW)
  const o1 = org(B, R.logoL, R.logoT, 1, R.logoW)
  const sig = org(B, R.sig.L, R.sig.T, R.sig.s, R.logoW)
  let e
  if (p < T.zumU[1]) {
    e = ez(seg(p, T.zumU[0], T.zumU[1]))
    return { L: A, s: Math.pow(Z, e), x: lp(start.x, R.sred.x, e), y: lp(start.y, R.sred.y, e) }
  }
  if (p < T.prelet[0]) return { L: A, s: Z, x: R.sred.x, y: R.sred.y }
  if (p < T.prelet[1]) {
    e = ez(seg(p, T.prelet[0], T.prelet[1]))
    return {
      L: { x: lp(A.x, B.x, e), y: lp(A.y, B.y, e) },
      s: Math.pow(Z, 1 - 0.62 * Math.sin(Math.PI * e)),
      x: R.sred.x,
      y: R.sred.y,
    }
  }
  if (p < T.zumVan[0]) return { L: B, s: Z, x: R.sred.x, y: R.sred.y }
  if (p < T.zumVan[1]) {
    e = ez(seg(p, T.zumVan[0], T.zumVan[1]))
    return { L: B, s: Math.pow(Z, 1 - e), x: lp(R.sred.x, o1.x, e), y: lp(R.sred.y, o1.y, e) }
  }
  e = ez(seg(p, T.potpis[0], T.potpis[1]))
  return { L: B, s: lp(1, R.sig.s, e), x: lp(o1.x, sig.x, e), y: lp(o1.y, sig.y, e) }
}

// Transformacija grupe logotipa za kameru, u pikselima scene.
export function transformacija(c, R) {
  const k = (R.logoW / LOGO_SIRINA) * c.s
  return { k, x: c.x - k * c.L.x, y: c.y - k * c.L.y }
}

// Oznake izlaze jedna po jedna (korak), pa se predmet sklopi. Predmet nestaje kad
// se pojavi snimak prave stranice tog artikla sa telefona.
export const VRIJEME = {
  sat: { vidljiv: e(2.7), sklapanje: [e(7.05), e(8.35)], nestaje: e(9.95), prvaOznaka: e(2.95), korak: e(0.45) },
  kosilica: { vidljiv: e(13.8), sklapanje: [e(16.8), e(17.95)], nestaje: e(19.5), prvaOznaka: e(14.05), korak: e(0.45) },
}
const POJAVA = e(0.13) // oznaka se pojavi
const PREDMET = e(0.22) // predmet se pojavi ili nestane
const LISTA = [e(0.05), e(0.15)] // lista nestaje poslije sklapanja: zastoj, trajanje

// Stanje jednog predmeta: kadar sklapanja, vidljivost, oznake i lista.
export function predmet(V, brojOznaka, brojStavki, brojKadrova, p) {
  const t = ez(seg(p, V.sklapanje[0], V.sklapanje[1]))
  const kadar = Math.round(t * (brojKadrova - 1))
  const vidljivost = cl((p - V.vidljiv) / PREDMET) * (1 - cl((p - V.nestaje) / PREDMET))
  const oznake = []
  for (let i = 0; i < brojOznaka; i++) {
    oznake.push(cl((p - (V.prvaOznaka + i * V.korak)) / POJAVA) * (1 - cl(t / 0.12)))
  }
  const aktivnaOznaka = Math.max(0, Math.min(brojOznaka - 1, Math.floor((p - V.prvaOznaka) / V.korak)))
  const lista = cl((t - 0.02) / 0.08) * (1 - cl((p - (V.sklapanje[1] + LISTA[0])) / LISTA[1]))
  const gotovo = Math.min(brojStavki, Math.floor(t * (brojStavki + 0.5)))
  return { t, kadar, vidljivost, oznake, aktivnaOznaka, lista, gotovo, posto: Math.round(t * 100) }
}

// Kraj sklapanja se pojavi tek kad lista i procenat nestanu, da se tekst ne
// preklapa na istom mjestu.
const faza = (p, [a0, a1, b0, b1]) => fade(p, a0, a1, b0, b1)
export const SLOJEVI = {
  uvod: (p) => 1 - seg(p, T.uvod[0], T.uvod[1]),
  uNajava: (p) => faza(p, T.uNajava),
  kanal: (p) => Math.max(faza(p, T.kanalSat), faza(p, T.kanalKos)),
  satKraj: (p) => faza(p, T.satKraj),
  prelaz: (p) => faza(p, T.prelaz),
  nNajava: (p) => faza(p, T.nNajava),
  kosKraj: (p) => faza(p, T.kosKraj),
  satSajt: (p) => faza(p, T.satSajt),
  kosSajt: (p) => faza(p, T.kosSajt),
  izradio: (p) => ez(seg(p, T.izradio[0], T.izradio[1])),
  potpis: (p) => seg(p, T.potpisTekst[0], T.potpisTekst[1]),
}

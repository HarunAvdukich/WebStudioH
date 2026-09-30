// Provjere nove početne "Kroz znak": tekst, kadrovi i račun kamere.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import * as pocetna from '../src/pocetna.js'
import { raspored, kamera, transformacija, predmet, VRIJEME, SLOJEVI, LOGO_SIRINA } from '../src/components/pocetna/motor.js'

function strings(value, out = []) {
  if (typeof value === 'string') out.push(value)
  else if (Array.isArray(value)) value.forEach((v) => strings(v, out))
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => strings(v, out))
  return out
}
const tekst = strings(Object.fromEntries(Object.entries(pocetna)))

test('nijedan tekst početne nema dugu ni srednju crtu', () => {
  assert.deepEqual(tekst.filter((s) => /[—–]/.test(s)), [])
})

test('UPTOS se ne pominje', () => {
  assert.deepEqual(tekst.filter((s) => /uptos/i.test(s)), [])
})

test('brojke idu sa datumom mjerenja', () => {
  const sve = tekst.join(' \n ')
  for (const [broj, datum] of [['7.460', '29. 9. 2026'], ['4.453', '29. 9. 2026'], ['52 ms', '27. 9. 2026']]) {
    const red = tekst.find((s) => s.includes(broj))
    assert.ok(red, `nema ${broj}`)
    assert.ok(red.includes(datum), `${broj} bez datuma: ${red}`)
  }
  assert.ok(!/\$\s?\d/.test(sve))
})

test('WhatsApp link ima unaprijed upisanu poruku', () => {
  assert.match(pocetna.whatsappLink, /^https:\/\/wa\.me\/387603000751\?text=/)
})

test('svi kadrovi sklapanja postoje', () => {
  for (const p of [pocetna.sat, pocetna.kosilica]) {
    for (let i = 1; i <= p.broj; i++) {
      const f = `public${p.kadrovi}${String(i).padStart(2, '0')}.webp`
      assert.ok(existsSync(f), `nema ${f}`)
    }
  }
})

test('broj stavki u listi i oznaka odgovara crtežu', () => {
  assert.equal(pocetna.sat.oznake.length, 9)
  assert.equal(pocetna.kosilica.oznake.length, 6)
})

for (const [W, H] of [[1440, 900], [1920, 1080], [1280, 720], [390, 844], [360, 640]]) {
  test(`logo na prvom ekranu stoji tačno gdje ga crta CSS (${W}x${H})`, () => {
    const R = raspored(W, H)
    const t = transformacija(kamera(0, R), R)
    assert.ok(Math.abs(t.x - R.logoL) < 0.01)
    assert.ok(Math.abs(t.y - R.logoT) < 0.01)
    assert.ok(Math.abs(t.k - R.logoW / LOGO_SIRINA) < 1e-9)
  })

  test(`kanal i predmet stanu u ekran (${W}x${H})`, () => {
    const R = raspored(W, H)
    assert.ok(R.kanalL > 0 && R.kanalL + R.kanalW < W)
    assert.ok(R.boxL >= R.kanalL && R.boxL + R.boxW <= R.kanalL + R.kanalW)
    assert.ok(R.boxT >= 0 && R.boxT + R.boxH <= H)
  })
}

test('tekst govori glasom studija, ne u prvom licu jednine', () => {
  const ja = /\b(napravio|pravim|mjerim|pazim|dajem|odgovaram|sklapam|kod mene)\b/i
  assert.deepEqual(tekst.filter((s) => ja.test(s)), [])
})

test('potpis vodi na stvarne radove', () => {
  assert.deepEqual(pocetna.potpis.radovi.map((r) => r.put), ['/radovi/mrt', '/radovi/smarttime'])
})

test('kraj sklapanja se ne preklapa sa listom i procentom', () => {
  for (const [ime, kraj] of [['sat', SLOJEVI.satKraj], ['kosilica', SLOJEVI.kosKraj]]) {
    const d = pocetna[ime]
    for (let p = 0; p <= 1; p += 0.0005) {
      const lista = predmet(VRIJEME[ime], d.oznake.length, d.lista.stavke.length, d.broj, p).lista
      assert.ok(!(lista > 0 && kraj(p) > 0), `${ime}: lista i kraj zajedno na p=${p.toFixed(4)}`)
    }
  }
})

for (const [W, H] of [[1536, 730], [1366, 657], [1280, 650], [1920, 960], [390, 700]]) {
  test(`potpis sa radovima stane u ekran (${W}x${H})`, () => {
    const R = raspored(W, H)
    // tekst (2 reda) i dva reda radova ispod donje ivice potpisa
    const visina = R.siroko ? 36 + 34 + 26 + 2 * 93 : 28 + 2 * 26 + 18 + 2 * 110
    assert.ok(R.sigDno + visina < H - 20, `dno ${Math.round(R.sigDno + visina)} > ${H - 20}`)
  })
}

test('sklapanje ide od prvog do zadnjeg kadra', () => {
  const V = VRIJEME.sat
  assert.equal(predmet(V, 9, 9, 42, 0.2).kadar, 0)
  assert.equal(predmet(V, 9, 9, 42, 0.45).kadar, 41)
  assert.equal(predmet(V, 9, 9, 42, 0.1).vidljivost, 0)
  assert.equal(predmet(V, 9, 9, 42, 0.45).gotovo, 9)
})

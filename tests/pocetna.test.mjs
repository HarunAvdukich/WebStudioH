// Provjere nove početne "Kroz znak": tekst, kadrovi i račun kamere.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import * as pocetna from '../src/pocetna.js'
import * as english from '../src/pocetna.en.js'
import { brojka } from '../src/brojke.js'
import { raspored, kamera, transformacija, predmet, VRIJEME, SLOJEVI, T, UKUPNO, POGLAVLJA, LOGO_SIRINA } from '../src/components/pocetna/motor.js'

function strings(value, out = []) {
  if (typeof value === 'string') out.push(value)
  else if (Array.isArray(value)) value.forEach((v) => strings(v, out))
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => strings(v, out))
  return out
}
const tekst = strings(Object.fromEntries(Object.entries(pocetna)))
// Broj kao zasebna riječ (520 ne smije pogoditi 5.520 ni 52).
const imaBroj = (s, broj) => new RegExp(String.raw`(^|[\s(])` + broj.replace(/\./g, String.raw`\.`) + String.raw`(?![\d.,]\d)`).test(s)

test('nijedan tekst početne nema dugu ni srednju crtu', () => {
  assert.deepEqual(tekst.filter((s) => /[—–]/.test(s)), [])
})

test('UPTOS se ne pominje', () => {
  assert.deepEqual(tekst.filter((s) => /uptos/i.test(s)), [])
})

test('brojke idu sa datumom mjerenja', () => {
  const sve = tekst.join(' \n ')
  // brojke sa trgovina dolaze iz src/brojke-podaci.js (P1), brzina je izmjerena ručno
  const parovi = ['mrtArtikli', 'mrtOlx', 'smarttimeSatovi'].map((k) => [brojka(k).broj, brojka(k).datum])
  for (const [broj, datum] of [...parovi, ['52 ms', '27. 9. 2026']]) {
    const red = tekst.find((s) => imaBroj(s, broj))
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
      const f = `public${p.kadrovi}${String(i).padStart(3, '0')}.webp`
      assert.ok(existsSync(f), `nema ${f}`)
    }
  }
})

test('broj stavki u listi i oznaka odgovara crtežu', () => {
  // osam usluga (R13, odluka vlasnika od 2. 10. 2026)
  assert.equal(pocetna.sat.oznake.length, 8)
  assert.equal(pocetna.sat.lista.stavke.length, 8)
  assert.equal(pocetna.finale.ponuda.length, 8)
  assert.equal(pocetna.usluge.length, 8)
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
  assert.equal(predmet(V, 9, 9, 42, V.sklapanje[0] - 0.001).kadar, 0)
  assert.equal(predmet(V, 9, 9, 42, V.sklapanje[1] + 0.001).kadar, 41)
  assert.equal(predmet(V, 9, 9, 42, V.vidljiv - 0.001).vidljivost, 0)
  assert.equal(predmet(V, 9, 9, 42, V.sklapanje[1] + 0.001).gotovo, 9)
})

test('visina priče u CSS-u odgovara vremenima u motor.js', () => {
  const css = readFileSync('src/components/pocetna/pocetna.css', 'utf8')
  const m = css.match(/height: calc\(var\(--kz-h\) \* ([\d.]+)\)/)
  assert.ok(m, 'nema visine priče')
  assert.equal(Number(m[1]), Math.round((UKUPNO + 1) * 100) / 100)
})

test('svaki tekst stoji dovoljno dugo da se pročita', () => {
  // puno vidljiv, u ekranima skrola
  const ekrana = ([, a1, b0]) => (b0 - a1) * UKUPNO
  for (const ime of ['uNajava', 'satKraj', 'satSajt', 'nNajava', 'kosKraj', 'kosSajt']) {
    assert.ok(ekrana(T[ime]) >= 0.75, `${ime}: ${ekrana(T[ime]).toFixed(2)} ekrana`)
  }
  assert.ok(ekrana(T.prelaz) >= 0.45)
  // potpis stoji bar pola ekrana prije nego što ga poziv na kraju počne prekrivati
  assert.ok(UKUPNO - 0.4 - T.potpisTekst[1] * UKUPNO >= 0.45)
  for (const [ime, V] of Object.entries(VRIJEME)) {
    // vlasnik: 0,45 ekrana je bilo presporo, 0,24 prebrzo za tekst; drži se oko 0,25
    assert.ok(V.korak * UKUPNO >= 0.22 && V.korak * UKUPNO <= 0.3, `${ime}: brzina oznaka`)
  }
})

test('poglavlja idu redom i ima ih koliko imena', () => {
  assert.equal(POGLAVLJA.length, pocetna.poglavlja.length)
  assert.equal(POGLAVLJA.length, english.poglavlja.length)
  for (let i = 1; i < POGLAVLJA.length; i++) assert.ok(POGLAVLJA[i] > POGLAVLJA[i - 1])
})

test('snimci pravih stranica postoje', () => {
  for (const ime of ['sat', 'kosilica']) assert.ok(existsSync(`public${pocetna[ime].sajt.slika}`))
})

// Engleska početna: isti oblik i ista pravila kao bosanska.
const tekstEn = strings(Object.fromEntries(Object.entries(english)))

test('engleski: bez duge i srednje crte i bez UPTOS-a', () => {
  assert.deepEqual(tekstEn.filter((s) => /[—–]/.test(s) || /uptos/i.test(s)), [])
})

test('engleski: brojke idu sa datumom mjerenja', () => {
  const parovi = ['mrtArtikli', 'mrtOlx', 'smarttimeSatovi'].map((k) => [brojka(k, 'en').broj, brojka(k, 'en').datum])
  for (const [broj, datum] of [...parovi, ['52 ms', '27 Sep 2026']]) {
    const red = tekstEn.find((s) => imaBroj(s, broj))
    assert.ok(red, `nema ${broj}`)
    assert.ok(red.includes(datum), `${broj} bez datuma: ${red}`)
  }
})

test('engleski: isti raspored oznaka i ista struktura kao bosanski', () => {
  for (const ime of ['sat', 'kosilica']) {
    assert.deepEqual(english[ime].oznake.map((o) => [o.y, o.strana]), pocetna[ime].oznake.map((o) => [o.y, o.strana]))
    assert.equal(english[ime].lista.stavke.length, pocetna[ime].lista.stavke.length)
  }
  assert.deepEqual(Object.keys(english).sort(), Object.keys(pocetna).sort())
  assert.deepEqual(Object.keys(english.ui).sort(), Object.keys(pocetna.ui).sort())
  assert.match(english.whatsappLink, /^https:\/\/wa\.me\/387603000751\?text=/)
  assert.equal(english.drugiJezik.put, pocetna.put)
  assert.equal(pocetna.drugiJezik.put, english.put)
})

test('nema vidljive oznake AI ilustracije (vlasnik je ne želi); alt tekst je zadržava', () => {
  const ai = /\(AI\)/
  assert.deepEqual([...tekst, ...tekstEn].filter((s) => ai.test(s)), [])
  assert.match(pocetna.sat.alt, /ilustracija/)
  assert.match(english.kosilica.alt, /illustration/)
})

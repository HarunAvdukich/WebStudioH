// Račun velikih scena (bez DOM-a): "Sajt koji raste" i "Razgovor".
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { stanjeSajta, granice, KORACI } from '../src/lib/scene/sajt.js'

function brojevi(v, out = []) {
  if (typeof v === 'number') out.push(v)
  else if (Array.isArray(v)) v.forEach((x) => brojevi(x, out))
  else if (v && typeof v === 'object') Object.values(v).forEach((x) => brojevi(x, out))
  return out
}

test('sajt: na početku samo prva stepenica, ništa nije sagrađeno', () => {
  const s = stanjeSajta(0)
  assert.equal(s.korak, 1)
  assert.equal(s.tekstovi[0].vidljivost, 1)
  assert.equal(s.tekstovi[1].vidljivost, 0)
  assert.equal(s.zaglavlje, 0)
  assert.equal(s.korpaBroj, 0)
  assert.equal(s.cijenaNova, false)
  assert.equal(s.odrzavanjePun, 0)
})

test('sajt: stepenice se smjenjuju po četvrtinama', () => {
  assert.equal(stanjeSajta(0.3).korak, 2)
  assert.equal(stanjeSajta(0.55).korak, 3)
  assert.equal(stanjeSajta(0.8).korak, 4)
  assert.equal(stanjeSajta(1).korak, 4)
})

test('sajt: na kraju je sve sagrađeno, cijena pala, oglasi ažurirani, održavanje puno', () => {
  const s = stanjeSajta(1)
  assert.equal(s.zaglavlje, 1)
  assert.ok(s.artikli.every((a) => a === 1))
  assert.equal(s.korpaBroj, 2)
  assert.equal(s.cijenaNova, true)
  assert.ok(s.veze.every((v) => v.azurirano && v.znacka === 1))
  assert.equal(s.terminIzabran, true)
  assert.equal(s.odrzavanjePun, 1)
  assert.equal(s.tekstovi[KORACI - 1].vidljivost, 1)
})

test('sajt: sve vrijednosti su između 0 i 1, osim pomaka teksta', () => {
  for (let p = 0; p <= 1.0001; p += 0.01) {
    const s = stanjeSajta(p)
    const { tekstovi, korak, korpaBroj, ...ostalo } = s
    for (const n of brojevi(ostalo)) assert.ok(n >= 0 && n <= 1, `p=${p.toFixed(2)}: ${n}`)
    for (const t of tekstovi) assert.ok(t.vidljivost >= 0 && t.vidljivost <= 1)
  }
})

test('sajt: granice stepenica za telefon', () => {
  assert.deepEqual(granice(0), [0, 0.25])
  assert.deepEqual(granice(3), [0.75, 1])
})

import { stanjeRazgovora, pragPoruke } from '../src/lib/scene/razgovor.js'
import { razgovor } from '../src/stranice/cijene.js'

test('razgovor: na početku nema poruka, na kraju su sve i zadnji korak', () => {
  const pocetak = stanjeRazgovora(0, razgovor.poruke)
  assert.equal(pocetak.vidljive, 0)
  assert.equal(pocetak.korak, 0)
  const kraj = stanjeRazgovora(1, razgovor.poruke)
  assert.equal(kraj.vidljive, razgovor.poruke.length)
  assert.equal(kraj.pise, false)
  assert.equal(kraj.korak, 3)
})

test('razgovor: prije našeg odgovora piše se, prije vašeg ne', () => {
  const n = razgovor.poruke.length
  // druga poruka je naša (mi): malo prije nje stoji "piše"
  assert.equal(stanjeRazgovora(pragPoruke(1, n) - 0.02, razgovor.poruke).pise, true)
  // treća je vaša (vi): prije nje nema "piše"
  assert.equal(stanjeRazgovora(pragPoruke(2, n) - 0.02, razgovor.poruke).pise, false)
})

test('razgovor: broj poruka raste sa skrolom', () => {
  let prije = -1
  for (let p = 0; p <= 1; p += 0.05) {
    const v = stanjeRazgovora(p, razgovor.poruke).vidljive
    assert.ok(v >= prije)
    prije = v
  }
})

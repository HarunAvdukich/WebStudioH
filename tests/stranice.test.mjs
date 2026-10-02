// Tekst stranica u novom izgledu: bosanski i engleski istog oblika, glas studija,
// bez dugih crta, brojke sa datumom, meta tekst u granicama.
import { test } from 'node:test'
import assert from 'node:assert/strict'

const STRANICE = ['usluge', 'cijene', 'kontakt']

// Oblik: ključevi objekata i dužine nizova, bez samih tekstova.
function oblik(v) {
  if (Array.isArray(v)) return v.map(oblik)
  if (v && typeof v === 'object') return Object.fromEntries(Object.keys(v).sort().map((k) => [k, oblik(v[k])]))
  return typeof v
}
function strings(v, out = []) {
  if (typeof v === 'string') out.push(v)
  else if (Array.isArray(v)) v.forEach((x) => strings(x, out))
  else if (v && typeof v === 'object') Object.values(v).forEach((x) => strings(x, out))
  return out
}

for (const ime of STRANICE) {
  const bs = await import(`../src/stranice/${ime}.js`)
  const en = await import(`../src/stranice/${ime}.en.js`)

  test(`${ime}: bosanski i engleski su istog oblika`, () => {
    assert.deepEqual(oblik({ ...en, jezik: '', put: '' }), oblik({ ...bs, jezik: '', put: '' }))
    assert.equal(bs.jezik, 'bs')
    assert.equal(en.jezik, 'en')
    assert.match(en.put, /^\/en\//)
  })

  test(`${ime}: bez dugih crta`, () => {
    assert.deepEqual(strings(bs).filter((s) => /[—–]/.test(s)), [])
    assert.deepEqual(strings(en).filter((s) => /[—–]/.test(s)), [])
  })

  test(`${ime}: glas studija, ne prvo lice jednine`, () => {
    const ja = /\b(pravim|[Pp]išite mi|odgovaram|javljam|krećem|pitam|predložim|formiram|bih|kažem)\b/
    assert.deepEqual(strings(bs).filter((s) => ja.test(s)), [])
  })

  test(`${ime}: svaka velika brojka ima datum`, () => {
    const brojka = /\d[.,]\d{3}\b/
    for (const s of [...strings(bs), ...strings(en)].filter((x) => brojka.test(x))) {
      assert.match(s, /2026/, s)
    }
  })

  test(`${ime}: meta naslov i opis u granicama`, () => {
    for (const t of [bs, en]) {
      assert.ok(t.seo.naslov.length >= 20 && t.seo.naslov.length <= 60, `${t.put} naslov ${t.seo.naslov.length}`)
      assert.ok(t.seo.opis.length >= 50 && t.seo.opis.length <= 160, `${t.put} opis ${t.seo.opis.length}`)
    }
  })
}

test('usluge: osam usluga, svaka sa "Pitajte za ovo"', async () => {
  for (const t of [await import('../src/stranice/usluge.js'), await import('../src/stranice/usluge.en.js')]) {
    const usluge = [...t.stepenice, t.odrzavanje].flatMap((s) => s.usluge)
    assert.equal(usluge.length, 8, t.put)
    assert.ok(usluge.every((u) => u.ime && u.uPoruci))
    assert.match(t.pitaj.poruka, /\{usluga\}/)
  }
})

test('cijene: razgovor jasno kaže da je primjer, koraci idu redom', async () => {
  for (const t of [await import('../src/stranice/cijene.js'), await import('../src/stranice/cijene.en.js')]) {
    assert.equal(t.razgovor.koraci.length, 4)
    const koraci = t.razgovor.poruke.map((p) => p.korak)
    assert.deepEqual(koraci, [...koraci].sort((a, b) => a - b))
    assert.match(t.razgovor.oznaka, /(Primjer|example)/i)
  }
})

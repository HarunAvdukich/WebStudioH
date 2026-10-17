// Obračunski period na /sati: od 15. do 15. sljedećeg mjeseca, oba dana uključena (dogovor 17. 10. 2026).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { obracuni, daniOdDo, zbirPerioda, jeDatum } from '../src/lib/period.js'

test('prošli i tekući obračun poslije 15. u mjesecu', () => {
  assert.deepEqual(obracuni(new Date(2026, 9, 17)), {
    prosli: { od: '2026-09-15', do: '2026-10-15' },
    tekuci: { od: '2026-10-15', do: '2026-11-15' },
  })
})

test('prije 15. tekući obračun je počeo prošlog mjeseca; na 15. počinje novi', () => {
  assert.deepEqual(obracuni(new Date(2026, 9, 14)).tekuci, { od: '2026-09-15', do: '2026-10-15' })
  assert.deepEqual(obracuni(new Date(2026, 9, 15)).tekuci, { od: '2026-10-15', do: '2026-11-15' })
})

test('obračun preko nove godine', () => {
  assert.deepEqual(obracuni(new Date(2027, 0, 3)), {
    prosli: { od: '2026-11-15', do: '2026-12-15' },
    tekuci: { od: '2026-12-15', do: '2027-01-15' },
  })
})

test('daniOdDo uključuje oba kraja i prelazi mjesec', () => {
  const d = daniOdDo('2026-09-29', '2026-10-02')
  assert.deepEqual(d, ['2026-09-29', '2026-09-30', '2026-10-01', '2026-10-02'])
  assert.deepEqual(daniOdDo('2026-10-05', '2026-10-01'), [])
})

test('jeDatum odbija nepostojeće datume', () => {
  assert.ok(jeDatum('2026-02-28'))
  assert.ok(!jeDatum('2026-02-30'))
  assert.ok(!jeDatum('15.9.2026'))
  assert.ok(!jeDatum(undefined))
})

test('zbirPerioda sabira dane iz više mjeseci, sa oba kraja', () => {
  const mjeseci = [
    { kljuc: '2026-10', dani: [
      { datum: '2026-10-15', radno: 3600, claude: 3000, poruka: 2, klijent: 1800 },
      { datum: '2026-10-16', radno: 600, claude: 500, poruka: 1, klijent: 600 },
    ] },
    { kljuc: '2026-09', dani: [
      { datum: '2026-09-14', radno: 7200, claude: 7000, poruka: 5, klijent: 7200 },
      { datum: '2026-09-15', radno: 30, claude: 30, poruka: 1, klijent: 30 },
      { datum: '2026-09-20', radno: 1800, claude: 1700, poruka: 3, klijent: 1800 },
    ] },
  ]
  const z = zbirPerioda(mjeseci, '2026-09-15', '2026-10-15')
  assert.deepEqual(z.dani.map((d) => d.datum), ['2026-09-15', '2026-09-20', '2026-10-15'])
  assert.equal(z.radno, 5430)
  assert.equal(z.claude, 4730)
  assert.equal(z.poruka, 6)
  assert.equal(z.klijent, 3630)
  // dan se broji kao radni tek od jedne minute rada
  assert.equal(z.dana, 2)
})

// Kursor: šta je ispod miša (link sa natpisom, polje za unos, tekst za čitanje ili ništa).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { vrstaCilja } from '../src/lib/kursor.js'

const interaktivni = (o = {}) => ({
  matches: (s) => !!o.unos && s.includes('input'),
  getAttribute: (a) => (a === 'data-kursor' ? o.natpis ?? null : null),
})
const cilj = ({ i = null, citanje = false } = {}) => ({
  closest: (s) => (s.startsWith('a,') ? i : citanje && s.startsWith('p,') ? {} : null),
})

test('link sa natpisom', () => {
  assert.deepEqual(vrstaCilja(cilj({ i: interaktivni({ natpis: 'Pogledajte rad' }) })), { vrsta: 'nad', natpis: 'Pogledajte rad' })
  assert.deepEqual(vrstaCilja(cilj({ i: interaktivni() })), { vrsta: 'nad', natpis: '' })
})

test('polje za unos sakrije kursor, tekst ga pretvori u crtu', () => {
  assert.deepEqual(vrstaCilja(cilj({ i: interaktivni({ unos: true }) })), { vrsta: 'unos', natpis: '' })
  assert.deepEqual(vrstaCilja(cilj({ citanje: true })), { vrsta: 'citanje', natpis: '' })
})

test('prazno mjesto i bez elementa', () => {
  assert.deepEqual(vrstaCilja(cilj()), { vrsta: 'nista', natpis: '' })
  assert.deepEqual(vrstaCilja(null), { vrsta: 'nista', natpis: '' })
})

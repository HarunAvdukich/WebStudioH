// Koji klikovi idu kroz zavjesu između stranica.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { putZaZavjesu } from '../src/lib/prelaz.js'

const lok = { href: 'https://hunar.ba/usluge', origin: 'https://hunar.ba', pathname: '/usluge' }
const klik = (o = {}) => ({ button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, defaultPrevented: false, ...o })
const link = (href, o = {}) => ({ href, target: o.target || '', hasAttribute: (a) => (o.atributi || []).includes(a) })

test('unutrašnji link na drugu stranicu ide kroz zavjesu', () => {
  assert.equal(putZaZavjesu(klik(), link('/radovi'), lok), '/radovi')
  assert.equal(putZaZavjesu(klik(), link('https://hunar.ba/cijene?x=1'), lok), '/cijene?x=1')
})

test('vanjski link, nova kartica, tipke, ista stranica i preuzimanje idu normalno', () => {
  assert.equal(putZaZavjesu(klik(), link('https://wa.me/387603000751'), lok), null)
  assert.equal(putZaZavjesu(klik(), link('mailto:info@hunar.ba'), lok), null)
  assert.equal(putZaZavjesu(klik(), link('/radovi', { target: '_blank' }), lok), null)
  assert.equal(putZaZavjesu(klik({ ctrlKey: true }), link('/radovi'), lok), null)
  assert.equal(putZaZavjesu(klik({ button: 1 }), link('/radovi'), lok), null)
  assert.equal(putZaZavjesu(klik({ defaultPrevented: true }), link('/radovi'), lok), null)
  assert.equal(putZaZavjesu(klik(), link('/usluge#cijene'), lok), null)
  assert.equal(putZaZavjesu(klik(), link('/radovi', { atributi: ['download'] }), lok), null)
  assert.equal(putZaZavjesu(klik(), link('/radovi', { atributi: ['data-bez-zavjese'] }), lok), null)
})

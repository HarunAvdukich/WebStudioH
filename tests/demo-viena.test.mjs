import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'

// Exercise the timetable independently of the browser, with fixed travel dates.
const script = readFileSync('public/demo-viena.js', 'utf8')
const storage = new Map()
const context = vm.createContext({
  localStorage: { getItem: k => storage.get(k) ?? null, setItem: (k, v) => storage.set(k, v) },
})
vm.runInContext(script.slice(0, script.indexOf('// ---------- Rezervacija')), context)
const run = s => vm.runInContext(s, context)

test('Viena: Austrija ima jedan jutarnji polazak ponedjeljkom i jedan večernji subotom', () => {
  assert.equal(run("nadjiPolaske('Brčko','Beč',izIso('2026-11-09')).map(p=>sat(p.kreni)).join(',')"), '08:15')
  assert.equal(run("nadjiPolaske('Brčko','Beč',izIso('2026-11-07')).map(p=>sat(p.kreni)).join(',')"), '20:15')
  assert.equal(run("nadjiPolaske('Brčko','Beč',izIso('2026-11-04')).length"), 2)
})

test('Viena: ulazak poslije ponoći pripada prethodnom danu vožnje', () => {
  // Njemačka iz BiH vozi srijedom, a iz Ljubljane taj autobus kreće u četvrtak.
  assert.equal(run("nadjiPolaske('Ljubljana','Minhen',izIso('2026-11-05'))[0].id"), 'de-t-0-2026-11-04')
  assert.equal(run("nadjiPolaske('Ljubljana','Minhen',izIso('2026-11-04')).length"), 0)
})

test('Viena: Crna Gora prelazi iz sedmičnih u svakodnevne sezonske polaske', () => {
  assert.equal(run("nadjiPolaske('Brčko','Budva',izIso('2026-11-03')).length"), 0)
  assert.equal(run("nadjiPolaske('Brčko','Budva',izIso('2026-11-05')).length"), 1)
  assert.equal(run("nadjiPolaske('Brčko','Budva',izIso('2027-07-06')).length"), 1)
})

test('Viena: povratak koristi svoj red vožnje i dan dolaska u BiH', () => {
  assert.equal(run("nadjiPolaske('Minhen','Brčko',izIso('2026-11-05'))[0].id"), 'de-n-0-2026-11-05')
  assert.equal(run("nadjiPolaske('Minhen','Brčko',izIso('2026-11-04')).length"), 0)
  assert.equal(run("nadjiPolaske('Beč','Brčko',izIso('2026-11-03')).length"), 1)
})

test('Viena: za sva vremena važe rastući dolasci, uključujući prelazak ponoći', () => {
  assert.equal(run(`LINIJE.every(l => l.polasci.every((_, k) => {
    const v = vremenaPolaska(l,k)
    return v.every((s,i) => Number.isFinite(s.m) && (i===0 || s.m > v[i-1].m))
  }))`), true)
})

test('Viena: nova rezervacija zauzima sjedište, a otkazivanje ga oslobađa', () => {
  assert.equal(run(`(() => {
    const id = 'at-t-0-2026-11-04'
    const n = Array.from({length:KAPACITET},(_,i)=>i+1).find(n=>!zauzeta(id).has(n))
    REZERVACIJE = [{voznja:id,sjedista:[n]}]
    const zauzeto = zauzeta(id).has(n)
    REZERVACIJE = []
    return zauzeto && !zauzeta(id).has(n)
  })()`), true)
})

test('Viena: oštećena lokalna pohrana ne ruši stranicu', () => {
  for (const value of ['{', '{}', 'null', '[null,{},true]']) {
    storage.set('hunar-demo-viena', value)
    assert.equal(run('ucitaj().length'), 0)
  }
  storage.clear()
})

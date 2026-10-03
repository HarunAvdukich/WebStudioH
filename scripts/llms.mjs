// Poslije gradnje: u dist/llms.txt upiše brojke sa trgovina (P1), iste kao na stranicama.
import { readFileSync, writeFileSync } from 'node:fs'
import { katalogMrt, oglasiMrt, satoviSmarttime } from '../src/brojke.js'

const FAJL = 'dist/llms.txt'
const k = katalogMrt('bs')
const o = oglasiMrt('bs')
const st = satoviSmarttime('bs')
const zamjene = {
  '{mrt-katalog}': `${k.a.broj} ${k.imenica} (${k.a.datum})`,
  '{mrt-olx}': `${o.o.broj} ${o.imenica} koji se ažuriraju sami (${o.o.datum})`,
  '{smarttime-katalog}': `${st.a.broj} ${st.artikli}, od toga ${st.s.broj} ${st.satovi} (${st.s.datum})`,
}
let tekst = readFileSync(FAJL, 'utf8')
for (const [kljuc, vrijednost] of Object.entries(zamjene)) tekst = tekst.split(kljuc).join(vrijednost)
if (/\{[a-z-]+\}/.test(tekst)) throw new Error('llms.txt: ostala je nepopunjena oznaka')
writeFileSync(FAJL, tekst)
console.log('[llms] brojke upisane')

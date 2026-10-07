// Veliki ekran: pikseli u CSS-u postaju rem, da se sajt uveća sa slovom na <html>.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { uRem } from '../scripts/pikseli-u-rem.mjs'

test('pikseli postaju rem, a tanke linije i url ostaju', () => {
  assert.equal(uRem('max(20px, 5.5vw)'), 'max(1.25rem, 5.5vw)')
  assert.equal(uRem('0 32px 80px rgba(0, 0, 0, 0.5)'), '0 2rem 5rem rgba(0, 0, 0, 0.5)')
  assert.equal(uRem('translateY(-12px)'), 'translateY(-0.75rem)')
  assert.equal(uRem('13.5px'), '0.8438rem')
  assert.equal(uRem('1px solid var(--linija)'), '1px solid var(--linija)')
  assert.equal(uRem('0.5px'), '0.5px')
  assert.equal(uRem("url(\"data:image/svg+xml,%3Csvg width='160px'%3E\") 0 0 / 40px"), "url(\"data:image/svg+xml,%3Csvg width='160px'%3E\") 0 0 / 2.5rem")
})

// U izgrađenom CSS-u px smije ostati samo u media upitima, u url(...), na <html> i za tanke linije.
const ASSETS = join('dist', 'assets')
const css = existsSync(ASSETS) ? readdirSync(ASSETS).filter((f) => f.endsWith('.css')) : []

test('izgrađeni CSS nema piksela koji ne rastu sa ekranom', () => {
  assert.ok(css.length > 0, 'prvo pokreni npm run build')
  for (const f of css) {
    const bez = readFileSync(join(ASSETS, f), 'utf8')
      .replace(/@media[^{]*\{/g, '')
      .replace(/url\([^)]*\)/g, '')
      .replace(/html\{[^}]*\}/g, '')
    const ostalo = bez.match(/(?<![\d.])(?:[2-9]|\d{2,}|1\.\d*[1-9])(?:\.\d+)?px/g) || []
    assert.deepEqual(ostalo, [], f)
  }
})

// Media upiti po visini rade u stvarnim pikselima, pa na uvećanom ekranu pitaju za visinu/k.
// Ovdje su isti uslovi kao u CSS-u, provjereni na mreži ekrana prema razmjeru iz src/index.css.
const razmjer = (W, H) => Math.min(1.5, Math.max(1, Math.min(W / 1536, H / 730)))
const nizak = (W, H) => H <= 759 || (W >= 1537 && W <= 2303 && W / H >= 1536 / 759) || (W >= 2304 && H <= 1139)
const kaci = (W, H) => (W >= 900 && H >= 820 && W / H <= 1536 / 820) || (W >= 2304 && H >= 1230)

test('upiti po visini prate visinu u razmjeru laptopa', () => {
  const radovi = readFileSync('src/components/radovi/radovi.css', 'utf8')
  const usluge = readFileSync('src/components/usluge/usluge.css', 'utf8')
  assert.ok(radovi.includes('@media (max-height: 759px), (min-width: 1537px) and (max-width: 2303px) and (min-aspect-ratio: 1536/759), (min-width: 2304px) and (max-height: 1139px) {'))
  assert.ok(usluge.includes('@media (min-width: 900px) and (min-height: 820px) and (max-aspect-ratio: 1536/820), (min-width: 2304px) and (min-height: 1230px) {'))
  for (let W = 1024; W <= 3840; W += 16) {
    for (let H = 600; H <= 1600; H += 10) {
      const h = H / razmjer(W, H)
      // tačno na granici zaokruživanje odlučuje, pa se ona preskače
      if (Math.abs(h - 760) > 1) assert.equal(nizak(W, H), h < 760, `nizak ${W}x${H}`)
      if (Math.abs(h - 820) > 1) assert.equal(kaci(W, H), h >= 820, `kači ${W}x${H}`)
    }
  }
})

// Sigurnosna zaglavlja: netlify.toml za sve putanje i dist/_headers sa CSP-om po stranici.
// CSP hashevi se računaju iz builda (scripts/zaglavlja.mjs); test ih računa ponovo iz
// dist/*.html, pa pada ako _headers nije napravljen poslije zadnjeg builda.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import { htmlFajlovi, putanje, BLAZE, BEZ_CSP } from '../scripts/zaglavlja.mjs'

const koren = fileURLToPath(new URL('..', import.meta.url))
const dist = fileURLToPath(new URL('../dist', import.meta.url))

function citajHeaders() {
  const mapa = new Map()
  let put = null
  for (const red of readFileSync(dist + '/_headers', 'utf8').split('\n')) {
    if (!red.trim() || red.startsWith('#')) continue
    if (!/^\s/.test(red)) { put = red.trim(); continue }
    const [ime, ...v] = red.trim().split(':')
    if (!mapa.has(put)) mapa.set(put, [])
    mapa.get(put).push([ime.trim().toLowerCase(), v.join(':').trim()])
  }
  return mapa
}

const scriptSrc = (csp) => (csp.split(';').map((d) => d.trim()).find((d) => d.startsWith('script-src')) || '')

// Inline skripte, brojane nezavisno od skripte: svaki <script> bez src i bez JSON tipa.
function inline(html) {
  return [...html.matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/gi)]
    .filter((m) => !/\ssrc=/.test(m[1] || '') && !/json/i.test(m[1] || ''))
    .map((m) => 'sha256-' + createHash('sha256').update(m[2]).digest('base64'))
}

test('netlify.toml šalje sigurnosna zaglavlja na sve putanje', () => {
  const t = readFileSync(koren + 'netlify.toml', 'utf8')
  const blok = t.split('[[headers]]').find((b) => /for\s*=\s*"\/\*"/.test(b))
  assert.ok(blok, 'nema [[headers]] for = "/*"')
  assert.match(blok, /X-Content-Type-Options\s*=\s*"nosniff"/)
  assert.match(blok, /X-Frame-Options\s*=\s*"DENY"/)
  assert.match(blok, /Referrer-Policy\s*=\s*"strict-origin-when-cross-origin"/)
  assert.match(blok, /Permissions-Policy\s*=\s*"[^"]*camera=\(\)[^"]*microphone=\(\)[^"]*geolocation=\(\)/)
  assert.doesNotMatch(blok, /Content-Security-Policy/, 'CSP ide samo u dist/_headers, da se dva CSP-a ne saberu')
})

test('build pravi dist/_headers', () => {
  assert.ok(existsSync(dist + '/_headers'), 'nema dist/_headers; pokrenuti npm run build')
  assert.match(readFileSync(koren + 'package.json', 'utf8'), /scripts\/zaglavlja\.mjs/)
})

test('svaka stranica ima tačno jedan CSP, React stranice bez unsafe-inline i sa tačnim hashevima', () => {
  const mapa = citajHeaders()
  let strogih = 0
  for (const f of htmlFajlovi(dist)) {
    const p = putanje(relative(dist, f))
    if (BEZ_CSP.includes(p[0])) continue
    const html = readFileSync(f, 'utf8')
    for (const put of p) {
      const csp = (mapa.get(put) || []).filter(([ime]) => ime === 'content-security-policy')
      assert.equal(csp.length, 1, `${put}: očekivan jedan CSP, ima ${csp.length}`)
      const v = csp[0][1]
      assert.match(v, /frame-ancestors 'none'/, put)
      assert.match(v, /object-src 'none'/, put)
      // Umami skripta šalje na gateway.umami.is (na React stranicama se učita iz statistika.js).
      assert.match(v, /connect-src [^;]*https:\/\/gateway\.umami\.is/, `${put}: Umami slanje`)
      if (html.includes('cloud.umami.is')) assert.match(scriptSrc(v), /https:\/\/cloud\.umami\.is/, `${put}: Umami`)
      const react = html.includes('window.__staticRouterHydrationData')
      if (react && !BLAZE.includes(p[0])) {
        strogih++
        assert.doesNotMatch(scriptSrc(v), /unsafe-inline|unsafe-eval/, put)
        for (const h of inline(html)) assert.ok(v.includes(`'${h}'`), `${put}: nema hash ${h}`)
        assert.doesNotMatch(html, /\son[a-z]+\s*=\s*["']/i, `${put}: inline rukovalac ne radi uz strogi CSP`)
      } else {
        assert.match(scriptSrc(v), /'unsafe-inline'/, `${put}: demo treba blaži CSP`)
      }
    }
  }
  assert.ok(strogih >= 40, `premalo strogih stranica: ${strogih}`)
})

test('početna i /en imaju strogi CSP (njih mjeri Observatory)', () => {
  const mapa = citajHeaders()
  for (const put of ['/', '/en']) {
    const v = mapa.get(put).find(([ime]) => ime === 'content-security-policy')[1]
    assert.match(scriptSrc(v), /'sha256-/, put)
    assert.doesNotMatch(scriptSrc(v), /unsafe-inline/, put)
  }
})

test('demoskica preko rewrite-a dobije blaži CSP', () => {
  const v = citajHeaders().get('/demoskica/*')
  assert.ok(v, 'nema /demoskica/*')
  assert.match(v[0][1], /script-src 'self' 'unsafe-inline'/)
})

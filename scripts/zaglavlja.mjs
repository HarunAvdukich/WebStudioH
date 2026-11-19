// Poslije builda napiše dist/_headers sa Content-Security-Policy za svaku stranicu.
//
// React stranice (vite-react-ssg) imaju tri inline skripte: .pokret iz index.html,
// podatke za hidrataciju (drugačiji na svakoj stranici) i hash builda. Zato se CSP
// računa po stranici, sa sha256 otiskom svake inline skripte, bez 'unsafe-inline'.
// Statični demoi, kalkulator, demoskica i /sati dobiju blaži CSP ('unsafe-inline'),
// jer imaju svoje inline skripte i rukovaoce. /admin (Decap) i /ponuda (funkcija)
// nemaju CSP. Ostala zaglavlja (nosniff, DENY, Referrer, Permissions) su u netlify.toml.
// Provjera: tests/zaglavlja.test.mjs.
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

export const UMAMI = ['https://cloud.umami.is', 'https://api-gateway.umami.dev']

// Stranice koje uvijek dobiju blaži CSP, i kad su React.
export const BLAZE = ['/sati']
// Putanje bez fajla u dist/ koje vode na demoskicu (rewrite u netlify.toml).
export const DODATNE_BLAZE = ['/demoskica/*']
// Bez CSP-a: Decap CMS (unpkg, eval) i ponude iz funkcije.
export const BEZ_CSP = ['/admin']

const ZAJEDNICKO = [
  "default-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' " + UMAMI.join(' '),
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
]

export function strogiCsp(hashevi) {
  return [
    ZAJEDNICKO[0],
    `script-src 'self' ${hashevi.map((h) => `'${h}'`).join(' ')} https://cloud.umami.is`,
    ...ZAJEDNICKO.slice(1),
    "img-src 'self' data: blob:",
    "media-src 'self' blob:",
    "form-action 'self'",
  ].join('; ')
}

export function blaziCsp() {
  return [
    ZAJEDNICKO[0],
    "script-src 'self' 'unsafe-inline' https://cloud.umami.is",
    ...ZAJEDNICKO.slice(1),
    'img-src * data: blob:',
    'media-src * data: blob:',
    "form-action 'self' https:",
  ].join('; ')
}

// Inline skripte koje preglednik izvršava (bez src i bez JSON tipova).
export function inlineSkripte(html) {
  const out = []
  for (const m of html.matchAll(/<script(\s[^>]*)?>([\s\S]*?)<\/script>/gi)) {
    const atr = m[1] || ''
    if (/\ssrc\s*=/i.test(atr)) continue
    const tip = (atr.match(/\stype\s*=\s*["']?([^"'\s>]+)/i) || [])[1]
    if (tip && !/^(module|text\/javascript|application\/javascript)$/i.test(tip)) continue
    out.push(m[2])
  }
  return out
}

export const otisak = (kod) => 'sha256-' + createHash('sha256').update(kod, 'utf8').digest('base64')

export const jeReact = (html) => html.includes('window.__staticRouterHydrationData')

// dist/radovi/mrt.html -> ['/radovi/mrt', '/radovi/mrt.html']; index.html -> ['/', '/index.html']
export function putanje(rel) {
  const p = '/' + rel.split(sep).join('/')
  if (p === '/index.html') return ['/', '/index.html']
  if (p.endsWith('/index.html')) return [p.slice(0, -'/index.html'.length), p.slice(0, -'index.html'.length), p]
  return [p.slice(0, -'.html'.length), p]
}

export function htmlFajlovi(dir, out = []) {
  for (const ime of readdirSync(dir)) {
    const f = join(dir, ime)
    if (statSync(f).isDirectory()) htmlFajlovi(f, out)
    else if (ime.endsWith('.html')) out.push(f)
  }
  return out.sort()
}

export function napravi(dist) {
  const pravila = []
  for (const f of htmlFajlovi(dist)) {
    const p = putanje(relative(dist, f))
    if (BEZ_CSP.includes(p[0])) continue
    const html = readFileSync(f, 'utf8')
    const strogo = jeReact(html) && !BLAZE.includes(p[0])
    const csp = strogo ? strogiCsp([...new Set(inlineSkripte(html).map(otisak))]) : blaziCsp()
    for (const put of p) pravila.push([put, csp])
  }
  for (const put of DODATNE_BLAZE) pravila.push([put, blaziCsp()])
  return pravila
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const dist = fileURLToPath(new URL('../dist', import.meta.url))
  const pravila = napravi(dist)
  const tekst = '# Generisano: scripts/zaglavlja.mjs (ne mijenjati ručno)\n' +
    pravila.map(([p, csp]) => `${p}\n  Content-Security-Policy: ${csp}\n`).join('')
  writeFileSync(join(dist, '_headers'), tekst)
  console.log(`[zaglavlja] dist/_headers: ${pravila.length} putanja`)
}

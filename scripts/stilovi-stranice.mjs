import { readFileSync } from 'node:fs'

const MANIFEST = new URL('../dist/.vite/manifest.json', import.meta.url)
const PRELOAD_JS = /<link rel="modulepreload"[^>]* href="\/([^"]+)"[^>]*>/g
const STIL = /<link rel="stylesheet"[^>]* href="\/([^"]+)"[^>]*>/g
const PRELOAD_FONT = /<link rel="preload" as="font"[^>]*>/g

export default function pripremiStilove() {
  let manifest, poFajlu

  return (put, html) => {
    if (put === '/') return html.replace(PRELOAD_FONT, '')

    // vite-react-ssg preloada direktne pakete rute, ali preskače zajednički CSS
    // iz njihovih statičkih importa i preloada dinamičke importe poput GSAP-a.
    if (!manifest) {
      manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'))
      poFajlu = new Map(Object.values(manifest).map((modul) => [modul.file, modul]))
    }
    const rute = Array.from(html.matchAll(PRELOAD_JS), ([, fajl]) => poFajlu.get(fajl))
      .filter((modul) => modul?.src?.startsWith('src/pages/'))
    if (rute.length === 0) return html

    const ucitani = new Set()
    const stilovi = new Set()
    function dodaj(modul) {
      if (ucitani.has(modul.file)) return
      ucitani.add(modul.file)
      for (const uvoz of modul.imports ?? []) dodaj(manifest[uvoz])
      for (const stil of modul.css ?? []) stilovi.add(stil)
    }
    for (const ruta of rute) dodaj(ruta)

    return html
      .replace(PRELOAD_JS, (oznaka, fajl) => (ucitani.has(fajl) ? oznaka : ''))
      .replace(STIL, (oznaka, fajl) => (stilovi.has(fajl) ? '' : oznaka))
      .replace('</head>', [...stilovi].map((fajl) => `<link rel="stylesheet" crossorigin href="/${fajl}">`).join('') + '</head>')
  }
}

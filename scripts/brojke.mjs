// P1: brojke se same osvježe. Pri gradnji na Netlifyju (ili uz --osvjezi) prebroji artikle i
// kategorije na mrt.ba, aktivne OLX oglase trgovine MotorRemont i satove na smarttime.ba, sve
// sa javnih izvora, i upiše vrijednost sa današnjim datumom u src/brojke-podaci.js.
// Ako provjera jednog izvora ne uspije ili brojka izgleda pogrešno (pola ili duplo od zadnje),
// ostaje zadnja brojka sa svojim datumom. Gradnja nikad ne pada zbog ovoga.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const FAJL = fileURLToPath(new URL('../src/brojke-podaci.js', import.meta.url))
const ZAGLAVLJE = { 'User-Agent': 'HunarBrojke/1.0 (+https://hunar.ba)', Accept: 'application/json' }

async function dohvati(url) {
  const r = await fetch(url, { headers: ZAGLAVLJE, signal: AbortSignal.timeout(12000) })
  if (!r.ok) throw new Error(`${url}: ${r.status}`)
  return r
}
const ukupno = async (url) => Number((await dohvati(url)).headers.get('x-wp-total'))

// Izvori po sajtu: brojke jednog sajta se osvježe zajedno ili nijedna (isti datum u rečenici).
export const IZVORI = {
  mrt: async () => ({
    mrtArtikli: await ukupno('https://mrt.ba/wp-json/wc/store/v1/products?per_page=1'),
    mrtKategorije: await ukupno('https://mrt.ba/wp-json/wc/store/v1/products/categories?per_page=1'),
  }),
  olx: async () => ({
    mrtOlx: (await (await dohvati('https://olx.ba/api/search?user_id=1420018&per_page=1')).json()).meta.total,
  }),
  smarttime: async () => {
    const kategorije = await (await dohvati('https://smarttime.ba/wp-json/wc/store/v1/products/categories?per_page=100')).json()
    const satovi = kategorije.find((k) => k.slug === 'rucni-satovi')
    return {
      smarttimeArtikli: await ukupno('https://smarttime.ba/wp-json/wc/store/v1/products?per_page=1'),
      smarttimeSatovi: satovi?.count,
    }
  },
}

// Nova brojka se prima samo ako je cijeli broj veći od nule i ne odstupa previše od zadnje.
export function prihvatljiva(nova, stara) {
  return Number.isInteger(nova) && nova > 0 && nova >= stara * 0.5 && nova <= stara * 2
}

export const danas = (sad = new Date()) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Sarajevo' }).format(sad)

export function ispisi(podaci) {
  const redovi = Object.entries(podaci).map(
    ([k, v]) => `  ${k}: { vrijednost: ${v.vrijednost}, datum: '${v.datum}', izvor: '${v.izvor}' },`,
  )
  return `// Upisuje scripts/brojke.mjs (P1): zadnja provjerena vrijednost, datum provjere i javni izvor.
// Na Netlifyju se pri svakoj gradnji provjeri ponovo; ako provjera ne uspije, ostaje ovo.
export default {
${redovi.join('\n')}
}
`
}

async function glavno() {
  const osvjezi = process.argv.includes('--osvjezi') || process.env.NETLIFY === 'true'
  if (!osvjezi) {
    console.log('[brojke] lokalna gradnja: ostaju zadnje brojke (npm run brojke ih osvježi)')
    return
  }
  const { default: podaci } = await import(`${new URL('../src/brojke-podaci.js', import.meta.url).href}?${Date.now()}`)
  const novo = structuredClone(podaci)
  const dan = danas()
  for (const [ime, izvor] of Object.entries(IZVORI)) {
    try {
      const vrijednosti = await izvor()
      const sve = Object.entries(vrijednosti)
      const losa = sve.find(([k, v]) => !prihvatljiva(v, podaci[k].vrijednost))
      if (losa) {
        console.warn(`[brojke] ${ime}: ${losa[0]} = ${losa[1]} odstupa od zadnje (${podaci[losa[0]].vrijednost}), ostaje zadnja`)
        continue
      }
      for (const [k, v] of sve) novo[k] = { ...novo[k], vrijednost: v, datum: dan }
      console.log(`[brojke] ${ime}: ${sve.map(([k, v]) => `${k} ${v}`).join(', ')}`)
    } catch (e) {
      console.warn(`[brojke] ${ime}: provjera nije uspjela (${e.message}), ostaje zadnja brojka`)
    }
  }
  if (JSON.stringify(novo) !== JSON.stringify(podaci)) writeFileSync(FAJL, ispisi(novo))
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  glavno().catch((e) => console.warn(`[brojke] ${e.message}`))
}

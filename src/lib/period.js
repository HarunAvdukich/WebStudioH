// Obračunski period za /sati. Datumi su 'GGGG-MM-DD' i oba kraja su uključena: obračun ide od
// 15. do 15. sljedećeg mjeseca, pa se petnaesti broji u oba susjedna obračuna (dogovor 17. 10. 2026).
export const OBRACUN_DAN = 15

const dvije = (n) => String(n).padStart(2, '0')
const iso = (d) => `${d.getFullYear()}-${dvije(d.getMonth() + 1)}-${dvije(d.getDate())}`
const uDatum = (s) => {
  const [g, m, d] = s.split('-').map(Number)
  return new Date(g, m - 1, d)
}

export function jeDatum(s) {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && iso(uDatum(s)) === s
}

// Prošli i tekući obračun za dati dan. Na sam 15. počinje novi tekući obračun.
export function obracuni(danas = new Date(), dan = OBRACUN_DAN) {
  const g = danas.getFullYear()
  const m = danas.getMonth()
  const pocetak = danas.getDate() >= dan ? new Date(g, m, dan) : new Date(g, m - 1, dan)
  const pomak = (n) => iso(new Date(pocetak.getFullYear(), pocetak.getMonth() + n, dan))
  return {
    prosli: { od: pomak(-1), do: pomak(0) },
    tekuci: { od: pomak(0), do: pomak(1) },
  }
}

// Svi datumi od..do, oba uključena (najviše dvije godine, da pogrešan unos ne zaglavi stranicu).
export function daniOdDo(od, doDana) {
  const out = []
  for (const d = uDatum(od); iso(d) <= doDana && out.length < 731; d.setDate(d.getDate() + 1)) out.push(iso(d))
  return out
}

// Dani i zbirovi perioda iz mjeseci koje vraća /api/sati. `klijent` postoji samo u vlasnikovom pogledu.
export function zbirPerioda(mjeseci, od, doDana) {
  const dani = mjeseci
    .flatMap((m) => m.dani)
    .filter((d) => d.datum >= od && d.datum <= doDana)
    .sort((a, b) => (a.datum < b.datum ? -1 : 1))
  const zbir = (polje) => dani.reduce((s, d) => s + (d[polje] || 0), 0)
  return {
    dani,
    radno: zbir('radno'),
    claude: zbir('claude'),
    poruka: zbir('poruka'),
    klijent: zbir('klijent'),
    dana: dani.filter((d) => d.radno >= 60).length,
  }
}

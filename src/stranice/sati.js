// Tekst skrivene stranice /sati (evidencija rada za klijenta). Stranica se ne indeksira i
// nije u meniju; otvara se samo linkom sa ključem iza #. Bez dugih crta.

export const seo = {
  naslov: 'Evidencija rada',
  opis: 'Pregled sati rada studija Hunar po danima, za klijenta i za nas.',
}

export const naslov = (projekat) => (projekat ? `Rad za ${projekat}` : 'Evidencija rada')

export const azurirano = 'Ažurirano'
export const mjeseciOznaka = 'Mjeseci'
export const traka = 'Sati po danima'
export const radnoVrijeme = 'radnog vremena'
export const oznake = { sati: 'Sati', dana: 'Radnih dana', klijent: 'Za klijenta', claude: 'Claude', poruke: 'Poruke' }

// Obračunski period: od 15. do 15. sljedećeg mjeseca, oba dana uključena.
export const periodDugme = 'Period'
export const obracunOznaka = 'Obračun od 15. do 15.'
export const obracun = { prosli: 'Prošli obračun', tekuci: 'Tekući obračun' }
export const polja = { od: 'Od', do: 'Do' }
export const periodObrnut = 'Početni datum je poslije krajnjeg. Zamijenite ih.'
export const nemaRada = 'U ovom periodu nema zabilježenog rada.'

export const stanja = {
  bezKljuca: {
    naslov: 'Link nije potpun',
    tekst: 'Otvorite link koji ste dobili od nas u cijelosti. Dio iza znaka # je ključ za ovu stranicu.',
  },
  odbijen: {
    naslov: 'Ovaj link ne važi',
    tekst: 'Možda je u međuvremenu zamijenjen novim. Javite nam se i poslaćemo Vam novi link.',
    dugme: 'Pišite nam na WhatsApp',
  },
  prazno: {
    naslov: 'Još nema upisanih sati',
    tekst: 'Sati se upisuju sami, poslije svakog završenog zadatka. Svratite malo kasnije.',
  },
  greska: {
    naslov: 'Sati se trenutno ne mogu učitati',
    tekst: 'Provjerite internet vezu pa pokušajte ponovo.',
    dugme: 'Pokušaj ponovo',
  },
}

export const napomena = {
  klijent:
    'Radno vrijeme je vrijeme rada na Vašem projektu, sabrano po danima. Sati se upisuju sami, poslije svakog završenog zadatka.',
  vlasnik:
    'Radno vrijeme: dok Claude radi, plus pauze između poruka do 15 minuta. Za klijenta: sati koje klijent vidi, bez sesija označenih sa - u teme-za-klijenta.txt; po tome se fakturiše. Claude: samo vrijeme odgovora. Ovaj link je samo tvoj; klijentov link pokazuje radno vrijeme i teme, bez Claude brojki.',
}

// Mjesec u lokativu ("u oktobru 2026") i oznaka na dugmetu ("Oktobar 2026").
const LOKATIV = ['januaru', 'februaru', 'martu', 'aprilu', 'maju', 'juniju', 'juliju', 'augustu', 'septembru', 'oktobru', 'novembru', 'decembru']
const NAZIV = ['januar', 'februar', 'mart', 'april', 'maj', 'juni', 'juli', 'august', 'septembar', 'oktobar', 'novembar', 'decembar']
const DANI = ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub']

export function mjesecNaziv(kljuc) {
  const [g, m] = kljuc.split('-').map(Number)
  const n = NAZIV[m - 1]
  return `${n[0].toUpperCase()}${n.slice(1)} ${g}`
}

export function mjesecLokativ(kljuc) {
  const [g, m] = kljuc.split('-').map(Number)
  return `u ${LOKATIV[m - 1]} ${g}`
}

// Bosanska množina: 1 dan, 2 dana, 5 dana, 21 dan; 1 poruka, 3 poruke, 11 poruka.
export function mnozina(n, [jedan, dva, pet]) {
  const d = n % 10
  const s = n % 100
  if (d === 1 && s !== 11) return jedan
  if (d >= 2 && d <= 4 && (s < 12 || s > 14)) return dva
  return pet
}

export const poruka = (n) => `${n} ${mnozina(n, ['poruka', 'poruke', 'poruka'])}`

export function trajanje(sek) {
  const min = Math.round(sek / 60)
  const h = Math.floor(min / 60)
  const m = min % 60
  return h ? `${h} h ${String(m).padStart(2, '0')} min` : `${m} min`
}

export const decimalno = (sek) => (sek / 3600).toFixed(2).replace('.', ',')

export function dan(datum) {
  const [g, m, d] = datum.split('-').map(Number)
  return `${DANI[new Date(g, m - 1, d).getDay()]} ${d}. ${m}.`
}

// "15. 9." i "od 15. 9. do 15. 10. 2026." (godina kod oba datuma kad se razlikuje)
export function kratkiDatum(datum) {
  const [, m, d] = datum.split('-').map(Number)
  return `${d}. ${m}.`
}

export function kratkoOdDo(p) {
  return `${kratkiDatum(p.od)} do ${kratkiDatum(p.do)}`
}

export function opisPerioda(p) {
  const go = p.od.slice(0, 4)
  const gd = p.do.slice(0, 4)
  return go === gd
    ? `od ${kratkiDatum(p.od)} do ${kratkiDatum(p.do)} ${gd}.`
    : `od ${kratkiDatum(p.od)} ${go}. do ${kratkiDatum(p.do)} ${gd}.`
}

export function vrijemeAzuriranja(iso) {
  const t = new Date(iso)
  if (Number.isNaN(t.getTime())) return ''
  const hh = String(t.getHours()).padStart(2, '0')
  const mm = String(t.getMinutes()).padStart(2, '0')
  return `${t.getDate()}. ${t.getMonth() + 1}. ${t.getFullYear()}. u ${hh}:${mm}`
}

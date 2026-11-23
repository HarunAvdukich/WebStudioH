const forma = document.querySelector('#forma-termin')
const usluga = document.querySelector('#usluga')
const dan = document.querySelector('#dan')
const vrijeme = document.querySelector('#vrijeme')
const napomena = document.querySelector('#napomena-vrijeme')
const sati = document.querySelector('#sati')
const polja = forma.querySelector('.termin-polja')
const rezultat = document.querySelector('#rezultat')
const potvrda = document.querySelector('#potvrda')
const poruka = document.querySelector('#poruka')

const kalendar = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Europe/Sarajevo', year: 'numeric', month: 'numeric', day: 'numeric',
})
const dani = ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota']
const mjeseci = [
  'januara', 'februara', 'marta', 'aprila', 'maja', 'juna',
  'jula', 'augusta', 'septembra', 'oktobra', 'novembra', 'decembra',
]
const { year, month, day } = Object.fromEntries(
  kalendar.formatToParts(new Date()).map(({ type, value }) => [type, value]),
)
const datum = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
const rasporedi = [
  ['09:00', '10:30', '13:00', '15:30'],
  ['08:30', '11:00', '13:30', '16:00'],
  ['09:30', '11:30', '14:00', '15:00'],
]

for (let brojDana = 0; brojDana < 5;) {
  datum.setUTCDate(datum.getUTCDate() + 1)
  if (datum.getUTCDay() === 0 || datum.getUTCDay() === 6) continue
  const oznakaDana = `${dani[datum.getUTCDay()]}, ${datum.getUTCDate()}. ${mjeseci[datum.getUTCMonth()]}`
  dan.add(new Option(oznakaDana, String(brojDana)))
  brojDana += 1
}

function ocistiSate() {
  sati.replaceChildren()
  vrijeme.disabled = true
  napomena.hidden = false
}

dan.addEventListener('change', () => {
  ocistiSate()
  if (dan.value === '') return

  for (const sat of rasporedi[Number(dan.value) % rasporedi.length]) {
    const oznaka = document.createElement('label')
    const izbor = document.createElement('input')
    const tekst = document.createElement('span')
    izbor.type = 'radio'
    izbor.name = 'sat'
    izbor.value = sat
    izbor.required = true
    tekst.textContent = sat
    oznaka.append(izbor, tekst)
    sati.append(oznaka)
  }
  vrijeme.disabled = false
  napomena.hidden = true
})

forma.addEventListener('submit', (dogadjaj) => {
  dogadjaj.preventDefault()
  const sat = new FormData(forma).get('sat')
  if (!sat) return

  const odabranaUsluga = usluga.selectedOptions[0].text
  const odabraniDan = dan.selectedOptions[0].text
  potvrda.textContent = `${odabranaUsluga}, ${odabraniDan} u ${sat}.`
  poruka.textContent = `Podsjetnik iz Beauty Salona Zana. Sutra u ${sat} čeka Vas termin za uslugu ${odabranaUsluga}.`
  polja.hidden = true
  rezultat.hidden = false
  rezultat.focus()
})

forma.addEventListener('reset', () => {
  ocistiSate()
  rezultat.hidden = true
  polja.hidden = false
  usluga.focus()
})

document.querySelectorAll('[data-usluga]').forEach((link) => {
  link.addEventListener('click', () => {
    if (!rezultat.hidden) forma.reset()
    usluga.value = link.dataset.usluga
  })
})

forma.hidden = false

const forma = document.querySelector('#forma-termin')
const usluga = document.querySelector('#usluga')
const daniTermina = document.querySelector('#dani')
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
const datumi = []

function terminOpcija(ime, vrijednost, prikaz, oznaka = prikaz) {
  const opcija = document.createElement('label')
  const izbor = document.createElement('input')
  const tekst = document.createElement('span')
  izbor.type = 'radio'
  izbor.name = ime
  izbor.value = vrijednost
  izbor.required = true
  izbor.setAttribute('aria-label', oznaka)
  tekst.textContent = prikaz
  opcija.append(izbor, tekst)
  return opcija
}

while (datumi.length < 5) {
  datum.setUTCDate(datum.getUTCDate() + 1)
  const imeDana = dani[datum.getUTCDay()]
  const brojDana = datum.getUTCDate()
  const mjesec = datum.getUTCMonth()
  const prikaz = `${imeDana.slice(0, 3)}\n${brojDana}. ${mjesec + 1}.`
  const oznaka = `${imeDana}, ${brojDana}. ${mjeseci[mjesec]}`
  daniTermina.append(terminOpcija('dan', datumi.length, prikaz, oznaka))
  datumi.push(oznaka)
}

function ocistiSate() {
  sati.replaceChildren()
  vrijeme.disabled = true
  napomena.hidden = false
}

daniTermina.addEventListener('change', (dogadjaj) => {
  ocistiSate()
  const raspored = rasporedi[Number(dogadjaj.target.value) % rasporedi.length]
  for (const sat of raspored) {
    sati.append(terminOpcija('sat', sat, sat))
  }
  vrijeme.disabled = false
  napomena.hidden = true
})

forma.addEventListener('submit', (dogadjaj) => {
  dogadjaj.preventDefault()
  const odabir = new FormData(forma)
  const sat = odabir.get('sat')
  if (!sat) return

  const odabranaUsluga = usluga.selectedOptions[0].text
  const odabraniDan = datumi[Number(odabir.get('dan'))]
  potvrda.textContent = `${odabranaUsluga}, ${odabraniDan} u ${sat}.`
  poruka.textContent = `Vidimo se sutra u ${sat} u Beauty Salonu Zana. Za promjenu termina javite nam se na 061 431 711.`
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

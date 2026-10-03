// Živi primjeri usluga na početnoj (prvi ekran i "Šta pravimo"). Primjeri su ilustracije:
// mali prikaz usluge koji se odigra kad dođe na red, a dodir ili klik ga odigra ponovo,
// svaki put sa drugom varijantom. Ovdje je račun (provjerava ga test) i igra na DOM-u.
import { popuni } from './whatsapp.js'

// Koliko riječ stoji prije sljedeće, i koliko stoji kad posjetilac dodirne primjer.
export const ODMOR = 4200
export const PAUZA = 7000

const TRGOVINE = ['mrt.ba', 'smarttime.ba']

// Odakle je posjetilac došao: sa trgovine koju smo napravili (referrer) ili preko linka
// "Izradio Hunar" sa ?od=mrt.ba (ili ?od=mrt). Inače null.
export function izvorDolaska(referrer = '', search = '') {
  try {
    const host = referrer ? new URL(referrer).hostname.replace(/^www\./, '') : ''
    const nadjen = TRGOVINE.find((t) => host === t || host.endsWith(`.${t}`))
    if (nadjen) return nadjen
  } catch {
    // neispravan referrer: gleda se samo ?od=
  }
  const od = new URLSearchParams(search).get('od')
  if (!od) return null
  return TRGOVINE.find((t) => od === t || od === t.replace('.ba', '')) || null
}

// Riječ u naslovu ide u dva reda na telefonu ("web" / "stranice"): prva riječ i ostatak.
export function redoviRijeci(rijec) {
  const i = rijec.indexOf(' ')
  return i < 0 ? [rijec] : [rijec.slice(0, i), rijec.slice(i + 1)]
}

// Broj kao "01 / 08".
export const redniBroj = (i, ukupno) => `${String(i + 1).padStart(2, '0')} / ${String(ukupno).padStart(2, '0')}`

// Poruka za WhatsApp za uslugu koja je na ekranu.
export const porukaZa = (t, usluga) => popuni(t.waPoruka, { usluga: usluga.uPoruci })

const spavaj = (ms) => new Promise((r) => setTimeout(r, ms))

// Ponovo pokrene CSS prelaze primjera (klasa je-akt).
function ispocetka(el) {
  el.classList.remove('je-akt')
  void el.offsetWidth
  el.classList.add('je-akt')
}

function skoci(el, od = 1.5) {
  el.animate?.([{ transform: `scale(${od})` }, { transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.2,.7,.1,1)' })
}

// Odigra primjer usluge `id` u elementu el. n je redni broj igre (0 je prva, sama od sebe),
// cilj je element na koji je posjetilac kliknuo (slobodan termin, artikal), jos() kaže da li
// je primjer još na redu (ako nije, igra stane). t je tekst primjera (pocetna.primjeri).
export async function igraj(el, id, { n = 0, cilj = null, jos = () => true, t }) {
  const $ = (s) => el.querySelector(s)
  const $$ = (s) => Array.from(el.querySelectorAll(s))
  const tp = t[id]

  if (id === 'stranica' || id === 'redizajn') {
    // Redizajn: drugi dodir vrati staru stranicu, treći opet novu.
    if (id === 'redizajn' && n > 0 && el.classList.contains('je-akt')) el.classList.remove('je-akt')
    else ispocetka(el)
    return
  }

  el.classList.add('je-akt')

  if (id === 'shop') {
    const em = $('.pr-korpa em')
    if (n === 0) {
      em.textContent = '0'
      for (let k = 1; k <= 3; k++) {
        await spavaj(k === 1 ? 700 : 450)
        if (!jos()) return
        em.textContent = String(k)
        skoci(em)
      }
      return
    }
    // Artikal uleti u korpu.
    const artikli = $$('.pr-artikli span')
    const a = (cilj && cilj.closest('.pr-artikli span')) || artikli[n % artikli.length]
    const korpa = $('.pr-korpa')
    if (!a || !korpa || !a.animate) {
      em.textContent = String(Number(em.textContent) + 1)
      return
    }
    const ra = a.getBoundingClientRect()
    const rk = korpa.getBoundingClientRect()
    const re = el.getBoundingClientRect()
    const kopija = a.cloneNode()
    kopija.className = 'pr-leti'
    Object.assign(kopija.style, { left: `${ra.left - re.left}px`, top: `${ra.top - re.top}px`, width: `${ra.width}px`, height: `${ra.height}px` })
    el.append(kopija)
    const dx = rk.left + rk.width / 2 - (ra.left + ra.width / 2)
    const dy = rk.top + rk.height / 2 - (ra.top + ra.height / 2)
    try {
      await kopija.animate([{ transform: 'none', opacity: 1 }, { transform: `translate(${dx}px, ${dy}px) scale(.15)`, opacity: 0.6 }], { duration: 600, easing: 'cubic-bezier(.5,0,.7,1)' }).finished
    } catch {
      // prekinuto
    }
    kopija.remove()
    em.textContent = String(Number(em.textContent) + 1)
    skoci(em, 1.6)
    return
  }

  if (id === 'aplikacija') {
    const [gore, dole] = tp.obavijesti[n % tp.obavijesti.length]
    const ob = $('.pr-obavijest')
    ob.firstChild.textContent = gore
    ob.lastChild.textContent = dole
    ispocetka(el)
    return
  }

  if (id === 'seo') {
    const [upit, djelatnost] = tp.pretrage[n % tp.pretrage.length]
    const tx = $('.pr-upit')
    const rez = $('.pr-rezultat')
    rez.classList.remove('je-vid')
    tx.textContent = ''
    await spavaj(n === 0 ? 400 : 150)
    for (let j = 1; j <= upit.length; j++) {
      if (!jos()) return
      tx.textContent = upit.slice(0, j)
      await spavaj(n === 0 ? 55 : 45)
    }
    $('.pr-rezultat b').textContent = popuni(tp.firma, { djelatnost })
    await spavaj(280)
    if (jos()) rez.classList.add('je-vid')
    return
  }

  if (id === 'termini') {
    const sati = $$('.pr-sati span')
    const potvrda = $('.pr-potvrda')
    const slobodni = sati.filter((s) => !s.classList.contains('je-zauzet'))
    const izabran = (cilj && cilj.closest('.pr-sati span:not(.je-zauzet)')) || (n === 0 ? slobodni[1] : slobodni[n % slobodni.length])
    sati.forEach((s) => s.classList.remove('je-da'))
    potvrda.classList.remove('je-vid')
    await spavaj(n === 0 ? 900 : 120)
    if (!jos() || !izabran) return
    izabran.classList.add('je-da')
    potvrda.textContent = popuni(tp.potvrda, { sat: izabran.textContent })
    await spavaj(300)
    potvrda.classList.add('je-vid')
    return
  }

  if (id === 'chatbot') {
    const [pitanje, odgovor] = tp.razgovori[n % tp.razgovori.length]
    const ku = $('.pr-kupac')
    const pi = $('.pr-pise')
    const bo = $('.pr-bot')
    ku.textContent = pitanje
    bo.textContent = odgovor
    ku.classList.remove('je-vid')
    bo.classList.remove('je-vid')
    pi.classList.remove('je-vid')
    await spavaj(n === 0 ? 400 : 150)
    if (!jos()) return
    ku.classList.add('je-vid')
    await spavaj(500)
    pi.classList.add('je-vid')
    await spavaj(1200)
    if (!jos()) return
    pi.classList.remove('je-vid')
    bo.classList.add('je-vid')
    return
  }

  if (id === 'odrzavanje') {
    if (n === 0) return
    const kopija = $$('.pr-stanje li span')[1]
    if (!kopija) return
    kopija.textContent = '…'
    await spavaj(900)
    kopija.textContent = `${tp.kopija} ✓`
    skoci(kopija, 1.25)
  }
}

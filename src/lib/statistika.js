// Statistika posjeta bez kolačića (Umami Cloud). Broji stranice i klikove koji su važni za
// posao: WhatsApp, poziv, mail, "Pitajte za ovo", primjeri usluga i vodič. Ne skuplja lične
// podatke i ne treba traku za pristanak. Radi samo na hunar.ba (ne na pregledima ni lokalno)
// i učita se tek kad se stranica učita, da ne usporava prvi ekran.

// ID sajta iz Umami Clouda (Settings → Websites → hunar.ba). Prazno: statistika je ugašena.
export const UMAMI_ID = 'c548514d-f942-47aa-89d3-65acfd096109'
export const DOMEN = 'hunar.ba'
const SKRIPTA = 'https://cloud.umami.is/script.js'

// Događaj za klik na link: WhatsApp (sa uslugom iz poruke, ako je ima), poziv ili mail.
export function dogadjajZaLink(href = '') {
  if (href.startsWith('https://wa.me/')) {
    let poruka = ''
    try {
      poruka = new URL(href).searchParams.get('text') || ''
    } catch {
      // neispravan link: ostaje bez usluge
    }
    const m = poruka.match(/zanima me ([^.,!?]+)/i) || poruka.match(/interested in ([^.,!?]+)/i)
    return { ime: 'WhatsApp', podaci: m ? { usluga: m[1].trim() } : undefined }
  }
  if (href.startsWith('tel:')) return { ime: 'Poziv' }
  if (href.startsWith('mailto:')) return { ime: 'Mail' }
  return null
}

// Pošalje događaj; prije nego se Umami učita, događaji čekaju u redu.
const red = []
export function prati(ime, podaci) {
  if (typeof window === 'undefined' || !UMAMI_ID) return
  if (window.umami?.track) window.umami.track(ime, podaci)
  else red.push([ime, podaci])
}

let pokrenuto = false
export function pokreniStatistiku({ id = UMAMI_ID, domen = DOMEN } = {}) {
  if (pokrenuto || !id || typeof window === 'undefined' || window.location.hostname !== domen) return false
  pokrenuto = true

  // Klikovi na WhatsApp, poziv i mail, sa bilo kojeg mjesta na stranici.
  document.addEventListener(
    'click',
    (e) => {
      const a = e.target instanceof Element ? e.target.closest('a[href]') : null
      const d = a && dogadjajZaLink(a.getAttribute('href'))
      if (d) prati(d.ime, d.podaci)
    },
    { capture: true, passive: true },
  )

  const ucitaj = () => {
    const s = document.createElement('script')
    s.src = SKRIPTA
    s.defer = true
    s.dataset.websiteId = id
    s.dataset.domains = domen
    s.onload = () => {
      for (const [ime, podaci] of red.splice(0)) window.umami?.track(ime, podaci)
    }
    document.head.append(s)
  }
  const kasnije = () => ('requestIdleCallback' in window ? requestIdleCallback(ucitaj, { timeout: 3000 }) : setTimeout(ucitaj, 1500))
  if (document.readyState === 'complete') kasnije()
  else window.addEventListener('load', kasnije, { once: true })
  return true
}

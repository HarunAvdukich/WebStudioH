import { marked } from 'marked'

// Duga priča studije slučaja: src/content/radovi/<slug>.md (bosanski) i <slug>.en.md
// (engleski), učitano pri gradnji.
const files = import.meta.glob('./content/radovi/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const price = Object.fromEntries(
  Object.entries(files).map(([path, raw]) => [path.split('/').pop().replace(/\.md$/, ''), raw.trim()]),
)

const bezOznaka = (html) => html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"')
const idOd = (tekst) =>
  tekst
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'dj')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

// Priča kao HTML, sa id-jem na svakom naslovu dijela (h2), spisak tih naslova i
// procjena čitanja u minutama (200 riječi u minuti).
export function pricaRada(slug, jezik = 'bs') {
  const raw = price[jezik === 'en' ? `${slug}.en` : slug]
  if (!raw) return { html: '', naslovi: [], minuta: 0 }
  const naslovi = []
  const html = marked.parse(raw).replace(/<h2>(.*?)<\/h2>/g, (m, t) => {
    const tekst = bezOznaka(t)
    const id = idOd(tekst)
    naslovi.push({ id, tekst })
    return `<h2 id="${id}">${t}</h2>`
  })
  const minuta = Math.max(1, Math.round(raw.split(/\s+/).length / 200))
  return { html, naslovi, minuta }
}

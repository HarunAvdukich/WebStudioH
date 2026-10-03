import { marked } from 'marked'

// Load all markdown posts at build time (works in dev + SSG).
const files = import.meta.glob('./content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

// Minimal front-matter parser (key: "value" lines between --- fences).
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, body: raw }
  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
    data[key] = val
  }
  return { data, body: match[2] }
}

marked.setOptions({ mangle: false, headerIds: false })

const idOd = (tekst) =>
  tekst
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'dj')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

// Naslovi dijelova (h2) dobiju id (za oznaku dijela i link) i izranjaju (data-pokret).
function naslovi(html) {
  const lista = []
  const sa = html.replace(/<h2>(.*?)<\/h2>/g, (m, t) => {
    const tekst = t.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    const id = idOd(tekst)
    lista.push({ id, tekst })
    return `<h2 id="${id}" data-pokret="izroni">${t}</h2>`
  })
  return { html: sa, naslovi: lista }
}

export const posts = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '')
    const { data, body } = parseFrontmatter(raw)
    // Vrijeme čitanja iz broja riječi (oko 200 u minuti), da ne zastari kad se tekst dopuni.
    const rijeci = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
    return {
      slug,
      title: data.title || slug,
      // Kraći naslov za <title> kad je naslov članka predug za rezultate pretrage.
      seoTitle: data.seoTitle || '',
      date: data.date || '',
      // Datum zadnje dopune; ide u dateModified i u zaglavlje članka.
      updated: data.updated || '',
      excerpt: data.excerpt || '',
      read: `${Math.max(2, Math.round(rijeci / 200))} min`,
      minuta: Math.max(2, Math.round(rijeci / 200)),
      ...naslovi(marked.parse(body.trim())),
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

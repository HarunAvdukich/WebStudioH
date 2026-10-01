import { marked } from 'marked'

// Duga priča studije slučaja: src/content/radovi/<slug>.md, učitano pri gradnji.
const files = import.meta.glob('./content/radovi/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const price = Object.fromEntries(
  Object.entries(files).map(([path, raw]) => [
    path.split('/').pop().replace(/\.md$/, ''),
    marked.parse(raw.trim()),
  ]),
)

export function pricaRada(slug) {
  return price[slug] || ''
}

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

export const posts = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '')
    const { data, body } = parseFrontmatter(raw)
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      excerpt: data.excerpt || '',
      read: data.read || '',
      html: marked.parse(body.trim()),
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date))

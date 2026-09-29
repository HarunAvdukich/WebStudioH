// Samo nazivi članaka, za listu stranica pri gradnji. Sadržaj i markdown
// parser ostaju u src/posts.js, koji učitavaju tek stranice savjeta.
const fajlovi = import.meta.glob('./content/posts/*.md', { query: '?raw', import: 'default' })

export const postSlugs = Object.keys(fajlovi).map((p) => p.split('/').pop().replace(/\.md$/, ''))

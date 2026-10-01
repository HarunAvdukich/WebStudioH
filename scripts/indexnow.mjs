// Javlja Bingu (i ostalim IndexNow pretraživačima) sve adrese iz sitemapa.
// Pokreni poslije objave: node scripts/indexnow.mjs
// Google ne koristi IndexNow; za Google je Search Console.
const KEY = 'e5365f1b24cd60399c501ea758143183'
const HOST = 'hunar.ba'

const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text()
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
})
console.log(`[indexnow] ${urlList.length} adresa, odgovor ${res.status}`)

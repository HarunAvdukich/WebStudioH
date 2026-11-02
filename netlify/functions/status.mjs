// P3: da li mrt.ba i smarttime.ba rade. Odgovor čuva Netlify CDN pet minuta, pa se sajtovi
// provjeravaju najviše jednom u pet minuta, ma koliko posjetilaca dođe. Račun je u src/lib/status.js.
import { provjeri } from '../../src/lib/status.js'

export default async () => {
  const rezultat = await provjeri()
  return Response.json(rezultat, {
    headers: {
      'Cache-Control': 'public, max-age=60',
      'Netlify-CDN-Cache-Control': 'public, durable, s-maxage=300, stale-while-revalidate=120',
    },
  })
}

export const config = { path: '/api/status' }

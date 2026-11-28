import App from './App.jsx'
import Home from './pages/Home.jsx'
import * as oHunaru from './stranice/o-hunaru.js'
import * as oHunaruEn from './stranice/o-hunaru.en.js'
import { izrada } from './stranice/izrada.js'
import { gradovi, putGrada } from './stranice/gradovi.js'
import * as usluge from './stranice/usluge.js'
import * as uslugeEn from './stranice/usluge.en.js'
import * as radovi from './stranice/radovi.js'
import * as radoviEn from './stranice/radovi.en.js'
import * as cijene from './stranice/cijene.js'
import * as cijeneEn from './stranice/cijene.en.js'
import * as kontakt from './stranice/kontakt.js'
import * as kontaktEn from './stranice/kontakt.en.js'
import * as privatnost from './stranice/privatnost.js'
import * as privatnostEn from './stranice/privatnost.en.js'

const komponenta = ({ default: Component }) => ({ Component })
const saPodacima = (props) => ({ default: Stranica }) => ({ Component: () => <Stranica {...props} /> })

export const routes = [
  {
    path: '/',
    element: <App />,
    entry: 'src/App.jsx',
    children: [
      { index: true, element: <Home /> },
      { path: 'en', lazy: () => import('./pages/HomeEn.jsx').then(komponenta) },
      { path: 'o-nama', lazy: () => import('./pages/ONama.jsx').then(saPodacima({ t: oHunaru })) },
      { path: 'en/about', lazy: () => import('./pages/ONama.jsx').then(saPodacima({ t: oHunaruEn })) },
      { path: 'usluge', lazy: () => import('./pages/Usluge.jsx').then(saPodacima({ t: usluge })) },
      ...izrada.map(t => ({ path: t.put.slice(1), lazy: () => import('./pages/Izrada.jsx').then(saPodacima({ t })) })),
      ...gradovi.map(g => ({ path: putGrada(g).slice(1), lazy: () => import('./pages/Grad.jsx').then(saPodacima({ g })) })),
      { path: 'en/services', lazy: () => import('./pages/Usluge.jsx').then(saPodacima({ t: uslugeEn })) },
      { path: 'radovi', lazy: () => import('./pages/Radovi.jsx').then(saPodacima({ t: radovi })) },
      { path: 'en/work', lazy: () => import('./pages/Radovi.jsx').then(saPodacima({ t: radoviEn })) },
      {
        path: 'radovi/:slug',
        lazy: () => import('./pages/Studija.jsx').then(saPodacima({ t: radovi })),
        getStaticPaths: () => radovi.radovi.map((r) => `radovi/${r.slug}`),
      },
      {
        path: 'en/work/:slug',
        lazy: () => import('./pages/Studija.jsx').then(saPodacima({ t: radoviEn })),
        getStaticPaths: () => radoviEn.radovi.map((r) => `en/work/${r.slug}`),
      },
      { path: 'cijene', lazy: () => import('./pages/Cijene.jsx').then(saPodacima({ t: cijene })) },
      { path: 'en/pricing', lazy: () => import('./pages/Cijene.jsx').then(saPodacima({ t: cijeneEn })) },
      { path: 'savjeti', lazy: () => import('./pages/Savjeti.jsx').then(komponenta) },
      { path: 'olx', lazy: () => import('./pages/Olx.jsx').then(komponenta) },
      { path: 'zakazivanje', lazy: () => import('./pages/Zakazivanje.jsx').then(komponenta) },
      { path: 'skica', lazy: () => import('./pages/Skica.jsx').then(komponenta) },
      // Skrivena evidencija rada za klijenta: van menija, sitemapa i indeksa (vidi src/pages/Sati.jsx).
      { path: 'sati', lazy: () => import('./pages/Sati.jsx').then(komponenta) },
      {
        path: 'savjeti/:slug',
        lazy: () => import('./pages/Clanak.jsx').then(komponenta),
        getStaticPaths: async () => {
          const { posts } = await import('./posts.js')
          return posts.map((p) => `savjeti/${p.slug}`)
        },
      },
      { path: 'kontakt', lazy: () => import('./pages/Kontakt.jsx').then(saPodacima({ t: kontakt })) },
      { path: 'en/contact', lazy: () => import('./pages/Kontakt.jsx').then(saPodacima({ t: kontaktEn })) },
      { path: 'politika-privatnosti', lazy: () => import('./pages/Privatnost.jsx').then(saPodacima({ t: privatnost })) },
      { path: 'en/privacy', lazy: () => import('./pages/Privatnost.jsx').then(saPodacima({ t: privatnostEn })) },
      { path: '*', lazy: () => import('./pages/NotFound.jsx').then(komponenta) },
    ],
  },
]

import App from './App.jsx'
import Home from './pages/Home.jsx'
import HomeEn from './pages/HomeEn.jsx'
import ONama from './pages/ONama.jsx'
import * as oHunaru from './stranice/o-hunaru.js'
import * as oHunaruEn from './stranice/o-hunaru.en.js'
import Usluge from './pages/Usluge.jsx'
import * as usluge from './stranice/usluge.js'
import * as uslugeEn from './stranice/usluge.en.js'
import Radovi from './pages/Radovi.jsx'
import Studija from './pages/Studija.jsx'
import * as radovi from './stranice/radovi.js'
import * as radoviEn from './stranice/radovi.en.js'
import Cijene from './pages/Cijene.jsx'
import * as cijene from './stranice/cijene.js'
import * as cijeneEn from './stranice/cijene.en.js'
import Kontakt from './pages/Kontakt.jsx'
import * as kontakt from './stranice/kontakt.js'
import * as kontaktEn from './stranice/kontakt.en.js'
import Savjeti from './pages/Savjeti.jsx'
import Clanak from './pages/Clanak.jsx'
import Privatnost from './pages/Privatnost.jsx'
import * as privatnost from './stranice/privatnost.js'
import * as privatnostEn from './stranice/privatnost.en.js'
import NotFound from './pages/NotFound.jsx'
import { posts } from './posts.js'

export const routes = [
  {
    path: '/',
    element: <App />,
    entry: 'src/App.jsx',
    children: [
      { index: true, element: <Home /> },
      { path: 'en', element: <HomeEn /> },
      { path: 'o-nama', element: <ONama t={oHunaru} /> },
      { path: 'en/about', element: <ONama t={oHunaruEn} /> },
      { path: 'usluge', element: <Usluge t={usluge} /> },
      { path: 'en/services', element: <Usluge t={uslugeEn} /> },
      { path: 'radovi', element: <Radovi t={radovi} /> },
      { path: 'en/work', element: <Radovi t={radoviEn} /> },
      {
        path: 'radovi/:slug',
        element: <Studija t={radovi} />,
        getStaticPaths: () => radovi.radovi.map((r) => `radovi/${r.slug}`),
      },
      {
        path: 'en/work/:slug',
        element: <Studija t={radoviEn} />,
        getStaticPaths: () => radoviEn.radovi.map((r) => `en/work/${r.slug}`),
      },
      { path: 'cijene', element: <Cijene t={cijene} /> },
      { path: 'en/pricing', element: <Cijene t={cijeneEn} /> },
      { path: 'savjeti', element: <Savjeti /> },
      {
        path: 'savjeti/:slug',
        element: <Clanak />,
        getStaticPaths: () => posts.map((p) => `savjeti/${p.slug}`),
      },
      { path: 'kontakt', element: <Kontakt t={kontakt} /> },
      { path: 'en/contact', element: <Kontakt t={kontaktEn} /> },
      { path: 'politika-privatnosti', element: <Privatnost t={privatnost} /> },
      { path: 'en/privacy', element: <Privatnost t={privatnostEn} /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]

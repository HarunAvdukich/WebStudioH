import App from './App.jsx'
import Home from './pages/Home.jsx'
import { projects } from './data.js'
import { postSlugs } from './postSlugs.js'

// Početna je u glavnom paketu; ostale stranice (i markdown parser savjeta)
// dolaze kao zasebni dijelovi, da početna ne hidrira kod koji ne koristi.
const stranica = (uvoz) => () => uvoz().then((m) => ({ Component: m.default }))

export const routes = [
  {
    path: '/',
    element: <App />,
    entry: 'src/App.jsx',
    children: [
      { index: true, element: <Home /> },
      { path: 'o-nama', lazy: stranica(() => import('./pages/AboutPage.jsx')) },
      { path: 'usluge', lazy: stranica(() => import('./pages/ServicesPage.jsx')) },
      { path: 'radovi', lazy: stranica(() => import('./pages/WorkPage.jsx')) },
      {
        path: 'radovi/:slug',
        lazy: stranica(() => import('./pages/CaseStudyPage.jsx')),
        getStaticPaths: () => projects.map((p) => `radovi/${p.slug}`),
      },
      { path: 'cijene', lazy: stranica(() => import('./pages/PricingPage.jsx')) },
      { path: 'savjeti', lazy: stranica(() => import('./pages/BlogPage.jsx')) },
      {
        path: 'savjeti/:slug',
        lazy: stranica(() => import('./pages/BlogPostPage.jsx')),
        getStaticPaths: () => postSlugs.map((slug) => `savjeti/${slug}`),
      },
      { path: 'kontakt', lazy: stranica(() => import('./pages/ContactPage.jsx')) },
      { path: 'politika-privatnosti', lazy: stranica(() => import('./pages/PrivacyPage.jsx')) },
      { path: '*', lazy: stranica(() => import('./pages/NotFound.jsx')) },
    ],
  },
]

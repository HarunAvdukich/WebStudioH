import App from './App.jsx'
import Home from './pages/Home.jsx'
import HomeEn from './pages/HomeEn.jsx'
import AboutPage from './pages/AboutPage.jsx'
import Usluge from './pages/Usluge.jsx'
import * as usluge from './stranice/usluge.js'
import * as uslugeEn from './stranice/usluge.en.js'
import WorkPage from './pages/WorkPage.jsx'
import CaseStudyPage from './pages/CaseStudyPage.jsx'
import Cijene from './pages/Cijene.jsx'
import * as cijene from './stranice/cijene.js'
import * as cijeneEn from './stranice/cijene.en.js'
import Kontakt from './pages/Kontakt.jsx'
import * as kontakt from './stranice/kontakt.js'
import * as kontaktEn from './stranice/kontakt.en.js'
import BlogPage from './pages/BlogPage.jsx'
import BlogPostPage from './pages/BlogPostPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import NotFound from './pages/NotFound.jsx'
import { projects } from './data.js'
import { posts } from './posts.js'

export const routes = [
  {
    path: '/',
    element: <App />,
    entry: 'src/App.jsx',
    children: [
      { index: true, element: <Home /> },
      { path: 'en', element: <HomeEn /> },
      { path: 'o-nama', element: <AboutPage /> },
      { path: 'usluge', element: <Usluge t={usluge} /> },
      { path: 'en/services', element: <Usluge t={uslugeEn} /> },
      { path: 'radovi', element: <WorkPage /> },
      {
        path: 'radovi/:slug',
        element: <CaseStudyPage />,
        getStaticPaths: () => projects.map((p) => `radovi/${p.slug}`),
      },
      { path: 'cijene', element: <Cijene t={cijene} /> },
      { path: 'en/pricing', element: <Cijene t={cijeneEn} /> },
      { path: 'savjeti', element: <BlogPage /> },
      {
        path: 'savjeti/:slug',
        element: <BlogPostPage />,
        getStaticPaths: () => posts.map((p) => `savjeti/${p.slug}`),
      },
      { path: 'kontakt', element: <Kontakt t={kontakt} /> },
      { path: 'en/contact', element: <Kontakt t={kontaktEn} /> },
      { path: 'politika-privatnosti', element: <PrivacyPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]

import App from './App.jsx'
import Home from './pages/Home.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import WorkPage from './pages/WorkPage.jsx'
import CaseStudyPage from './pages/CaseStudyPage.jsx'
import PricingPage from './pages/PricingPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
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
      { path: 'o-nama', element: <AboutPage /> },
      { path: 'usluge', element: <ServicesPage /> },
      { path: 'radovi', element: <WorkPage /> },
      {
        path: 'radovi/:slug',
        element: <CaseStudyPage />,
        getStaticPaths: () => projects.map((p) => `radovi/${p.slug}`),
      },
      { path: 'cijene', element: <PricingPage /> },
      { path: 'savjeti', element: <BlogPage /> },
      {
        path: 'savjeti/:slug',
        element: <BlogPostPage />,
        getStaticPaths: () => posts.map((p) => `savjeti/${p.slug}`),
      },
      { path: 'kontakt', element: <ContactPage /> },
      { path: 'politika-privatnosti', element: <PrivacyPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]

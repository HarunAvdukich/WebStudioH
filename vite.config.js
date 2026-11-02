import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pikseliURem from './scripts/pikseli-u-rem.mjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Veliki ekran: CSS ide u rem, a src/index.css uveća slovo na <html> (vidi scripts/pikseli-u-rem.mjs).
  css: { postcss: { plugins: [pikseliURem()] } },
  ssgOptions: {
    // dist/404.html: Netlify ga vraća sa statusom 404 za svaku adresu koja ne postoji.
    includedRoutes: (paths) => [...paths, '/404'],
  },
})

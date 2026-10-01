import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  ssgOptions: {
    // dist/404.html: Netlify ga vraća sa statusom 404 za svaku adresu koja ne postoji.
    includedRoutes: (paths) => [...paths, '/404'],
  },
})

// vite.config.js — clean single default export for GH Pages

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // важно за GitHub Pages под-патека: https://<user>.github.io/prva/
  base: '/prva/',

  plugins: [react()],

  // за да работат import-и како "@/components/..."
  resolve: {
    alias: {
      '@': '/src',
    },
  },

  // опционално: можеш да додадеш и други Vite опции тука (build, server, итн.)
})

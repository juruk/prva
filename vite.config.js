import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // GitHub Pages deployment configuration
  // Update the base path to match your repository name
  // Example: if your repo is "construction-pm-app", use base: '/construction-pm-app/'
  // For custom domain or username.github.io, use base: '/'
  base: './',
})


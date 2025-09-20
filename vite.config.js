import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    https: true,  // Active HTTPS pour le dev
    proxy: {
      '/api': {
        target: 'https://localhost:8000',
        secure: false  // Ignore les certificats auto-signés
      }
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { seoPages } from './seo-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seoPages()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { pages } from 'vike-cloudflare'
import vike from 'vike/plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vike(), react({}), tailwindcss(), pages()],
  build: {
    target: 'es2022',
  },
})

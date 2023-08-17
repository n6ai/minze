import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import minze from 'vite-plugin-minze'

export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
  plugins: [minze()]
})

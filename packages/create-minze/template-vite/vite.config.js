import { defineConfig } from 'vite'
import minze from 'vite-plugin-minze'

export default defineConfig({
  resolve: {
    alias: { '@': new URL('./src', import.meta.url).pathname }
  },
  plugins: [minze()]
})

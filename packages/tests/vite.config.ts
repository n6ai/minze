import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    react(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('minze-')
        }
      }
    })
  ]
})

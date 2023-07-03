import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    react(),
    svelte(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('minze-')
        }
      }
    })
  ]
})

/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  test: {
    exclude: ['(e2e|integration)/**']
  },
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

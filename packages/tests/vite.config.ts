/// <reference types='vitest' />

import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import vue from '@vitejs/plugin-vue'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  test: {
    exclude: ['(e2e|integration)/**']
  },
  resolve: {
    alias: {
      '@tests/minze': resolve(__dirname, 'e2e/minze/src'),
      '@tests/minze-element': resolve(__dirname, 'e2e/minze-element/src'),
      '@tests/react': resolve(__dirname, 'integration/react/src'),
      '@tests/svelte': resolve(__dirname, 'integration/svelte/src'),
      '@tests/vue': resolve(__dirname, 'integration/vue/src')
    }
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

/// <reference types='vitest' />

import { defineConfig } from 'vite'
import pkg from './package.json'
import minze from 'vite-plugin-minze'
import dts from 'vite-plugin-dts'

export default defineConfig({
  test: {
    environment: 'happy-dom'
  },
  define: {
    __VERSION__: JSON.stringify(pkg.version)
  },
  resolve: {
    alias: {
      '@': new URL('./play', import.meta.url).pathname,
      '@minze': new URL('./src', import.meta.url).pathname,
      minze: new URL('./src/main.ts', import.meta.url).pathname
    }
  },
  plugins: [
    minze({ entry: 'play/main.ts' }),
    dts({
      entryRoot: './play',
      include: ['play'],
      exclude: ['play/vite.ts', 'play/**/*.{spec,test,stories}.ts']
    })
  ]
})

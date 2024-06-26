/// <reference types='vitest' />

import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import pkg from './package.json'
import minze from 'vite-plugin-minze'
import dts from 'vite-plugin-dts'

export default defineConfig({
  test: {
    include: ['src/**/*.test.*'],
    environment: 'happy-dom',
    onConsoleLog(log) {
      if (log.includes('Minze')) return false
    }
  },
  define: {
    __VERSION__: JSON.stringify(pkg.version)
  },
  resolve: {
    alias: {
      minze: fileURLToPath(new URL('./src/main.ts', import.meta.url)),
      src: new URL('./src', import.meta.url).pathname,
      '@': new URL('./test', import.meta.url).pathname
    }
  },
  plugins: [
    minze({ entry: 'test/main.ts' }),
    dts({
      entryRoot: 'test',
      include: ['test', 'src/env.d.ts'],
      exclude: ['test/{vite,utils}.ts', 'test/**/*.{spec,test,stories}.ts']
    })
  ]
})

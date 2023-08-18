import { defineConfig } from 'vite'
import minze from 'vite-plugin-minze'
import dts from 'vite-plugin-dts'

export default defineConfig({
  resolve: {
    alias: { '@': new URL('./src', import.meta.url).pathname }
  },
  plugins: [
    minze(),
    dts({ exclude: ['src/vite.ts', 'src/**/*.{spec,test,stories}.ts'] })
  ]
})

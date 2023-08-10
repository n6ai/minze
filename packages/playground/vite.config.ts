import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import minze from '@minzejs/vite-plugin-minze'
import dts from 'vite-plugin-dts'

export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
  plugins: [
    minze(),
    dts({ exclude: ['src/vite.ts', 'src/**/*.{spec,test,stories}.ts'] })
  ]
})

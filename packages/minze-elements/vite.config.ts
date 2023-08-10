import { defineConfig } from 'vite'
import minze from '@minzejs/vite-plugin-minze'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    minze(),
    dts({ exclude: ['src/vite.ts', 'src/**/*.{spec,test,stories}.ts'] })
  ]
})

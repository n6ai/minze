import { defineConfig } from 'vite'
import minze from '@minzejs/vite-plugin-minze'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    minze({ entry: { module: 'src/module.ts', cdn: 'src/cdn.ts' } }),
    dts({ include: ['src/module.ts', 'src/lib/**/*.ts'] })
  ]
})

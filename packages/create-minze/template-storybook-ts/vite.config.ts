import { defineConfig } from 'vite'
import minze from '@minzejs/vite-plugin-minze'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    minze(),
    dts({
      include: ['src/main.ts', 'src/lib/**/!(*.spec|*.test|*.stories).ts']
    })
  ]
})

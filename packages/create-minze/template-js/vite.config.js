import { defineConfig } from 'vite'
import minze from '@minzejs/vite-plugin-minze'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [minze({ entry: { module: 'src/module.js', cdn: 'src/cdn.js' } })]
})

import { defineConfig } from 'vite'
import minze from '@minzejs/vite-plugin-minze'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [minze(), dts({ rollupTypes: true })]
})

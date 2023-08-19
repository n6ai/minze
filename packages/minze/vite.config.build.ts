import { defineConfig } from 'vite'
import pkg from './package.json'
import dts from 'vite-plugin-dts'

export default defineConfig({
  define: {
    __VERSION__: JSON.stringify(pkg.version)
  },
  resolve: {
    alias: { src: new URL('./src', import.meta.url).pathname }
  },
  esbuild: {
    keepNames: true
  },
  build: {
    emptyOutDir: true,
    copyPublicDir: false,
    lib: {
      name: 'minze',
      formats: ['es'],
      entry: 'src/main.ts',
      fileName: () => 'main.js'
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        minifyInternalExports: false
      }
    }
  },
  plugins: [
    dts({
      rollupTypes: true,
      entryRoot: 'src',
      include: ['src']
    })
  ]
})

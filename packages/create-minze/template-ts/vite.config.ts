import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const modes = ['module', 'cdn']

  if (command === 'build' && !modes.includes(mode)) {
    console.error('mode must be one of: ' + modes.join(', '))
    process.exit(1)
  }

  const isModule = mode === 'module'

  return {
    build: {
      minify: 'terser',
      terserOptions: {
        keep_classnames: true
      },
      emptyOutDir: isModule,
      lib: {
        name: 'minze',
        formats: [isModule ? 'es' : 'umd'],
        entry: isModule ? 'src/module.ts' : 'src/cdn.ts',
        fileName: () => (isModule ? 'module.js' : 'cdn.js')
      }
    },
    plugins: [isModule ? dts({ rollupTypes: true }) : null]
  }
})

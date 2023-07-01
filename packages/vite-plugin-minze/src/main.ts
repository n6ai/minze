import type { UserConfig } from 'vite'

export default () => ({
  name: 'vite-plugin-minze',
  config: (
    config: unknown,
    { command, mode }: { command: 'build' | 'serve'; mode: string }
  ): UserConfig => {
    const modes = ['module', 'cdn']

    if (command === 'build' && !modes.includes(mode)) {
      console.error(`mode must be one of: ${modes.join(', ')}`)
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
        },
        rollupOptions: {
          output: {
            inlineDynamicImports: !isModule,
            minifyInternalExports: false,
            chunkFileNames: '[name].js',
            manualChunks: isModule
              ? (id) => {
                  if (id.includes('lib')) {
                    const name = id.match(/(?<=lib\/).*(?=\.(ts|js))/i)?.[0]
                    return `lib/${name}`
                  } else if (id.match(/node_modules|minze\/dist/i)) {
                    return 'vendor'
                  }
                }
              : undefined
          }
        }
      }
    }
  }
})

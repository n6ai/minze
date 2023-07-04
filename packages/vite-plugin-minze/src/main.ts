import type { Plugin } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

interface PluginOptions {
  entry?: {
    module?: string
    cdn?: string
  }
}

interface Context {
  command: 'build' | 'serve'
  mode: string
}

/**
 * Vite plugin for Minze dev environment.
 */
export default (options?: PluginOptions): Plugin => {
  const isTypeScript = fs.existsSync(path.join(process.cwd(), 'tsconfig.json'))
  const moduleEntry =
    options?.entry?.module ?? `src/module.${isTypeScript ? 'ts' : 'js'}`
  const cdnEntry =
    options?.entry?.cdn ?? `src/cdn.${isTypeScript ? 'ts' : 'js'}`

  return {
    name: 'vite-plugin-minze',
    config: (config, { command, mode }: Context) => {
      const modes = ['module', 'cdn']
      const isModule = mode === 'module'

      if (command === 'build' && !modes.includes(mode)) {
        console.warn(
          `[vite-plugin-minze]: mode must be one of: ${modes.join(', ')}`
        )

        // return only esbuild config if no mode is provided to ensure original class names
        return {
          esbuild: {
            keepNames: true
          }
        }
      }

      return {
        esbuild: {
          keepNames: true
        },
        build: {
          emptyOutDir: isModule,
          lib: {
            name: 'minze',
            formats: [isModule ? 'es' : 'umd'],
            entry: isModule ? moduleEntry : cdnEntry,
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
  }
}

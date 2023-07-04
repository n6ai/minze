import type { Plugin } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

interface PluginOptions {
  entry?: string
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
  const entry = options?.entry ?? `src/main.${isTypeScript ? 'ts' : 'js'}`

  return {
    name: 'vite-plugin-minze',
    config: (config, { command }: Context) => {
      if (command === 'serve') {
        return {
          esbuild: {
            keepNames: true
          }
        }
      }

      if (command === 'build') {
        return {
          esbuild: {
            keepNames: true
          },
          build: {
            emptyOutDir: true,
            lib: {
              name: 'minze',
              formats: ['es'],
              entry,
              fileName: () => 'main.js'
            },
            rollupOptions: {
              output: {
                inlineDynamicImports: false,
                minifyInternalExports: false,
                chunkFileNames: '[name].js',
                manualChunks: (id) => {
                  if (id.includes('lib')) {
                    const regex = /(?<=lib\/).*(?=\.(ts|js|css|html))/i
                    const name = id.match(regex)?.[0]
                    return `lib/${name}`
                  } else if (id.match(/node_modules|minze\/dist/i)) {
                    return 'vendor'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

import type { Plugin } from 'vite'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

interface PluginOptions {
  entry?: string
}

interface Context {
  command: 'build' | 'serve'
  mode: string
}

/**
 * vite-plugin-minze
 *
 * @example
 * ```
 * import { defineConfig } from 'vite'
 * import minze from 'vite-plugin-minze'
 *
 * export default defineConfig({
 *   plugins: [
 *     minze({ entry: 'src/main.js' }),
 *     // ...
 *   ]
 * })
 * ```
 */
export default (options?: PluginOptions): Plugin => {
  const isTypeScript = existsSync(join(process.cwd(), 'tsconfig.json'))
  const entry = options?.entry ?? `src/main.${isTypeScript ? 'ts' : 'js'}`

  return {
    name: 'vite-plugin-minze',
    config: (config, { command }: Context) => {
      // prevent overriding storybook config
      const isStorybook =
        config.define?.['import.meta.env.STORYBOOK'] ||
        config.envPrefix?.includes('STORYBOOK_')

      // keep original class names
      if (command === 'serve' || isStorybook) {
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
                  const chunkName = (
                    id: string,
                    regex: RegExp,
                    dir: string
                  ) => {
                    const name = id.match(regex)?.[0]
                    return `${dir}/${name}`
                  }

                  if (id.includes('/node_modules/')) {
                    return chunkName(
                      id,
                      /(?<=node_modules\/).*(?=\.(?:ts|m?js|css|html))/i,
                      'vendor'
                    )
                  } else if (id.includes('/lib/')) {
                    return chunkName(
                      id,
                      /(?<=lib\/).*(?=\.(?:ts|js|css|html))/i,
                      'lib'
                    )
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

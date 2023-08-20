import type { Plugin } from 'vite'
import { existsSync } from 'node:fs'
import { normalize, join } from 'node:path'

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
                manualChunks: (id, match) => {
                  const isIncluded = match.getModuleInfo(id)?.isIncluded
                  const idIcludesCWD = normalize(id).includes(
                    normalize(process.cwd())
                  )

                  if (isIncluded && id.includes('/node_modules/')) {
                    const pathRE = /(?<=node_modules\/).*(?=\.(?:ts|m?js))/i
                    const match = id.match(pathRE)?.[0]

                    if (match) return `vendor/${match}`
                  } else if (
                    isIncluded &&
                    idIcludesCWD &&
                    id.includes('/lib/')
                  ) {
                    const pathRE = /(?<=lib\/).*(?=\.(?:ts|m?js))/i
                    const match = id.match(pathRE)?.[0]

                    if (match) return `lib/${match}`
                  } else if (isIncluded) {
                    const pathRE = /(?:\/)([\w\-+. ]+)(?:\..*)$/i
                    const match = id.match(pathRE)?.[1]

                    if (match) return `chunks/${match}`
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

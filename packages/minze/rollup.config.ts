import type { RollupOptions } from 'rollup'
import { resolve, join, dirname } from 'path'
import { fileURLToPath } from 'url'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import dts from 'rollup-plugin-dts'
import license from 'rollup-plugin-license'
import packageJSON from './package.json' assert { type: 'json' }

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const version = packageJSON.version

type BuildConfig = {
  format: 'es' | 'umd'
  file: string
  onlyProd?: boolean
}

const builds: BuildConfig[] = [
  { format: 'es', file: 'src/module.ts' },
  { format: 'umd', file: 'src/cdn.ts', onlyProd: true }
]

const createConfig = (
  { format, file }: { format: 'es' | 'umd'; file: string },
  { isDev, isProd }: { isDev: boolean; isProd: boolean }
): RollupOptions => {
  return {
    input: resolve(__dirname, file),
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
        declaration: true,
        declarationDir: resolve(__dirname, 'dist/types')
      }),
      isProd &&
        replace({
          preventAssignment: true,
          __VERSION__: version
        }),
      isProd &&
        terser({
          keep_classnames: true,
          output: {
            comments: false
          }
        }),
      isProd &&
        license({
          thirdParty: {
            output: {
              file: join(__dirname, 'dist', 'DEPENDENCIES')
            }
          }
        })
    ],
    output: {
      dir: resolve(__dirname, 'dist'),
      format: format,
      sourcemap: isDev
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (commandLineArgs: Record<string, any>) => {
  const isDev = commandLineArgs.watch
  const isProd = !isDev
  const configs: RollupOptions[] = []

  builds
    .filter((build) => !build.onlyProd || isProd)
    .forEach((build) => {
      configs.push(createConfig(build, { isDev, isProd }))
    })

  // roll types
  configs.push({
    input: resolve(__dirname, 'dist/types/src/module.d.ts'),
    output: [{ file: resolve(__dirname, 'dist/module.d.ts'), format: 'es' }],
    plugins: [dts()]
  })

  return configs
}

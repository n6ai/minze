import type { RollupOptions } from 'rollup'
import { readFileSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import dts from 'rollup-plugin-dts'
import license from 'rollup-plugin-license'

const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url)).toString()
)

const __dirname = fileURLToPath(new URL('.', import.meta.url))

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
          __VERSION__: pkg.version
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

export default (commandLineArgs: Record<string, unknown>) => {
  const isDev = commandLineArgs.watch !== undefined
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

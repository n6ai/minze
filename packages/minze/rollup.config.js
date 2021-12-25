// @ts-check
import { resolve, join } from 'path'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import license from 'rollup-plugin-license'
import { version } from './package.json'

/**
 * @type { {format: 'es' | 'umd', file: string, onlyProd?: boolean}[] }
 */
const builds = [
  { format: 'es', file: 'src/module.ts' },
  { format: 'umd', file: 'src/cdn.ts', onlyProd: true }
]

/**
 * @param { {format: 'es' | 'umd', file: string} } build
 * @param { {isDev: boolean, isProd: boolean} } env
 * @returns { import('rollup').RollupOptions }
 */
const createConfig = ({ format, file }, { isDev, isProd }) => {
  /**
   * @type { import('rollup').RollupOptions }
   */
  const config = {
    input: resolve(__dirname, file),
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
        ...(isDev && {
          declaration: true,
          declarationDir: resolve(__dirname, 'dist/')
        })
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

  return config
}

export default (commandLineArgs) => {
  const isDev = commandLineArgs.watch
  const isProd = !isDev
  const configs = []

  builds
    .filter((build) => !build.onlyProd || isProd)
    .forEach((build) => {
      configs.push(createConfig(build, { isDev, isProd }))
    })

  return configs
}

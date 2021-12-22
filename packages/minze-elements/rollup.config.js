// @ts-check
import { resolve, join } from 'path'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import license from 'rollup-plugin-license'

/**
 * @type { {format: 'es' | 'umd', file: string}[] }
 */
const builds = [
  { format: 'es', file: 'src/module.ts' },
  { format: 'umd', file: 'src/cdn.ts' }
]

/**
 * @param { {format: 'es' | 'umd', file: string} } build
 * @returns { import('rollup').RollupOptions }
 */
const createConfig = ({ format, file }) => {
  /**
   * @type { import('rollup').RollupOptions }
   */
  const config = {
    input: resolve(__dirname, file),
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
        exclude: ['node_modules', 'src/vite.ts']
      }),
      terser({
        output: {
          comments: false
        }
      }),
      license({
        thirdParty: {
          output: {
            file: join(__dirname, 'dist', 'DEPENDENCIES')
          }
        }
      })
    ],
    external: /^minze/,
    output: {
      dir: resolve(__dirname, 'dist'),
      globals: {
        minze: 'MinzeElement' // used in cdn build
      },
      format: format
    }
  }

  return config
}

export default () => {
  const configs = []

  builds.forEach((build) => {
    configs.push(createConfig(build))
  })

  return configs
}

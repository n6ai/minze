// @ts-check
import { resolve } from 'path'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

/**
 * @type { {format: 'es' | 'umd', file: string}[] }
 */
const builds = [
  { format: 'es', file: 'src/module.ts' },
  { format: 'umd', file: 'src/cdn.ts' }
]

/**
 * @param { {format: 'es' | 'umd', file: string} } build
 * @param { {isDev: boolean, isProd: boolean} } env
 * @returns { import('rollup').RollupOptions }
 */
const createConfig = ({ format, file }, { isDev, isProd }) => {
  const outputDeclaration = isDev && format === 'es'

  /**
   * @type { import('rollup').RollupOptions }
   */
  const config = {
    input: resolve(__dirname, file),
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
        declaration: outputDeclaration,
        declarationDir: outputDeclaration && resolve(__dirname, 'dist/')
      }),
      isProd && terser()
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

  builds.forEach((build) => {
    configs.push(createConfig(build, { isDev, isProd }))
  })

  return configs
}

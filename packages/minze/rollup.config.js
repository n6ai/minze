// @ts-check
import { resolve } from 'path'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

/**
 * @param {boolean} isDev
 * @param {boolean} isProd
 * @returns {import('rollup').RollupOptions}
 */
const createConfig = (isDev, isProd) => {
  /**
   * @type { import('rollup').RollupOptions }
   */
  const config = {
    input: resolve(__dirname, 'src/index.ts'),
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
        declaration: isDev,
        declarationDir: isDev && resolve(__dirname, 'dist/')
      }),
      isProd && terser()
    ],
    output: {
      dir: resolve(__dirname, 'dist'),
      format: 'es',
      sourcemap: isDev
    }
  }

  return config
}

export default (commandLineArgs) => {
  const isDev = commandLineArgs.watch
  const isProd = !isDev

  return [createConfig(isDev, isProd)]
}

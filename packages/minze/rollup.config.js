// @ts-check
import { resolve } from 'path'
import del from 'rollup-plugin-delete'
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
      del({ targets: resolve(__dirname, 'dist/*') }),
      typescript({
        tsconfig: 'tsconfig.json',
        declaration: true,
        declarationDir: resolve(__dirname, 'dist/')
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

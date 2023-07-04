import type { RollupOptions } from 'rollup'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import dts from 'rollup-plugin-dts'

const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url)).toString()
)

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const isDev = process.env.BUILD === 'dev'
const isProd = process.env.BUILD === 'prod'

const builds: RollupOptions[] = [
  {
    input: resolve(__dirname, 'src/main.ts'),
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
        })
    ],
    output: {
      dir: resolve(__dirname, 'dist'),
      format: 'esm',
      sourcemap: isDev
    }
  },
  {
    input: resolve(__dirname, 'dist/types/src/main.d.ts'),
    output: [{ file: resolve(__dirname, 'dist/main.d.ts'), format: 'esm' }],
    plugins: [dts()]
  }
]

export default builds

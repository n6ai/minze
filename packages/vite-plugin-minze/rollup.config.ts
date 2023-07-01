import type { RollupOptions } from 'rollup'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const config: RollupOptions[] = [
  {
    input: resolve(__dirname, 'src/main.ts'),
    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
        declaration: true,
        declarationDir: resolve(__dirname, 'dist/types')
      })
    ],
    output: {
      dir: resolve(__dirname, 'dist'),
      format: 'es'
    }
  },
  {
    input: resolve(__dirname, 'dist/types/src/main.d.ts'),
    output: [{ file: resolve(__dirname, 'dist/main.d.ts'), format: 'es' }],
    plugins: [dts()]
  }
]

export default config

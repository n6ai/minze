import type { RollupOptions } from 'rollup'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import dts from 'rollup-plugin-dts'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const config: RollupOptions[] = [
  {
    input: resolve(__dirname, 'src/main.ts'),
    plugins: [
      nodeResolve(),
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

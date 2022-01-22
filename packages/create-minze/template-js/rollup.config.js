import { resolve, join } from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import license from 'rollup-plugin-license'

const builds = [
  { format: 'es', file: 'src/module.js' },
  { format: 'umd', file: 'src/cdn.js' }
]

const createConfig = ({ format, file }) => {
  /**
   * @type { import('rollup').RollupOptions }
   */
  const config = {
    input: resolve(__dirname, file),
    plugins: [
      nodeResolve(),
      terser({
        keep_classnames: true,
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
    external: [
      format !== 'umd' && /^minze/ // embed minze only in cdn build
      // ...
    ],
    output: {
      dir: resolve(__dirname, 'dist'),
      format: format,
      globals: {
        // ...
      }
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

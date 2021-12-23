import { resolve, join } from 'path'
import { terser } from 'rollup-plugin-terser'
import license from 'rollup-plugin-license'

const builds = [
  { format: 'es', file: 'src/module.js' },
  { format: 'umd', file: 'src/cdn.js' }
]

const createConfig = ({ format, file }) => {
  const config = {
    input: resolve(__dirname, file),
    plugins: [
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
    external: /^minze/,
    output: {
      dir: resolve(__dirname, 'dist'),
      globals: {
        minze: 'window' // used in cdn build
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

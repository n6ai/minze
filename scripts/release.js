// @ts-check

import prompts from 'prompts'
import { exec } from 'child_process'
import ora from 'ora'

const spinner = ora()
const packages = ['minze', '@minze/elements', 'create-minze']

const main = async () => {
  const { pkg } = await prompts({
    type: 'select',
    name: 'pkg',
    message: 'Select a package to release',
    choices: () => packages.map((pkg) => ({ title: pkg, value: pkg }))
  })

  if (!pkg) process.exit()

  try {
    spinner.start('preparing release ...')

    const handleError = (err) => {
      if (err) {
        spinner.fail(err)
        process.exit()
      }
    }

    exec(`npm run release -w ${pkg}`, handleError)
    exec(`npm i`, handleError) // update the monorepo lock file with the new version

    spinner.stop()
  } catch (err) {
    spinner.fail(err)
    process.exit()
  }
}

main().catch((err) => {
  spinner.fail(err)
  process.exit()
})

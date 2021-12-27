// @ts-check

import prompts from 'prompts'
import { execa } from 'execa'
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

    await execa(`npm run release -w ${pkg}`)
    await execa(`npm i`) // update the monorepo lock file with the new version

    spinner.stop()
  } catch (err) {
    console.error(err)
  }
}

main().catch((err) => {
  console.error(err)
})

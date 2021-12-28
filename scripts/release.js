// @ts-check

import prompts from 'prompts'
import { exec } from 'child_process'

const packages = ['minze', '@minze/elements', 'create-minze']

const main = async () => {
  const { pkg } = await prompts({
    type: 'select',
    name: 'pkg',
    message: 'Select a package to release',
    choices: () => packages.map((pkg) => ({ title: pkg, value: pkg }))
  })

  if (!pkg) process.exit()

  await execAsync(`npm run release -w ${pkg}`)

  console.log('prepared release for: ', pkg)
}

/**
 * Executes a shell command and returns it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
function execAsync(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) reject(error)
      else resolve(stdout)
    })
  })
}

main().catch((err) => {
  console.error(err.message)
  process.exit()
})

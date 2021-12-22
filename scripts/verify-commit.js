// Invoked on the commit-msg git hook by husky.

import { readFileSync } from 'fs'
import chalk from 'chalk'

const msgPath = process.env.GIT_PARAMS
const msg = msgPath && readFileSync(msgPath, 'utf-8').trim()

const releaseRE = /^v\d/
const commitRE =
  /^(revert: )?(feat|fix|perf|docs|chore|refactor|types|deps|release|test|workflow|build|ci|)(\(.+\))?: .{1,50}/

if (!releaseRE.test(msg) && !commitRE.test(msg)) {
  console.log()
  console.error(
    `${chalk.bgRed.white(
      ' ERROR '
    )} ${chalk.red`invalid commit message format.`}\n\n` +
      chalk.red`Proper commit message format is required for automated changelog generation. Examples:\n\n` +
      `  feat: add new 'mirror' option\n` +
      `  fix: pass the right parameter in method (close #99)\n\n` +
      chalk.red(
        `See ${chalk.underline`.github/COMMIT_CONVENTION.md`} for more details.\n`
      )
  )
  process.exit(1)
}

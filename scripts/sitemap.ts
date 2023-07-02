/**
 * Script that generates a sitemap.txt file for vitepress.
 */
import { resolve, join, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import fs from 'node:fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const rootUrl = 'https://minze.dev'
const docsDir = resolve(__dirname, '../docs')
const outputFile = join(docsDir, '.vitepress/dist/sitemap.txt')

const dirs = {
  guide: join(docsDir, 'guide'),
  api: join(docsDir, 'api')
}

try {
  const urls = [rootUrl]

  Object.entries(dirs).forEach(([dirName, dirPath]) => {
    const files = fs
      .readdirSync(dirPath)
      .filter((file) => file.endsWith('.md') && !file.startsWith('index'))

    urls.push(`${rootUrl}/${dirName}`) // index.md
    files.forEach((file) =>
      urls.push(`${rootUrl}/${dirName}/${file.replace('.md', '')}`)
    )
  })

  fs.writeFileSync(outputFile, urls.join('\n'))
} catch (err) {
  console.log(err)
}

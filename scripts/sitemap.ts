/**
 * Script that generates a sitemap.txt file for vitepress.
 */
import fs from 'node:fs'
import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

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

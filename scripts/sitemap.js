// @ts-check

/**
 * Script that generates a sitemap.txt file for vitepress.
 */
const { resolve } = require('path')
const fs = require('fs')

const rootUrl = 'https://minze.dev'
const dirs = {
  guide: resolve(__dirname, '../docs/guide'),
  api: resolve(__dirname, '../docs/api')
}
const outputFile = resolve(__dirname, '../docs/.vitepress/dist/sitemap.txt')

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

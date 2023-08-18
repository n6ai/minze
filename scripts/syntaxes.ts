/**
 * Generates Minze syntax files for vitepress.
 */
import { readFile, writeFile } from 'node:fs/promises'

const injectSyntax = await readFile(
  new URL(
    '../packages/minze-vscode/syntaxes/minze.tmLanguage.json',
    import.meta.url
  ),
  { encoding: 'utf-8' }
)

const syntaxes = [
  {
    id: 'ts',
    name: 'TypeScript.tmLanguage.json',
    url: 'https://raw.githubusercontent.com/microsoft/vscode/main/extensions/typescript-basics/syntaxes/TypeScript.tmLanguage.json'
  },
  {
    id: 'js',
    name: 'JavaScript.tmLanguage.json',
    url: 'https://raw.githubusercontent.com/microsoft/vscode/main/extensions/javascript/syntaxes/JavaScript.tmLanguage.json'
  }
]

syntaxes.forEach(async (file) => {
  // compat replace
  const syntax = injectSyntax
    .replace(/source\.ts/g, '')
    .replace(/\.derivative/g, '.basic')
    .replace(/\.ts/g, `.${file.id}`)

  // fetch remote syntax
  const res = await fetch(file.url)
  const data = await res.json()

  // inject template patterns
  data.repository.template.patterns = [
    ...data.repository.template.patterns,
    { include: '#css-template' },
    { include: '#html-template' }
  ]

  // inject syntaxes for html and css templates
  data.repository = {
    ...data.repository,
    ...JSON.parse(syntax).repository
  }

  const filePath = new URL(
    `../docs/.vitepress/syntaxes/${file.name}`,
    import.meta.url
  )

  writeFile(filePath, JSON.stringify(data))
})

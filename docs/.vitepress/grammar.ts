import type { LanguageInput } from 'shiki'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const filePath = '../../packages/minze-vsc/syntaxes/minze.tmLanguage.json'
const grammar = JSON.parse(
  await readFile(fileURLToPath(new URL(filePath, import.meta.url)), 'utf-8')
)

export const languages: LanguageInput[] = [
  {
    injectTo: ['source.js', 'source.ts'],
    ...grammar
  }
]

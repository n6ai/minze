import type { ILanguageRegistration } from 'shiki'
import { fileURLToPath, URL } from 'node:url'

export const languages: ILanguageRegistration[] = [
  {
    id: 'ts',
    path: fileURLToPath(
      new URL(`./TypeScript.tmLanguage.json`, import.meta.url)
    ),
    scopeName: 'source.ts'
  },
  {
    id: 'js',
    path: fileURLToPath(
      new URL(`./JavaScript.tmLanguage.json`, import.meta.url)
    ),
    scopeName: 'source.js'
  }
]

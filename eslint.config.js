import js from '@eslint/js'
import ts from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    rules: {
      '@typescript-eslint/no-unsafe-declaration-merging': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  {
    ignores: ['**/dist/', '**/storybook/']
  }
]

# ESlint

[ESlint](https://eslint.org) let's you find and fix problems in your JavaScript code.

If you used the [CLI method](/guide/installation#cli) to install Minze you can extend your environment with linting quite quickly.

> The following guide is based on a fresh Minze CLI installation.

## JavaScript

1. Install dependencies.

::: code-group

```bash [npm]
$ npm add -D eslint
```

```bash [yarn]
$ yarn add -D eslint
```

```bash [pnpm]
$ pnpm add -D eslint
```

```bash [bun]
$ bun add -D eslint
```

:::

2. Add lint script to `package.json`.

::: code-group

```json [package.json]
{
  "scripts": {
    // ...
    "lint": "eslint --fix --cache {src,.storybook}/**/*.js"
  }
}
```

:::

2. Create and populate `.eslintignore` and `.eslintrc.json` files.

::: code-group

```txt [files]
├─ src/
├─ ...
├─ .eslintignore // [!code ++]
└─ .eslintrc.json // [!code ++]
```

```[.eslintignore]
dist
storybook
!.storybook
```

```json [.eslintrc.json]
{
  "$schema": "https://json.schemastore.org/eslintrc",
  "extends": ["eslint:recommended"],
  "env": {
    "node": true,
    "browser": true
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 2022
  }
}
```

:::

3. Lint your code.

::: code-group

```bash [npm]
$ npm run lint
```

```bash [yarn]
$ yarn run lint
```

```bash [pnpm]
$ pnpm run lint
```

```bash [bun]
$ bun run lint
```

:::

::: tip
For more details about ESLint refer to the [ESLint docs](https://eslint.org).
:::

## TypeScript

1. Install dependencies.

::: code-group

```bash [npm]
$ npm add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

```bash [yarn]
$ yarn add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

```bash [pnpm]
$ pnpm add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

```bash [bun]
$ bun add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

:::

2. Add lint script to `package.json`.

::: code-group

```json [package.json]
{
  "scripts": {
    // ...
    "lint": "eslint --fix --cache {src,.storybook}/**/*.{ts,js}"
  }
}
```

:::

2. Create and populate `.eslintignore` and `.eslintrc.json` files.

::: code-group

```txt [files]
├─ src/
├─ ...
├─ .eslintignore // [!code ++]
└─ .eslintrc.json // [!code ++]
```

```[.eslintignore]
dist
storybook
!.storybook
```

```json [.eslintrc.json]
{
  "$schema": "https://json.schemastore.org/eslintrc",
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unsafe-declaration-merging": "off"
  }
}
```

:::

3. Lint your code.

::: code-group

```bash [npm]
$ npm run lint
```

```bash [yarn]
$ yarn run lint
```

```bash [pnpm]
$ pnpm run lint
```

```bash [bun]
$ bun run lint
```

:::

::: tip
For more details about ESLint refer to the [ESLint docs](https://eslint.org).
:::

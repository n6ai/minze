# Prettier

[Prettier](https://prettier.io) is an opinionated code formatter.

If you used the [CLI method](/guide/installation#cli) to install Minze you can extend your environment with auto-code formatting quite quickly.

> The following guide is based on a fresh Minze CLI installation.

1. Install dependencies.

::: code-group

```bash [npm]
$ npm add -D prettier
```

```bash [yarn]
$ yarn add -D prettier
```

```bash [pnpm]
$ pnpm add -D prettier
```

```bash [bun]
$ bun add -D prettier
```

:::

2. Add format script to `package.json`.

::: code-group

```json [package.json]
{
  "scripts": {
    // ...
    "format": "prettier --write --cache ."
  }
}
```

:::

2. Create and populate `.prettierignore` and `.prettierrc.json` files.

::: code-group

```txt [files]
├─ src/
├─ ...
├─ .prettierignore // [!code ++]
└─ .prettierrc.json // [!code ++]
```

```[.prettierignore]
dist
package-lock.json
.*cache
cache
*.d.ts
*.mdx
*.dev.html
storybook
```

```json [.prettierrc.json]
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "singleQuote": true,
  "semi": false,
  "trailingComma": "none"
}
```

:::

3. Format your code.

::: code-group

```bash [npm]
$ npm run format
```

```bash [yarn]
$ yarn run format
```

```bash [pnpm]
$ pnpm run format
```

```bash [bun]
$ bun run format
```

:::

::: tip
For more details about Prettier refer to the [Prettier docs](https://prettier.io).
:::

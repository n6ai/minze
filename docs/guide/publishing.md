# Publishing

If you set up an environment via the `create-minze` CLI, you can publish your components to npm in two simple steps.

**1. Build**

> This command creates a dist directory with an `es` build, a `CDN` build and Type Declarations (If you selected the TypeScript template).

```bash
# npm
$ npm run build

# yarn
$ yarn build

# pnpm
$ pnpm run build
```

**2. Publish**

```bash
$ npm publish
```

::: tip
This is a default npm command refer to the npm [docs](https://docs.npmjs.com/cli/v8/commands/npm-publish) for more information.
:::

# Create Minze

## Scaffolding a Minze dev environment

> Minze requires [Node.js](https://nodejs.dev/) version >= `16.0.0`

**npm**

```bash
npm create minze@latest
```

**yarn**

```bash
yarn create minze
```

**pnpm**

```bash
pnpm create minze
```

Then follow the prompts!

### Command Line Options

You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold a Vite environment, run:

```bash
# npm
npm create minze@latest my-project -- --template vite

# yarn
yarn create minze my-project --template vite

# pnpm
pnpm create minze my-project -- --template vite
```

Currently supported template presets include:

- `vite`
- `vite-ts`
- `storybook`
- `storybook-ts`

You can use `.` for the project name to scaffold in the current directory.

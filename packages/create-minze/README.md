# Create Minze

## Scaffolding a Minze Dev and Publishing environment

> Minze requires [Node.js](https://nodejs.dev/) version >= `16.0.0`

**npm**

```bash
$ npm init minze@latest
```

**yarn**

```bash
$ yarn create minze
```

**pnpm**

```bash
$ pnpm create minze
```

Then follow the prompts!

### Templates

There are currently the following templates available:

- JavaScript - `js`
- TypeScript - `ts`

> The shorthand can be used in command line options, e.g. `--template ts`

### Command line options

You can directly specify the project name and template via additional command line options. For example, to scaffold a TypeScript environment, run:

```bash
# npm
$ npm init minze@latest my-project -- --template ts

# yarn
$ yarn create minze my-project --template ts

# pnpm
$ pnpm create minze my-project -- --template ts
```

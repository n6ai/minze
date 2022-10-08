# Minze Contributing Guide

Welcome to the Contributing Guide! Glad you decided to contribute to Minze. Before submitting your contribution, please read the following guide:

## Structure

This repo is a so-called `monorepo` it contains multiple packages, that are published separately.

When first starting out, you will likely be focused on the following directories:

```
minze-monorepo/            📁 root directory
├── docs/                  📁 documentation
│   └── ...
├── packages/              📁 all packages
│   ├── create-minze/      📁 create-minze
│   ├── minze-elements/    📁 minze-elements
│   ├── minze/             📁 minze
│   ├── playground/        📁 playground (private)
│   └── tests/             📁 tests (private)
└── ...
```

## Quick Start

> This repo uses `npm workspaces`. In order to use npm workspaces you have to use [Node.js](https://nodejs.dev/) >= 16.0.0

1. Clone this repo.
2. Run `npm i` in the root directory.

### Minze and Playground

1. Run `npm run dev` in the root directory.
2. Open the browser and navigate to [http://localhost:5173](http://localhost:5173).

The `dev` task will start rollup in watch mode for the `minze` package and start a vite server for the `playground` package. The minze dependency for playground is linked to the local version of minze. Any changes to the minze package can be immediately tried out and previewed in the playground.

### Minze Elements and Playground

1. Run `npm run build -w minze` in the root directory.
2. Run `npm run dev-el` in the root directory.
3. Open the browser and navigate to [http://localhost:5173](http://localhost:5173).

First, you need to build the minze package. Then start the dev task for Minze Elements and Playground.
The `dev` task will start rollup in watch mode for the `@minzejs/elements` package and start a vite server for the `playground` package. You can import anything from the locally linked `@minzejs/elements` package into the playground and try things out.

### Docs

1. Run `npm run docs` in the root directory.
2. Open the browser and navigate to [http://localhost:5173](http://localhost:5173).

Vitepress will start a server in dev mode for the documentation.

### Tests

1. Run `npm run build` in the root directory.
2. Run `npm test` in the root directory.

All `minze` core tests are located in [tests](https://github.com/n6ai/minze/tree/main/packages/tests).

## External Dependencies

Minze aims to be extremely lightweight and as such the core and elements packages don't include any external dependencies in the published build. Unless not otherwise possible, all fixes and features should be implemented without external dependencies.

## Pull Request Guidelines

- Checkout a topic branch from a base branch, e.g. `main`, and merge back against that branch.

- If adding a new feature:

  - Add accompanying test case in [tests](https://github.com/n6ai/minze/tree/main/packages/tests) if the feature is added to the `minze` package.
  - Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first and have it approved before working on it.

- If fixing bug:

  - If you are resolving a special issue, add `(fix #xxxx[,#xxxx])` (#xxxx is the issue id) in your PR title for a better release log, e.g. `fix: update entities encoding/decoding (fix #3899)`.
  - Provide a detailed description of the bug in the PR.
  - Add appropriate tests if applicable.

- It's OK to have multiple small commits as you work on the PR - GitHub can automatically squash them before merging.

- Make sure tests pass!

- Commit messages must follow the [commit message convention](./COMMIT_CONVENTION.md) so that changelogs can be automatically generated. Commit messages are automatically validated before committing (by invoking [Git Hooks](https://git-scm.com/docs/githooks) via [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks).

- No need to worry about code style as long as you installed the dev dependencies - modified files are automatically formatted with Prettier on commit (by invoking [Git Hooks](https://git-scm.com/docs/githooks) via [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks).

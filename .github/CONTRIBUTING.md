# Minze Contributing Guide

Hi! We're really excited that you're interested in contributing to Minze! Before submitting your contribution, please read through the following guide.

## Remote

You can use [StackBlitz Codeflow](https://stackblitz.com/codeflow) to fix bugs or implement features. When using Codeflow, the Minze repository will be cloned for you in an online editor, with the Minze package built in watch mode ready to test your changes. If you'd like to learn more, check out the [Codeflow docs](https://developer.stackblitz.com/codeflow/what-is-codeflow).

[![Open in Codeflow](https://developer.stackblitz.com/img/open_in_codeflow.svg)](https://pr.new/n6ai/minze)

## Local

To develop locally, fork the Minze repository and clone it to your local machine, then run `npm i` in the root directory to install all dependencies.

### minze

1. Run `npm run dev` in the root directory.
2. Open the browser and navigate to [http://localhost:5173](http://localhost:5173).

The `dev` task will start rollup in watch mode for the `minze` package and start a vite server for the `playground` package. The minze dependency for playground is linked to the local version of minze. Any changes to the minze package can be immediately tried out and previewed in the playground.

### create-minze

1. Run `npm run dev -w create-minze` in the root directory.
2. Run `npm create minze` in the root directory.

The `dev` task will start TypeScript in watch mode for the `create-minze` package.

### @minzejs/elements

1. Run `npm run build -w minze` in the root directory.
2. Run `npm run dev -w @minzejs/elements` in the root directory.
3. Open the browser and navigate to [http://localhost:5173](http://localhost:5173).

First, you need to build the minze package. Then start the dev task for Minze Elements.
The `dev` task will start start a vite server for the `@minzejs/elements` package.

### @minzejs/vite-plugin-minze

1. Run `npm run dev -w @minzejs/vite-plugin-minze` in the root directory.
2. Run `npm run dev -w playground` or `npm run build -w playground` in the root directory.

First, you need to start the dev task for vite-plugin-minze. The `@minzejs/vite-plugin-minze` dependency for playground is linked to the local version of `@minzejs/vite-plugin-minze`. Any changes to the `@minzejs/vite-plugin-minze` package can be immediately tried out and previewed in the playground.

### docs

1. Run `npm run docs` in the root directory.
2. Open the browser and navigate to [http://localhost:5173](http://localhost:5173).

Vitepress will start a server in dev mode for the documentation.

### tests

1. Run `npm run build -w minze` in the root directory.
2. Run `npm test` in the root directory.

All `minze` core package tests are located in [tests](https://github.com/n6ai/minze/tree/main/packages/tests).

## External Dependencies

Minze aims to be extremely lightweight and as such the core `minze` and `@minzejs/elements` packages don't include any external dependencies in the published build. Unless not otherwise possible, all fixes and features should be implemented without external dependencies these two packages.

## Pull Request Guidelines

- Checkout a topic branch from a base branch, e.g. `main`, and merge back against that branch.

- If adding a new feature:

  - Add accompanying test case.
  - Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first, and have it approved before working on it.

- If fixing bug:

  - If you are resolving a special issue, add `(fix #xxxx[,#xxxx])` (#xxxx is the issue id) in your PR title for a better release log, e.g. `fix: update entities encoding/decoding (fix #3899)`.
  - Provide a detailed description of the bug in the PR. Live demo preferred.
  - Add appropriate test coverage if applicable.

- It's OK to have multiple small commits as you work on the PR. GitHub can automatically squash them before merging.

- Make sure tests pass!

- No need to worry about code style as long as you have installed the dev dependencies. modified files are automatically formatted with Prettier on commit (by invoking [Git Hooks](https://git-scm.com/docs/githooks) via [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks).

- PR title must follow the [commit message convention](./COMMIT_CONVENTION.md) so that changelogs can be automatically generated.

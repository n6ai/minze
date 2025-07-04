# Minze Contributing Guide

Hi! We're really excited that you're interested in contributing to Minze! Before submitting your contribution, please read through the following guide.

## Setup

### Remote

You can use [StackBlitz Codeflow](https://stackblitz.com/codeflow) to fix bugs or implement features. When using Codeflow, the Minze repository will be cloned for you in an online editor, with the Minze package built in watch mode ready to test your changes. If you'd like to learn more, check out the [Codeflow docs](https://developer.stackblitz.com/codeflow/what-is-codeflow).

[![Open in Codeflow](https://developer.stackblitz.com/img/open_in_codeflow.svg)](https://pr.new/sergejcodes/minze)

### Local

To develop locally, fork the Minze repository and clone it to your local machine, then run `npm i` in the root directory to install all dependencies.

## Workflows

### [create-minze](../packages/create-minze)

1. Run `npm run dev -w create-minze` in the root directory.
2. Run `npm create minze` in the root directory.

> The `dev` task will start TypeScript in watch mode for the `create-minze` package.

### [minze](../packages/minze)

1. Run `npm run dev` in the root directory.
2. Open the browser and navigate to [http://localhost:5173](http://localhost:5173).

> The playground and all tests are inside the `test` directory.

### [minze-vsc](../packages/minze-vsc)

1. Click on `Run and Debug` in the VS Code sidebar.
2. Click on `Start Debugging` with the `Extension` option selected.

### [vite-plugin-minze](../packages/vite-plugin-minze)

1. Run `npm run stub -w vite-plugin-minze` in the root directory.
2. Run `npm run build-test -w minze` to test if the plugin works correctly.

> First, you need to stub vite-plugin-minze. The vite-plugin-minze dependency for the minze package is linked to the local version of vite-plugin-minze. Any changes to the vite-plugin-minze package can be immediately tried out.

### [docs](../docs)

1. Run `npm run docs` in the root directory.
2. Open the browser and navigate to [http://localhost:5173](http://localhost:5173).

> Vitepress will start a server in dev mode for the documentation.

## Testing

### All

```bash
npm test
```

### Workspace

```bash
npm test -w minze
```

### Filtering

```bash
npm run test-vi -w minze -- events
npm run test-pw -w minze -- events
```

**Read more about filtering for specific tests:**

- [Vitest](https://vitest.dev/guide/filtering)
- [Playwright](https://playwright.dev/docs/running-tests)

## External Dependencies

Minze aims to be extremely lightweight and as such the core `minze` package doesn't include any external dependencies in the published build. Unless not otherwise possible, all fixes and features should be implemented without external dependencies these two packages.

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

- No need to worry about code style as long as you have installed the dev dependencies. modified files are automatically formatted with Prettier on commit (by invoking [Git Hooks](https://git-scm.com/docs/githooks) via [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks)).

- PR title must follow the [commit message convention](./COMMIT_CONVENTION.md) so that changelogs can be automatically generated.

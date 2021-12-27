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
│   ├── minze-elements/    📁 @minze/elements
│   └── minze/             📁 minze core
└── ...
```

## Quick Start

> This repo uses `npm workspaces`. In order to use npm workspaces you have to use [Node.js](https://nodejs.dev/) >= 14.0.0

1. Clone this repo.
2. Run `npm i` in the root directory.

### minze core and @minze/elements

1. Run `npm run dev` in the root directory.
2. Open the browser and navigate to [`http://localhost:3000`](http://localhost:3000).

The `dev` task will start `rollup` in watch mode for the `minze` core package and start a `vite` server for the `@minze/elements` package. During development, the `minze` dependency for `@minze/elements` is linked to the local version of `minze`. Any changes to the `minze` core package can be immediately tried out and previewed in `@minze/elements`.

### Docs

1. Run `npm run docs` in the root directory.
2. Open the browser and navigate to [`http://localhost:3000`](http://localhost:3000).

Vitepress will start a server in dev mode for the documentation.

## External Dependencies

Minze aims to be extremely lightweight and as such the core and elements packages don't include any external dependencies in the published build. Unless not otherwise possible, all fixes and features should be implemented without external dependencies.

## Pull Request Guidelines

...

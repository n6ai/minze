# Minze Elements

Features multiple native web components created with Minze.

To scaffold a similar environment follow this [guide](https://github.com/n6ai/minze/blob/main/packages/create-minze/README.md).

## Installation

Install `minze` and `@minzejs/elements`:

**npm**

```bash
$ npm install minze @minzejs/elements
```

**yarn**

```bash
$ yarn add minze @minzejs/elements
```

**pnpm**

```bash
$ pnpm add minze @minzejs/elements
```

## Usage

```js
import Minze from 'minze'
import { MinzeComponent } from '@minzejs/elements'

Minze.defineAll([
  MinzeComponent,
  ...
])
```

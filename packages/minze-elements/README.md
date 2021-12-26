# Minze Elements

Features multiple native web components created with Minze.

To scaffold a similar environment follow this [guide](https://github.com/n6ai/minze/blob/main/packages/create-minze/README.md).

## Installation

Install `minze` and `@minze/elements`:

**npm**

```bash
$ npm install minze @minze/elements
```

**yarn**

```bash
$ yarn add minze @minze/elements
```

**pnpm**

```bash
$ pnpm add minze @minze/elements
```

## Usage

```js
import Minze from 'minze'
import { MinzeComponent } from '@minze/elements'

Minze.defineAll([
  MinzeComponent,
  ...
])
```

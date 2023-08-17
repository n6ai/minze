# vite-plugin-minze

Vite plugin for Minze dev environment.

## Usage

```bash
npm add -D vite-plugin-minze
```

```js
// vite.config.js
import { defineConfig } from 'vite'
import minze from 'vite-plugin-minze'

export default defineConfig({
  plugins: [
    minze({
      entry: 'src/main.js' // default path is 'src/main.js' or 'src/main.ts' for TypeScript projects.
    })
  ]
})
```

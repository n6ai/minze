# @minzejs/vite-plugin-minze

Vite plugin for Minze dev environment.

## Usage

```bash
npm install -D @minzejs/vite-plugin-minze
```

```js
// vite.config.js
import { defineConfig } from 'vite'
import minze from '@minzejs/vite-plugin-minze'

export default defineConfig({
  plugins: [
    minze({
      entry: 'src/main.js' // default path is 'src/main.js' or 'src/main.ts' for TypeScript projects.
    })
  ]
})
```

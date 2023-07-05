import App from './App.svelte'

import { modules, defineAll } from './main'
defineAll(modules)

let app: App | null = null
const target = document.getElementById('app')
if (target) app = new App({ target })

export default app

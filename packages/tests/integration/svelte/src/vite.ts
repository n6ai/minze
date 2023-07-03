import Minze from 'minze'
import * as Elements from './module'
import App from './App.svelte'

Minze.defineAll(Elements)

let app: App | null = null
const target = document.getElementById('app')
if (target) app = new App({ target })

export default app

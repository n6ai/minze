import Minze from 'minze'
import * as Elements from './module'
import App from './App.svelte'

Minze.defineAll(Elements)

const app = new App({
  target: document.getElementById('app')!
})

export default app

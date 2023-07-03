import './assets/vite.css'
import template from './template.html?raw'
import { modules, defineAll } from './module'
defineAll(modules)

const app = document.querySelector('#app') || null
if (app) app.innerHTML = template

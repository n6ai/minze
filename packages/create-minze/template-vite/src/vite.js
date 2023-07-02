import './assets/vite.css'
import { modules, defineAll } from './module'
import template from './template'
defineAll(modules)

const app = document.querySelector('#app') || null
if (app) app.innerHTML = template
import './assets/vite.css'
import preview from './preview.html?raw'
import { modules, defineAll } from './main'
defineAll(modules)

const app = document.querySelector('#app') || null
if (app) app.innerHTML = preview

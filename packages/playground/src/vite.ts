import './assets/vite.css'
import preview from './preview.html?raw'
import { modules, defineAll } from './module'
defineAll(modules)

const app = document.querySelector<HTMLDivElement>('#app') ?? null
if (app) app.innerHTML = preview

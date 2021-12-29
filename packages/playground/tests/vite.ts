import './assets/vite.css'
import { template } from './module'

const app = document.querySelector<HTMLDivElement>('#app') ?? null
if (app) app.innerHTML = template

import './assets/vite.css'
import Minze from 'minze'
import * as Elements from './module'
import template from './template'

Minze.defineAll(Elements)

const app = document.querySelector<HTMLDivElement>('#app') ?? null
if (app) app.innerHTML = template

import './assets/vite.css'
import Minze from 'minze'
import * as MinzeElements from './module'
import template from './template'

Minze.defineAll(Object.values(MinzeElements))

const app = document.querySelector<HTMLDivElement>('#app') ?? null
if (app) app.innerHTML = template

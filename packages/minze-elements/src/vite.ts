import './assets/vite.css'

import Minze from 'minze'
import { MinzeComponent } from './module'

Minze.defineAll([MinzeComponent])

const app = document.querySelector<HTMLDivElement>('#app') ?? null

if (app) {
  app.innerHTML = `
    <div class="minze-wrap">
      <minze-component></minze-component>
    </div>
  `
}

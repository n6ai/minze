import './assets/vite.css'

import Minze from 'minze'
import { MinzeButton, MinzeCounter, MinzeLogo } from './module'

Minze.defineAll([MinzeButton, MinzeCounter, MinzeLogo])

const app = document.querySelector('#app') || null

if (app) {
  app.innerHTML = `
    <div class="minze-wrap">
      <minze-logo text="Hello Minze!"></minze-logo>

      <minze-counter>
        <span slot="counter">Count is:</span>
        <minze-button slot="button">Click Me</minze-button>
      </minze-counter>
    </div>
  `
}

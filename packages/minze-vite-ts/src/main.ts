import './main.css'

/**
 * Import and register all Minze components
 * with Minze's define method
 */
import Minze from 'minze'
import { MinzeLogo, MinzeCounter, MinzeButton } from './components'

Minze.define('minze-logo', MinzeLogo)
Minze.define('minze-counter', MinzeCounter)
Minze.define('minze-button', MinzeButton)

/**
 * Get the #app element
 * and render the provided string template
 */
const app = document.querySelector<HTMLDivElement>('#app') ?? null

if (app) {
  app.innerHTML = `
    <div class="minze">
      <minze-logo></minze-logo>

      <p>
        Welcome to <strong>Minze</strong>!
      </p>

      <minze-counter>
        <span slot="amount">Amount:</span>
        <minze-button slot="button">Click Me!</minze-button>
      </minze-counter>
    </div>
  `
}

import './main.css'

/**
 * Here we are importing and registering
 * all Minze components
 */
import { MinzeButton, MinzeLogo } from './components'

customElements.define('minze-element', MinzeButton)
customElements.define('minze-logo', MinzeLogo)

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

      <!-- minze-button in action -->
      <minze-element>
        Click me!
      </minze-element>
    </div>
  `
}

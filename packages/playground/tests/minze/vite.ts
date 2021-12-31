import * as run from './run'
import * as templates from './templates'

Object.values(run).forEach((fn) => fn())

const app = document.querySelector<HTMLDivElement>('#app') ?? null

if (app) {
  Object.values(templates).forEach((template) => {
    app.innerHTML += template
  })
}

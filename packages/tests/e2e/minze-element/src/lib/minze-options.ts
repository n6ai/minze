import { MinzeElement } from 'minze'

export class MinzeOptions extends MinzeElement {
  options = {
    cssReset: true,
    exposeAttrs: {
      rendered: true
    }
  }

  html = () => `<h1>Headline</h1>`
}

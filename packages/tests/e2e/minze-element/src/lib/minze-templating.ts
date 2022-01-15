import { MinzeElement } from 'minze'

export class MinzeTemplating extends MinzeElement {
  html = () => `
    <slot></slot>
  `

  css = () => `
    :host {
      background: var(--color-primary, rgb(55 245 220));
    }
  `
}

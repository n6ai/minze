import { MinzeElement } from 'minze'

export interface MinzeLogo {
  text: string
}

export class MinzeLogo extends MinzeElement {
  static get observedAttributes() {
    return ['text']
  }

  props = ['text']

  html = () => `
    <div>
      <img src="logo.svg" width="200px" alt="Minze">
      ${this.text ? `<div class="text">${this.text}</div>` : ''}
    </div>
  `

  css = () => `
    .text {
      text-align: center;
      margin-top: 1rem;
    }
  `
}

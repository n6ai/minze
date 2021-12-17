import { MinzeElement, MinzeAttrs } from 'minze'

export interface MinzeLogo {
  text: { value: string }
}

export class MinzeLogo extends MinzeElement {
  static get observedAttributes() {
    return ['text']
  }

  attrs: MinzeAttrs = [['text']]

  html = () => `
    <div>
      <img src="logo.svg" width="200px" alt="Minze">
      ${this.text.value ? `<div class="text">${this.text.value}</div>` : ''}
    </div>
  `

  css = () => `
    .text {
      text-align: center;
      margin-top: 1rem;
    }
  `
}

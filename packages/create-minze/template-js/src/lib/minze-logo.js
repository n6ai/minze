import { MinzeElement } from 'minze'

export class MinzeLogo extends MinzeElement {
  static get observedAttributes() {
    return ['text']
  }

  attrs = [['text']]

  html = () => `
    <div>
      <img src="/icon.svg" width="200px" alt="Minze">
      ${this.text ? `<div class="text">${this.text}</div>` : ''}
    </div>
  `

  css = () => `
    .text {
      text-align: center;
      font-size: 1.25rem;
      font-weight: bold;
      margin-top: 1.75rem;
    }
  `
}

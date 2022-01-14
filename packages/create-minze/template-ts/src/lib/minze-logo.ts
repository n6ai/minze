import { MinzeElement, Attrs } from 'minze'

export interface MinzeLogo {
  text: string
}

export class MinzeLogo extends MinzeElement {
  attrs: Attrs = [['text']]

  static observedAttributes = ['text']

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

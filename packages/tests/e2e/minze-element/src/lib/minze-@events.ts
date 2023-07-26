import { MinzeElement } from 'minze'

export class MinzeAtEvents extends MinzeElement {
  text = 'not-clicked'

  changeText = () => (this.text = 'clicked')

  html = () => `
    <button @click="changeText">
      ${this.text}
    </button>
  `
}

import type { Reactive } from 'minze'
import { MinzeElement } from 'minze'

export interface MinzeAtEvents {
  text: string
}

export class MinzeAtEvents extends MinzeElement {
  reactive: Reactive = [['text', 'not-clicked']]

  click = () => (this.text = 'clicked')

  html = () => `
    <button @click>
      ${this.text}
    </button>
  `
}

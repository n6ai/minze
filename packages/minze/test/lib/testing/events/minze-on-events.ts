import type { Reactive } from 'minze'
import { MinzeElement } from 'minze'

export interface MinzeOnEvents {
  text: string
}

export class MinzeOnEvents extends MinzeElement {
  reactive: Reactive = [['text', 'not-clicked']]

  click = () => (this.text = 'clicked')

  html = () => `
    <button class="on" on:click>
      ${this.text}
    </button>

    <button class="at" @click>
      ${this.text}
    </button>
  `
}

import { MinzeElement, MinzeProps, MinzeEvents } from 'minze'

export interface MinzeReactive {
  count: number
}

export class MinzeReactive extends MinzeElement {
  reactive: MinzeProps = [['count', 0, true]]

  html = () => `
    <button>
      ${this.count}
    </button>
  `

  handleClick = () => {
    this.count++
  }

  eventListeners: MinzeEvents = [['button', 'click', this.handleClick]]
}

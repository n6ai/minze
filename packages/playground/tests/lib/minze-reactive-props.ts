import { MinzeElement, MinzeProps, MinzeEvents } from 'minze'

export interface MinzeReactiveProps {
  count: number
}

export class MinzeReactiveProps extends MinzeElement {
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

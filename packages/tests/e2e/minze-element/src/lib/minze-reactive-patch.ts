import { MinzeElement, Reactive, EventListeners } from 'minze'

export interface MinzeReactivePatch {
  value: number
}

export class MinzeReactivePatch extends MinzeElement {
  reactive: Reactive = [['value', 0]]

  html = () => `
    <input type="number" value="${this.value}" />
    <button>Change value</button>
  `

  handleKeyUp = (event: Event) => {
    this.value = parseInt((event.target as HTMLInputElement).value)
  }

  handleClick = () => {
    this.rerender()
  }

  eventListeners: EventListeners = [
    ['input', 'keyup', this.handleKeyUp],
    ['button', 'click', this.handleClick]
  ]
}

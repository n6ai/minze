import { MinzeElement, MinzeProps, MinzeEvents } from 'minze'

export interface MinzeReactivePatch {
  count: number
}

export class MinzeReactivePatch extends MinzeElement {
  reactive: MinzeProps = [['value', 0]]

  html = () => `
    <input type="number" value="${this.value}" />
    <button></button>
  `

  handleKeyUp = (event: Event) => {
    this.value = (event.target as HTMLInputElement).value
  }

  handleClick = () => {
    this.rerender(true)
  }

  eventListeners: MinzeEvents = [
    ['input', 'keyup', this.handleKeyUp],
    ['button', 'click', this.handleClick]
  ]
}

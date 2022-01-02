import { MinzeElement, MinzeEvents } from 'minze'

type clickDetail = string

export class MinzeEventListeners extends MinzeElement {
  text = ''

  html = () => `
    <button>
      ${this.text}
    </button>
  `

  handleClick = () => {
    this.cast('minze:click', 'clicked')
  }

  handleCast = (event: Event) => {
    this.text = (event as CustomEvent<clickDetail>).detail
    this.rerender()
  }

  eventListeners: MinzeEvents = [
    ['button', 'click', this.handleClick],
    [window, 'minze:click', this.handleCast]
  ]
}

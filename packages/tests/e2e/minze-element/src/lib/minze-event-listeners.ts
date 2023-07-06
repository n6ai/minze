import { MinzeElement, EventListeners } from 'minze'

type clickDetail = string

export class MinzeEventListeners extends MinzeElement {
  text = ''

  html = () => `
    <button>
      ${this.text}
    </button>
  `

  handleClick = () => {
    this.dispatch('minze:click', 'clicked')
  }

  handleDispatch = (event: Event) => {
    this.text = (event as CustomEvent<clickDetail>).detail
    this.rerender()
  }

  eventListeners: EventListeners = [
    ['button', 'click', this.handleClick],
    [window, 'minze:click', this.handleDispatch]
  ]
}

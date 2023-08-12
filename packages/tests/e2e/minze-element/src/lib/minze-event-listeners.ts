import { MinzeElement, EventListeners } from 'minze'

type clickDetail = string

export class MinzeEventListeners extends MinzeElement {
  textDispatch = 'not-clicked'
  textBroadcast = 'not-clicked'

  html = () => `
    <button class="dispatch">
      ${this.textDispatch}
    </button>

    <button class="broadcast">
      ${this.textBroadcast}
    </button>
  `

  handleClickDispatch = () => {
    this.dispatch('minze:click', 'clicked')
  }

  handleClickBroadcast = () => {
    new BroadcastChannel('$').postMessage('clicked')
  }

  handleDispatch(event: Event) {
    this.textDispatch = (event as CustomEvent<clickDetail>).detail
    this.rerender()
  }

  handleBroadcast(event: Event) {
    this.textBroadcast = (event as MessageEvent<clickDetail>).data
    this.rerender()
  }

  eventListeners: EventListeners = [
    ['button.dispatch', 'click', this.handleClickDispatch],
    ['button.broadcast', 'click', this.handleClickBroadcast],
    [window, 'minze:click', this.handleDispatch],
    [new BroadcastChannel('$'), 'message', this.handleBroadcast]
  ]
}

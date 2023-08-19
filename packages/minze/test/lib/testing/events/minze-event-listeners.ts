import type { EventListeners } from 'minze'
import { MinzeElement } from 'minze'

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

  handleDispatch(event: CustomEvent<string>) {
    this.textDispatch = event.detail
    this.rerender()
  }

  handleBroadcast(event: MessageEvent<string>) {
    this.textBroadcast = event.data
    this.rerender()
  }

  eventListeners: EventListeners = [
    ['.dispatch', 'click', this.handleClickDispatch],
    ['.broadcast', 'click', this.handleClickBroadcast],
    [window, 'minze:click', this.handleDispatch],
    [new BroadcastChannel('$'), 'message', this.handleBroadcast]
  ]
}

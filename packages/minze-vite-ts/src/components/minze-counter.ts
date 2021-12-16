import { MinzeElement, MinzeEvent } from 'minze'

export class MinzeCounter extends MinzeElement {
  data = {
    amount: 0
  }

  html() {
    return `
      <div>
        <div part="amount">
          <slot name="amount"></slot>
          ${this.data.amount}
        </div>

        <slot name="button" part="button"></slot>
      </div>
    `
  }

  css() {
    return `
      [part=amount] {
        text-align: center;
        margin-bottom: 1rem;
      }
    `
  }

  handleClick() {
    this.data.amount++
    this.cast('update', this.data)
  }

  handleCast(event: Event) {
    if (event.type === 'minze:update') this.render()
  }

  eventListeners: MinzeEvent[] = [
    ['[part=button]', 'click', this.handleClick.bind(this)],
    [this, 'minze:update', this.handleCast.bind(this)]
  ]
}

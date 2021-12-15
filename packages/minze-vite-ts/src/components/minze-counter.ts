import { MinzeElement, minzeEvent } from 'minze'

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
      [part="amount"] {
        text-align: center;
        margin-bottom: 1rem;
      }
    `
  }

  handleClick() {
    this.data.amount++
    this.render()
  }

  events: minzeEvent[] = [['button', 'click', this.handleClick.bind(this)]]
}

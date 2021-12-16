import { MinzeElement, MinzeEvent } from 'minze'

export class MinzeCounter extends MinzeElement {
  data = {
    amount: 0
  }

  html = () => `
    <div>
      <div class="amount">
        <slot name="amount"></slot>
        ${this.data.amount}
      </div>

      <slot name="button" class="button"></slot>
    </div>
  `

  css = () => `
    .amount {
      text-align: center;
      margin-bottom: 1rem;
    }
  `

  handleClick = () => {
    this.data.amount++
    this.cast('minze:render')
  }

  eventListeners: MinzeEvent[] = [['.button', 'click', this.handleClick]]
}

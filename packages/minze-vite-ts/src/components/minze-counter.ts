import { MinzeElement, MinzeProps, MinzeEvents } from 'minze'

export interface MinzeCounter {
  amount: { value: number }
}

export class MinzeCounter extends MinzeElement {
  reactive: MinzeProps = [['amount', 0]]

  html = () => `
    <div>
      <div class="amount">
        <slot name="amount"></slot>
        ${this.amount.value}
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
    this.amount.value++
  }

  eventListeners: MinzeEvents = [['.button', 'click', this.handleClick]]
}

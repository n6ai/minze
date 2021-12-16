import { MinzeElement, MinzeEvent } from 'minze'

export class MinzeCounter extends MinzeElement {
  data = {
    amount: 0
  }

  html = () => `
    <div>
      <div part="amount">
        <slot name="amount"></slot>
        ${this.data.amount}
      </div>

      <slot name="button" part="button"></slot>
    </div>
  `

  css = () => `
    [part=amount] {
      text-align: center;
      margin-bottom: 1rem;
    }
  `

  handleClick = () => {
    this.data.amount++
    this.cast('minze:render')
  }

  eventListeners: MinzeEvent[] = [['[part=button]', 'click', this.handleClick]]
}

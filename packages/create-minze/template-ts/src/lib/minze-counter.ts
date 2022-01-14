import { MinzeElement, Reactive, EventListeners } from 'minze'

export interface MinzeCounter {
  counter: number
}

export class MinzeCounter extends MinzeElement {
  reactive: Reactive = [['counter', 0]]

  html = () => `
    <div>
      <div class="counter">
        <slot name="counter"></slot>
        ${this.counter}
      </div>

      <slot name="button" class="button"></slot>
    </div>
  `

  css = () => `
    .counter {
      text-align: center;
      margin-bottom: 1rem;
    }
  `

  onStart = async () => {
    const delay = 0
    await new Promise((resolve) => setTimeout(resolve, delay))
    console.log(`start: simulated response time: ${delay}`)
  }

  onReady = () => {
    console.log('ready')
  }

  handleClick = () => {
    this.counter++
  }

  eventListeners: EventListeners = [['.button', 'click', this.handleClick]]
}

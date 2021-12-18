import { MinzeElement, MinzeProps, MinzeEvents } from 'minze'

export interface MinzeCounter {
  counter: { value: number }
}

export class MinzeCounter extends MinzeElement {
  reactive: MinzeProps = [['counter', 0]]

  html = () => `
    <div>
      <div class="counter">
        <slot name="counter"></slot>
        ${this.counter.value}
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
    this.counter.value++
  }

  eventListeners: MinzeEvents = [['.button', 'click', this.handleClick]]
}

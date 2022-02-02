import { MinzeElement, Reactive, EventListeners } from 'minze'

export interface MinzeCounter {
  count: number
}

export class MinzeCounter extends MinzeElement {
  reactive: Reactive = [['count', 0]]

  increaseCount = () => this.count++

  html = () => `
    <minze-logo></minze-logo>

    <div class="text">
      Hello Minze!
    </div>

    <div class="count">
      <span>Count is:</span>
      ${this.count}
    </div>

    <minze-button class="button">
      Click Me
    </minze-button>
  `

  css = () => `
    :host {
      width: 100%;
      min-height: calc(100vh - 2rem);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1.5rem;
      padding: 40px;
    }

    .text {
      text-align: center;
      font-size: 1.25rem;
      font-weight: bold;
    }

    .count {
      text-align: center;
    }
  `

  eventListeners: EventListeners = [['.button', 'click', this.increaseCount]]
}

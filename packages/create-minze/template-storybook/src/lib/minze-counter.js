import { MinzeElement } from 'minze'

export class MinzeCounter extends MinzeElement {
  reactive = [['count', 0]]

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
      min-height: calc(100% - 2rem);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1.5rem;
      font-family: sans-serif;
      padding: 40px;
    }

    .text {
      text-align: center;
      font-size: 2rem;
      font-weight: bold;
    }

    .count {
      text-align: center;
    }
  `

  eventListeners = [['.button', 'click', this.increaseCount]]
}

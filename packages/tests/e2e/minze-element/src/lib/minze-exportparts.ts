import type { Reactive } from 'minze'
import { MinzeElement } from 'minze'

export interface MinzeExportparts {
  clicked: boolean
}

export class MinzeExportparts extends MinzeElement {
  options = { exposeAttrs: { exportparts: true } }

  reactive: Reactive = [['clicked', false]]

  click = () => (this.clicked = true)

  html = () => `
    <button
      @click="click"
      part="button button--primary"
      ${this.clicked ? 'exportparts="button,  another-part"' : ''}
    >
      Button
    </button>
  `
}

import { MinzeElement, MinzeAttrs } from 'minze'

export interface MinzeReactiveAttrs {
  count: string
}

export class MinzeReactiveAttrs extends MinzeElement {
  attrs: MinzeAttrs = [['count', 0]]

  static get observedAttributes() {
    return ['count']
  }

  html = () => `
    <div>
      ${this.count}
    </div>
  `
}

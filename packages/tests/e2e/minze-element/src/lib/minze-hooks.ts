import { MinzeElement, Attrs } from 'minze'

export class MinzeHooks extends MinzeElement {
  attrs: Attrs = [['hooks', 'test']]

  static observedAttributes = ['hooks']

  text = ''

  html = () => `
    <div>
      ${this.text}
    </div>
  `

  onStart() {
    this.text += 'onStart '
  }

  onReactive() {
    this.text += 'onReactive '
  }

  onReady() {
    this.text += 'onReady '
    this.rerender()
  }

  onDestroy() {
    this.text = 'onDestroy '
  }

  beforeRender() {
    this.text += 'beforeRender '
  }

  afterRender() {
    this.text += 'afterRender '
  }

  beforeAttributeChange() {
    this.text += 'beforeAttributeChange '
  }

  afterAttributeChange() {
    this.text += 'afterAttributeChange '
  }
}

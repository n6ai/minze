import { MinzeElement, MinzeAttrs } from 'minze'

export class MinzeHooks extends MinzeElement {
  attrs: MinzeAttrs = [['hooks', 'test']]

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

  onRender() {
    this.text += 'onRender '
  }

  beforeAttributeChange() {
    this.text += 'beforeAttributeChange '
  }

  onAttributeChange() {
    this.text += 'onAttributeChange '
  }
}

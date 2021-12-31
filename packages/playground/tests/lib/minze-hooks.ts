import { MinzeElement, MinzeAttrs } from 'minze'

export class MinzeHooks extends MinzeElement {
  attrs: MinzeAttrs = [['hooks', 'test']]

  static get observedAttributes() {
    return ['hooks']
  }

  text = ''

  html = () => `
    <div>
      ${this.text}
    </div>
  `

  onStart() {
    this.text += 'onStart '
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

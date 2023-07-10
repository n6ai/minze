import { MinzeElement } from 'minze'

export class MinzeSelectors extends MinzeElement {
  html = () => `
    <div class="div-1"></div>
    <div class="div-2"></div>
    <slot name="named-slot"></slot>
    <slot></slot>
  `

  onReady() {
    this.select('.div-2')?.classList.add('selected')
    this.selectAll('div')?.forEach((el) => el.classList.add('selected-all'))
    this.slotted('named-slot')?.[0].classList.add('slotted-named')
    this.slotted('default')?.[0].classList.add('slotted-default')
  }
}

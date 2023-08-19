import { MinzeElement } from 'minze'

export class MinzeSelectors extends MinzeElement {
  html = () => `
    <div class="div-1"></div>
    <div class="div-2"></div>
    <slot name="named-slot"></slot>
    <slot></slot>
  `

  onReady() {
    this.select('.div-1')?.classList.add('selected')
    this.selectAll('div')?.forEach((el) => el.classList.add('selected'))
    this.slotted('named-slot')?.[0].classList.add('named-slot')
    this.slotted('default')?.[0].classList.add('default-slot')
  }
}

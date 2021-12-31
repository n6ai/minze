import { MinzeElement } from 'minze'

export class MinzeSelectors extends MinzeElement {
  html = () => `
    <div class="div-1"></div>
    <div class="div-2"></div>
  `

  onReady() {
    this.select('.div-2').classList.add('selected')
    this.selectAll('div').forEach((el) => el.classList.add('selected-all'))
  }
}

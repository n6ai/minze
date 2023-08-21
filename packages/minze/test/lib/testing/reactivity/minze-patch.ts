import type { Reactive } from 'minze'
import { MinzeElement } from 'minze'

export interface MinzePatch {
  value: number
}

export class MinzePatch extends MinzeElement {
  reactive: Reactive = [['value', 0]]

  keyup = (event: KeyboardEvent) => {
    this.value = parseInt((event.target as HTMLInputElement).value)
  }

  click = () => {
    this.rerender()
  }

  html = () => `
    <input type="number" value="${this.value}" @keyup />
    <button on:click>Change value</button>
  `
}

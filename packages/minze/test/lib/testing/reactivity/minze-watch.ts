import type { Reactive, Watch } from 'minze'
import { MinzeElement } from 'minze'

export interface MinzeWatch {
  str: string
  arr: number[]
  obj: {
    nested: {
      prop: string
    }
  }
}

export class MinzeWatch extends MinzeElement {
  reactive: Reactive = [
    ['str', 'initial text'],
    ['arr', [1, 2, 3]],
    [
      'obj',
      {
        nested: {
          prop: 'initial value'
        }
      }
    ]
  ]

  watch: Watch = [
    [
      'str',
      (newValue, oldValue, key, target) => {
        const el = this.select<HTMLDivElement>('.str')
        if (el) el.innerHTML = `${newValue}, ${oldValue}, ${key}, ${target}`
      }
    ],
    [
      'arr',
      (newValue, oldValue, key, target) => {
        const el = this.select<HTMLDivElement>('.arr')
        if (el) el.innerHTML = `${newValue}, ${oldValue}, ${key}, ${target}`
      }
    ],
    [
      'obj',
      (newValue, oldValue, key, target) => {
        const el = this.select<HTMLDivElement>('.obj')
        if (el) el.innerHTML = `${newValue}, ${oldValue}, ${key}, ${target}`
      }
    ]
  ]

  click = () => {
    this.str = 'changed text'
    this.arr.push(4)
    this.obj.nested.prop = 'changed value'
  }

  html = () => `
    <div class="str"></div>
    <div class="arr"></div>
    <div class="obj"></div>
    <button on:click>Change values</button>
  `
}

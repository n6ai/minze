import { MinzeElement, MinzeProps, MinzeWatchers, MinzeEvents } from 'minze'

export interface MinzeReactiveWatchers {
  str: string
  arr: number[]
  obj: {
    nested: {
      prop: string
    }
  }
}

export class MinzeReactiveWatchers extends MinzeElement {
  reactive: MinzeProps = [
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

  watch: MinzeWatchers = [
    [
      'str',
      (newValue, oldValue) => {
        const el = this.select<HTMLDivElement>('.str')
        if (el) el.innerHTML = `${newValue}, ${oldValue}`
      }
    ],
    [
      'arr',
      (newValue, oldValue) => {
        const el = this.select<HTMLDivElement>('.arr')
        if (el) el.innerHTML = `${newValue}, ${oldValue}`
      }
    ],
    [
      'obj',
      (newValue, oldValue) => {
        console.log('working!!!')
        const el = this.select<HTMLDivElement>('.obj')
        if (el) el.innerHTML = `${newValue}, ${oldValue}`
      }
    ]
  ]

  html = () => `
    <div class="str"></div>
    <div class="arr"></div>
    <div class="obj"></div>
    <button></button>
  `

  handleClick = () => {
    this.str = 'changed text'
    this.arr.push(4)
    // console.log(this.obj.nested.prop)
    this.obj.nested.prop = 'changed value'
  }

  eventListeners: MinzeEvents = [['button', 'click', this.handleClick]]
}

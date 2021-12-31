import { MinzeElement, MinzeProps, MinzeEvents } from 'minze'

export interface MinzeReactiveProps {
  count: number
  complex: {
    deep: {
      nested: {
        value: string
      }
    }
  }
}

export class MinzeReactiveProps extends MinzeElement {
  reactive: MinzeProps = [
    ['count', 0, true],
    [
      'complex',
      {
        deep: {
          nested: {
            value: 'nested'
          }
        }
      }
    ]
  ]

  html = () => `
    <button>
      ${this.count}
    </button>

    <div>
      ${this.complex.deep.nested.value}
    </div>
  `

  handleClick = () => {
    this.count++
    this.complex.deep.nested.value = 'changed'
  }

  eventListeners: MinzeEvents = [['button', 'click', this.handleClick]]
}

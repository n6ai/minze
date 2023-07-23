import { MinzeElement, Attrs } from 'minze'

export interface MinzeReactiveAttrs {
  count: string
  shorthand: null
  empty: null
  undefined: undefined
  null: null
  boolean: boolean
  object: Record<string, unknown>
}

export class MinzeReactiveAttrs extends MinzeElement {
  attrs: Attrs = [
    ['count', 0],
    'shorthand',
    ['empty'],
    ['undefined', undefined],
    ['null', null],
    ['boolean', false],
    ['object', {}]
  ]

  static observedAttributes = ['count']

  html = () => `
    <div class="count">
      ${this.count}
    </div>

    <div class="shorthand">
      ${typeof this.shorthand}
    </div>

    <div class="empty">
      ${typeof this.empty}
    </div>

    <div class="undefined">
      ${typeof this.undefined}
    </div>

    <div class="null">
      ${typeof this.null}
    </div>

    <div class="boolean">
      ${typeof this.boolean}
    </div>

    <div class="object">
      ${typeof this.object}
    </div>
  `
}

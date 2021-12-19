import { Minze } from './lib/minze'
import { MinzeElement } from './lib/minze-element'

interface MinzeWindow extends Window {
  Minze: typeof Minze
  MinzeElement: typeof MinzeElement
}

declare const window: MinzeWindow

window.Minze = Minze
window.MinzeElement = MinzeElement

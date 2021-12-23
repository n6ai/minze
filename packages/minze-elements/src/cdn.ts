import { MinzeElement } from 'minze'
import { MinzeComponent } from './module'

interface MinzeWindow extends Window {
  minzeElements: Record<string, typeof MinzeElement>
}

declare const window: MinzeWindow

window.minzeElements = {
  MinzeComponent
}

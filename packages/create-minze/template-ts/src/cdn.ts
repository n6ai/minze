import { MinzeElement } from 'minze'
import { MinzeButton, MinzeCounter, MinzeLogo } from './module'

interface MinzeWindow extends Window {
  minzeElements: Record<string, typeof MinzeElement>
}

declare const window: MinzeWindow

window.minzeElements = {
  MinzeButton,
  MinzeCounter,
  MinzeLogo
}

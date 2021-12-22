import { MinzeElement } from 'minze'
import { MinzeButton, MinzeCounter, MinzeLogo } from './module'

interface MinzeWindow extends Window {
  MinzeElements: Record<string, typeof MinzeElement>
}

declare const window: MinzeWindow

window.MinzeElements = {
  MinzeButton,
  MinzeCounter,
  MinzeLogo
}

import Minze from 'minze'
import { appendToApp } from '../utils.js'

export function run() {
  const callback = (event: Event) => {
    appendToApp(`
      <div class="minze-events">
        ${(event as CustomEvent).detail}
      </div>
    `)

    Minze.stopListen('minze:events-test', callback)
  }

  Minze.listen('minze:events-test', callback)

  Minze.cast('minze:events-test', 'test')
  Minze.cast('minze:events-test', 'test') // check if stopListen works
}

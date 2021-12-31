import Minze from 'minze'

export function run() {
  const callback = (event: Event) => {
    document.querySelector('#app').innerHTML += `
      <div class="minze-events">
        ${(event as CustomEvent).detail}
      </div>
    `

    Minze.stopListen('minze:events-test', callback)
  }

  Minze.listen('minze:events-test', callback)

  Minze.cast('minze:events-test', 'test')
  Minze.cast('minze:events-test', 'test') // check if stopListen works
}

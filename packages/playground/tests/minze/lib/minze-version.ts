import Minze from 'minze'
import { appendToApp } from 'playground/tests/minze/utils'

export function run() {
  appendToApp(`
    <div class="minze-version">${Minze.version}</div>
  `)
}

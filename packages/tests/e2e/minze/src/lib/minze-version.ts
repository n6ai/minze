import Minze from 'minze'
import { appendToApp } from '@minze/utils.js'

export function run() {
  appendToApp(`
    <div class="minze-version">${Minze.version}</div>
  `)
}

import Minze from 'minze'
import { appendToApp } from '../utils.js'

export function run() {
  appendToApp(`
    <div class="minze-version">${Minze.version}</div>
  `)
}

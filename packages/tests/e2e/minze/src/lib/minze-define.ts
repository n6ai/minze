import Minze, { MinzeElement } from 'minze'
import { appendToApp } from '@tests/minze/utils'

class DefineElement extends MinzeElement {
  html = () => `<div>test</div>`
}

class MinzeDefineOne extends DefineElement {}
class MinzeDefineTwo extends DefineElement {}
class MinzeDefineThree extends DefineElement {}

export function run() {
  Minze.define('minze-define-one', MinzeDefineOne)
  Minze.defineAll([MinzeDefineTwo, MinzeDefineThree])

  appendToApp(`
    <minze-define-one></minze-define-one>
    <minze-define-two></minze-define-two>
    <minze-define-three></minze-define-three>
  `)
}

import { MinzeElement } from 'minze'

export class MinzeLogo extends MinzeElement {
  html() {
    return `
      <img src="logo.svg" width="200px" alt="Minze">
    `
  }
}

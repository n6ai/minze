/* eslint-disable */
// @ts-nocheck

class MyElement extends MinzeElement {
  text = 'Hello Minze!'
  value = 'rgb(200 200 200 / 50%)'
  literal = `<div>${this.text}</div>`

  html = () => `
    <div>
      <p>${this.text}</p>
    </div>
  `

  htmlTemplate = () => `
    <div>
      <p>${this.text}</p>
    </div>
  `

  html1 = /* html */ `<div>${this.text}</div>`
  html2 = /*html*/ `<div>${this.text}</div>`
  html3 = html`<div>${this.text}</div>`

  css = () => `
    :host {
      display: inline-block;
      background: ${this.value};
      padding: 1rem;
    }
  `

  cssTemplate = () => `
    :host {
      display: inline-block;
      background: ${this.value};
      padding: 1rem;
    }
  `

  css1 = /* css */ `:host { background: ${this.value}; }`
  css2 = /*css*/ `:host { background: ${this.value}; }`
  css3 = css`
    :host {
      background: ${this.value};
    }
  `
}

/* eslint-disable */
// @ts-nocheck

class MyElement extends MinzeElement {
  text = 'Hello Minze!'
  value = 'rgb(200 200 200 / 50%)'

  html = () => `
    <div>
      <p>${this.text}</p>
    </div>
  `

  htmlTemplateLiterals = /**/ `<div>${this.text}</div>`
  htmlSingleQuotes = /**/ '<div>${this.text}</div>'
  htmlDoubleQuotes = /**/ '<div>${this.text}</div>'

  css = () => `
    :host {
      display: inline-block;
      background: ${this.value};
      padding: 1rem;
    }
  `

  cssTemplateLiterals = /***/ `:host { background: ${this.value}; }`
  cssSingleQuotes = /***/ ':host { background: ${this.value}; }'
  cssDoubleQuotes = /***/ ':host { background: ${this.value}; }'
}

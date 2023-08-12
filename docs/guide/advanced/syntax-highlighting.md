# Syntax Highlighting

Once your HTML and CSS templates grow in size you might want to add some syntax highlighting.

## VS Code

### [Minze VS Code Extension](https://marketplace.visualstudio.com/items?itemName=n6ai.minze-vscode)

Minze VS Code extension adds auto-highlighting to class methods defined as arrow functions starting with `html` and `css` keyword. Additionally you can manually prefix any template literals with `/*html*/` to highlight HTML code inside them, or `/*css*/` to highlight CSS code.

```js
import { MinzeElement } from Minze

class MyElement extends MinzeElement {
  // auto
  html = () => `<div></div>`
  css = () => `:host {}`

  // auto
  htmlTemplate = () => `<div></div>`
  cssTemplate = () => `:host {}`

  // manual
  htmlCode = /*html*/ `<div></div>`
  cssCode = /*css*/ `:host {}`
}
```

### 3rd-Party Extensions

With the following extension you can also add syntax highlighting to template strings:

- [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html)
- [Comment tagged templates](https://marketplace.visualstudio.com/items?itemName=bierner.comment-tagged-templates)
- [Template Literals](https://marketplace.visualstudio.com/items?itemName=julienetie.vscode-template-literals)

```js
import { MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html () => /*html*/ `<div>Hello Minze!</div>`
  css () => /*css*/ `:host { display: flex; }`
}
```

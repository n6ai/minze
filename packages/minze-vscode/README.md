# Minze support for Visual Studio Code

> 🍃 Not sure what Minze is? Look it up at [minze.dev](https://minze.dev)!

Language support for Minze.

## Features

- HTML/CSS Syntax Highlighting
- Code Snippets

### Syntax Highlighting

The Minze VS Code extension comes bundled with snippets for auto-completion. It also adds auto-highlighting to class methods defined as arrow functions starting with `html` and `css` keyword. Additionally you can manually prefix any template literals with `/*html*/` to highlight HTML code inside them, or `/*css*/` to highlight CSS code.

**Example**

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

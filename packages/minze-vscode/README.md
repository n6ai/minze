# Minze support for Visual Studio Code

> 🍃 Not sure what Minze is? Look it up at [minze.dev](https://minze.dev)!

Language support for Minze.

## Features

- HTML/CSS Syntax Highlighting

### Syntax Highlighting

Minze VS Code extension adds auto-highlighting to `html` and `css` class properties/methods defined as arrow functions. Additionally you can manually prefix any template literals with `/*html*/` to highlight HTML code inside them, or `/*css*/` to highlight CSS code.

**Example**

```js
import { MinzeElement } from Minze

class MyElement extends MinzeElement {
  // auto
  html = () => `<div></div>`
  css = () => `:host {}`

  // manual
  htmlCode = /*html*/ `<div></div>`
  cssCode = /*css*/ `:host {}`
}
```

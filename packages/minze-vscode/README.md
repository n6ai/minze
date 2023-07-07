# Minze support for Visual Studio Code

> 🍃 Not sure what Minze is? Look it up at [minze.dev](https://minze.dev)!

Language support for Minze.

## Features

- HTML/CSS Syntax Highlighting

### Syntax Highlighting

Minze VS Code extension adds auto-highlighting to `html` and `css` class properties/methods defined as arrow functions. Additionally you can manually prefix any template literals or strings with `/**/` to highlight HTML code inside them, or `/***/` to highlight CSS code.

**Example**

```js
import { MinzeElement } from Minze

class MyElement extends MinzeElement {
  // auto
  html = () => `<div></div>`
  css = () => `:host {}`

  // manual: html
  htmlTemplateLiteral = /**/`<div></div>`
  htmlSingleQuotes = /**/'<div></div>'
  htmlDoubleQuotes = /**/"<div></div>"

  // manual: css
  cssTemplateLiteral = /***/`:host {}`
  cssSingleQuotes = /***/':host {}'
  cssDoubleQuotes = /***/":host {}"
}
```

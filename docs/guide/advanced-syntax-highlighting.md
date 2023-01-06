# Syntax Highlighting

Once your HTML and CSS templates grow in size you might want to add some syntax highlighting.

## VS Code

### Comment tagged templates

With the following extension you can add syntax highlighting to tagged template strings using language identifier comments:

- [Comment tagged templates](https://marketplace.visualstudio.com/items?itemName=bierner.comment-tagged-templates)

**Example**

```js
import { Minze, MinzeElement } from 'minze'

class MyElement extends MinzeElement {
  html () => /* html */ `
    <div>Hello Minze!</div>
  `

  css () => /* css */ `
    :host {
      display: flex;
    }
  `
}

Minze.defineAll([MyElement])
```

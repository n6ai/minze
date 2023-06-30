# Minze Elements

Native web components built with Minze.

## Usage

**Steps**

1. Import component(s) from the `@minzejs/elements` package.
2. Register the imported component(s).
3. Use the component(s).

**Example**

```bash
npm install minze @minzejs/elements
```

```js
import Minze from 'minze'
import { ElementName } from '@minzejs/elements'

Minze.defineAll([
  ElementName
  // ...
])
```

```html
<element-name></element-name>
```

## Elements

### MinzeElementSwitch

**Description**

Lets you switch between unique slotted elements from the browser window by displaying a toggle at the bottom of the screen. Useful during component development.

**Example**

```js
import Minze from 'minze'
import { MinzeElementSwitch } from '@minzejs/elements'

Minze.defineAll([MinzeElementSwitch])
```

```html
<minze-element-switch>
  <unique-element></unique-element>
  <unique-element-two></unique-element-two>
  <unique-element-three></unique-element-three>
  <!-- etc ... -->
</minze-element-switch>
```

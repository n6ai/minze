# @minzejs/elements

Helpers for native web component development.

## Usage

**Steps**

1. Import component(s) from the `@minzejs/elements` package.
2. Register the imported component(s).
3. Use the component(s).

**Example**

```bash
npm install @minzejs/elements
```

```js
import { modules, defineAll } from '@minzejs/elements'
defineAll(modules)
```

```html
<element-name></element-name>
```

## Elements

### MinzeElementSwitch

**Description**

Switch between unique slotted elements from the browser window, with a toggle displayed at the bottom of the screen.

**Example**

```js
import { MinzeElementSwitch } from '@minzejs/elements/dist/lib/minze-element-switch.js'

MinzeElementSwitch.define()
```

```html
<minze-element-switch>
  <unique-element></unique-element>
  <unique-element-two></unique-element-two>
  <unique-element-three></unique-element-three>
  <!-- etc ... -->
</minze-element-switch>
```

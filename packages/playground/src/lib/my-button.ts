import { MinzeElement } from 'minze'

export class MyButton extends MinzeElement {
  html = () => `
    <button>
      <slot></slot>
    </button>
  `

  css = () => `
    button {
      display: inline-block;
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      color: currentColor;
      background-color: rgb(249 249 249);
      cursor: pointer;
      user-select: none;
      position: relative;
      transition: border-color 0.25s;
    }

    button:hover {
      border-color: var(--color-primary, rgb(55 245 220));
    }

    button:active {
      outline: 3px solid var(--color-primary, rgb(55 245 220));
      outline-offset: -2px;
    }

    @media (prefers-color-scheme: dark) {
      button {
        color: currentColor;
        background-color: rgb(26 26 26);
      }
    }
  `
}

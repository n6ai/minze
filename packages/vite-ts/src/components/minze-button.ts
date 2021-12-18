import { MinzeElement } from 'minze'

export class MinzeButton extends MinzeElement {
  html = () => `
    <button class="button">
      <slot></slot>
    </button>
  `

  css = () => `
    .button {
      background-color: var(--color-primary, rgb(115 245 185));
      color: var(--color-primary-darker, rgb(50 75 65));
      font-size: 1rem;
      font-weight: 600;
      border: none;
      border-radius: 0.25rem;
      box-shadow: 0 10px 15px -3px var(--shadow-primary-50, rgb(115 245 185 / 50%)), 0 4px 6px -4px var(--shadow-primary-50, rgb(115 245 185 / 50%));
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: background-color 0.1s ease-in-out;
    }

    .button:hover {
      background-color: var(--color-primary-dark, rgb(90 225 165));
    }
  `
}

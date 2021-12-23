import { MinzeElement } from 'minze'

export class MinzeButton extends MinzeElement {
  html = () => `
    <button class="button">
      <slot></slot>
    </button>
  `

  css = () => `
    .button {
      background: linear-gradient(45deg, var(--color-primary, rgb(55 245 220)) 0%,  var(--color-secondary, rgb(50 255 160)) 100%);
      color: var(--color-dark, rgb(45 80 60));
      font-size: 1rem;
      font-weight: 600;
      border: none;
      border-radius: 0.25rem;
      box-shadow: 0 10px 15px -3px var(--shadow-primary-50, rgb(55 245 220 / 50%)), 0 4px 6px -4px var(--shadow-primary-50, rgb(55 245 220 / 50%));
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: filter 0.1s ease-in-out;
    }

    .button:hover {
      filter: hue-rotate(5deg) brightness(110%);
    }
  `
}

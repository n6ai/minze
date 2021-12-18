import { MinzeElement } from 'minze'

export class MinzeButton extends MinzeElement {
  html = () => `
    <button class="button">
      <slot></slot>
    </button>
  `

  css = () => `
    .button {
      background-color: #73f5b9;
      color: #324b41;
      font-size: 1rem;
      font-weight: 600;
      border: none;
      border-radius: 0.25rem;
      box-shadow: 0 10px 15px -3px rgb(115 245 185/0.5), 0 4px 6px -4px rgb(115 245 185/0.5);
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: background-color 0.1s ease-in-out;
    }

    .button:hover {
      background-color: #5be0a6;
    }
  `
}

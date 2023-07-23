import { MinzeElement } from 'minze'

export class MyElement extends MinzeElement {
  reactive = [['count', 0]]

  increaseCount = () => this.count++

  text = 'Click on the Minze and Vite logos to learn more'

  html = () => `
    <div>
      <a href="https://minze.dev" target="_blank">
        <minze-logo width="142" height="60" class="logo"></minze-logo>
      </a>

      <a href="https://vitejs.dev" target="_blank">
        <vite-logo width="100" height="100" class="logo vite"></vite-logo>
      </a>
    </div>

    <slot></slot>

    <div class="card">
      <my-button role="button" class="button">
        count is ${this.count}
      </my-button>
    </div>

    <p class="text">
      ${this.text}
    </p>
  `

  css = () => `
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
      font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
      color: rgb(33 53 71);
      background-color: rgb(255 255 255);
    }

    @media (prefers-color-scheme: dark) {
      :host {
        color: rgb(255 255 255 / 87%);
        background-color: rgb(36 36 36);
      }
    }

    a {
      text-decoration: none;
    }

    .logo {
      padding: 1.5em;
      will-change: filter;
      transition: filter 300ms;
    }

    .logo:hover {
      filter: drop-shadow(0 0 2em rgb(50 255 160 / 65%));
    }

    .logo.vite:hover {
      filter: drop-shadow(0 0 2em rgb(100 108 255 / 65%));
    }

    .card {
      padding: 2em;
    }

    .text {
      color: rgb(136 136 136);
      margin: 1rem 0;
    }

    ::slotted(h1) {
      font-size: 3.2em;
      line-height: 1.1;
      transition: rotate 750ms;
      ${this.count >= 5 ? 'rotate: 360deg;' : ''}
    }
  `

  eventListeners = [['.button', 'click', this.increaseCount]]
}

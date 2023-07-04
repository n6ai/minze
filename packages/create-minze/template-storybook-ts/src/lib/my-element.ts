import type { Reactive, EventListeners } from 'minze'
import { MinzeElement } from 'minze'

export interface MyElement {
  count: number
}

export class MyElement extends MinzeElement {
  reactive: Reactive = [['count', 0]]

  increaseCount = () => this.count++

  text = 'Click on the Minze and Storybook logos to learn more'

  html = () => `
    <div>
      <a href="https://minze.dev" target="_blank">
        <minze-logo width="142" height="60" class="logo"></minze-logo>
      </a>

      <a href="https://storybook.js.org" target="_blank">
        <storybook-logo width="68" height="80" class="logo storybook"></storybook-logo>
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

    .logo.storybook:hover {
      filter: drop-shadow(0 0 2em rgb(255 70 130 / 65%));
    }

    .card {
      padding: 2em;
    }

    .text {
      color: rgb(136 136 136);
    }

    ::slotted(h1) {
      font-size: 3.2em;
      line-height: 1.1;
      transition: rotate 750ms;
      ${this.count >= 5 ? 'rotate: 360deg;' : ''}
    }
  `

  eventListeners: EventListeners = [['.button', 'click', this.increaseCount]]
}

export class MinzeElement extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        ${this.css || this.css() !== '' ? `<style>${this.css()}</style>` : ''}
        ${this.html()}
      `
    }
  }

  html() {
    return '<slot></slot>'
  }

  css() {
    return ''
  }
}

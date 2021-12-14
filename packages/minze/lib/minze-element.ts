export class MinzeElement extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  /**
   * Run the render method whenever the element
   * is appended into a document-connected element
   */
  connectedCallback() {
    this.render()
  }

  /**
   * Render html and css inside the shadow dom
   */
  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        ${this.css || this.css() !== '' ? `<style>${this.css()}</style>` : ''}
        ${this.html()}
      `
    }
  }

  /**
   * HTML
   * Return regular HTML for the render method
   * as a string or template literal
   */
  html() {
    return '<slot></slot>'
  }

  /**
   * CSS
   * Return regular CSS for the render method
   * as a string or template literal
   */
  css() {
    return ''
  }
}

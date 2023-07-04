import { html } from 'lit'

export default {
  title: 'Components/Buttons/my-button',
  component: 'my-button',
  tags: ['autodocs'],
  render: ({ text }) => html`<my-button>${text}</my-button>`
}

export const Default = {
  args: {
    text: 'Hello Minze!'
  }
}

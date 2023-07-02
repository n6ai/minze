import { html } from 'lit'

export default {
  title: 'Components/Button',
  component: 'minze-button',
  tags: ['autodocs'],
  render: ({ text }) => html`<minze-button>${text}</minze-button>`
}

export const Default = {
  args: {
    text: 'Hello Minze!'
  }
}

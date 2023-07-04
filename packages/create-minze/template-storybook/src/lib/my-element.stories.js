import { html } from 'lit'

export default {
  title: 'Sections/my-element',
  component: 'my-element',
  tags: ['autodocs'],
  render: ({ text }) => html`<my-element><h1>${text}<h1></my-element>`
}

export const Default = {
  args: {
    text: 'Minze + Storybook'
  }
}

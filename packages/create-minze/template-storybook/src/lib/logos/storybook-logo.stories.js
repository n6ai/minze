import { html } from 'lit'

export default {
  title: 'Components/Logos/storybook-logo',
  component: 'storybook-logo',
  tags: ['autodocs'],
  render: ({ width, height }) =>
    html`<storybook-logo width="${width}" height="${height}"></storybook-logo>`
}

export const Default = {
  args: {
    width: 68,
    height: 80
  }
}

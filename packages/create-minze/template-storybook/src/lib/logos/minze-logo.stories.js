import { html } from 'lit'

export default {
  title: 'Components/Logos/minze-logo',
  component: 'minze-logo',
  tags: ['autodocs'],
  render: ({ width, height }) =>
    html`<minze-logo width="${width}" height="${height}"></minze-logo>`
}

export const Default = {
  args: {
    width: 146,
    height: 60
  }
}

import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'

const meta: Meta = {
  title: 'Components/Logos/minze-logo',
  component: 'minze-logo',
  tags: ['autodocs'],
  render: ({ width, height }) =>
    html`<minze-logo width="${width}" height="${height}"></minze-logo>`
}

export default meta

type Story = StoryObj

export const Default: Story = {
  args: {
    width: 146,
    height: 60
  }
}

import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'

const meta: Meta = {
  title: 'Components/Logos/storybook-logo',
  component: 'storybook-logo',
  tags: ['autodocs'],
  render: ({ width, height }) =>
    html`<storybook-logo width="${width}" height="${height}"></storybook-logo>`
}

export default meta

type Story = StoryObj

export const Default: Story = {
  args: {
    width: 68,
    height: 80
  }
}

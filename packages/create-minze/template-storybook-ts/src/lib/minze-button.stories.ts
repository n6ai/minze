import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'

const meta: Meta = {
  title: 'Components/Button',
  component: 'minze-button',
  tags: ['autodocs'],
  render: ({ text }) => html`<minze-button>${text}</minze-button>`
}

export default meta

type Story = StoryObj

export const Default: Story = {
  args: {
    text: 'Hello Minze!'
  }
}

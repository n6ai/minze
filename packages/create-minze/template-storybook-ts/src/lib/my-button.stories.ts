import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'

const meta: Meta = {
  title: 'Components/Buttons/my-button',
  component: 'my-button',
  tags: ['autodocs'],
  render: ({ text }) => html`<my-button>${text}</my-button>`
}

export default meta

type Story = StoryObj

export const Default: Story = {
  args: {
    text: 'Hello Minze!'
  }
}

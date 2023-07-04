import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'

const meta: Meta = {
  title: 'Sections/my-element',
  component: 'my-element',
  tags: ['autodocs'],
  render: ({ text }) => html`<my-element><h1>${text}<h1></my-element>`
}

export default meta

type Story = StoryObj

export const Default: Story = {
  args: {
    text: 'Minze + Storybook'
  }
}

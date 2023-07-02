import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'

const meta: Meta = {
  title: 'Pages/Counter',
  component: 'minze-counter',
  tags: ['autodocs'],
  render: () => html`<minze-counter></minze-counter>`
}

export default meta

type Story = StoryObj

export const Default: Story = {}

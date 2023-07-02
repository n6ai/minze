import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'

const meta: Meta = {
  title: 'Components/Logo',
  component: 'minze-logo',
  tags: ['autodocs'],
  render: () => html`<minze-logo></minze-logo>`
}

export default meta

type Story = StoryObj

export const Default: Story = {}

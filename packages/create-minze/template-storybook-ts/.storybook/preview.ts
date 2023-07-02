import type { Preview } from '@storybook/web-components'

import { modules, defineAll } from '../src/module'
defineAll(modules)

const preview: Preview = {
  parameters: {
    layout: 'centered'
  }
}

export default preview

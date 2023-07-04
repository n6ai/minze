import type { Preview } from '@storybook/web-components'
import './global.css'

import { modules, defineAll } from '../src/main'
defineAll(modules)

const preview: Preview = {
  parameters: {
    layout: 'centered'
  }
}

export default preview

import type { StorybookConfig } from '@storybook/web-components-vite'

const config: StorybookConfig = {
  framework: '@storybook/web-components-vite',
  stories: ['../src/lib/**/*.mdx', '../src/lib/**/*.stories.(ts|js)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: { builder: '@storybook/builder-vite' }
}

export default config

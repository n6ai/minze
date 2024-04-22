import type { StorybookConfig } from '@storybook/web-components-vite'

const config: StorybookConfig = {
  stories: ['../src/lib/**/*.mdx', '../src/lib/**/*.stories.@(ts|js)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook'
  ],
  framework: { name: '@storybook/web-components-vite', options: {} }
}

export default config

export default {
  framework: '@storybook/web-components-vite',
  stories: ['../src/lib/**/*.mdx', '../src/lib/**/*.stories.js'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: { builder: '@storybook/builder-vite' }
}

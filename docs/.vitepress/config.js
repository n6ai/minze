// @ts-check

/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  title: 'Minze',
  description: 'Dead-simple framework for sharable web components',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],
  themeConfig: {
    repo: 'n6ai/minze',
    logo: '/logo.svg',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Suggest changes to this page',

    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API Reference', link: '/api/' },
      {
        text: 'Links',
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/n6ai/minze/blob/main/packages/minze/CHANGELOG.md'
          }
        ]
      }
    ],

    sidebar: {
      '/api/': 'auto',
      // catch-all fallback
      '/': [
        {
          text: 'Basics',
          children: [
            {
              text: 'Installation',
              link: '/guide/installation'
            },
            {
              text: 'Quick Start',
              link: '/guide/'
            },
            {
              text: 'Introduction',
              link: '/guide/introduction'
            }
          ]
        },

        {
          text: 'Components',
          children: [
            {
              text: 'Data',
              link: '/guide/components-data'
            },
            {
              text: 'Methods',
              link: '/guide/components-methods'
            },
            {
              text: 'Templating',
              link: '/guide/components-templating'
            },
            {
              text: 'Styling',
              link: '/guide/components-styling'
            },
            {
              text: 'Selectors',
              link: '/guide/components-selectors'
            },
            {
              text: 'Events',
              link: '/guide/components-events'
            },
            {
              text: 'Hooks',
              link: '/guide/components-hooks'
            },
            {
              text: 'Options',
              link: '/guide/components-options'
            }
          ]
        },

        {
          text: 'Minze',
          children: [
            {
              text: 'Component Registration',
              link: '/guide/minze-component-registration'
            },
            {
              text: 'Events',
              link: '/guide/minze-events'
            }
          ]
        },

        {
          text: 'Advanced',
          children: [
            {
              text: 'TypeScript',
              link: '/guide/advanced-typescript'
            },
            {
              text: 'Mixins',
              link: '/guide/advanced-mixins'
            },
            {
              text: 'Transitions',
              link: '/guide/advanced-transitions'
            },
            {
              text: 'Form Input Bindings',
              link: '/guide/advanced-form-input-bindings'
            },
            {
              text: 'Style Guide',
              link: '/guide/advanced-style-guide'
            }
          ]
        }
      ]
    }
  }
}

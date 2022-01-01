// @ts-check

const META_URL = 'https://minze.dev'
const META_TITLE = 'Minze'
const META_DESCRIPTION = 'Dead-simple framework for sharable web components.'
const META_IMAGE = 'https://minze.dev/social.jpg'

/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  title: 'Minze',
  lang: 'en-US',
  description: META_DESCRIPTION,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    [
      'meta',
      {
        property: 'og:type',
        content: 'website'
      }
    ],
    [
      'meta',
      {
        property: 'og:url',
        content: META_URL
      }
    ],
    [
      'meta',
      {
        property: 'og:title',
        content: META_TITLE
      }
    ],
    [
      'meta',
      {
        property: 'og:description',
        content: META_DESCRIPTION
      }
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: META_IMAGE
      }
    ],
    [
      'meta',
      {
        property: 'og:image:alt',
        content: 'Preview of Minze'
      }
    ],
    [
      'meta',
      {
        property: 'twitter:card',
        content: 'summary_large_image'
      }
    ],
    [
      'meta',
      {
        property: 'twitter:url',
        content: META_URL
      }
    ],
    [
      'meta',
      {
        property: 'twitter:title',
        content: META_TITLE
      }
    ],
    [
      'meta',
      {
        property: 'twitter:description',
        content: META_DESCRIPTION
      }
    ],
    [
      'meta',
      {
        property: 'twitter:image',
        content: META_IMAGE
      }
    ]
  ],
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
              text: 'Quick Start',
              link: '/guide/'
            },
            {
              text: 'Introduction',
              link: '/guide/introduction'
            },
            {
              text: 'Installation',
              link: '/guide/installation'
            },
            {
              text: 'Publishing',
              link: '/guide/publishing'
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
              text: 'Extending',
              link: '/guide/advanced-extending'
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
              text: 'Testing',
              link: '/guide/advanced-testing'
            },
            {
              text: 'Performance',
              link: '/guide/advanced-performance'
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

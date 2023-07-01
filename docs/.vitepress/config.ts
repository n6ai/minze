import type { HeadConfig } from 'vitepress'
import { defineConfig } from 'vitepress'

const isProduction = process.env.NODE_ENV

const META_URL = 'https://minze.dev'
const META_TITLE = 'Minze'
const META_DESCRIPTION = 'Dead-simple JS framework for native web components.'
const META_IMAGE = 'https://minze.dev/social.jpg'

const productionHead: HeadConfig[] = [
  [
    'script',
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-DD0MESPTFW',
      async: '',
      type: 'text/javascript'
    }
  ],
  [
    'script',
    {
      type: 'text/javascript'
    },
    `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-DD0MESPTFW', { 'anonymize_ip': true });`
  ]
]

export default defineConfig({
  lang: 'en-US',
  title: META_TITLE,
  description: META_DESCRIPTION,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: META_URL }],
    ['meta', { property: 'og:title', content: META_TITLE }],
    ['meta', { property: 'og:description', content: META_DESCRIPTION }],
    ['meta', { property: 'og:image', content: META_IMAGE }],
    ['meta', { property: 'og:image:alt', content: 'Preview of Minze' }],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:url', content: META_URL }],
    ['meta', { property: 'twitter:title', content: META_TITLE }],
    ['meta', { property: 'twitter:description', content: META_DESCRIPTION }],
    ['meta', { property: 'twitter:image', content: META_IMAGE }],
    ...(isProduction ? productionHead : [])
  ],

  themeConfig: {
    logo: '/logo.svg',

    outline: [2, 4],

    editLink: {
      pattern: 'https://github.com/n6ai/minze/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/n6ai/minze' }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2021-present Sergej Samsonenko'
    },

    algolia: {
      appId: 'I0V1VHMVGH',
      apiKey: '2a3df2bb4ca6d48291a52fb3f82e67f3',
      indexName: 'minze'
    },

    carbonAds: {
      code: 'CEAIV2JY',
      placement: 'minzedev'
    },

    nav: [
      { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
      { text: 'API Reference', link: '/api/', activeMatch: '/api/' },
      {
        text: 'Links',
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/n6ai/minze/blob/main/packages/minze/CHANGELOG.md'
          },
          {
            text: '@minzejs/elements',
            link: 'https://github.com/n6ai/minze/blob/main/packages/minze-elements'
          },
          {
            text: '@minzejs/vite-plugin-minze',
            link: 'https://github.com/n6ai/minze/blob/main/packages/vite-plugin-minze'
          }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Basics',
          collapsed: false,
          items: [
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
          collapsed: false,
          items: [
            {
              text: 'Registration',
              link: '/guide/components-registration'
            },
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
              text: 'Watchers',
              link: '/guide/components-watchers'
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
          collapsed: false,
          items: [
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
          collapsed: false,
          items: [
            {
              text: 'TypeScript',
              link: '/guide/advanced-typescript'
            },
            {
              text: 'Syntax Highlighting',
              link: '/guide/advanced-syntax-highlighting'
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
              text: 'Storage',
              link: '/guide/advanced-storage'
            },
            {
              text: 'Element Examples',
              link: '/guide/advanced-element-examples'
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
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            {
              text: 'Minze',
              link: '/api/minze'
            },
            {
              text: 'MinzeElement',
              link: '/api/minze-element'
            },
            {
              text: 'Type Helpers',
              link: '/api/type-helpers'
            }
          ]
        }
      ]
    }
  }
})

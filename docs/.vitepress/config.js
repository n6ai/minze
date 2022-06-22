// @ts-check

const isProduction = process.env.NODE_ENV

const META_URL = 'https://minze.dev'
const META_TITLE = 'Minze'
const META_DESCRIPTION = 'Dead-simple JS framework for native web components.'
const META_IMAGE = 'https://minze.dev/social.jpg'

const darkMode = `
  ;(() => {
    const saved = localStorage.getItem('minze-color-scheme')
    if (
      !saved || saved === 'auto'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : saved === 'dark'
    ) {
      document.documentElement.classList.add('dark')
    }
  })()
`

/**
 * @type {import('vitepress').UserConfig['head']}
 */
const productionHead = [
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

/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  title: 'Minze',
  lang: 'en-US',
  description: META_DESCRIPTION,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],

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
    ],
    ['script', {}, darkMode],
    ...(isProduction ? productionHead : [])
  ],
  themeConfig: {
    repo: 'n6ai/minze',
    logo: '/logo.svg',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Suggest changes to this page',

    algolia: {
      appId: 'I0V1VHMVGH',
      apiKey: '2a3df2bb4ca6d48291a52fb3f82e67f3',
      indexName: 'minze'
    },

    carbonAds: {
      carbon: 'CEAIV2JY',
      placement: 'minzedev'
    },

    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API Reference', link: '/api/' },
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
              text: 'TensorFlow.js',
              link: '/guide/advanced-tfjs'
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

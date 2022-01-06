import Theme from 'vitepress/theme'
import Layout from './Layout.vue'

import './css/code.css'
import './css/custom-blocks.css'
import './css/custom.css'
import './css/docsearch.css'
import './css/scrollbar.css'
import './css/transitions.css'

/**
 * @type {import('vitepress').Theme}
 */
export default {
  ...Theme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
}

import Theme from 'vitepress/theme'
import Layout from './Layout.vue'

import Badge from './components/Badge.vue'

import './css/badge.css'
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
    app.component('badge', Badge)
  }
}

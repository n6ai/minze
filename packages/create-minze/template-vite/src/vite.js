import './assets/vite.css'

import { modules, defineAll } from './main'
defineAll(modules)

const previews = import.meta.glob('./*.html', {
  eager: true,
  query: '?raw',
  import: 'default'
})
const preview = previews['./preview.dev.html'] ?? previews['./preview.html']

const app = document.querySelector('#app')
if (app) app.innerHTML = preview

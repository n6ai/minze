import './assets/vite.css'

import { modules, defineAll } from './main'
defineAll(modules)

const previews = import.meta.glob<string>('./*.html', {
  eager: true,
  query: '?raw'
})
const preview = previews['./preview.dev.html'] ?? previews['./preview.html']

const app = document.querySelector<HTMLDivElement>('#app')
if (app) app.innerHTML = preview

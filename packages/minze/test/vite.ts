import './assets/vite.css'

import { modules, defineAll } from './main'
defineAll(modules)

if (import.meta.env.MODE !== 'testing') {
  const previews = import.meta.glob('./*.html', { eager: true, as: 'raw' })
  const preview = previews['./preview.dev.html'] ?? previews['./preview.html']

  const app = document.querySelector<HTMLDivElement>('#app') ?? null
  if (app) app.innerHTML = preview
}

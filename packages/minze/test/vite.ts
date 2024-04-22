import './assets/vite.css'

import { modules, defineAll } from './main'
defineAll(modules)

if (import.meta.env.MODE !== 'testing') {
  const previews = import.meta.glob<string>('./*.html', {
    eager: true,
    query: '?raw',
    import: 'default'
  })
  const preview = previews['./preview.dev.html'] ?? previews['./preview.html']

  const app = document.querySelector<HTMLDivElement>('#app')
  if (app) app.innerHTML = preview
}

import { createApp } from 'vue'
import App from './App.vue'

import { modules, defineAll } from './main'
defineAll(modules)

const app = createApp(App)
app.mount('#app')

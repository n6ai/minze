import Minze from 'minze'
import * as Elements from './module'
import { createApp } from 'vue'
import App from './App.vue'

Minze.defineAll(Elements)

const app = createApp(App)
app.mount('#app')

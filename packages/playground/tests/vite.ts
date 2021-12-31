import './assets/vite.css'
import Minze from 'minze'
import {
  MinzeEventListeners,
  MinzeHooks,
  MinzeOptions,
  MinzeReactiveAttrs,
  MinzeReactiveProps,
  MinzeTemplating
} from './module'

Minze.defineAll([
  MinzeEventListeners,
  MinzeHooks,
  MinzeOptions,
  MinzeReactiveAttrs,
  MinzeReactiveProps,
  MinzeTemplating
])

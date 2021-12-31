import './assets/vite.css'
import Minze from 'minze'
import {
  MinzeEventListeners,
  MinzeOptions,
  MinzeReactiveAttrs,
  MinzeReactiveProps,
  MinzeTemplating
} from './module'

Minze.defineAll([
  MinzeEventListeners,
  MinzeOptions,
  MinzeReactiveAttrs,
  MinzeReactiveProps,
  MinzeTemplating
])
